const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

const Lesson = require('../models/Lesson');
const Coach = require('../models/Coach');
const LessonSlot = require('../models/LessonSlot');
const Game = require('../models/Game');

//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    resources: [Lesson, Coach, LessonSLot, Game, Rank, Review, User, Order],
    rootPath: '/admin',
    branding: {
        logo:,
        companyName: 'GGPlay'
    }
})

module.exports = AdminBroExpress.buildRouter(adminBro)
