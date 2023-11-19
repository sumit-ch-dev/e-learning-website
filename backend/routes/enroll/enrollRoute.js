const express = require('express')
const router = express.Router()
const { enrollUserToCourse, approveCourseEnrollment } = require('../../controller/enrollmentController');
const { isStudent } = require('../../middleware/authMiddleware')


router.post('/:courseId', isStudent, enrollUserToCourse)


module.exports = router;