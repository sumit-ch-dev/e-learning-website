const Course = require('../models/courseModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const sendResponse = require('../utils/common');
const HTTP_STATUS = require('../constants/statusCodes');

const addCourseToCart = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { id } = req.user; // Assuming you have user information in req.user
        const userId = id;
        // console.log(userId)
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            // return res.status(404).json({ message: 'Course not found' });
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course not found")
        }

        // Check if the user has a cart, create one if not
        let userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            userCart = new Cart({ user: userId, courses: [] });
        }

        // Check if the course is already in the cart
        if (!userCart.courses.includes(courseId)) {
            userCart.courses.push(courseId);
            await userCart.save();
        } else {
            return sendResponse(res, HTTP_STATUS.CREATED, "Course already is in the cart")
        }

        // return res.status(200).json({ message: 'Course added to the cart successfully' });
        return sendResponse(res, HTTP_STATUS.OK, "Course added to the cart successfully");
    } catch (error) {
        console.error('Error adding course to the cart:', error);
        // return res.status(500).json({ message: 'Internal Server Error' });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};

const removeCourseFromCart = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { id } = req.user; // Assuming you have user information in req.user
        const userId = id;

        // Check if the user has a cart
        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            // If the user doesn't have a cart, the course can't be in the cart
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course not found in the cart");
        }

        // Check if the course is in the cart
        if (userCart.courses.includes(courseId)) {
            // Remove the course from the cart
            userCart.courses = userCart.courses.filter(course => course.toString() !== courseId);
            await userCart.save();
        } else {
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Course not found in the cart");
        }

        return sendResponse(res, HTTP_STATUS.OK, "Course removed from the cart successfully");
    } catch (error) {
        console.error('Error removing course from the cart:', error);
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};


module.exports = { addCourseToCart, removeCourseFromCart };
