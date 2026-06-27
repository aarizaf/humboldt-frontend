import Navbar from '../components/Navbar';
import {
  HeroSection,
  HighlightSection,
  ValuesSection,
  InstagramFeed,
  ContactSection,
} from '../components/sections';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <HighlightSection />
      <ValuesSection />
      <InstagramFeed />
      <ContactSection />
    </div>
  );
}

export default LandingPage;
