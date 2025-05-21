import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      role,
      search
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build filter object
    const where: any = {};
    if (role) {
      where.role = String(role);
    }
    
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } }
      ];
    }
    
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            orders: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: Number(limit)
    });
    
    // Format users to include order count
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      orderCount: user._count.orders,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    
    // Get total count for pagination
    const total = await prisma.user.count({ where });
    
    res.json({
      users: formattedUsers,
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

// Get a single user by ID (admin only)
router.get('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        orders: {
          take: 5,
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Format user to include order count
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      orderCount: user._count.orders,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      recentOrders: user.orders
    };
    
    res.json(formattedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user (admin only for role updates, users can update their own profile)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    // Check if user is updating their own profile or is an admin
    if (Number(id) !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You can only update your own profile' });
    }
    
    // Only admins can update roles
    if (role && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Only admins can update user roles' });
    }
    
    // Build update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // If updating password, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    // Only add role if user is admin
    if (role && req.user.role === 'ADMIN') {
      updateData.role = role;
    }
    
    // Update user
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user has orders
    const userWithOrders = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    });
    
    if (userWithOrders && userWithOrders._count && userWithOrders._count.orders > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete user with orders. Please handle their orders first.' 
      });
    }
    
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 