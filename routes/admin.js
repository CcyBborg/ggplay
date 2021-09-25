const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

const Lesson = require('../models/Lesson');


//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose)

const AdminBroOptions = {
  resources: [Lesson],
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)