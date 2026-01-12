import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useApp } from '../context/AppContext';
import { LogOut, X, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, user } = useApp();
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2 text-nigeria-green font-bold text-xl">
              <GraduationCap className="h-8 w-8" />
              <span>ABUAD EngiHub</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info (Clickable) */}
          <div 
            onClick={() => {
              navigate('/profile');              
              if (window.innerWidth < 768) onClose();
            }}
            className="px-6 pb-4 cursor-pointer group"
          >
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nigeria-green text-white font-bold">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user?.role} Account
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => { if(window.innerWidth < 768) onClose(); }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-nigeria-green/10 text-nigeria-green'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}

            {/* Admin Link (Only visible to ADMIN users) */}
            {user?.role === 'ADMIN' && (
              <NavLink
                to="/admin"
                onClick={() => { if(window.innerWidth < 768) onClose(); }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-nigeria-green text-white'
                      : 'text-nigeria-green hover:bg-green-50'
                  }`
                }
              >
                <ShieldCheck className="h-5 w-5" />
                Admin Control
              </NavLink>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
