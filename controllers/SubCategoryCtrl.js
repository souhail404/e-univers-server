// dependencies
const asyncHandler = require('express-async-handler');


// models
const {Category , SubCategory} = require('../models/CategoryModel');

const getAllSubCategories = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const subCategories = await SubCategory.find({ parent: categoryId });
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err });
    }
});

const getOneSubCategory = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const subCategoryId = req.params.subCategoryId;

        const subCategory = await SubCategory.findOne({ _id: subCategoryId, parent: categoryId });

        if (!subCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }

        res.json(subCategory);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const createSubCategory = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const newSubCategory = { ...req.body, parent: categoryId };
        const subCategory = await SubCategory.create(newSubCategory);
        res.json(subCategory);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const deleteSubCategory = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const subCategoryId = req.params.subCategoryId;

        const subCategory = await SubCategory.findOneAndDelete({ _id: subCategoryId, parent: categoryId });

        if (!subCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }

        res.json({ message: 'Sub-category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const updateSubCategory = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const subCategoryId = req.params.subCategoryId;
        const {title} = req.body

        if(!title){
            return res.status(400).json({ message: 'please send a valid data' });
        }

        const subCategory = await SubCategory.findOneAndUpdate(
            { _id: subCategoryId, parent: categoryId },
            {title},
            { new: true } 
        );

        if (!subCategory) {
        return res.status(404).json({ message: 'Sub-category not found' });
        }

        res.json({subCategory , title});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const addManySubCategories  = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const subCategoriesToAdd = req.body;
        // Prepare an array to hold the newly added sub-categories
        const addedSubCategories = [];

        for (const subCat of subCategoriesToAdd) {
            const newSubCategory = { ...subCat, parent: categoryId };
            const subCategory = await SubCategory.create(newSubCategory);
            addedSubCategories.push(subCategory);
        }

        res.status(201).json(addedSubCategories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err});
    }
});

const deleteAllSubCategories = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        
        // Delete all sub-categories associated with the parent category
        await SubCategory.deleteMany({ parent: categoryId });

        res.json({ message: 'All sub-categories deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' , error:err});
    }
});


module.exports = {
    getAllSubCategories, 
    createSubCategory, 
    deleteSubCategory, 
    updateSubCategory, 
    getOneSubCategory, 
    addManySubCategories, 
    deleteAllSubCategories
}