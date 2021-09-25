const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const mongoose = require('mongoose');

require('../models/Lesson')
require('path-to-your/mongoose-model2')

// const run = async () => {

// };

// run();

// Passing resources by giving entire database
const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin'
})

AdminBro.registerAdapter(AdminBroMongoose);

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
