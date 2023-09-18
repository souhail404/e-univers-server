// import controllers
const {
    getOverview,
    getGeneralOverview
} = require('../controllers/OverviewCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// GET  OVERVIEW 
router.get('', authMiddleware, isAdmin, getOverview);

router.get('/general', authMiddleware, isAdmin, getGeneralOverview);


module.exports = router;