import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Megaphone, 
  MessageSquare, 
  Plus, 
  Lock, 
  Globe,
  MoreHorizontal,
  BadgeCheck
} from 'lucide-react';

export const Collaboration: React.FC = () => {
  const { role, postAnnouncement } = useApp(); // ✅ Include admin function
  const [activeTab, setActiveTab] = useState<'groups' | 'announcements'>('groups');
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);

  const announcements = [
    { id: 1, title: 'CPE 401 Lab Manual Updated', author: 'HOD Office', date: '2h ago', important: true },
    { id: 2, title: 'Faculty Seminar: AI in Engineering', author: 'Dr. Ibrahim', date: '1d ago', important: false },
  ];

  const groups = [
    { id: 1, name: 'Thermodynamics Study Group', members: 12, type: 'Public', active: true },
    { id: 2, name: 'Final Year Project - Team A', members: 4, type: 'Private', active: false },
  ];

  // --- Handlers ---
  const toggleJoin = (id: number) => {
    setJoinedGroups(prev => 
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => alert("Create Group Modal Opened");

  const handleAnnouncementOptions = (title: string) => {
    alert(`Announcement Options for "${title}": Copy Link, Report, or Hide`);
  };

  const handlePostAnnouncement = () => {
    const title = prompt("Enter announcement title:");
    const content = prompt("Enter announcement content:");
    if (title && content) {
      postAnnouncement(title, content); // ✅ Calls AppContext admin function
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Collaboration Space</h1>
          <p className="text-gray-500">Connect with peers and stay updated with faculty news.</p>
        </div>
        <div className="flex gap-2">
          {/* Admin: Post Announcement */}
          {role === 'ADMIN' && activeTab === 'announcements' ? (
            <Button className="gap-2" onClick={handlePostAnnouncement}>
              <Megaphone className="h-4 w-4" /> Post Announcement
            </Button>
          ) : (
            <Button className="gap-2" onClick={handleCreateGroup}>
              <Plus className="h-4 w-4" /> Create Group
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => setActiveTab('groups')} 
          className={`pb-4 text-sm font-semibold transition-all relative ${activeTab === 'groups' ? 'text-nigeria-green' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Study Groups
          </div>
          {activeTab === 'groups' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-nigeria-green rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('announcements')} 
          className={`pb-4 text-sm font-semibold transition-all relative ${activeTab === 'announcements' ? 'text-nigeria-green' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" /> Announcements Board
          </div>
          {activeTab === 'announcements' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-nigeria-green rounded-t-full" />}
        </button>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' ? (
        <div className="space-y-4">
          {announcements.map((news) => (
            <Card key={news.id} className={`${news.important ? 'border-l-4 border-l-amber-500' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-full ${news.important ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{news.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-nigeria-green flex items-center gap-1">
                        <BadgeCheck className="h-3 w-3" /> {news.author}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleAnnouncementOptions(news.title)}
                  className="p-1"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <Card key={group.id} className="hover:border-nigeria-green transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:bg-green-50 group-hover:text-nigeria-green transition-colors">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members} members • {group.active ? 'Active now' : 'Idle'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {group.type === 'Private' ? (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 flex items-center gap-1">
                          <Lock className="h-2.5 w-2.5" /> Private
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 flex items-center gap-1">
                          <Globe className="h-2.5 w-2.5" /> Public
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant={joinedGroups.includes(group.id) ? "outline" : "primary"} 
                  onClick={() => toggleJoin(group.id)}
                >
                  {joinedGroups.includes(group.id) ? "Leave" : "Join"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
