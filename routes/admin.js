const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

const Lesson = require('../models/Lesson');
const Coach = require('../models/Coach');
const LessonSlot = require('../models/LessonSlot');
const Review = require('../models/Review');
const Game = require('../models/Game');
const Rank = require('../models/Rank');
const Order = require('../models/Order');
const User = require('../models/User');

//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    resources: [Lesson, Coach, LessonSlot, Game, Rank, Review, User, Order],
    rootPath: '/admin',
    branding: {
        logo: '/public/images/small-logo.png',
        companyName: 'GGPlay'
    }
})

module.exports = AdminBroExpress.buildRouter(adminBro)
