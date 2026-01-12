import { 
  BrainCircuit, 
  FolderOpen, 
  Terminal, 
  BookOpen, 
  Users, 
  Timer, 
  LayoutDashboard,
  ClipboardList,
  Database,
  Activity,
  MessageSquare
} from 'lucide-react';
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Smart Assist', href: '/smart-assist', icon: BrainCircuit },
  { label: 'File Hub', href: '/file-hub', icon: FolderOpen },
  { label: 'Code Lab', href: '/code-lab', icon: Terminal },
  { label: 'Academic Toolkit', href: '/academic', icon: BookOpen },
  { label: 'Collaboration', href: '/collaboration', icon: Users },
  { label: 'Productivity', href: '/productivity', icon: Timer },
];

export const MOCK_STATS = [
  { label: 'Pending Tasks', value: '3', change: '+2 due today', trend: 'neutral', icon: ClipboardList },
  { label: 'Past Questions', value: '128', change: '+5 added this week', trend: 'up', icon: Database },
  { label: 'Lab Hours', value: '12h', change: 'Target: 20h', trend: 'down', icon: Activity },
  { label: 'Group Chats', value: '4', change: '2 active now', trend: 'up', icon: MessageSquare },
];
