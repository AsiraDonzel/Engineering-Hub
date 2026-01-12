import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BookOpen, 
  PenTool, 
  FileCheck, 
  Download, 
  Search, 
  Filter,
  PlusCircle,
  Calendar
} from 'lucide-react';

export const AcademicToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pq' | 'siwes' | 'cv'>('pq');
  const [filterOpen, setFilterOpen] = useState(false);

  // --- Integration Handlers ---
  const handleFormSubmit = (type: string) => {
    alert(`${type} submitted successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Toolkit</h1>
          <p className="text-gray-500">Essential resources for your engineering degree.</p>
        </div>
      </div>

      {/* Toolkit Navigation */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => setActiveTab('pq')} className={`pb-3 text-sm font-medium relative ${activeTab === 'pq' ? 'text-nigeria-green' : 'text-gray-500'}`}>
          Past Questions
          {activeTab === 'pq' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
        <button onClick={() => setActiveTab('siwes')} className={`pb-3 text-sm font-medium relative ${activeTab === 'siwes' ? 'text-nigeria-green' : 'text-gray-500'}`}>
          SIWES Logbook
          {activeTab === 'siwes' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
        <button onClick={() => setActiveTab('cv')} className={`pb-3 text-sm font-medium relative ${activeTab === 'cv' ? 'text-nigeria-green' : 'text-gray-500'}`}>
          CV Generator
          {activeTab === 'cv' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
      </div>

      {/* Past Questions Tab */}
      {activeTab === 'pq' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search course code (e.g., CPE301)..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700" 
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" /> {filterOpen ? "Close Filters" : "Filter"}
            </Button>
          </div>

          {filterOpen && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              {/* Example filter options */}
              <p>Filter options would appear here...</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['EEE201', 'CPE312', 'MTH202'].map((course) => (
              <Card key={course} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-nigeria-green font-bold text-xs">
                    {course}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <h4 className="font-semibold text-sm">First Semester Exam 2023</h4>
                <p className="text-xs text-gray-500 mt-1">Uploaded by Admin • 1.4MB</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SIWES Tab */}
      {activeTab === 'siwes' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Daily Log Entry</h3>
                <span className="text-sm text-gray-500">Week 4, Day 3</span>
              </div>
              <textarea 
                className="w-full h-40 p-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-4"
                placeholder="Describe your technical activities for today..."
              />
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleFormSubmit("SIWES Draft")}
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={() => handleFormSubmit("SIWES Entry")}
                >
                  Submit Entry
                </Button>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100">
              <h4 className="text-amber-800 dark:text-amber-400 font-bold text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Progress Tracker
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">12 of 24 weeks completed</p>
              <div className="mt-2 h-2 w-full bg-amber-200 dark:bg-amber-900/50 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-1/2" />
              </div>
            </Card>
            <Button 
              fullWidth 
              variant="outline" 
              className="gap-2"
              onClick={() => alert("Exporting final PDF...")}
            >
              <FileCheck className="h-4 w-4" /> Export Final PDF
            </Button>
          </div>
        </div>
      )}

      {/* CV Generator Tab */}
      {activeTab === 'cv' && (
        <div className="text-center py-12">
          <PenTool className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Engineering CV Templates</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2">Select a template optimized for engineering internships and graduate roles.</p>
          <Button 
            className="mt-6 gap-2"
            onClick={() => alert("Opening CV Template Gallery...")}
          >
            <PlusCircle className="h-4 w-4" /> Create New CV
          </Button>
        </div>
      )}
    </div>
  );
};
