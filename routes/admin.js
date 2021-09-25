const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const mongoose = require('mongoose');

const run = async () => {
    const mongooseDb = await mongoose.connect(process.env.DB_ADMIN_CONNECTION, { useUnifiedTopology: true })

    // Passing resources by giving entire database
    const adminBro = new AdminBro({
        databases: [mongooseDb],
        rootPath: '/admin'
    })

    AdminBro.registerAdapter(AdminBroMongoose);
};

run();

const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin'
})

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
