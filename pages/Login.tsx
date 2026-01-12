import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

type AuthView = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD';

export const Login: React.FC = () => {
  const { login, signup, resetPassword, lowDataMode } = useApp();

  const [view, setView] = useState<AuthView>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matric, setMatric] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (view === 'LOGIN') {
      login(role, matric, email);
    }

    if (view === 'SIGNUP') {
      signup(matric, email, role);
    }

    if (view === 'FORGOT_PASSWORD') {
      await resetPassword(email);
      alert('Reset link sent to your email!');
      setView('LOGIN');
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 ${
        lowDataMode
          ? 'bg-gray-100'
          : 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-950'
      }`}
    >
      <motion.div
        layout
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
      >
        {/* Header */}
        <div className="bg-nigeria-green p-6 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-white mb-2" />
          <h1 className="text-xl font-bold text-white">EngiHub Portal</h1>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* ================= LOGIN ================= */}
            {view === 'LOGIN' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold dark:text-white">
                  Welcome Back
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    ABUAD Matric Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 p-2.5 rounded-xl border dark:bg-gray-900"
                      placeholder="19/ENG02/XXX"
                      value={matric}
                      onChange={(e) => setMatric(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 p-2.5 rounded-xl border dark:bg-gray-900"
                      placeholder="student@abuad.edu.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <button
                      type="button"
                      onClick={() => setView('FORGOT_PASSWORD')}
                      className="text-xs text-nigeria-green hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      className="w-full pl-10 p-2.5 rounded-xl border dark:bg-gray-900"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button fullWidth type="submit">
                  Sign In
                </Button>

                <p className="text-center text-sm text-gray-500">
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => setView('SIGNUP')}
                    className="text-nigeria-green font-bold"
                  >
                    Create Account
                  </button>
                </p>
              </motion.form>
            )}

            {/* ================= SIGNUP ================= */}
            {view === 'SIGNUP' && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold dark:text-white">
                  Join ABUAD EngiHub
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    ABUAD Matric Number
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2.5 rounded-xl border dark:bg-gray-900"
                    placeholder="19/ENG02/XXX"
                    value={matric}
                    onChange={(e) => setMatric(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    University Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-2.5 rounded-xl border dark:bg-gray-900"
                    placeholder="name@abuad.edu.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('STUDENT')}
                    className={`p-2 rounded-lg border text-sm ${
                      role === 'STUDENT'
                        ? 'border-nigeria-green bg-green-50'
                        : ''
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('ADMIN')}
                    className={`p-2 rounded-lg border text-sm ${
                      role === 'ADMIN'
                        ? 'border-nigeria-green bg-green-50'
                        : ''
                    }`}
                  >
                    Admin
                  </button>
                </div>

                <Button fullWidth type="submit">
                  Create Account
                </Button>

                <button
                  type="button"
                  onClick={() => setView('LOGIN')}
                  className="flex items-center justify-center w-full gap-2 text-sm text-gray-500"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Login
                </button>
              </motion.form>
            )}

            {/* ================= FORGOT ================= */}
            {view === 'FORGOT_PASSWORD' && (
              <motion.form
                key="forgot"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold dark:text-white">
                  Reset Password
                </h2>
                <input
                  type="email"
                  required
                  className="w-full p-2.5 rounded-xl border dark:bg-gray-900"
                  placeholder="email@abuad.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button fullWidth type="submit">
                  Send Reset Link
                </Button>
                <button
                  type="button"
                  onClick={() => setView('LOGIN')}
                  className="w-full text-sm text-gray-500"
                >
                  Cancel
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
