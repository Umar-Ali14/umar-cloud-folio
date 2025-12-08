import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CloudBackground from '@/components/CloudBackground';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <CloudBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
