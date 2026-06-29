import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const role = localStorage.getItem('adminRole');

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/clients`, getConfig());
      setClients(res.data);
    } catch (error) {
      toast.error('Failed to fetch clients');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/clients/export`, {
        ...getConfig(),
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Converted Clients</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Search clients..."
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
                <th className="px-6 py-4 font-semibold">Conversion Date</th>
                {role === 'admin' && <th className="px-6 py-4 font-semibold">Assigned To</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((c) => (
                <tr key={c._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">
                    <div>{c.email}</div>
                    <div className="text-xs text-gray-500">{c.phone}</div>
                  </td>
                  <td className="px-6 py-4">{new Date(c.conversionDate).toLocaleDateString()}</td>
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      {c.assignedTo ? c.assignedTo.name : 'Unassigned'}
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

export default AdminClients;
