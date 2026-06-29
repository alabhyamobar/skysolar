const connectTODB = require('./src/config/database');
const Employee = require('./src/modules/admin/employee.model');
require('dotenv').config();

(async () => {
    try {
        await connectTODB();
        console.log("Connected to DB, checking for admin...");
        
        const existingAdmin = await Employee.findOne({ email: 'admin@skysolar.com' });
        if (existingAdmin) {
            console.log("Admin already exists. Credentials are:");
            console.log("Email: admin@skysolar.com");
            console.log("Password: adminpassword123");
            process.exit(0);
        }

        const admin = await Employee.create({
            name: 'Super Admin',
            email: 'admin@skysolar.com',
            password: 'adminpassword123',
            role: 'admin'
        });
        
        console.log("Admin created successfully! Credentials are:");
        console.log("Email: admin@skysolar.com");
        console.log("Password: adminpassword123");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
