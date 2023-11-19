const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const sendResponse = require('../utils/common');
const { upload, uploadToS3 } = require('../middleware/s3UploadMiddleware');
const HTTP_STATUS = require('../constants/statusCodes');

const uploadVideo = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;

        // Use the upload middleware
        upload.single('file')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading to S3:', err);
                return sendResponse(res, 500, 'Error uploading to S3');
            }

            try {
                // Upload the file to S3
                const videoUrl = await uploadToS3(req.file, 'videos');

                // Update the lesson in the database with the video URL
                await Lesson.findByIdAndUpdate(
                    lessonId,
                    { $set: { 'contents.0.contentData': videoUrl } }, // Assuming video is the first content
                    { new: true }
                );

                return sendResponse(res, 200, 'Video uploaded successfully', { videoUrl });
            } catch (uploadError) {
                console.error('Error uploading video:', uploadError);
                return sendResponse(res, 500, 'Error uploading video');
            }
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const saveVideoUrlToLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title } = req.body;
        const { videoUrl } = req;

        // Create a new lesson with the video URL as contentData
        const lesson = new Lesson({
            title,
            contents: [{ contentType: 'video', contentData: videoUrl }],
        });

        // Assuming you associate the lesson with a course
        // Make sure to handle the courseId appropriately in your application
        lesson.course = courseId;

        // Save the lesson to the database
        await lesson.save();

        // return res.status(201).json({ message: 'Lesson with video created successfully', lesson });
        return sendResponse(res, HTTP_STATUS.CREATED, "Lesson With Video created", lesson)
    } catch (error) {
        console.error('Error creating lesson with video:', error);
        // return res.status(500).json({ message: 'Internal Server Error' });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error")
    }
};

// module.exports = { uploadVideoToS3, saveVideoUrlToLesson };


// Controller function to create a lesson
const createLesson = async (req, res) => {
    try {
        // Extract lesson details from the request body
        const { title, description, contentType, contentData } = req.body;
        const { courseId } = req.params


        const course = await Course.findById(courseId);

        console.log(course)

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Check if the content type is valid
        if (!['video', 'text'].includes(contentType)) {
            return sendResponse(res, 400, 'Invalid content type');
        }

        // Create a new lesson
        const newLesson = new Lesson({
            title,
            description,
            content: {
                type: contentType,
                data: contentData,
            },
        });

        // Save the lesson to the database
        await newLesson.save();

        course.lessons.push(newLesson);

        // Save the updated course
        await course.save();



        // Return success response
        return sendResponse(res, 201, 'Lesson created successfully', { lesson: newLesson });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const getLessons = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate('lessons');

        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        return sendResponse(res, 200, 'Lessons fetched successfully', { lessons: course.lessons });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
}

module.exports = {
    createLesson,
    getLessons,
    uploadVideo,
    saveVideoUrlToLesson
};
