import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Terminal, 
  Cpu, 
  CircuitBoard, 
  Github, 
  Play, 
  Code2,
  BookOpen
} from 'lucide-react';

export const CodeLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'editor' | 'sim' | 'docs'>('editor');
  const [isGitHubLinked, setIsGitHubLinked] = useState(false);

  // --- Integration Handler ---
  const handleLinkGithub = () => {
    if (!isGitHubLinked) {
      alert("Redirecting to GitHub OAuth...");
      setTimeout(() => setIsGitHubLinked(true), 1500); // simulate linking
    } else {
      alert("GitHub account already linked!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Code Lab</h1>
          <p className="text-gray-500">Engineering workspace for programming and circuit logic.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isGitHubLinked ? "secondary" : "outline"}
            className="gap-2"
            onClick={handleLinkGithub}
          >
            <Github className="h-4 w-4 mr-2" /> 
            {isGitHubLinked ? "Profile Linked" : "Link Profile"}
          </Button>
        </div>
      </div>

      {/* Lab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => setActiveTool('editor')}
          className={`pb-3 text-sm font-medium transition-colors relative ${activeTool === 'editor' ? 'text-nigeria-green' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-2 px-2">
            <Code2 className="h-4 w-4" /> Code Editor
          </div>
          {activeTool === 'editor' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
        <button 
          onClick={() => setActiveTool('sim')}
          className={`pb-3 text-sm font-medium transition-colors relative ${activeTool === 'sim' ? 'text-nigeria-green' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-2 px-2">
            <CircuitBoard className="h-4 w-4" /> Logic Simulator
          </div>
          {activeTool === 'sim' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
        <button 
          onClick={() => setActiveTool('docs')}
          className={`pb-3 text-sm font-medium transition-colors relative ${activeTool === 'docs' ? 'text-nigeria-green' : 'text-gray-500'}`}
        >
          <div className="flex items-center gap-2 px-2">
            <Cpu className="h-4 w-4" /> Microcontrollers
          </div>
          {activeTool === 'docs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nigeria-green" />}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Workspace */}
        <div className="lg:col-span-3">
          {activeTool === 'editor' && (
            <Card noPadding className="h-[500px] flex flex-col bg-[#1e1e1e] border-none overflow-hidden">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">main.py</span>
                <Button size="sm" className="h-7 gap-1 bg-green-600 hover:bg-green-700">
                  <Play className="h-3 w-3" /> Run
                </Button>
              </div>
              <div className="flex-1 p-4 font-mono text-sm text-gray-300">
                <p><span className="text-blue-400">def</span> <span className="text-yellow-400">calculate_resistance</span>(v, i):</p>
                <p className="pl-4 text-gray-500"># Basic Ohms Law implementation</p>
                <p className="pl-4"><span className="text-purple-400">return</span> v / i</p>
                <p className="mt-4">print(calculate_resistance(<span className="text-orange-400">12</span>, <span className="text-orange-400">2</span>))</p>
              </div>
            </Card>
          )}

          {activeTool === 'sim' && (
            <Card className="h-[500px] flex items-center justify-center border-dashed border-2">
              <div className="text-center">
                <CircuitBoard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Drag and drop logic gates to begin simulation</p>
                <p className="text-xs text-gray-400 mt-2">(Interactive Canvas coming in Phase 3)</p>
              </div>
            </Card>
          )}

          {activeTool === 'docs' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {['Arduino Uno', '8051 Microcontroller', 'PIC16F877A'].map((mcu) => (
                  <Card key={mcu} className="hover:border-nigeria-green cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{mcu}</h3>
                        <p className="text-sm text-gray-500">Architecture & Pinout guides</p>
                      </div>
                      <BookOpen className="h-5 w-5 text-nigeria-green" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Snippets & Resources */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Examples</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Blink LED (Arduino)
              </button>
              <button className="w-full text-left p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                7-Segment Display
              </button>
              <button className="w-full text-left p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                UART Communication
              </button>
            </div>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-bold">Pro Tip</span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Use the basic editor for drafting logic. It doesn't use server data for execution!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
