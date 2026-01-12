import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  User, 
  Mail, 
  Building, 
  GraduationCap, 
  Camera, 
  Shield, 
  Save
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: 'Computer Engineering',
    level: '400',
    university: 'University of Lagos'
  });

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar: Profile Photo & Account Type */}
        <div className="md:col-span-1 space-y-6">
          <Card className="flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-nigeria-green flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                {formData.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white h-6 w-6" />
              </div>
            </div>
            <h2 className="mt-4 font-bold text-lg">{formData.name}</h2>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-nigeria-green bg-green-50 px-2 py-1 rounded-full">
              <Shield className="h-3 w-3" /> {user?.role} Account
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Account Security</h3>
            <Button variant="outline" fullWidth size="sm">Change Password</Button>
            <Button variant="ghost" fullWidth size="sm" className="mt-2 text-red-600">Delete Account</Button>
          </Card>
        </div>

        {/* Main Content: Details Form */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-nigeria-green" /> Personal Information
            </h3>
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full pl-10 p-2.5 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input 
                    type="email" 
                    disabled
                    className="w-full pl-10 p-2.5 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed" 
                    value={formData.email}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-nigeria-green" /> Academic Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium">University</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full pl-10 p-2.5 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Department</label>
                <select 
                  className="w-full p-2.5 rounded-xl border dark:bg-gray-900 dark:border-gray-700 outline-none"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option>Computer Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Level</label>
                <select 
                  className="w-full p-2.5 rounded-xl border dark:bg-gray-900 dark:border-gray-700 outline-none"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                  <option>500</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};