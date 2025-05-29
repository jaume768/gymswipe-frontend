import React from 'react';
import '../styles/LandingPage.css';
import '../styles/animations.css';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import ReviewsSection from '../components/ReviewsSection';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';

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
