// dependencies
const asyncHandler = require('express-async-handler');
const faker = require('faker');
const fs = require('fs')

// models
const {Product} = require('../models/ProductModel');
const cloudinaryUploadImg = require('../utils/cloudinary');
const deleteImage = require('../services/DeleteImage');

// CREATE A PRODUCT 
const createProduct = asyncHandler(async(req, res)=>{
    try{
        const uploader = (path) => cloudinaryUploadImg(path, 'images')
        const images = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const uploadRes = await uploader(path);
            images.push(uploadRes);
            console.log(images);
            fs.unlinkSync(path);
        }

        const {title, slug_title, mini_description, description, price, variants} = req.body;
        const product = await Product.create({...req.body, variants:JSON.parse(variants), images})
        res.status(200).json(product);
    } 
    catch(err){
        res.status(500).json(err) 
    }
});

// GET PRODUCTS // FILTERING 
const getProducts = asyncHandler(async(req, res)=>{
    const {
        category,
        minPrice,
        maxPrice,
        exactPrice,
        minStock,
        maxStock,
        discount,
        minDiscount,
        maxDiscount,
        minLikes,
        recentlyAdded,
        search,   
        page,    
        pageSize,
    } = req.query;  
    // build the query
    const query = {};
    
    // Category filter
    if (category) {
        query.category = category;
    }
  
    // Price Range filter
    if (minPrice && !isNaN(minPrice)) {
        query.price = { $gte: parseFloat(minPrice) };
    }
    if (maxPrice && !isNaN(maxPrice)) {
        if (query.price) {
            query.price.$lte = parseFloat(maxPrice);
        } 
        else {
            query.price = { $lte: parseFloat(maxPrice) };
        }
    }
    if (exactPrice && !isNaN(exactPrice)) {
        query.price = { $gte: parseFloat(exactPrice) - 1 };
        query.price.$lte = parseFloat(exactPrice) + 1;
    }

    // Stock Availability filter
    if (minStock && !isNaN(minStock)) {
        query.stock = { $gte: parseInt(minStock) };
    }
    if (maxStock && !isNaN(maxStock)) {
        query.stock = query.stock || {};
        query.stock.$lte = parseInt(maxStock);
    }

    // Discount filter
    if (minDiscount && !isNaN(minDiscount)) {
        query.discount = { $gte: parseFloat(minDiscount) };
    }
    if (maxDiscount && !isNaN(maxDiscount)) {
        query.discount = query.discount || {};
        query.discount.$lte = parseFloat(maxDiscount);
    }
    if (discount && !isNaN(discount)) {
        query.discount = { $gte: parseFloat(discount) - 1 };
        query.discount.$lte = parseFloat(discount) + 1; 
    }

    // Liked Count filter
    if (minLikes && !isNaN(minLikes)) {
        query.liked = { $gte: parseInt(minLikes) };
    }

    // Recently Added filter
    if (recentlyAdded === 'true') {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        query.createdAt = { $gte: lastWeek };
    }
  
    // Keywords/Search filter
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    // Execute the query to find products
    let productsQuery = Product.find(query).populate('category');

    // Sorting
    const sort = req.query.sort || 'createdAt:desc'  
    if (sort) {
        const [sortField, sortOrder] = sort.split(':');
        const sortOptions = {};
        sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
        productsQuery = productsQuery.sort(sortOptions);
    }
  
    // Fields Limiting
    const fields = req.query.fields || ' ' // || 'title,mini_description,description,stock,price,liked';
    if (fields) {
        const selectedFields = fields.split(',').join(' ');
        productsQuery = productsQuery.select(selectedFields);
    }
  
    // Pagination
    const DEFAULT_PAGE_SIZE = 10; 
    const currentPage = parseInt(page) || 1;
    const pageSizeValue = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const skipItems = (currentPage - 1) * pageSizeValue;
    productsQuery = productsQuery.skip(skipItems).limit(pageSizeValue);
    
    const products = await productsQuery.exec();
    
    const totalProductsCount = await Product.countDocuments(query).exec();

    const totalPages = Math.ceil(totalProductsCount / pageSizeValue);

    if(!products){
        throw Error('products not found')
    }
    res.json({
        totalProducts: totalProductsCount,
        totalPages: totalPages,
        currentPage: currentPage,
        pageSize: pageSizeValue,
        products: products,
    });
})

// GET PRODUCT
const getProduct = asyncHandler(async(req, res)=>{
    const productId = req.params.productId
    if(!productId){
        throw Error('you must pass the product id in the url')
    }
    const product = await Product.findById(productId);
    if(!product){
        throw Error('products not found')
    }
    res.json(product)
})

// UPDATE PRODUCT 
const updateProduct = asyncHandler(async(req, res)=>{
    const productId = req.params.productId;
    try{
        const deletedImages = JSON.parse(req.body.deletedImages);
        if (deletedImages && deletedImages.length > 0) {
            console.log(deletedImages);
            for (const image of deletedImages) {
              if(image.publicId){
                await deleteImage(image.publicId);
              }
            }
        }
        //  upload images
        const uploader = (path) => cloudinaryUploadImg(path, 'images')
        const newImages = [];
        const images = JSON.parse(req.body.existingImages);
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const uploadRes = await uploader(path);
            newImages.push(uploadRes);
            fs.unlinkSync(path);
        }


        for (let i = 0; i < images.length; i++) {
            if (typeof images[i].url === "number") {
                images[i] = newImages.shift();
            }
        }
            
        const {title, slugTitle, miniDescription, description, costPrice, variants} = req.body;
        const product = await Product.findOneAndUpdate({_id:productId}, {...req.body, variants:JSON.parse(variants), images}, {new:true})
        res.status(200).json(product);
    } 
    catch(err){
        res.status(500).json(err) 
    }
    
});

// DELETE PRODUCT 
const deleteProduct = asyncHandler(async(req, res)=>{
    try {
        const productId = req.params.productId
        if(!productId){
            return res.status(400).json({message:'you must pass the product id in the url'})
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:'Product Not found'})
        }
        // delete images
        const images = product.images;
        if (images && images.length > 0) {
            for (const image of images) {
                if(image.publicId){
                    await deleteImage(image.publicId);
                }
            }
        }
        // delete product
        const deletedProduct = await Product.findOneAndDelete({_id:productId});
        if(!deletedProduct){
            return res.status(400).json({message:'error while Deleting product'})
        }
        res.status(200).json({message:'Product deleted successfully', deletedProduct});    
    } catch (error) {
        res.status(500).json({message:'internal server error', error});
    }   
});

const generateMockProducts = () => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    const product = {
        title: faker.commerce.productName(),
        slugTitle: faker.commerce.productName(),
        miniDescription: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        sellPrice: faker.random.number({ min: 10, max: 10000, precision: 0.01 }),
        comparePrice: faker.random.number({ min: 10, max: 10000, precision: 0.01 }),
        costPrice: faker.random.number({ min: 10, max: 10000 , precision: 0.01 }),
        //   discount: faker.random.number({ min: 0, max: 50, precision: 0.1 }),
        liked: faker.random.number({ min: 0, max: 70 }),
        added_to_cart: faker.random.number({ min: 0, max: 80 }),
        ordered: faker.random.number({ min: 0, max: 80 }),
    };

    products.push(product);
  }

  return products;
};

const generate = asyncHandler(async(req, res)=>{
    const mockProducts = generateMockProducts();
    mockProducts.forEach(async(product) => {
        const newProduct = await Product.create(product);
    });

    res.json({msg:'generated successfully'})
});



module.exports = {
    createProduct,
    getProducts,
    getProduct, 
    updateProduct, 
    deleteProduct,
    generate
}