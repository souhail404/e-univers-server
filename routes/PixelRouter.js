// import controllers
const {
    editFacebookPixels, 
    editTiktokPixels, 
    editSnapchatPixels,
    getFacebookPixels,
    getTiktokPixels,
    getSnapchatPixels,
} = require('../controllers/PixelCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.post('/facebook/edit', authMiddleware, isAdmin, editFacebookPixels);

router.post('/tiktok/edit', authMiddleware, isAdmin, editTiktokPixels);

router.post('/snapchat/edit', authMiddleware, isAdmin, editSnapchatPixels);
 
router.get('/facebook/get', authMiddleware, isAdmin, getFacebookPixels);

router.get('/tiktok/get', authMiddleware, isAdmin, getTiktokPixels);

router.get('/snapchat/get', authMiddleware, isAdmin, getSnapchatPixels);



module.exports = router;