const HTTP_STATUS = require('../constants/statusCodes');
const sendResponse = require('../utils/common');
const auth = require('./auth/authRoute');
const course = require('./course/courseRoute')
const enroll = require('./enroll/enrollRoute')
const cart = require('./cart/cartRoute')
const lesson = require('./lesson/lessonRoute')
const quiz = require('./quiz/quizRoute')
const categories = require('./category/categoryRoute')
// import auth from './user/authRoutes'
// import course from './courses/courseRoutes'

const constructorMethod = (app) => {
    app.use('/api/auth', auth)
    app.use('/api/course', course)
    app.use('/api/enroll', enroll)
    app.use('/api/cart', cart)
    app.use('/api/lesson', lesson)
    app.use('/api/quiz', quiz)
    app.use('/api/categories', categories)

    app.use('*', (req, res) => {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "not found")
    })
}


module.exports = constructorMethod;