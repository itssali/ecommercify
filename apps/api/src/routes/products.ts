import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build filter object
    const where: any = {};
    
    if (category) {
      where.categoryId = Number(category);
    }
    
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }
    
    // Execute query
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        [String(sortBy)]: order
      },
      include: {
        category: true
      },
      skip,
      take: Number(limit)
    });
    
    // Get total count for pagination
    const total = await prisma.product.count({ where });
    
    res.json({
      products,
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

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, categoryId, stock } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        categoryId: Number(categoryId),
        stock: Number(stock)
      }
    });
    
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, categoryId, stock } = req.body;
    
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: price ? Number(price) : undefined,
        image,
        categoryId: categoryId ? Number(categoryId) : undefined,
        stock: stock ? Number(stock) : undefined
      }
    });
    
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 