// dependencies
const asyncHandler = require('express-async-handler');


// models
const {Category , SubCategory} = require('../models/CategoryModel');

const createCategory = asyncHandler(async(req, res)=>{
    try {
        if(!req.body.title){
            return res.status(500).json({ message: 'Category Title is required'});
        }
        // const {sub_categories} = req.body;
        const category = await Category.create({...req.body});
        // if the body contains sub categories create them
        // var addedSubCategories = new Array;
        // if(sub_categories){
        //     if(Array.isArray(sub_categories)){
        //         for (const subCat of sub_categories){
        //             const subCategory = await SubCategory.create({...subCat, parent:category._id});
        //             addedSubCategories.push(subCategory)
        //         }
        //     }
        //     else{
        //         const subCategory = await SubCategory.create({...sub_categories, parent:category._id});
        //         addedSubCategories.push(subCategory)
        //     }
        // }
        res.status(200).json({message:'created sucessfully', category});
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err });
    }
});

const getAllCategories = asyncHandler(async(req, res)=>{
    try {
        const {
            search,
            page,    
            pageSize,
        } = req.query;
        // build the query
        const query = {};

        // Keywords/Search filter
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Execute the query to find products
        let categoriesQuery = Category.find(query);
        
        // Sorting
        const sort = req.query.sort 
        if (sort) {
            const [sortField, sortOrder] = sort.split(':');
            const sortOptions = {};
            sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
            categoriesQuery = categoriesQuery.sort(sortOptions);
        }

        // Pagination
        const DEFAULT_PAGE_SIZE = 10;
        const currentPage = parseInt(page) || 1;
        const pageSizeValue = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const skipItems = (currentPage - 1) * pageSizeValue;        
        categoriesQuery = categoriesQuery.skip(skipItems).limit(pageSizeValue);

        const categories = await categoriesQuery.exec();
        const categoriesCount = await Category.countDocuments(query).exec();
        const totalPages = Math.ceil(categoriesCount / pageSizeValue);
        res.status(200).json({categories, categoriesCount, totalPages});
    } catch (err) {
        res.status(500).json({ message: 'Server error'});
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