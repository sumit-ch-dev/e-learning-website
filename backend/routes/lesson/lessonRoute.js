const express = require('express');
const { createLesson, getLessons, playVideo } = require('../../controller/lessonController');
// const { uploadVideo } = require('../../controller/lessonController')
// const s3UploadMiddleware = require('../../middleware/s3uploadMiddleware')
const router = express.Router()


router.post('/:courseId', createLesson);
router.get('/:courseId', getLessons);

// router.post('/:lessonId/add-video', s3UploadMiddleware.single('video'), uploadVideo)
// router.get('/:lessonId/play-video', playVideo)

module.exports = router;