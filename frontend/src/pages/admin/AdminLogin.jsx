import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, { email, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminRole', res.data.role);
      toast.success('Login successful');
      navigate('/admin/queries');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050914] flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">CRM Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#E8A56A] text-white rounded-md transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#E8A56A] text-white rounded-md transition-all"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#E8A56A] text-black py-3 font-bold uppercase tracking-wider rounded-md hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
