const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const mongoose = require('mongoose');

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro);

const run = async () => {
    const mongooseDb = await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })

    // Passing resources by giving entire database
    const adminBro = new AdminBro({
      databases: [mongooseDb],
      //... other AdminBroOptions
    })
};

const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

module.exports = router;
