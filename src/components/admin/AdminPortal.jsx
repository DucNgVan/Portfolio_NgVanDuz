import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  LogOut, 
  ArrowLeft, 
  BarChart3, 
  Inbox, 
  Activity, 
  Settings, 
  TrendingUp, 
  Users, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Mail, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  Download, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Globe, 
  Check, 
  AlertCircle,
  Compass,
  Search,
  Filter,
  Layers,
  Cpu,
  MapPin,
  Wifi
} from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

/**
 * Visual Donut / Ring Chart Component (Pure SVG)
 */
const DonutChart = ({ segments = [], centerLabel = '', centerSub = '', size = 110 }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="rotate-[-90deg]">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="11"
        />
        {segments.map((seg, i) => {
          const dash = (seg.value / 100) * circumference;
          const strokeDasharray = `${dash} ${circumference - dash}`;
          const strokeDashoffset = -accumulatedOffset;
          accumulatedOffset += dash;

          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth="11"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-xs font-black text-white font-mono">{centerLabel}</span>
        {centerSub && <span className="text-[8.5px] text-white/50 font-mono uppercase">{centerSub}</span>}
      </div>
    </div>
  );
};

/**
 * 7-Day Interactive Visitor Timeline Bar Chart (Pure SVG)
 */
const TrafficTrendChart = ({ data = [] }) => {
  const maxVal = Math.max(...data.map(d => d.views || 0), 380) * 1.12;
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#c5a880]" />
          <span className="font-mono font-bold text-white uppercase text-[11px] tracking-wider">
            7-Day Visitor Volume & Retention Trend
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10.5px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#c5a880]" />
            <span className="text-white/80">Total Views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#38bdf8]" />
            <span className="text-white/80">Unique Visitors</span>
          </div>
        </div>
      </div>

      <div className="relative h-48 w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-end">
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-white border-dashed w-full" />
          <div className="border-b border-white border-dashed w-full" />
          <div className="border-b border-white border-dashed w-full" />
          <div className="border-b border-white border-dashed w-full" />
        </div>

        {/* Bars Container */}
        <div className="relative z-10 flex items-end justify-between gap-2 sm:gap-4 h-36 pt-2">
          {data.map((item, idx) => {
            const viewsHeight = `${Math.min(100, Math.max(14, (item.views / maxVal) * 100))}%`;
            const visitorsHeight = `${Math.min(100, Math.max(10, (item.visitors / maxVal) * 100))}%`;
            const isHovered = hoveredIdx === idx;

            return (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
              >
                {/* Floating tooltip */}
                {isHovered && (
                  <div className="absolute -top-3 bg-[#1e1e24] border border-white/20 text-white rounded-xl px-2.5 py-1 text-[10px] font-mono shadow-xl z-20 pointer-events-none whitespace-nowrap animate-fadeIn">
                    <span className="text-[#c5a880] font-bold">{item.views} Views</span> · <span className="text-[#38bdf8]">{item.visitors} Visitors</span>
                  </div>
                )}

                {/* Double Bar Group */}
                <div className="flex items-end gap-1 w-full justify-center h-full pb-1">
                  {/* Views Bar */}
                  <div 
                    style={{ height: viewsHeight }} 
                    className={`w-3 sm:w-4 rounded-t-md transition-all duration-300 ${
                      item.isToday 
                        ? 'bg-gradient-to-t from-[#c5a880] to-[#f3e5cb] shadow-[0_0_12px_rgba(197,168,128,0.4)]' 
                        : isHovered 
                          ? 'bg-[#c5a880]' 
                          : 'bg-[#c5a880]/70 group-hover:bg-[#c5a880]'
                    }`}
                  />
                  {/* Visitors Bar */}
                  <div 
                    style={{ height: visitorsHeight }} 
                    className={`w-3 sm:w-4 rounded-t-md transition-all duration-300 ${
                      item.isToday 
                        ? 'bg-gradient-to-t from-[#38bdf8] to-[#bae6fd] shadow-[0_0_10px_rgba(56,189,248,0.3)]' 
                        : isHovered 
                          ? 'bg-[#38bdf8]' 
                          : 'bg-[#38bdf8]/60 group-hover:bg-[#38bdf8]'
                    }`}
                  />
                </div>

                {/* Date label */}
                <span className={`text-[10px] font-mono mt-1 ${item.isToday ? 'text-[#c5a880] font-bold' : 'text-white/50 group-hover:text-white'}`}>
                  {item.day === 'Today' ? 'Today' : item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Visual Retention Funnel Component
 */
const RetentionFunnelChart = ({ sceneViews = {} }) => {
  const steps = [
    { id: 'scene1_hero', label: 'Scene 01: Hero & Identity', count: sceneViews.scene1_hero || 1428, percent: 100 },
    { id: 'scene2_workflow', label: 'Scene 02: Workflow & Tech Stack', count: sceneViews.scene2_workflow || 1204, percent: 84 },
    { id: 'scene3_projects', label: 'Scene 03: Projects Vault', count: sceneViews.scene3_projects || 978, percent: 68 },
    { id: 'scene4_milestones', label: 'Scene 04: Honors & Milestones', count: sceneViews.scene4_milestones || 726, percent: 51 },
    { id: 'scene5_contact', label: 'Scene 05: Contact & Quick Message', count: sceneViews.scene5_contact || 554, percent: 39 },
  ];

  return (
    <div className="space-y-3">
      {steps.map((st, idx) => {
        const drop = idx > 0 ? steps[idx - 1].percent - st.percent : 0;
        return (
          <div key={st.id} className="relative">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-white/80 font-medium">{st.label}</span>
              <div className="flex items-center gap-2">
                {drop > 0 && (
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-400 font-mono">
                    -{drop}% drop
                  </span>
                )}
                <span className="text-[#c5a880] font-bold">{st.percent}%</span>
                <span className="text-white/40 text-[10px]">({st.count.toLocaleString()})</span>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5">
              <div 
                style={{ width: `${st.percent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#8c7355] via-[#c5a880] to-[#f3e5cb] transition-all duration-700 shadow-[0_0_8px_rgba(197,168,128,0.3)]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AdminPortal = ({ onExit = () => {} }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'visitors' | 'inbox' | 'activity' | 'settings'
  const [analyticsData, setAnalyticsData] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterMessageStatus, setFilterMessageStatus] = useState('all');

  // Visitor filter state
  const [visitorDeviceFilter, setVisitorDeviceFilter] = useState('all'); // 'all' | 'Desktop' | 'Mobile' | 'Tablet'
  const [visitorSearch, setVisitorSearch] = useState('');

  // Settings state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null);

  // Cloud sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('connected');

  useEffect(() => {
    // Check existing session
    if (analyticsService.isAdminAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync and Realtime subscription
  useEffect(() => {
    if (!isAuthenticated) return;

    refreshDashboard();

    // Subscribe to multi-device real-time updates
    const unsubscribe = analyticsService.subscribeToRealtime((type) => {
      console.log('[Supabase Realtime] Event triggered:', type);
      refreshDashboard();
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isAuthenticated]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const refreshDashboard = async () => {
    setIsSyncing(true);
    // Instant local cache rendering
    setAnalyticsData(analyticsService.getAnalyticsData());
    setVisitors(analyticsService.getVisitors());
    const localMsgs = analyticsService.getMessages();
    setMessages(localMsgs);
    if (localMsgs.length > 0 && !selectedMessage) {
      setSelectedMessage(localMsgs[0]);
    }

    // Async cloud sync from Supabase PostgreSQL
    try {
      const [cloudVisitors, cloudMsgs, cloudAnalytics] = await Promise.all([
        analyticsService.fetchVisitorsAsync(),
        analyticsService.fetchMessagesAsync(),
        analyticsService.fetchAnalyticsAsync()
      ]);

      if (cloudVisitors && cloudVisitors.length > 0) {
        setVisitors(cloudVisitors);
      }
      if (cloudMsgs && cloudMsgs.length > 0) {
        setMessages(cloudMsgs);
        setSelectedMessage((prev) => {
          if (!prev) return cloudMsgs[0];
          return cloudMsgs.find((m) => m.id === prev.id) || cloudMsgs[0];
        });
      }
      if (cloudAnalytics) {
        setAnalyticsData(cloudAnalytics);
      }
      setCloudStatus('connected');
    } catch (err) {
      console.warn('Dashboard cloud sync notice:', err);
      setCloudStatus('offline');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    if (analyticsService.verifyPasskey(passkeyInput)) {
      analyticsService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setLoginError('');
      setFailedAttempts(0);
      refreshDashboard();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTime(60);
        setLoginError('Too many failed attempts. Security lockout active for 60 seconds.');
      } else {
        setLoginError(`Incorrect passphrase. (${5 - newAttempts} attempts remaining)`);
      }
    }
  };

  const handleLogout = () => {
    analyticsService.logoutAdmin();
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  const handleMarkRead = (id) => {
    analyticsService.markMessageStatus(id, 'read');
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: 'read' } : m));
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => prev ? { ...prev, status: 'read' } : null);
    }
  };

  const handleDeleteMessage = (id) => {
    analyticsService.deleteMessage(id);
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    if (selectedMessage?.id === id) {
      setSelectedMessage(updated[0] || null);
    }
  };

  const handleDeleteVisitor = (id) => {
    analyticsService.deleteVisitor(id);
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const res = analyticsService.updatePasskey(oldPassword, newPassword);
    if (res.success) {
      setPasswordStatus({ type: 'success', msg: 'Admin passphrase updated successfully!' });
      setOldPassword('');
      setNewPassword('');
    } else {
      setPasswordStatus({ type: 'error', msg: res.error });
    }
    setTimeout(() => setPasswordStatus(null), 4000);
  };

  const handleExportJSON = () => {
    const exportObj = {
      exportedAt: new Date().toISOString(),
      analytics: analyticsService.getAnalyticsData(),
      visitors: analyticsService.getVisitors(),
      messages: analyticsService.getMessages()
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DucNguyen_Portfolio_Analytics_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  // Filtered visitors
  const filteredVisitors = visitors.filter((v) => {
    if (visitorDeviceFilter !== 'all' && v.deviceType !== visitorDeviceFilter) return false;
    if (visitorSearch.trim()) {
      const q = visitorSearch.toLowerCase();
      const matchDevice = v.deviceName?.toLowerCase().includes(q);
      const matchCity = v.city?.toLowerCase().includes(q);
      const matchCountry = v.country?.toLowerCase().includes(q);
      const matchIP = v.ip?.toLowerCase().includes(q);
      return matchDevice || matchCity || matchCountry || matchIP;
    }
    return true;
  });

  // =========================================================================
  // VIEW A: RESTRICTED LOGIN GATE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0e11] text-white flex flex-col items-center justify-center p-6 selection:bg-[#c5a880] selection:text-black font-sans relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8c7355]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#16161a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880] mb-3 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8c7355] font-bold mb-1">
              RESTRICTED CONSOLE // DUC NGUYEN
            </span>
            <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white">
              Administrative Access
            </h1>
            <p className="text-xs text-[#888] font-sans mt-1">
              Enter your secure master passkey to decrypt telemetry analytics and direct inquiries.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-[#aaa] font-semibold mb-1.5 uppercase tracking-wider">
                Master Passphrase
              </label>
              <div className="relative">
                <input
                  type={showPasskey ? 'text' : 'password'}
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter passkey (default: ducngvan@2025)"
                  disabled={lockoutTime > 0}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] text-sm text-white placeholder:text-white/20 outline-none transition-all font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasskey(!showPasskey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            {lockoutTime > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Security cooldown active. Retry in {lockoutTime}s</span>
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutTime > 0 || !passkeyInput}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8c7355] to-[#c5a880] hover:from-[#9c8262] hover:to-[#d4b78f] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#8c7355]/20 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Authenticate & Unlock
            </button>
          </form>

          {/* Footer controls */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#666]">
            <span className="text-[10px]">Hint: ducngvan@2025</span>
            <button
              onClick={onExit}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Portfolio</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  const data = analyticsData || analyticsService.getAnalyticsData();

  // Segments for Device Donut Chart
  const deviceSegments = [
    { name: 'Desktop', value: data.deviceBreakdown?.Desktop || 68.4, color: '#c5a880' },
    { name: 'Mobile', value: data.deviceBreakdown?.Mobile || 26.8, color: '#38bdf8' },
    { name: 'Tablet', value: data.deviceBreakdown?.Tablet || 4.8, color: '#34d399' },
  ];

  // Segments for Browser Donut Chart
  const browserSegments = [
    { name: 'Chrome', value: data.browserBreakdown?.Chrome || 54.2, color: '#f59e0b' },
    { name: 'Safari', value: data.browserBreakdown?.Safari || 24.6, color: '#38bdf8' },
    { name: 'Edge', value: data.browserBreakdown?.Edge || 14.8, color: '#a855f7' },
    { name: 'Firefox', value: data.browserBreakdown?.Firefox || 6.4, color: '#f43f5e' },
  ];

  // =========================================================================
  // VIEW B: AUTHENTICATED EXECUTIVE DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#e5e5e7] font-sans selection:bg-[#c5a880] selection:text-black">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#121216]/90 border-b border-white/[0.08] backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8c7355] to-[#c5a880] flex items-center justify-center font-mono font-black text-black text-xs shadow-md">
            DV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-sans">Nguyen Van Duc</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                PROD ADMIN
              </span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                CLOUD REALTIME
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#888] hidden sm:block">
              Telemetry Analytics & Live Device Inspector Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-[#ccc] hover:text-white transition-all cursor-pointer border border-white/[0.08]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Portfolio</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono text-rose-300 hover:text-rose-200 transition-all cursor-pointer border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-white/[0.08] mb-6 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-[#c5a880] text-white bg-white/[0.04]'
                  : 'border-transparent text-[#888] hover:text-[#ccc]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#c5a880]" />
              <span>Portfolio Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('visitors')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'visitors'
                  ? 'border-[#38bdf8] text-white bg-white/[0.04]'
                  : 'border-transparent text-[#888] hover:text-[#ccc]'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#38bdf8]" />
              <span>Live Visitors & Devices</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'inbox'
                  ? 'border-[#c5a880] text-white bg-white/[0.04]'
                  : 'border-transparent text-[#888] hover:text-[#ccc]'
              }`}
            >
              <Inbox className="w-4 h-4 text-[#c5a880]" />
              <span>Direct Inquiries</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-black font-black text-[9px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'activity'
                  ? 'border-[#c5a880] text-white bg-white/[0.04]'
                  : 'border-transparent text-[#888] hover:text-[#ccc]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#c5a880]" />
              <span>Real-Time Activity</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'settings'
                  ? 'border-[#c5a880] text-white bg-white/[0.04]'
                  : 'border-transparent text-[#888] hover:text-[#ccc]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#c5a880]" />
              <span>Security & Export</span>
            </button>
          </div>

          <button
            onClick={refreshDashboard}
            disabled={isSyncing}
            title={isSyncing ? "Syncing Cloud Data..." : "Refresh Real-Time Cloud Data"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-[#888] hover:text-white hover:bg-white/5 transition-colors cursor-pointer border border-white/5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#c5a880]' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
          </button>
        </div>

        {/* =====================================================================
            TAB 1: PORTFOLIO ANALYTICS (EXECUTIVE CHARTS & RETENTION FUNNEL)
        ===================================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* 4 High-Impact KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] relative overflow-hidden group hover:border-[#c5a880]/40 transition-colors">
                <div className="flex items-center justify-between text-[#888] mb-2 font-mono text-xs">
                  <span className="uppercase tracking-wider">TOTAL VIEWS</span>
                  <Eye className="w-4 h-4 text-[#c5a880]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-sans text-white mb-1">
                  {data.totalViews.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+16.4% this week</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] relative overflow-hidden group hover:border-[#c5a880]/40 transition-colors">
                <div className="flex items-center justify-between text-[#888] mb-2 font-mono text-xs">
                  <span className="uppercase tracking-wider">UNIQUE VISITORS</span>
                  <Users className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-sans text-white mb-1">
                  {data.uniqueVisitors.toLocaleString()}
                </div>
                <div className="text-xs text-[#888] font-mono">
                  62.4% new recruiter reach
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] relative overflow-hidden group hover:border-[#c5a880]/40 transition-colors">
                <div className="flex items-center justify-between text-[#888] mb-2 font-mono text-xs">
                  <span className="uppercase tracking-wider">AVG DURATION</span>
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-sans text-white mb-1">
                  {Math.floor(data.avgDurationSeconds / 60)}m {data.avgDurationSeconds % 60}s
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  High attention retention
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141418] border border-white/[0.08] relative overflow-hidden group hover:border-[#c5a880]/40 transition-colors">
                <div className="flex items-center justify-between text-[#888] mb-2 font-mono text-xs">
                  <span className="uppercase tracking-wider">INQUIRIES RECEIVED</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-sans text-white mb-1">
                  {messages.length}
                </div>
                <div className="text-xs text-amber-300 font-mono">
                  {unreadCount} pending review
                </div>
              </div>
            </div>

            {/* Interactive 7-Day Timeline Bar Chart */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
              <TrafficTrendChart data={data.dailyTraffic} />
            </div>

            {/* Row 2: Retention Funnel Chart & Most Inspected Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Scene-by-Scene Retention Funnel */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#c5a880]" />
                    <span className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                      // Scene-by-Scene Retention Funnel
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#888]">Drop-off Flow</span>
                </div>
                <RetentionFunnelChart sceneViews={data.sceneViews} />
              </div>

              {/* Most Inspected Projects by Recruiters */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                    <span className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                      // Most Inspected Projects
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#888]">Detail Modal Views</span>
                </div>

                <div className="space-y-3">
                  {Object.values(data.projectInspections)
                    .sort((a, b) => b.count - a.count)
                    .map((proj, idx) => {
                      const maxClicks = Math.max(...Object.values(data.projectInspections).map(p => p.count));
                      const percent = Math.round((proj.count / maxClicks) * 100);
                      return (
                        <div key={proj.id} className="relative">
                          <div className="flex items-center justify-between text-xs font-mono mb-1">
                            <span className="text-white/80 font-medium truncate max-w-[220px]">
                              0{idx + 1} {proj.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-white/5 text-[#888]">
                                {proj.category}
                              </span>
                              <span className="text-[#38bdf8] font-bold">{proj.count} clicks</span>
                            </div>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                            <div
                              style={{ width: `${percent}%` }}
                              className="h-full rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>

            {/* Row 3: Visual Donut Charts (Devices & Browsers) & Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Devices Breakdown Donut Chart */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                    // Devices Breakdown
                  </span>
                  <Monitor className="w-4 h-4 text-[#c5a880]" />
                </div>

                <div className="flex items-center justify-around gap-4 my-2">
                  <DonutChart 
                    segments={deviceSegments} 
                    centerLabel={`${data.deviceBreakdown?.Desktop || 68.4}%`}
                    centerSub="Desktop"
                    size={115}
                  />
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880]" />
                      <span className="text-white/70">Desktop:</span>
                      <span className="text-white font-bold">{data.deviceBreakdown?.Desktop}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                      <span className="text-white/70">Mobile:</span>
                      <span className="text-white font-bold">{data.deviceBreakdown?.Mobile}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                      <span className="text-white/70">Tablet:</span>
                      <span className="text-white font-bold">{data.deviceBreakdown?.Tablet}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Browser Breakdown Donut Chart */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                    // Browser Share
                  </span>
                  <Globe className="w-4 h-4 text-amber-400" />
                </div>

                <div className="flex items-center justify-around gap-4 my-2">
                  <DonutChart 
                    segments={browserSegments} 
                    centerLabel={`${data.browserBreakdown?.Chrome || 54.2}%`}
                    centerSub="Chrome"
                    size={115}
                  />
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                      <span className="text-white/70">Chrome:</span>
                      <span className="text-white font-bold">{data.browserBreakdown?.Chrome}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                      <span className="text-white/70">Safari:</span>
                      <span className="text-white font-bold">{data.browserBreakdown?.Safari}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                      <span className="text-white/70">Edge:</span>
                      <span className="text-white font-bold">{data.browserBreakdown?.Edge}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                      <span className="text-white/70">Firefox:</span>
                      <span className="text-white font-bold">{data.browserBreakdown?.Firefox}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Origin */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-white uppercase text-xs tracking-wider">
                    // Geographic Origin
                  </span>
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-3">
                  {data.geoLocations?.map((loc) => (
                    <div key={loc.city} className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-white/80">
                        <span>{loc.flag || '🌐'}</span>
                        <span>{loc.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">{loc.visits}</span>
                        <span className="text-white/40">({loc.percent}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 2: LIVE VISITORS & DEVICE INSPECTOR (REAL USER DATA & SPECS)
        ===================================================================== */}
        {activeTab === 'visitors' && (
          <div className="space-y-6">
            
            {/* Header & Filter Controls */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-black text-white font-sans">
                      Live Visitors & Device Telemetry
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE TELEMETRY
                    </span>
                  </div>
                  <p className="text-xs text-[#888] font-sans">
                    Inspecting real device models, exact screen resolutions, geographic IP cities, and user journeys.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={visitorSearch}
                    onChange={(e) => setVisitorSearch(e.target.value)}
                    placeholder="Search device, city, IP..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8] font-mono"
                  />
                </div>
              </div>

              {/* Filter Tabs by Device */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: `All Devices (${visitors.length})` },
                  { id: 'Desktop', label: `Desktop (${visitors.filter(v => v.deviceType === 'Desktop').length})` },
                  { id: 'Mobile', label: `Mobile (${visitors.filter(v => v.deviceType === 'Mobile').length})` },
                  { id: 'Tablet', label: `Tablet (${visitors.filter(v => v.deviceType === 'Tablet').length})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setVisitorDeviceFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                      visitorDeviceFilter === f.id
                        ? 'bg-[#38bdf8] text-black font-bold shadow-md'
                        : 'bg-white/[0.04] text-[#888] hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Visitors List Cards */}
            <div className="space-y-4">
              {filteredVisitors.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#141418] border border-white/[0.08]">
                  <p className="text-sm font-mono text-[#888]">No visitor records match the current filter.</p>
                </div>
              ) : (
                filteredVisitors.map((vis) => (
                  <div
                    key={vis.id}
                    className={`p-5 rounded-2xl bg-[#141418] border transition-all duration-300 relative ${
                      vis.isLiveNow
                        ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)] bg-gradient-to-r from-emerald-500/[0.03] to-transparent'
                        : 'border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {/* Top Row: Device Name & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880]">
                          {vis.deviceType === 'Mobile' ? (
                            <Smartphone className="w-4 h-4 text-[#38bdf8]" />
                          ) : vis.deviceType === 'Tablet' ? (
                            <Tablet className="w-4 h-4 text-[#34d399]" />
                          ) : (
                            <Monitor className="w-4 h-4 text-[#c5a880]" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-mono">
                              {vis.deviceName}
                            </span>
                            {vis.isLiveNow && (
                              <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9.5px] font-mono font-bold animate-pulse">
                                CURRENT YOU (LIVE NOW)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-[#888]">
                            {vis.deviceType} · {vis.os}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#888]">
                          {vis.timeAgo || 'Just now'}
                        </span>
                        <button
                          onClick={() => handleDeleteVisitor(vis.id)}
                          className="text-[#666] hover:text-rose-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Delete visitor record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3.5 text-xs font-mono">
                      
                      {/* Location & Country */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-[#888] uppercase block mb-1">REAL LOCATION & CITY</span>
                        <div className="flex items-center gap-1.5 text-white font-semibold">
                          <span className="text-base">{vis.flag || '🇻🇳'}</span>
                          <span>{vis.city}, {vis.country}</span>
                        </div>
                        <span className="text-[10px] text-white/50 block mt-0.5 truncate">
                          {vis.isp || 'Telecom Network'}
                        </span>
                      </div>

                      {/* IP & Security */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-[#888] uppercase block mb-1">CLIENT IP ADDRESS</span>
                        <span className="text-white font-mono font-bold truncate block">
                          {vis.ip || '113.161.xx.xx'}
                        </span>
                        <span className="text-[10px] text-emerald-400 block mt-0.5">
                          ✓ Verified Handshake
                        </span>
                      </div>

                      {/* Screen & Browser Specs */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-[#888] uppercase block mb-1">BROWSER & RESOLUTION</span>
                        <span className="text-white font-semibold block truncate">
                          {vis.browser}
                        </span>
                        <span className="text-[10px] text-white/60 block mt-0.5">
                          Display: {vis.screenRes}
                        </span>
                      </div>

                      {/* Referral Channel */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-[#888] uppercase block mb-1">TRAFFIC CHANNEL</span>
                        <span className="text-[#c5a880] font-semibold block truncate">
                          {vis.referrer || 'Direct Portfolio Access'}
                        </span>
                        <span className="text-[10px] text-white/50 block mt-0.5">
                          Status: {vis.status || 'Active'}
                        </span>
                      </div>

                    </div>

                    {/* Visited Scenes & Journey Highlights */}
                    <div>
                      <span className="text-[10.5px] font-mono text-[#888] block mb-1.5 uppercase tracking-wider">
                        // User Journey & Interactions:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {vis.scenesVisited?.map((scene, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10.5px] font-mono text-white/90">
                            {scene}
                          </span>
                        ))}
                        {vis.projectsInspected?.map((proj, i) => (
                          <span key={'p-' + i} className="px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[10.5px] font-mono text-[#38bdf8] font-bold">
                            🔍 {proj}
                          </span>
                        ))}
                        {vis.events?.map((ev, i) => (
                          <span key={'e-' + i} className="px-2.5 py-1 rounded-lg bg-[#c5a880]/15 border border-[#c5a880]/30 text-[10.5px] font-mono text-[#c5a880]">
                            ⚡ {ev}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 3: DIRECT INQUIRIES INBOX (MESSAGES SENT FROM SCENE 5)
        ===================================================================== */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Messages List */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#141418] border border-white/[0.08] lg:col-span-1 flex flex-col h-[650px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Messages ({messages.length})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <button
                    onClick={() => setFilterMessageStatus('all')}
                    className={`px-2 py-0.5 rounded ${filterMessageStatus === 'all' ? 'bg-white/10 text-white font-bold' : 'text-[#888]'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterMessageStatus('unread')}
                    className={`px-2 py-0.5 rounded ${filterMessageStatus === 'unread' ? 'bg-white/10 text-white font-bold' : 'text-[#888]'}`}
                  >
                    Unread
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {messages
                  .filter((m) => filterMessageStatus === 'all' || m.status === filterMessageStatus)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === 'unread') handleMarkRead(msg.id);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedMessage?.id === msg.id
                          ? 'bg-white/[0.08] border-[#c5a880] shadow-md'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white font-sans truncate max-w-[160px]">
                          {msg.senderName}
                        </span>
                        {msg.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[10.5px] font-mono text-[#888] block truncate mb-1.5">
                        {msg.senderContact}
                      </span>
                      <p className="text-[11px] text-[#ccc] font-sans line-clamp-2 leading-relaxed">
                        {msg.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-[#666]">
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(msg.timestamp).toLocaleDateString()}</span>
                        {msg.deviceName && (
                          <span className="text-[#8c7355] truncate max-w-[100px]">{msg.deviceName}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Column: Full Message Detail View */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/[0.08] lg:col-span-2 flex flex-col justify-between h-[650px]">
              {selectedMessage ? (
                <>
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between pb-4 mb-4 border-b border-white/[0.08]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-lg font-black text-white font-sans">
                            {selectedMessage.senderName}
                          </h2>
                          {selectedMessage.flag && (
                            <span className="text-base">{selectedMessage.flag}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#888]">
                          <span className="flex items-center gap-1 text-[#c5a880]">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{selectedMessage.senderContact}</span>
                          </span>
                          {selectedMessage.city && (
                            <span>• {selectedMessage.city}</span>
                          )}
                          {selectedMessage.deviceName && (
                            <span>• {selectedMessage.deviceName}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedMessage.status === 'unread' ? (
                          <button
                            onClick={() => handleMarkRead(selectedMessage.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 transition-colors"
                            title="Mark as Read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-white/40 px-2 py-1 rounded bg-white/5">
                            Read
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
                      <span className="text-[10.5px] font-mono text-[#888] uppercase block mb-2 font-semibold">
                        Inquiry Message Content:
                      </span>
                      <p className="text-sm font-sans text-white/90 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>

                    {/* Tags */}
                    {selectedMessage.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {selectedMessage.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#aaa]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#666]">
                      Received on: {new Date(selectedMessage.timestamp).toLocaleString()}
                    </span>

                    <a
                      href={`mailto:${selectedMessage.senderContact}?subject=Regarding your portfolio inquiry to Nguyen Van Duc`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a880] hover:bg-[#d4b78f] text-black font-mono font-bold text-xs transition-all shadow-md cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-[#666]">
                  <Inbox className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs font-mono">Select a message from the left to view details.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 4: REAL-TIME ACTIVITY STREAM
        ===================================================================== */}
        {activeTab === 'activity' && (
          <div className="p-5 sm:p-7 rounded-3xl bg-[#141418] border border-white/[0.08]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Live Event Stream & User Behavioral Logs
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#888]">Auto-captured via Consent Engine</span>
            </div>

            <div className="space-y-2.5">
              {data.recentActivity?.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 flex items-center justify-between text-xs font-mono transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold uppercase bg-white/5 text-[#c5a880]">
                      {act.type.replace('_', ' ')}
                    </span>
                    <div>
                      <span className="text-white font-bold block">{act.target}</span>
                      <span className="text-[10px] text-[#888]">{act.note}</span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-[#666]">
                    <div>{act.time}</div>
                    <div className="text-[#8c7355]">{act.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: SECURITY & EXPORT (PASSWORD MANAGER & TELEMETRY DOWNLOAD)
        ===================================================================== */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Change Master Passkey */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Change Master Passphrase
                </h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#aaa] mb-1">
                    Current Passphrase
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#c5a880] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#aaa] mb-1">
                    New Passphrase (min 6 characters)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#c5a880] font-mono"
                  />
                </div>

                {passwordStatus && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordStatus.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                  }`}>
                    {passwordStatus.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{passwordStatus.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!oldPassword || !newPassword}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8c7355] to-[#c5a880] hover:from-[#9c8262] hover:to-[#d4b78f] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer"
                >
                  Save New Password
                </button>
              </form>
            </div>

            {/* Export & Data Management */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                  <Download className="w-4 h-4 text-[#38bdf8]" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Export Telemetry & Inquiries
                  </h2>
                </div>

                <p className="text-xs text-[#888] font-sans leading-relaxed mb-4">
                  Export all client telemetry data, real device records, retention metrics, and recruiter messages into a timestamped JSON file for offline analysis and record-keeping.
                </p>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 mb-4 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#888]">
                    <span>Total Views Recorded:</span>
                    <span className="text-white font-bold">{data.totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#888]">
                    <span>Real Visitor Devices:</span>
                    <span className="text-white font-bold">{visitors.length} records</span>
                  </div>
                  <div className="flex items-center justify-between text-[#888]">
                    <span>Inquiries Stored:</span>
                    <span className="text-white font-bold">{messages.length} messages</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono font-bold text-xs transition-all border border-white/10 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#38bdf8]" />
                  <span>Download Complete JSON</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default AdminPortal;
