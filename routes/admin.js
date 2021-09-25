const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

const Lesson = require('../models/Lesson');


//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    resources: [Lesson],
    rootPath: '/admin'
})

module.exports = AdminBroExpress.buildRouter(adminBro)
