
import React from 'react';
import { Header } from '@/components/Header';
import { MainInterface } from '@/components/MainInterface';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <Header />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        <Sidebar />
        <MainInterface />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
