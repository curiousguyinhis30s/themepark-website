import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

import HomePage from './pages/HomePage';
import AttractionsPage from './pages/AttractionsPage';
import TicketsPage from './pages/TicketsPage';
import PlanVisitPage from './pages/PlanVisitPage';
import ContactPage from './pages/ContactPage';
import ZonesPage from './pages/ZonesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="attractions" element={<AttractionsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="zones" element={<ZonesPage />} />
        <Route path="plan-visit" element={<PlanVisitPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookies" element={<CookiePolicyPage />} />
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
