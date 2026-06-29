const express = require('express');
const router = express.Router();
const {
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
} = require('./admin.controller');
const { protect, adminOnly } = require('../../middleware/auth.middleware');

router.post('/login', loginEmployee);
router.route('/employees')
    .post(protect, adminOnly, registerEmployee)
    .get(protect, getEmployees);

router.get('/export', protect, exportQueries);

router.route('/queries')
    .get(protect, getQueries);

router.route('/queries/:id/assign')
    .put(protect, adminOnly, assignQuery);

router.route('/queries/:id/status')
    .put(protect, updateQueryStatus);

router.route('/queries/:id')
    .delete(protect, adminOnly, deleteQuery);

router.get('/clients/export', protect, exportClients);

router.route('/clients')
    .get(protect, getClients);

module.exports = router;
