'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Social Media Icons Component
const SocialIcon = ({ platform, className = "w-5 h-5" }) => {
  const icons = {
    instagram: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    tiktok: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    linkedin: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    threads: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.63 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.748-1.757-.513-.585-1.308-.883-2.359-.883-1.328 0-2.653.514-3.618 1.405l-1.406-1.437c1.321-1.224 3.082-1.85 5.089-1.81 1.973.006 3.4.523 4.18 1.5.847.956 1.258 2.41 1.224 4.327v.252c1.296.283 2.323.813 3.05 1.572.87.909 1.396 2.109 1.571 3.57.318 2.656-.293 5.498-2.757 7.618C17.693 23.154 15.297 23.997 12.18 24h.006zm2.53-12.67c-.878 0-1.729.35-2.401.987-.589.558-.91 1.297-.878 2.023.027.912.401 1.662.959 2.09.492.379 1.156.563 1.92.529 1.063-.058 1.901-.46 2.496-1.197.653-.81.993-2.02 1.012-3.604a9.935 9.935 0 0 0-3.108-.828z"/>
      </svg>
    ),
    facebook: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  };
  
  return icons[platform] || (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
};

// Main App Component
export default function UncutTracker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeBusiness, setActiveBusiness] = useState('uncut');
  const [viewMode, setViewMode] = useState('daily');
  const [dailyData, setDailyData] = useState({
    content: {
      'ig-reel': 0, 'ig-story': 0, 'ig-carousel': 0,
      'tiktok-story': 0, 'tiktok-reel': 0, 'tiktok-carousel': 0,
      'linkedin-post': 0, 'threads-post': 0
    },
    outreach: [],
    inbound: [],
    wellness: { mind: false, gym: false, quran: false, meditation: false, visualization: false, career: false },
    notes: { mind: '', gym: '', career: '', daily: '' }
  });
  const [targets, setTargets] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [showTargetsModal, setShowTargetsModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const supabase = createClientComponentClient();

  const businesses = [
    { id: 'uncut', name: 'UNCUT' },
    { id: 'habil', name: 'Habil KJ' },
    { id: 'onera', name: 'Onera' },
    { id: 'sylva', name: 'Sylva' },
    { id: 'wolv', name: 'Wolv' },
    { id: 'fsu', name: 'FSU' }
  ];

  const contentTypes = [
    { id: 'ig-reel', name: 'Instagram Reels', platform: 'instagram' },
    { id: 'ig-story', name: 'Instagram Stories', platform: 'instagram' },
    { id: 'ig-carousel', name: 'Instagram Carousels', platform: 'instagram' },
    { id: 'tiktok-story', name: 'TikTok Stories', platform: 'tiktok' },
    { id: 'tiktok-reel', name: 'TikTok Reels', platform: 'tiktok' },
    { id: 'tiktok-carousel', name: 'TikTok Carousels', platform: 'tiktok' },
    { id: 'linkedin-post', name: 'LinkedIn Posts', platform: 'linkedin' },
    { id: 'threads-post', name: 'Threads Posts', platform: 'threads' }
  ];

  // Initialize user and load data
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (user) {
        setUser(user);
        loadData();
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    if (viewMode === 'daily') {
      await loadDailyData();
      await loadTargets();
    } else {
      await loadMonthlyData();
    }
  };

  const loadDailyData = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_data')
        .select('*')
        .eq('date', currentDate)
        .eq('business', activeBusiness)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setDailyData(data);
      } else {
        setDailyData({
          content: {
            'ig-reel': 0, 'ig-story': 0, 'ig-carousel': 0,
            'tiktok-story': 0, 'tiktok-reel': 0, 'tiktok-carousel': 0,
            'linkedin-post': 0, 'threads-post': 0
          },
          outreach: [],
          inbound: [],
          wellness: { mind: false, gym: false, quran: false, meditation: false, visualization: false, career: false },
          notes: { mind: '', gym: '', career: '', daily: '' }
        });
      }
    } catch (error) {
      console.error('Error loading daily data:', error);
    }
  };

  const loadTargets = async () => {
    try {
      const { data, error } = await supabase
        .from('targets')
        .select('*')
        .eq('business', activeBusiness)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setTargets(prev => ({
          ...prev,
          [activeBusiness]: data.targets
        }));
      }
    } catch (error) {
      console.error('Error loading targets:', error);
    }
  };

  const loadMonthlyData = async () => {
    try {
      const currentMonth = currentDate.substring(0, 7);
      const startDate = `${currentMonth}-01`;
      const endDate = `${currentMonth}-31`;

      const { data, error } = await supabase
        .from('daily_data')
        .select('*')
        .eq('business', activeBusiness)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) throw error;
      setMonthlyData(data || []);
    } catch (error) {
      console.error('Error loading monthly data:', error);
    }
  };

  const saveDailyData = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('daily_data')
        .upsert({
          user_id: user.id,
          date: currentDate,
          business: activeBusiness,
          content: dailyData.content,
          outreach: dailyData.outreach,
          inbound: dailyData.inbound,
          wellness: dailyData.wellness,
          notes: dailyData.notes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,date,business'
        });

      if (error) throw error;
      
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Error saving daily data:', error);
      setSaveStatus('Error saving');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  }, [user, currentDate, activeBusiness, dailyData, supabase]);

  // Auto-save effect
  useEffect(() => {
    if (user && viewMode === 'daily') {
      const timer = setTimeout(saveDailyData, 2000);
      return () => clearTimeout(timer);
    }
  }, [dailyData, saveDailyData, viewMode, user]);

  // Load data when dependencies change
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, currentDate, activeBusiness, viewMode]);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateContentCount = (contentType) => {
    setDailyData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [contentType]: (prev.content?.[contentType] || 0) + 1
      }
    }));
  };

  const setContentCount = (contentType, count) => {
    setDailyData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [contentType]: Math.max(0, parseInt(count) || 0)
      }
    }));
  };

  const toggleWellness = (type) => {
    setDailyData(prev => ({
      ...prev,
      wellness: {
        ...prev.wellness,
        [type]: !prev.wellness[type]
      }
    }));
  };

  const updateNotes = (type, value) => {
    setDailyData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [type]: value
      }
    }));
  };

  const addOutreach = (data) => {
    setDailyData(prev => ({
      ...prev,
      outreach: [...prev.outreach, { ...data, id: Date.now() }]
    }));
  };

  const removeOutreach = (id) => {
    setDailyData(prev => ({
      ...prev,
      outreach: prev.outreach.filter(item => item.id !== id)
    }));
  };

  const addInbound = (data) => {
    setDailyData(prev => ({
      ...prev,
      inbound: [...prev.inbound, { ...data, id: Date.now() }]
    }));
  };

  const removeInbound = (id) => {
    setDailyData(prev => ({
      ...prev,
      inbound: prev.inbound.filter(item => item.id !== id)
    }));
  };

  const getTotalContent = () => {
    return Object.values(dailyData.content || {}).reduce((sum, count) => sum + (count || 0), 0);
  };

  const getWellnessScore = () => {
    const total = Object.keys(dailyData.wellness || {}).length;
    const completed = Object.values(dailyData.wellness || {}).filter(Boolean).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getProgressPercentage = () => {
    const content = getTotalContent();
    const contacts = (dailyData.outreach?.length || 0) + (dailyData.inbound?.length || 0);
    const wellness = getWellnessScore();
    return Math.min(100, (content * 12) + (contacts * 8) + (wellness * 0.6));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading UNCUT...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSignIn={signIn} onSignUp={signUp} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 
              className="text-4xl font-black bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '900', letterSpacing: '-0.02em' }}
            >
              UNCUT
            </h1>
            <button
              onClick={signOut}
              className="text-gray-500 hover:text-gray-700 p-2"
              title="Sign Out"
            >
              🚪
            </button>
          </div>
          <p className="text-gray-600">Raw. Unfiltered. Consistent.</p>
          <div className="mt-2 text-sm text-gray-500">Welcome, {user.email}</div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setViewMode('daily')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'daily' ? 'bg-white text-teal-500 shadow-lg' : 'text-gray-600'
            }`}
          >
            📅 Daily
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'monthly' ? 'bg-white text-teal-500 shadow-lg' : 'text-gray-600'
            }`}
          >
            📊 Monthly
          </button>
        </div>

        {viewMode === 'daily' ? (
          <DailyView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            activeBusiness={activeBusiness}
            setActiveBusiness={setActiveBusiness}
            businesses={businesses}
            contentTypes={contentTypes}
            dailyData={dailyData}
            targets={targets}
            setTargets={setTargets}
            updateContentCount={updateContentCount}
            setContentCount={setContentCount}
            toggleWellness={toggleWellness}
            updateNotes={updateNotes}
            addOutreach={addOutreach}
            removeOutreach={removeOutreach}
            addInbound={addInbound}
            removeInbound={removeInbound}
            getTotalContent={getTotalContent}
            getWellnessScore={getWellnessScore}
            getProgressPercentage={getProgressPercentage}
            showTargetsModal={showTargetsModal}
            setShowTargetsModal={setShowTargetsModal}
            user={user}
            supabase={supabase}
          />
        ) : (
          <MonthlyView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            activeBusiness={activeBusiness}
            setActiveBusiness={setActiveBusiness}
            businesses={businesses}
            monthlyData={monthlyData}
          />
        )}

        {/* Save Status */}
        {saveStatus && (
          <div className="fixed top-6 right-6 bg-teal-500 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-xl z-50">
            {saveStatus}
          </div>
        )}
      </div>
    </div>
  );
}

// Login Component
const LoginPage = ({ onSignIn, onSignUp }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await onSignIn(formData.email, formData.password);
      } else {
        await onSignUp(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-black bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-2"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '900', letterSpacing: '-0.02em' }}
          >
            UNCUT
          </h1>
          <p className="text-gray-600">Raw. Unfiltered. Consistent.</p>
        </div>

        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isLogin ? 'bg-white text-teal-500 shadow-lg' : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              !isLogin ? 'bg-white text-teal-500 shadow-lg' : 'text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-teal-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Daily View Component with all features
const DailyView = ({ 
  currentDate, setCurrentDate, activeBusiness, setActiveBusiness, businesses, contentTypes,
  dailyData, targets, setTargets, updateContentCount, setContentCount, toggleWellness,
  updateNotes, addOutreach, removeOutreach, addInbound, removeInbound, getTotalContent,
  getWellnessScore, getProgressPercentage, showTargetsModal, setShowTargetsModal, user, supabase
}) => {
  
  const saveTargets = async (businessTargets) => {
    try {
      const { error } = await supabase
        .from('targets')
        .upsert({
          user_id: user.id,
          business: activeBusiness,
          targets: businessTargets,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,business'
        });

      if (error) throw error;

      setTargets(prev => ({
        ...prev,
        [activeBusiness]: businessTargets
      }));
    } catch (error) {
      console.error('Error saving targets:', error);
    }
  };

  return (
    <>
      {/* Date Card */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="bg-gray-100 border-0 text-black px-4 py-3 rounded-xl font-medium flex-1 max-w-48"
          />
          <div className="bg-teal-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm">
            {new Date(currentDate).toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
        </div>
        
        <div className="mt-5">
          <div className="bg-gray-100 h-3 rounded-full mb-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center font-medium mb-2">
            {Math.round(getProgressPercentage())}% Complete
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-teal-500 mb-1">{getTotalContent()}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Content</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-teal-500 mb-1">
            {(dailyData.outreach?.length || 0) + (dailyData.inbound?.length || 0)}
          </div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Contacts</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-teal-500 mb-1">{getWellnessScore()}%</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Wellness</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-teal-500 mb-1">1</div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Streak</div>
        </div>
      </div>

      {/* Content Creation Section */}
      <div className="bg-white rounded-2xl p-7 mb-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl">📱</span>
          <h2 
            className="text-xl font-bold"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
          >
            Content Creation
          </h2>
        </div>

        <div className="mb-6">
          <button 
            onClick={() => setShowTargetsModal(true)}
            className="w-full bg-teal-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors"
          >
            ⚡ Set Weekly Targets
          </button>
        </div>

        {/* Business Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl flex-wrap">
          {businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => setActiveBusiness(business.id)}
              className={`flex-1 min-w-20 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeBusiness === business.id
                  ? 'bg-white text-teal-500 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {business.name}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {contentTypes.map((type) => {
            const currentTarget = targets[activeBusiness]?.[type.id] || 0;
            const currentCount = dailyData.content?.[type.id] || 0;
            const progress = currentTarget > 0 ? (currentCount / currentTarget) * 100 : 0;
            
            return (
              <div
                key={type.id}
                className={`bg-gray-50 p-5 rounded-xl text-center transition-all ${
                  progress >= 100 ? 'border-2 border-teal-500 bg-teal-50' : ''
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SocialIcon platform={type.platform} className="w-5 h-5 text-teal-500" />
                  <h4 className="text-sm font-semibold">{type.name}</h4>
                </div>
                
                <div
                  onClick={() => updateContentCount(type.id)}
                  className="text-4xl font-bold text-teal-500 mb-2 cursor-pointer hover:scale-110 transition-transform active:scale-95"
                  style={{ userSelect: 'none' }}
                >
                  {currentCount}
                </div>

                <input
                  type="number"
                  min="0"
                  value={currentCount}
                  onChange={(e) => setContentCount(type.id, e.target.value)}
                  className="w-16 text-center text-sm bg-white border border-gray-300 rounded px-2 py-1 mb-2 mx-auto block"
                />

                <div className="text-xs text-gray-600 mb-2">of {currentTarget} weekly</div>
                <div className="w-full h-1 bg-gray-300 rounded-full">
                  <div 
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Tracking */}
        <ContactTracking
          dailyData={dailyData}
          addOutreach={addOutreach}
          removeOutreach={removeOutreach}
          addInbound={addInbound}
          removeInbound={removeInbound}
          user={user}
          supabase={supabase}
        />
      </div>

      {/* Content Ideas */}
      <ContentIdeas dailyData={dailyData} updateNotes={updateNotes} />

      {/* Wellness */}
      <WellnessSection
        dailyData={dailyData}
        toggleWellness={toggleWellness}
        updateNotes={updateNotes}
      />

      {/* Daily Reflection */}
      <div className="bg-white rounded-2xl p-7 mb-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xl">📝</span>
          <h2 
            className="text-lg font-bold"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
          >
            Daily Reflection
          </h2>
        </div>
        <textarea
          value={dailyData.notes?.daily || ''}
          onChange={(e) => updateNotes('daily', e.target.value)}
          placeholder="What moved the needle today? What didn't? Tomorrow's priority?"
          className="w-full bg-white border border-gray-300 p-4 rounded-xl resize-vertical min-h-32 font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
        />
      </div>

      {/* Targets Modal */}
      {showTargetsModal && (
        <TargetsModal
          contentTypes={contentTypes}
          targets={targets}
          activeBusiness={activeBusiness}
          onClose={() => setShowTargetsModal(false)}
          onSave={saveTargets}
        />
      )}
    </>
  );
};

// Contact Tracking Component
const ContactTracking = ({ dailyData, addOutreach, removeOutreach, addInbound, removeInbound, user, supabase }) => {
  const [activeTab, setActiveTab] = useState('outbound');
  const [formData, setFormData] = useState({
    name: '', email: '', handle: '', platform: 'instagram',
    observation: '', followupDate: '', screenshotUrl: '',
    calendlyBooked: false, bookingDateTime: '', comment: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('screenshots')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, screenshotUrl: publicUrl }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Please enter a contact name');
      return;
    }

    const newContact = { ...formData };
    
    if (activeTab === 'outbound') {
      addOutreach(newContact);
    } else {
      addInbound(newContact);
    }
    
    setFormData({
      name: '', email: '', handle: '', platform: 'instagram',
      observation: '', followupDate: '', screenshotUrl: '',
      calendlyBooked: false, bookingDateTime: '', comment: ''
    });
  };

  const currentData = activeTab === 'outbound' ? (dailyData.outreach || []) : (dailyData.inbound || []);
  const removeFunction = activeTab === 'outbound' ? removeOutreach : removeInbound;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">💬</span>
        <h3 
          className="text-lg font-bold"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
        >
          Contact Tracking
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 bg-gray-100 rounded-xl">
        <button
          onClick={() => setActiveTab('outbound')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'outbound'
              ? 'bg-white text-teal-500 shadow-lg'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📤 Outbound ({(dailyData.outreach || []).length})
        </button>
        <button
          onClick={() => setActiveTab('inbound')}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'inbound'
              ? 'bg-white text-teal-500 shadow-lg'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📥 Inbound ({(dailyData.inbound || []).length})
        </button>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-5 rounded-xl mb-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Contact Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              className="bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              className="bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="@handle"
              value={formData.handle}
              onChange={(e) => setFormData(prev => ({...prev, handle: e.target.value}))}
              className="bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
            <select
              value={formData.platform}
              onChange={(e) => setFormData(prev => ({...prev, platform: e.target.value}))}
              className="bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="threads">Threads</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <textarea
            placeholder={activeTab === 'outbound' ? "What did you say/send?" : "What did they say/send?"}
            value={formData.observation}
            onChange={(e) => setFormData(prev => ({...prev, observation: e.target.value}))}
            className="w-full bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            rows="2"
          />

          <textarea
            placeholder="Follow-up notes"
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({...prev, comment: e.target.value}))}
            className="w-full bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            rows="2"
          />

          {/* Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Screenshot Upload</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors">
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                  <span className="ml-2 text-sm text-gray-600">Uploading...</span>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label htmlFor="screenshot-upload" className="cursor-pointer">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm text-gray-600">Click to upload screenshot</p>
                  </label>
                </>
              )}
              {formData.screenshotUrl && (
                <div className="mt-3">
                  <img 
                    src={formData.screenshotUrl} 
                    alt="Preview" 
                    className="max-w-full h-20 object-cover rounded-lg mx-auto border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={formData.followupDate}
              onChange={(e) => setFormData(prev => ({...prev, followupDate: e.target.value}))}
              className="bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
            <label className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-3.5 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={formData.calendlyBooked}
                onChange={(e) => setFormData(prev => ({...prev, calendlyBooked: e.target.checked}))}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm font-medium">Calendly Booked</span>
            </label>
          </div>

          {formData.calendlyBooked && (
            <input
              type="datetime-local"
              value={formData.bookingDateTime}
              onChange={(e) => setFormData(prev => ({...prev, bookingDateTime: e.target.value}))}
              className="w-full bg-white border border-gray-300 px-4 py-3.5 rounded-xl font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors"
          >
            Add {activeTab === 'outbound' ? 'Outbound' : 'Inbound'} Contact
          </button>
        </div>
      </div>

      {/* Contact List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {currentData.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <SocialIcon platform={item.platform} className="w-4 h-4 text-teal-500" />
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
                  {item.email && <span>📧 {item.email}</span>}
                  {item.handle && <span>@{item.handle}</span>}
                  {item.calendlyBooked && <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs">📅 Booked</span>}
                </div>
              </div>
              <button
                onClick={() => removeFunction(item.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            {item.observation && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 mb-1">Message:</div>
                <div className="text-sm">{item.observation}</div>
              </div>
            )}

            {item.comment && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 mb-1">Notes:</div>
                <div className="text-sm">{item.comment}</div>
              </div>
            )}

            <div className="flex gap-4 text-xs text-gray-600 items-center flex-wrap">
              {item.followupDate && <div>📅 Follow-up: {new Date(item.followupDate).toLocaleDateString()}</div>}
              {item.screenshotUrl && (
                <a href={item.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600">
                  📷 View Screenshot
                </a>
              )}
            </div>
          </div>
        ))}
        
        {currentData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">{activeTab === 'outbound' ? '📤' : '📥'}</div>
            <p>No {activeTab} contacts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Content Ideas Component
const ContentIdeas = ({ dailyData, updateNotes }) => {
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: 'instagram' },
    { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
    { id: 'threads', name: 'Threads', icon: 'threads' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook' }
  ];

  return (
    <div className="bg-white rounded-2xl p-7 mb-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl">💡</span>
        <h2 
          className="text-xl font-bold"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
        >
          Content Ideas
        </h2>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <SocialIcon platform={platform.icon} className="w-5 h-5 text-teal-500" />
              <span className="font-semibold text-gray-700">{platform.name}</span>
            </div>
            <textarea
              value={dailyData.notes?.[`ideas_${platform.id}`] || ''}
              onChange={(e) => updateNotes(`ideas_${platform.id}`, e.target.value)}
              placeholder={`Your ${platform.name} content ideas...`}
              className="w-full bg-white border border-gray-300 p-3 rounded-lg resize-vertical min-h-20 font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Wellness Component
const WellnessSection = ({ dailyData, toggleWellness, updateNotes }) => {
  return (
    <div className="bg-white rounded-2xl p-7 mb-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl">🧘‍♀️</span>
        <h2 
          className="text-xl font-bold"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
        >
          Wellness Check
        </h2>
      </div>

      <div className="space-y-4">
        {[
          { id: 'mind', label: 'Mind Work', time: '60 minutes' },
          { id: 'gym', label: 'Body', time: 'Gym session' },
          { id: 'career', label: 'Career Work', time: '90 minutes' }
        ].map((item) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div 
                onClick={() => toggleWellness(item.id)}
                className={`w-6 h-6 border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${
                  dailyData.wellness?.[item.id] 
                    ? 'bg-teal-500 border-teal-500 text-white' 
                    : 'border-gray-400 bg-white hover:border-teal-500'
                }`}
              >
                {dailyData.wellness?.[item.id] && <span className="text-sm font-bold">✓</span>}
              </div>
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-xs text-gray-600">{item.time}</div>
              </div>
            </div>
            <textarea
              value={dailyData.notes?.[item.id] || ''}
              onChange={(e) => updateNotes(item.id, e.target.value)}
              placeholder={`${item.label} notes...`}
              className="w-full bg-white border border-gray-300 p-3 rounded-lg resize-vertical min-h-16 font-medium transition-all focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
            />
          </div>
        ))}

        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="mb-4">
            <div className="font-semibold">Stillness</div>
            <div className="text-xs text-gray-600">45 minutes</div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['quran', 'meditation', 'visualization'].map((item) => (
              <div 
                key={item}
                onClick={() => toggleWellness(item)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-5 h-5 border-2 rounded cursor-pointer transition-all flex items-center justify-center ${
                  dailyData.wellness?.[item] 
                    ? 'bg-teal-500 border-teal-500 text-white' 
                    : 'border-gray-400 bg-white hover:border-teal-500'
                }`}>
                  {dailyData.wellness?.[item] && <span className="text-xs font-bold">✓</span>}
                </div>
                <span className="text-sm font-medium capitalize">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Monthly View Component
const MonthlyView = ({ currentDate, setCurrentDate, activeBusiness, setActiveBusiness, businesses, monthlyData }) => {
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() - 1);
            setCurrentDate(date.toISOString().split('T')[0]);
          }}
          className="p-2 text-gray-600 hover:text-teal-500 transition-colors"
        >
          ←
        </button>
        <h2 
          className="text-xl font-bold text-center"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
        >
          {getMonthName(currentDate)}
        </h2>
        <button
          onClick={() => {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() + 1);
            setCurrentDate(date.toISOString().split('T')[0]);
          }}
          className="p-2 text-gray-600 hover:text-teal-500 transition-colors"
        >
          →
        </button>
      </div>

      {/* Business Tabs */}
      <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-xl flex-wrap">
        {businesses.map((business) => (
          <button
            key={business.id}
            onClick={() => setActiveBusiness(business.id)}
            className={`flex-1 min-w-20 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeBusiness === business.id
                ? 'bg-white text-teal-500 shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {business.name}
          </button>
        ))}
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-500">
            {monthlyData.reduce((total, entry) => {
              return total + Object.values(entry.content || {}).reduce((sum, count) => sum + count, 0);
            }, 0)}
          </div>
          <div className="text-sm text-gray-600">Content</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-500">
            {monthlyData.reduce((total, entry) => 
              total + (entry.outreach?.length || 0) + (entry.inbound?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Contacts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-500">{monthlyData.length}</div>
          <div className="text-sm text-gray-600">Days Active</div>
        </div>
      </div>

      {/* Recent Entries */}
      {monthlyData.length > 0 && (
        <div className="space-y-3">
          <h3 
            className="text-lg font-bold text-gray-800"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
          >
            Recent Entries
          </h3>
          {monthlyData.slice(0, 5).map((entry, index) => (
            <div key={`${entry.date}-${index}`} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-teal-600 font-semibold">
                    {Object.values(entry.content || {}).reduce((sum, count) => sum + count, 0)} Content
                  </div>
                  <div className="text-gray-600">
                    {(entry.outreach?.length || 0) + (entry.inbound?.length || 0)} Contacts
                  </div>
                </div>
              </div>

              {entry.notes?.daily && (
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <div className="text-xs font-semibold text-gray-500 mb-1">Daily Reflection:</div>
                  <div className="text-sm text-gray-800">{entry.notes.daily}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Targets Modal Component
const TargetsModal = ({ contentTypes, targets, activeBusiness, onClose, onSave }) => {
  const [localTargets, setLocalTargets] = useState(() => {
    const currentTargets = targets[activeBusiness] || {};
    const initialTargets = {};
    contentTypes.forEach(type => {
      initialTargets[type.id] = currentTargets[type.id] || 0;
    });
    return initialTargets;
  });

  const handleSave = () => {
    onSave(localTargets);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-xl font-bold"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '800', letterSpacing: '-0.01em' }}
          >
            ⚡ Weekly Content Targets
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {contentTypes.map((type) => (
            <div key={type.id} className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <SocialIcon platform={type.platform} className="w-4 h-4 text-teal-500" />
                <div className="text-sm font-semibold">{type.name}</div>
              </div>
              <input
                type="number"
                min="0"
                value={localTargets[type.id]}
                onChange={(e) => setLocalTargets(prev => ({
                  ...prev,
                  [type.id]: parseInt(e.target.value) || 0
                }))}
                className="w-full bg-white border border-gray-300 p-3 rounded-lg text-center font-semibold text-lg focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-teal-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-teal-600 transition-colors"
        >
          Save Targets
        </button>
      </div>
    </div>
  );
};
