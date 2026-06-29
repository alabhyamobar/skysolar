import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const role = localStorage.getItem('adminRole');

  if (role !== 'admin') {
    return <Navigate to="/admin/queries" />;
  }

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/employees`, getConfig());
      setEmployees(res.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/employees`, formData, getConfig());
      toast.success('Employee added successfully');
      setFormData({ name: '', email: '', password: '', role: 'employee' });
      setShowAddForm(false);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Employees</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-white/10 text-white px-4 py-2 font-bold rounded-lg hover:bg-white/20 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Add Employee'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Employee</h2>
          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-2 rounded-md outline-none focus:border-[#E8A56A] text-white" />
            <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-2 rounded-md outline-none focus:border-[#E8A56A] text-white" />
            <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-2 rounded-md outline-none focus:border-[#E8A56A] text-white" />
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="bg-white/5 border border-white/10 px-4 py-2 rounded-md outline-none focus:border-[#E8A56A] text-white">
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="md:col-span-2 bg-[#E8A56A] text-black font-bold py-2 rounded-md hover:bg-[#f1b983] transition-colors">Create User</button>
          </form>
        </div>
      )}

      <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium">{emp.name}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4 capitalize">{emp.role}</td>
                  <td className="px-6 py-4">{new Date(emp.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployees;
