// import controllers
const {
    getOverview,
    getGeneralOverview,
    getAmountComparaisonData
} = require('../controllers/OverviewCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// GET  OVERVIEW 
router.get('', authMiddleware, isAdmin, getOverview);

router.get('/general', authMiddleware, isAdmin, getGeneralOverview);

router.get('/amount-chart', authMiddleware, isAdmin, getAmountComparaisonData);


module.exports = router;