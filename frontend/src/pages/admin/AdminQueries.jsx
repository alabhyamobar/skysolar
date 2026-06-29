import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const role = localStorage.getItem('adminRole');

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const fetchData = async () => {
    try {
      const qRes = await axios.get(`${API_URL}/api/admin/queries`, getConfig());
      setQueries(qRes.data);
      if (role === 'admin') {
        const eRes = await axios.get(`${API_URL}/api/admin/employees`, getConfig());
        setEmployees(eRes.data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/admin/queries/${id}/status`, { status: newStatus }, getConfig());
      toast.success('Status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAssign = async (queryId, employeeId) => {
    try {
      await axios.put(`${API_URL}/api/admin/queries/${queryId}/assign`, { employeeId }, getConfig());
      toast.success('Query assigned');
      fetchData();
    } catch (error) {
      toast.error('Failed to assign query');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/export`, {
        ...getConfig(),
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'queries.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    try {
      await axios.delete(`${API_URL}/api/admin/queries/${id}`, getConfig());
      toast.success('Query deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete query');
    }
  };

  const filteredQueries = queries.filter(q => 
    q.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.PhoneNumber.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Queries Dashboard</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Search queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 md:w-64 bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-[#E8A56A] text-white rounded-lg transition-all"
          />
          <button 
            onClick={handleExport}
            className="bg-[#E8A56A] text-black px-4 py-2 font-bold rounded-lg hover:bg-[#f1b983] transition-colors whitespace-nowrap"
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/[0.05] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Message</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                {role === 'admin' && <th className="px-6 py-4 font-semibold">Assigned To</th>}
                {role === 'admin' && <th className="px-6 py-4 font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredQueries.map((q) => (
                <tr key={q._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">{q.userName}</td>
                  <td className="px-6 py-4">
                    <div>{q.Email}</div>
                    <div className="text-xs text-gray-500">{q.PhoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{q.Message}</td>
                  <td className="px-6 py-4">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={q.status} 
                      onChange={(e) => handleStatusChange(q._id, e.target.value)}
                      className="bg-black/50 border border-white/20 rounded px-2 py-1 outline-none focus:border-[#E8A56A]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Dismissed">Dismissed</option>
                    </select>
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      <select 
                        value={q.assignedTo?._id || ''} 
                        onChange={(e) => handleAssign(q._id, e.target.value)}
                        className="bg-black/50 border border-white/20 rounded px-2 py-1 outline-none focus:border-[#E8A56A]"
                      >
                        <option value="">Unassigned</option>
                        {employees.map(emp => (
                          <option key={emp._id} value={emp._id}>{emp.name}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(q._id)}
                        className="text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-500/10 rounded hover:bg-red-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminQueries;
