const express = require('express');
const router = express.Router();
const { isStudent } = require('../../middleware/authMiddleware');
const { addCourseToCart, removeCourseFromCart } = require('../../controller/cartController')

router.post('/add/:courseId', isStudent, addCourseToCart)
router.post('/remove/:courseId', isStudent, removeCourseFromCart)

module.exports = router