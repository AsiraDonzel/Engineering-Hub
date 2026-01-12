import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { generateLabReport } from '../services/aiService'; // AI service
import { exportReportToPDF } from '../services/exportService'; // PDF export service
import { FileText, Sparkles, Download, Loader2 } from 'lucide-react';

export const SmartAssist: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [formData, setFormData] = useState({ title: '', objectives: '', data: '' });

  // --- AI Generation handler ---
  const handleGenerate = async () => {
    if (!formData.title) return;

    setLoading(true);
    try {
      const result = await generateLabReport(
        formData.title,
        formData.objectives,
        formData.data
      );
      setReport(result);
    } catch (err) {
      alert('Error generating report. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  // --- PDF Export handler ---
  const handleExport = () => {
    if (report) {
      exportReportToPDF(formData.title, report);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-nigeria-green/10 rounded-lg">
          <Sparkles className="h-6 w-6 text-nigeria-green" />
        </div>
        <h1 className="text-2xl font-bold dark:text-white">Smart Assist</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <FileText className="h-4 w-4" /> Experiment Details
          </h3>

          <input
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
            placeholder="Experiment Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <textarea
            className="w-full p-2 h-24 rounded border dark:bg-gray-800 dark:border-gray-700"
            placeholder="Objectives"
            value={formData.objectives}
            onChange={(e) =>
              setFormData({ ...formData, objectives: e.target.value })
            }
          />

          <textarea
            className="w-full p-2 h-32 rounded border dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
            placeholder="Enter raw data or observations..."
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
          />

          {/* --- Integrated Button --- */}
          <Button
            fullWidth
            onClick={handleGenerate} // <-- must stay exactly like this
            disabled={loading || !formData.title}
          >
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
        </Card>

        {/* AI Output Area */}
        <Card className="bg-gray-50 dark:bg-gray-900 border-dashed min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-nigeria-green">Generated Report</h3>
            {report && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="border-nigeria-green text-nigeria-green hover:bg-green-50 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" /> Export PDF
              </Button>
            )}
          </div>

          {report ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {report}
              </pre>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Sparkles className="h-12 w-12 mb-2 opacity-20" />
              <p>Your AI-generated theory and discussion will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
