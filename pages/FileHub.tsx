import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { 
  FileUp, 
  FileDown, 
  FileType, 
  Search, 
  MoreVertical, 
  FileText, 
  Download,
  Share2
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';

export const FileHub: React.FC = () => {
  const { lowDataMode, role, postAnnouncement } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'converted' | 'shared'>('all');
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const mockFiles = [
    { id: 1, name: 'CPE401_Lecture_Notes.docx', size: '1.2 MB', type: 'doc', date: 'Oct 24, 2025' },
    { id: 2, name: 'Circuit_Diagram_Lab2.pdf', size: '850 KB', type: 'pdf', date: 'Oct 22, 2025' },
    { id: 3, name: 'SIWES_Report_Draft.pdf', size: '2.1 MB', type: 'pdf', date: 'Oct 20, 2025' },
  ];

  // --- Handlers ---
  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) alert(`Uploading: ${file.name}`);
    };
    input.click();
  };

  const handleDownload = (fileName: string) => alert(`Downloading ${fileName}...`);
  const handleFileOptions = (fileName: string) => alert(`Options for "${fileName}": Rename, Share, Delete`);

  // --- Admin Announcement Handler ---
  const handlePostAnnouncement = () => {
    const title = prompt("Enter announcement title:");
    const content = prompt("Enter announcement content:");
    if (title && content) {
      postAnnouncement(title, content);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">File Hub</h1>
          <p className="text-gray-500">Manage, convert, and share your academic documents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsConvertModalOpen(true)}>
            <FileType className="h-4 w-4" /> Convert
          </Button>
          <Button className="gap-2" onClick={handleUpload}>
            <FileUp className="h-4 w-4" /> Upload
          </Button>

          {/* Admin-only Announcement Button */}
          {role === 'ADMIN' && (
            <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white" onClick={handlePostAnnouncement}>
              <FileUp className="h-4 w-4" /> Post Announcement
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-nigeria-green text-white border-none">
          <p className="text-green-100 text-sm">Storage Used</p>
          <h3 className="text-2xl font-bold">45%</h3>
          <div className="mt-2 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[45%]" />
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <FileDown className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Offline Files</p>
            <p className="font-bold">12 Items</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Shared with me</p>
            <p className="font-bold">8 Files</p>
          </div>
        </Card>
      </div>

      {/* File Explorer */}
      <Card noPadding className="overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {(['all', 'converted', 'shared'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-gray-700 text-nigeria-green shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-nigeria-green"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {mockFiles.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${file.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* --- Integrated Buttons --- */}
                <button 
                  onClick={() => handleDownload(file.name)}
                  className="p-2 text-gray-400 hover:text-nigeria-green transition-colors" 
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleFileOptions(file.name)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                  title="More Options"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Conversion Modal */}
      <Modal 
        isOpen={isConvertModalOpen} 
        onClose={() => setIsConvertModalOpen(false)} 
        title="Document Converter"
      >
        <div className="space-y-4 py-2">
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
            <FileUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Drag your DOCX or PDF here</p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Supported: .docx, .pdf, .txt</span>
            <span>Max: 10MB</span>
          </div>
          <Button fullWidth onClick={() => {
            alert("Conversion started...");
            setIsConvertModalOpen(false);
          }}>Start Conversion</Button>
        </div>
      </Modal>
    </div>
  );
};
