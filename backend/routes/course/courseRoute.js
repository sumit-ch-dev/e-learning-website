const express = require('express')
const router = express.Router()
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../../controller/courseController')
const { isInstructor } = require('../../middleware/authMiddleware')
const { createLesson, uploadVideo } = require('../../controller/lessonController')


// router.post('/', isInstructor, createCourse);
router.post('/', createCourse)
router.get('/', getCourses);
router.get('/:courseId', getCourseById);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);
router.post('/:courseId/lessons', createLesson);
router.post('/:courseId/lessons/:lessonId/upload-video', uploadVideo)


module.exports = router;