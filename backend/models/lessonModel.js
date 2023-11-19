const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    contents: [
        {
            type: {
                type: String,
                enum: ['video', 'text'],
                // required: true,
            },
            data: {
                type: String,
                // required: true,
            },
        },
    ],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Assuming you have a Quiz model
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment', // Assuming you have an Assignment model
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
