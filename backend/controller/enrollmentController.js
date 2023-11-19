const User = require('../models/userModel');
const Course = require('../models/courseModel');
const sendResponse = require('../utils/common');
const HTTP_STATUS = require('../constants/statusCodes');

const enrollUserToCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { id } = req.user; // Assuming you have user information in req.user
        const userId = id;

        // Check if the user is already enrolled in the course
        const user = await User.findById(userId);
        if (user.enrolledCourses.includes(courseId)) {
            return sendResponse(res, 400, 'User is already enrolled in this course');
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Enroll the user in the course
        user.enrolledCourses.push(courseId);
        await user.save();

        return sendResponse(res, 200, 'User enrolled in the course successfully');
    } catch (error) {
        console.error('Error enrolling user in the course:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};


const approveCourseEnrollment = async (req, res) => {
    try {
        const { courseId, userId } = req.params; // Assuming you have these parameters
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Check if the user is enrolled in the course
        const enrollment = course.enrollments.find((enrollment) => enrollment.user.equals(userId));
        if (!enrollment) {
            return sendResponse(res, 404, 'User not enrolled in this course');
        }

        // Approve the user's enrollment
        enrollment.status = 'approved';
        await course.save();

        return sendResponse(res, 200, 'User enrollment approved successfully');
    } catch (error) {
        console.error('Error approving user enrollment:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};


module.exports = { enrollUserToCourse, approveCourseEnrollment };
