import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all orders (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { 
      status, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build filter object
    const where: any = {};
    if (status) {
      where.status = String(status);
    }
    
    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        [String(sortBy)]: order
      },
      skip,
      take: Number(limit)
    });
    
    // Get total count for pagination
    const total = await prisma.order.count({ where });
    
    res.json({
      orders,
      pagination: {
        total,
        page: Number(page),
        pageSize: Number(limit),
        pageCount: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders for current user
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if the user is authorized to view this order
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to view this order' });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      shippingAddress, 
      paymentMethod, 
      items,
      totalAmount
    } = req.body;
    
    // Start a transaction
    const order = await prisma.$transaction(async (prisma) => {
      // 1. Create the order
      const newOrder = await prisma.order.create({
        data: {
          userId: req.user.id,
          shippingAddress,
          paymentMethod,
          totalAmount: Number(totalAmount),
          status: 'PENDING'
        }
      });
      
      // 2. Create order items and update product stock
      for (const item of items) {
        // Check product stock
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });
        
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        
        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for product: ${product.name}`);
        }
        
        // Create order item
        await prisma.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price
          }
        });
        
        // Update product stock
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: product.stock - item.quantity
          }
        });
      }
      
      return newOrder;
    });
    
    // Fetch the complete order with items
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.status(201).json(completeOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Update order status
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel an order (can be done by user or admin)
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        orderItems: true
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if the user is authorized to cancel this order
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to cancel this order' });
    }
    
    // Check if the order can be cancelled (not delivered or already cancelled)
    if (['DELIVERED', 'CANCELLED'].includes(order.status)) {
      return res.status(400).json({
        error: `Order cannot be cancelled because it is already ${order.status.toLowerCase()}`
      });
    }
    
    // Start a transaction
    const updatedOrder = await prisma.$transaction(async (prisma) => {
      // 1. Update order status
      const cancelledOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { status: 'CANCELLED' }
      });
      
      // 2. Restore product stock
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        });
      }
      
      return cancelledOrder;
    });
    
    // Fetch the complete updated order
    const completeOrder = await prisma.order.findUnique({
      where: { id: updatedOrder.id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
    
    res.json(completeOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 