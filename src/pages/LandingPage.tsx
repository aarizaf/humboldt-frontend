import Navbar from '../components/Navbar';
import {
  HeroSection,
  AboutSection,
  DistinctivesSection,
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
      <DistinctivesSection />
      <HighlightSection />
      <ValuesSection />
      <AboutSection />
      <InstagramFeed />
      <ContactSection />
    </div>
  );
}

export default LandingPage;
