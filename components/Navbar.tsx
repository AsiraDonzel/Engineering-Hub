import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Moon, Sun, Wifi, WifiOff } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme, lowDataMode, toggleLowDataMode } = useApp();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white md:hidden">
          EngiHub
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Low Data Mode Toggle */}
        <button
          onClick={toggleLowDataMode}
          title={lowDataMode ? "Enable High Fidelity" : "Enable Low Data Mode"}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            lowDataMode
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}
        >
          {lowDataMode ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
          <span className="hidden sm:inline">{lowDataMode ? 'Low Data' : 'High Quality'}</span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};
