const Quiz = require('../models/quizModel'); // Adjust the path based on your project structure
const Lesson = require('../models/lessonModel')
const User = require('../models/userModel');
const sendResponse = require('../utils/common');
const HTTP_STATUS = require('../constants/statusCodes');
// Controller to create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const { lessonId } = req.params;

        console.log("lesson Id", lessonId)
        // Check if the lesson exists
        const lesson = await Lesson.findById(lessonId);
        console.log(lesson)
        if (!lesson) {
            // return res.status(404).json({ message: 'Lesson not found' });
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Lesson Not Found")
        }

        // Create a new quiz
        const newQuiz = new Quiz({
            title,
            description,
            questions,
        });

        // Save the quiz
        const savedQuiz = await newQuiz.save();

        // Associate the quiz with the lesson
        lesson.quiz = savedQuiz._id;
        await lesson.save();

        // res.status(201).json({
        //     message: 'Quiz created and associated with the lesson successfully',
        //     quiz: savedQuiz,
        // });
        return sendResponse(res, HTTP_STATUS.CREATED, "Quiz Created for the lesson", { quiz: savedQuiz })
    } catch (error) {
        console.error('Error creating quiz:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error")
    }
};


// Controller to get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();

        // res.status(200).json({
        //     message: 'Quizzes retrieved successfully',
        //     quizzes,
        // });
        return sendResponse(res, HTTP_STATUS.OK, "Quiz retrieved successfully", quizzes)
    } catch (error) {
        console.error('Error getting quizzes:', error);
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error")
    }
};

const submitQuiz = async (req, res) => {
    try {
        const { lessonId, userId, answers } = req.body;

        // Check if the lesson exists
        const lesson = await Lesson.findById(lessonId).populate('quiz');
        if (!lesson) {
            // return res.status(404).json({ message: 'Lesson not found' });
            return sendResponse(res, HTTP_STATUS.NOT_FOUND)
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            // return res.status(404).json({ message: 'User not found' });
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User Not Found")
        }

        // Check if the lesson has a quiz
        if (!lesson.quiz) {
            // return res.status(400).json({ message: 'No quiz associated with this lesson' });
            return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "No quiz associated with this lesson")
        }

        // Validate and calculate the score
        const quiz = lesson.quiz;
        let score = 0;

        answers.forEach(answer => {
            const question = quiz.questions.id(answer.questionId);

            if (question && question.correctOption === answer.selectedOption) {
                score++;
            }
        });

        // Save the score in the user schema
        user.marks.push({
            lesson: lessonId,
            quiz: lesson.quiz._id,
            quizScore: score,
        });

        await user.save();

        // res.status(200).json({
        //     message: 'Quiz submitted successfully',
        //     score,
        // });
        return sendResponse(res, HTTP_STATUS.OK, "Quiz submitted successfully", score)
    } catch (error) {
        console.error('Error submitting quiz:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error")
    }
};



const calculateScore = (questions, submittedAnswers) => {
    let correctCount = 0;

    questions.forEach((question, index) => {
        const submittedAnswer = submittedAnswers[index];

        // Check if the submitted answer matches the correct option
        if (submittedAnswer === question.correctOption) {
            correctCount++;
        }
    });

    // Calculate the percentage of correct answers
    const totalQuestions = questions.length;
    const percentageScore = (correctCount / totalQuestions) * 100;

    return percentageScore.toFixed(2); // Return the score with two decimal places
};


// Add more controllers for specific quiz operations as needed

module.exports = {
    createQuiz,
    getAllQuizzes,
    submitQuiz,
    // Add other controllers here
};
