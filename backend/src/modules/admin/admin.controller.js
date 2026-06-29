const Employee = require('./employee.model');
const QueryModel = require('../user/userQuery');
const Client = require('./client.model');
const jwt = require('jsonwebtoken');
const exceljs = require('exceljs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'skysolarsecret', {
        expiresIn: '30d',
    });
};

// @desc    Auth employee & get token
// @route   POST /api/admin/login
// @access  Public
const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });

        if (employee && (await employee.matchPassword(password))) {
            res.json({
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                token: generateToken(employee._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all queries
// @route   GET /api/admin/queries
// @access  Private
const getQueries = async (req, res) => {
    try {
        let filter = {};
        if (req.employee.role !== 'admin') {
            filter.assignedTo = req.employee._id;
        }
        const queries = await QueryModel.find(filter).populate('assignedTo', 'name email').sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Assign query to employee
// @route   PUT /api/admin/queries/:id/assign
// @access  Private (Admin Only optionally)
const assignQuery = async (req, res) => {
    try {
        const query = await QueryModel.findById(req.params.id);
        if (query) {
            query.assignedTo = req.body.employeeId || null;
            const updatedQuery = await query.save();
            res.json(updatedQuery);
        } else {
            res.status(404).json({ message: 'Query not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update query status
// @route   PUT /api/admin/queries/:id/status
// @access  Private
const updateQueryStatus = async (req, res) => {
    try {
        const query = await QueryModel.findById(req.params.id);
        if (query) {
            query.status = req.body.status || query.status;
            const updatedQuery = await query.save();

            if (req.body.status === 'Converted') {
                const clientExists = await Client.findOne({ sourceQueryId: query._id });
                if (!clientExists) {
                    await Client.create({
                        name: query.userName,
                        email: query.Email,
                        phone: query.PhoneNumber,
                        sourceQueryId: query._id,
                        assignedTo: query.assignedTo
                    });
                }
            }

            res.json(updatedQuery);
        } else {
            res.status(404).json({ message: 'Query not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a query
// @route   DELETE /api/admin/queries/:id
// @access  Private/Admin
const deleteQuery = async (req, res) => {
    try {
        const query = await QueryModel.findById(req.params.id);
        if (query) {
            await query.deleteOne();
            res.json({ message: 'Query removed' });
        } else {
            res.status(404).json({ message: 'Query not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Register a new employee
// @route   POST /api/admin/employees
// @access  Private/Admin
const registerEmployee = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const employeeExists = await Employee.findOne({ email });

        if (employeeExists) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        const employee = await Employee.create({
            name,
            email,
            password,
            role: role || 'employee'
        });

        if (employee) {
            res.status(201).json({
                _id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role
            });
        } else {
            res.status(400).json({ message: 'Invalid employee data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all employees
// @route   GET /api/admin/employees
// @access  Private
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Export queries to Excel
// @route   GET /api/admin/export
// @access  Private
const exportQueries = async (req, res) => {
    try {
        let filter = {};
        if (req.employee.role !== 'admin') {
            filter.assignedTo = req.employee._id;
        }
        const queries = await QueryModel.find(filter).populate('assignedTo', 'name');

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Queries');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 25 },
            { header: 'Name', key: 'userName', width: 20 },
            { header: 'Email', key: 'Email', width: 25 },
            { header: 'Phone', key: 'PhoneNumber', width: 15 },
            { header: 'Message', key: 'Message', width: 30 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Assigned To', key: 'assignedTo', width: 20 },
            { header: 'Date', key: 'createdAt', width: 25 },
        ];

        queries.forEach(query => {
            worksheet.addRow({
                _id: query._id.toString(),
                userName: query.userName,
                Email: query.Email,
                PhoneNumber: query.PhoneNumber,
                Message: query.Message,
                status: query.status,
                assignedTo: query.assignedTo ? query.assignedTo.name : 'Unassigned',
                createdAt: query.createdAt ? query.createdAt.toISOString() : ''
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'queries.xlsx'
        );

        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all converted clients
// @route   GET /api/admin/clients
// @access  Private
const getClients = async (req, res) => {
    try {
        let filter = {};
        if (req.employee.role !== 'admin') {
            filter.assignedTo = req.employee._id;
        }
        const clients = await Client.find(filter).populate('assignedTo', 'name email').sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Export clients to Excel
// @route   GET /api/admin/clients/export
// @access  Private
const exportClients = async (req, res) => {
    try {
        let filter = {};
        if (req.employee.role !== 'admin') {
            filter.assignedTo = req.employee._id;
        }
        const clients = await Client.find(filter).populate('assignedTo', 'name');

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Clients');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 25 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Assigned To', key: 'assignedTo', width: 20 },
            { header: 'Conversion Date', key: 'conversionDate', width: 25 },
        ];

        clients.forEach(client => {
            worksheet.addRow({
                _id: client._id.toString(),
                name: client.name,
                email: client.email,
                phone: client.phone,
                assignedTo: client.assignedTo ? client.assignedTo.name : 'Unassigned',
                conversionDate: client.conversionDate ? client.conversionDate.toISOString() : ''
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'clients.xlsx'
        );

        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginEmployee,
    getQueries,
    assignQuery,
    updateQueryStatus,
    deleteQuery,
    registerEmployee,
    getEmployees,
    exportQueries,
    getClients,
    exportClients
};
