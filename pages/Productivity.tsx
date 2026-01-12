import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Plus, 
  Trash2, 
  Clock 
} from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const Productivity: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Complete CPE401 Lab Report', completed: false, priority: 'high' },
    { id: 2, text: 'Submit SIWES Logbook (Week 4)', completed: true, priority: 'medium' },
  ]);

  const [activeView, setActiveView] = useState<'tasks' | 'planner'>('tasks');

  // --- Pomodoro Timer ---
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    if (timeLeft === 0 && timerActive) {
      alert("Pomodoro Completed!");
      setTimerActive(false);
      setTimeLeft(1500);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    if (!timerActive) alert("Pomodoro Timer Started!");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Task Logic ---
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: 'medium',
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setIsTaskModalOpen(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Productivity Center</h1>
            <p className="text-gray-500">Stay organized and track your academic progress.</p>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setActiveView('tasks')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === 'tasks' ? 'bg-white dark:bg-gray-700 text-nigeria-green shadow-sm' : 'text-gray-500'}`}
            >
              Tasks
            </button>
            <button 
              onClick={() => setActiveView('planner')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === 'planner' ? 'bg-white dark:bg-gray-700 text-nigeria-green shadow-sm' : 'text-gray-500'}`}
            >
              Course Planner
            </button>
          </div>
        </div>

        {activeView === 'tasks' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Task List */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text" 
                    placeholder="Add a new task..." 
                    className="flex-1 p-2 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:ring-1 focus:ring-nigeria-green outline-none"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                  />
                  {/* --- Integrated Add Task Button --- */}
                  <Button onClick={() => setIsTaskModalOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Task
                  </Button>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleTask(task.id)} className="text-nigeria-green">
                          {task.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5 text-gray-300" />}
                        </button>
                        <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                          {task.text}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pomodoro Timer */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-green-600 to-nigeria-dark text-white border-none">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-green-200" />
                  <h3 className="font-bold">Focus Timer</h3>
                </div>
                <div className="text-4xl font-mono font-bold text-center py-4">{formatTime(timeLeft)}</div>
                <Button onClick={toggleTimer} fullWidth className="bg-white text-nigeria-green hover:bg-green-50 mt-2">
                  {timerActive ? "Pause Timer" : "Start Pomodoro"}
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          // --- Course Planner ---
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['CPE401', 'CPE403', 'EEE405', 'GNS401'].map(course => (
                <Card key={course} className="flex flex-col justify-between border-t-4 border-t-nigeria-green">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-nigeria-green bg-green-50 px-2 py-0.5 rounded">{course}</span>
                      <span className="text-xs text-gray-500">3 Units</span>
                    </div>
                    <h4 className="font-semibold text-sm">Computer Architecture II</h4>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Tue, Thu</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 10 AM</span>
                    </div>
                  </div>
                </Card>
              ))}
              <button 
                onClick={() => alert("Opening Course Registration Form...")}
                className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-nigeria-green hover:text-nigeria-green transition-all"
              >
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Add Course</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Task Modal --- */}
      <Modal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        title="Add New Task"
      >
        <div className="space-y-4">
          <input 
            autoFocus
            className="w-full p-3 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Save Task</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
