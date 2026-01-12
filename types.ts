export type UserRole = 'ADMIN' | 'STUDENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  matricNo: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
}
