import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import './i18n';

import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AttractionsPage from './pages/AttractionsPage';
import AttractionDetailPage from './pages/AttractionDetailPage';
import TicketsPage from './pages/TicketsPage';
import PlanVisitPage from './pages/PlanVisitPage';
import ContactPage from './pages/ContactPage';
import ZonesPage from './pages/ZonesPage';
import ZoneDetailPage from './pages/ZoneDetailPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import LoginPage from './pages/LoginPage';
import DemoPage from './pages/DemoPage';
import AdminPortalPage from './pages/AdminPortalPage';
import MobileAppPage from './pages/MobileAppPage';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <Routes>
      {/* Standalone pages without layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPortalPage />} />
      <Route path="/mobile" element={<MobileAppPage />} />

      {/* Main app with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="attractions" element={<AttractionsPage />} />
        <Route path="attractions/:id" element={<AttractionDetailPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="zones" element={<ZonesPage />} />
        <Route path="zones/:id" element={<ZoneDetailPage />} />
        <Route path="plan-visit" element={<PlanVisitPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookies" element={<CookiePolicyPage />} />
        <Route path="demo" element={<DemoPage />} />
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
