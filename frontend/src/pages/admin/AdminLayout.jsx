import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('adminRole');
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-[#050914] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${isExpanded ? 'md:w-64' : 'md:w-20'} w-full md:min-h-screen bg-white/5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col relative`}>
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden md:flex absolute -right-3 top-8 bg-[#E8A56A] text-black p-1 rounded-full z-10 hover:bg-[#f0b37d]"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className={`p-4 md:p-6 flex justify-between items-center ${!isExpanded ? 'md:justify-center' : 'md:block'}`}>
          <div className={!isExpanded ? 'md:hidden' : ''}>
            <h2 className="text-xl md:text-2xl font-bold text-[#E8A56A]">SkySolar CRM</h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Role: {role}</p>
          </div>
          {!isExpanded && (
            <div className="hidden md:block">
              <span className="text-xl font-bold text-[#E8A56A]">S</span>
            </div>
          )}
          <button onClick={handleLogout} className="md:hidden p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        <nav className={`px-4 pb-4 md:pb-0 space-y-0 md:space-y-2 flex flex-row md:flex-col gap-2 md:gap-0 overflow-x-auto no-scrollbar ${!isExpanded ? 'md:items-center' : ''}`}>
          <Link to="/admin/queries" className={`flex items-center gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${location.pathname === '/admin/queries' ? 'bg-[#E8A56A] text-black font-bold' : 'hover:bg-white/10'} ${!isExpanded ? 'md:justify-center md:px-0 md:w-12 md:h-12' : ''}`}>
            <LayoutDashboard size={20} className="min-w-[20px]" />
            <span className={!isExpanded ? 'md:hidden' : ''}>Queries</span>
          </Link>
          <Link to="/admin/clients" className={`flex items-center gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${location.pathname === '/admin/clients' ? 'bg-[#E8A56A] text-black font-bold' : 'hover:bg-white/10'} ${!isExpanded ? 'md:justify-center md:px-0 md:w-12 md:h-12' : ''}`}>
            <UserCheck size={20} className="min-w-[20px]" />
            <span className={!isExpanded ? 'md:hidden' : ''}>Clients</span>
          </Link>
          {role === 'admin' && (
            <Link to="/admin/employees" className={`flex items-center gap-3 px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${location.pathname === '/admin/employees' ? 'bg-[#E8A56A] text-black font-bold' : 'hover:bg-white/10'} ${!isExpanded ? 'md:justify-center md:px-0 md:w-12 md:h-12' : ''}`}>
              <Users size={20} className="min-w-[20px]" />
              <span className={!isExpanded ? 'md:hidden' : ''}>Employees</span>
            </Link>
          )}
        </nav>
        
        <div className={`hidden md:flex p-4 border-t border-white/10 mt-auto ${!isExpanded ? 'justify-center' : ''}`}>
          <button onClick={handleLogout} className={`flex items-center justify-center gap-3 w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors ${!isExpanded ? 'md:w-12 md:h-12 md:px-0' : ''}`}>
            <LogOut size={20} className="min-w-[20px]" />
            <span className={!isExpanded ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
