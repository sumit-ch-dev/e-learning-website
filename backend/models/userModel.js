const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    enrolledCourses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    }],
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        bio: { type: String },
        avatar: { type: String, default: null }, // URL to user's profile picture
    },
    instructorProfile: {
        expertise: { type: String, default: null },
    },
    marks: [
        {
            lesson: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
            },
            quizScore: {
                type: Number,
                default: 0,
            },
            submittedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;