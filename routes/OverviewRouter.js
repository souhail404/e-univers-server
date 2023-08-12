// import controllers
const {
    getOverview
} = require('../controllers/OverviewCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// GET  OVERVIEW 
router.get('', authMiddleware, isAdmin, getOverview);


module.exports = router;