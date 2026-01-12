import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileWarning, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Search,
  Settings
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { lowDataMode } = useApp(); // --- Integration: lowDataMode ---
  const [activeTab, setActiveTab] = useState<'moderation' | 'users' | 'reports'>('moderation');

  const pendingResources = [
    { id: '1', name: 'CPE301_Exam_2023.pdf', user: 'Chinedu O.', type: 'Past Question', size: '1.4MB' },
    { id: '2', name: 'Logic_Gates_Lab_Report.docx', user: 'Aisha Y.', type: 'Lab Template', size: '800KB' },
  ];

  // --- Background refresh simulation ---
  useEffect(() => {
    if (lowDataMode) {
      console.log("Low Data Mode active: Background log refresh disabled to save data.");
      return;
    }

    const interval = setInterval(() => {
      // Simulated API call for fetching system logs
      console.log("Refreshing system logs...");
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, [lowDataMode]);

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-nigeria-green/5 p-6 rounded-2xl border border-nigeria-green/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-nigeria-green text-white rounded-xl shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Control Center</h1>
            <p className="text-sm text-nigeria-dark font-medium">System Administrator Access</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" /> System Settings
          </Button>
        </div>
      </div>

      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users className="h-6 w-6" /></div>
          <div><p className="text-xs text-gray-500">Total Students</p><p className="text-xl font-bold">1,248</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><FileWarning className="h-6 w-6" /></div>
          <div><p className="text-xs text-gray-500">Pending Reviews</p><p className="text-xl font-bold">14</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="h-6 w-6" /></div>
          <div><p className="text-xs text-gray-500">Approved Today</p><p className="text-xl font-bold">32</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><BarChart3 className="h-6 w-6" /></div>
          <div><p className="text-xs text-gray-500">Server Status</p><p className="text-xl font-bold">Optimal</p></div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resource Moderation List */}
        <div className="lg:col-span-2">
          <Card noPadding>
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold">Pending Resource Approvals</h3>
              <div className="relative w-48">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search pending..." className="w-full pl-8 p-1.5 text-xs rounded-lg border bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {pendingResources.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">Uploaded by {item.user} • {item.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><XCircle className="h-5 w-5" /></button>
                    <button className="p-2 text-nigeria-green hover:bg-green-50 rounded-lg transition-colors"><CheckCircle className="h-5 w-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Logs / Recent Actions */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-bold mb-4">Audit Log</h3>
            <div className="space-y-4">
              {[
                { action: 'Admin approved PQ', time: '5m ago' },
                { action: 'User Chinedu registered', time: '12m ago' },
                { action: 'System Backup Complete', time: '1h ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{log.action}</span>
                  <span className="text-gray-400">{log.time}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" fullWidth size="sm" className="mt-6">View Full Logs</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
