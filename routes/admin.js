const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const mongoose = require('mongoose');

const run = async () => {
    const mongooseDb = await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })

    // Passing resources by giving entire database
    const adminBro = new AdminBro({
        databases: [mongooseDb],
        rootPath: '/admin'
    })

    const router = AdminBroExpress.buildRouter(adminBro);

    AdminBro.registerAdapter(AdminBroMongoose);

    module.exports = router;
};

await run();
