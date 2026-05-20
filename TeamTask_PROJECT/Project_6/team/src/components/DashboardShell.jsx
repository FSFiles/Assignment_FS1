import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MeshBackground from './MeshBackground';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardShell = ({ activePage, onPageChange, children }) => {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {isDark && <MeshBackground variant="dashboard" />}

      {/* Desktop sidebar — fixed full height */}
      <aside className="hidden md:block fixed top-0 left-0 z-40 h-screen w-[280px]">
        <Sidebar
          activePage={activePage}
          onPageChange={onPageChange}
          isOpen={false}
          onClose={() => {}}
          variant="desktop"
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <Sidebar
        activePage={activePage}
        onPageChange={onPageChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant="mobile"
      />

      {/* Main column */}
      <div className="relative z-10 flex flex-col min-h-screen md:ml-[280px]">
        <Navbar onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 w-full">
          <div className="page-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="page-stack w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
