// import controllers
const {
    createBanner,
    getBanners,
    deleteBanner
} = require('../controllers/BannerCrtl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

const express = require('express');
const router = express.Router();

router.post(
    '/banner/create',
    authMiddleware,
    isAdmin,
    uploadPhoto.fields([
        { name: 'desktopBanner', maxCount: 1 },
        { name: 'mobileBanner', maxCount: 1 }
    ]),
    createBanner
  );

router.get('/banner/get', getBanners); 

router.delete('/banner/delete/:bannerId', authMiddleware, isAdmin, deleteBanner);
 




module.exports = router;