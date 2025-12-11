import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import TypingAnimation from '@/components/TypingAnimation';
import heroBackground from '@/assets/hero-background.avif';
import profilePhoto from '@/assets/profile-photo.jpg';

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <ParticleBackground />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

      <div className="container-narrow relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-8 animate-fade-up">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary to-primary-glow p-1 glow-effect">
              <img 
                src={profilePhoto} 
                alt="Umar Ali" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 animate-float">
              <span className="text-lg">☁️</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 max-w-3xl">
            <p className="text-primary font-medium tracking-wider uppercase text-sm animate-fade-up animation-delay-200">
              <TypingAnimation text="Cloud Solutions Architect" delay={800} speed={60} cursor={false} />
            </p>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-up animation-delay-400">
              Hi, I'm{' '}
              <span className="gradient-text">Umar Ali</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-600">
              BBIT student and Junior Cloud Engineer building scalable, resilient systems—specializing in Cloud & DevOps (AWS, Terraform, CI/CD) and integrating AI-driven tools to optimize operations and accelerate delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-up animation-delay-800">
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/923402355989" target="_blank" rel="noopener noreferrer">
                  <Mail className="w-5 h-5" />
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 animate-fade-up animation-delay-800">
              <a 
                href="https://github.com/Umar-Ali14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/umar-ali-043b13274/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="mailto:meumaralli10@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#about" aria-label="Scroll to About section">
              <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
