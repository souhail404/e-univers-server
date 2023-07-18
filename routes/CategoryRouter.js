// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

const {
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategoryById, 
    deleteCategoryById} = require('../controllers/CategoryCtrl');

const {
    getAllSubCategories, 
    createSubCategory, 
    deleteSubCategory, 
    updateSubCategory, 
    getOneSubCategory,
    addManySubCategories,
    deleteAllSubCategories} = require('../controllers/SubCategoryCtrl');


// Define routes for category CRUD operations
router.post('/add', authMiddleware, isAdmin, createCategory);
router.get('/', getAllCategories);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', authMiddleware, isAdmin, updateCategoryById);
router.delete('/:categoryId', authMiddleware, isAdmin, deleteCategoryById);

// Get all sub-categories for a specific category
router.get('/:categoryId/subcategory', getAllSubCategories);
router.get('/:categoryId/subcategory/:subCategoryId', getOneSubCategory);
router.post('/:categoryId/addonesubcategory', authMiddleware, isAdmin, createSubCategory);
router.post('/:categoryId/addmanysubcategories', authMiddleware, isAdmin, addManySubCategories);
router.delete('/:categoryId/deleteallsubcategories', authMiddleware, isAdmin, deleteAllSubCategories);
router.delete('/:categoryId/subcategory/:subCategoryId', authMiddleware, isAdmin, deleteSubCategory);
router.put('/:categoryId/subcategory/:subCategoryId', authMiddleware, isAdmin, updateSubCategory);

module.exports = router;