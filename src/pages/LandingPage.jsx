import React from 'react';
import '../styles/LandingPage.css';
import '../styles/animations.css';
import HeroSection from '../components/landing/HeroSection';
import InfoSection from '../components/landing/InfoSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import DownloadSection from '../components/landing/DownloadSection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <InfoSection />
      <ReviewsSection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
