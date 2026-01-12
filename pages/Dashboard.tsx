import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { MOCK_STATS } from '../constants';
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  /* ---------- Tasks (unchanged) ---------- */
  const [dashboardTasks, setDashboardTasks] = useState([
    { id: 1, title: 'Submit ENT301 Proposal', done: false, time: '2:00 PM' },
    { id: 2, title: 'Group Meeting (CPE401)', done: true, time: '10:00 AM' },
    { id: 3, title: 'Review Past Questions', done: false, time: '8:00 PM' }
  ]);

  const toggleTask = (id: number) => {
    setDashboardTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  /* ---------- Trend Icons ---------- */
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-nigeria-green" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* =======================
          Header (Integrated)
      ======================= */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Welcome back, {user?.matricNo}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ABUAD Engineering Student Portal
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/productivity')}
          >
            View Schedule
          </Button>
          <Button size="sm" onClick={() => navigate('/code-lab')}>
            New Project
          </Button>
        </div>
      </div>

      {/* =======================
          Quick Stats
      ======================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_STATS.map((stat, index) => {
          const StatIcon = stat.icon || Clock;
          return (
            <Card
              key={stat.label}
              delay={index * 0.1}
              className="flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
                <div className="rounded-full bg-green-50 p-2 dark:bg-green-900/20">
                  <StatIcon className="h-4 w-4 text-nigeria-green" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                {getTrendIcon(stat.trend)}
                <span>{stat.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* =======================
          Main Content
      ======================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Files */}
        <div className="lg:col-span-2 space-y-6">
          <Card delay={0.4}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recent Files
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/file-hub')}
              >
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Circuit_Logic_Lab_0{i}.pdf
                      </p>
                      <p className="text-xs text-gray-500">
                        2.4 MB • Edited 2h ago
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card delay={0.5}>
            <div className="flex items-center gap-3 mb-2 text-nigeria-green">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">AI Assistant Suggestions</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Based on your recent activity, here are some recommended resources:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                onClick={() => navigate('/code-lab')}
                className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800/20 transition-colors"
              >
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Practice: Karnaugh Maps
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Interactive Simulator
                </p>
              </div>

              <div
                onClick={() => navigate('/code-lab')}
                className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800/20 transition-colors"
              >
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Video: Boolean Algebra
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  5 min summary
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tasks */}
        <div className="lg:col-span-1">
          <Card delay={0.6} className="h-full">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Today's Tasks
            </h3>

            <div className="space-y-4">
              {dashboardTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      task.done
                        ? 'bg-nigeria-green border-nigeria-green text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {task.done && (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        task.done
                          ? 'text-gray-400 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
              ))}

              <Button variant="outline" size="sm" fullWidth className="mt-4">
                Add New Task
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
