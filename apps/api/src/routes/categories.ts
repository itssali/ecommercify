import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all categories with product count
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    
    // Transform data to include product count directly
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      productCount: category._count.products
    }));
    
    res.json(formattedCategories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single category by ID with its products
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Transform data to include product count directly
    const formattedCategory = {
      id: category.id,
      name: category.name,
      productCount: category._count.products,
      products: category.products
    };
    
    res.json(formattedCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new category (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    
    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name }
    });
    
    if (existingCategory) {
      return res.status(409).json({ error: 'Category already exists' });
    }
    
    const category = await prisma.category.create({
      data: { name }
    });
    
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a category (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    });
    
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a category (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if category has products
    const categoryWithProducts = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    
    // Fix the TypeScript error by ensuring _count is not undefined
    if (categoryWithProducts && categoryWithProducts._count && categoryWithProducts._count.products > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category with products. Please reassign or delete the products first.' 
      });
    }
    
    await prisma.category.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 