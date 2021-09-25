const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose');


const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin'
});

AdminBro.registerAdapter(AdminBroMongoose);

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
