// dependencies
const asyncHandler = require('express-async-handler');


// models
const {Category , SubCategory} = require('../models/CategoryModel');

const createCategory = asyncHandler(async(req, res)=>{
    try {
        const {sub_categories} = req.body;
        const category = await Category.create(req.body);
        
        // if the body contains sub categories create them
        var addedSubCategories = new Array;
        if(sub_categories){
            console.log('subs exist');
            if(Array.isArray(sub_categories)){
                for (const subCat of sub_categories){
                    const subCategory = await SubCategory.create({...subCat, parent:category._id});
                    addedSubCategories.push(subCategory)
                }
            }
            else{
                const subCategory = await SubCategory.create({...sub_categories, parent:category._id});
                addedSubCategories.push(subCategory)
            }
        }
        res.status(201).json({category , addedSubCategories});
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err });
    }
});

const getAllCategories = asyncHandler(async(req, res)=>{
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const getCategoryById = asyncHandler(async(req, res)=>{
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        const subCategories = await SubCategory.find({parent:categoryId},{title:1, _id:1})
        res.json({category , subCategories});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const updateCategoryById = asyncHandler(async(req, res)=>{
    try {
        const { categoryId } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(
          categoryId,
          {...req.body},
          { new: true }
        );
        if (!updatedCategory) {
          return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const deleteCategoryById = asyncHandler(async(req, res)=>{
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);

        if (!category) {
        return res.status(404).json({ message: 'Category not found' });
        }

        // Delete associated sub-categories first (cascading delete)
        await SubCategory.deleteMany({ parent: categoryId });

        // Then delete the category
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' , error:err});
    }
});





module.exports = {createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById}