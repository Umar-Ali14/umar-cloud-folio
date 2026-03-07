import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterCycle from '@/components/TypewriterCycle';
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
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

      <div className="container-narrow relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo - Top */}
          <div className="hero-stagger mb-8" style={{ '--stagger-delay': '0.3s' } as React.CSSProperties}>
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full hero-rotating-border opacity-70" />
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full p-1 hero-photo-glow animate-hero-float">
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
          </div>

          {/* Available for Work Badge */}
          <div className="hero-stagger mb-4" style={{ '--stagger-delay': '0.5s' } as React.CSSProperties}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-sm text-foreground font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Available for Work
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight hero-stagger" style={{ '--stagger-delay': '0.6s' } as React.CSSProperties}>
              Hi, I'm{' '}
              <span className="gradient-text">Umar Ali</span>
            </h1>

            <p className="text-primary font-medium tracking-wider uppercase text-sm hero-stagger" style={{ '--stagger-delay': '0.7s' } as React.CSSProperties}>
              <TypewriterCycle />
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed hero-stagger" style={{ '--stagger-delay': '0.9s' } as React.CSSProperties}>
              BBIT student and Junior Cloud Engineer building scalable, resilient systems—specializing in Cloud & DevOps (AWS, Terraform, CI/CD) and integrating AI-driven tools to optimize operations and accelerate delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 hero-stagger" style={{ '--stagger-delay': '1.1s' } as React.CSSProperties}>
              <Button variant="hero" size="lg" asChild className="hero-shimmer-btn">
                <a href="https://wa.me/923402355989" target="_blank" rel="noopener noreferrer">
                  <Mail className="w-5 h-5" />
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 hero-stagger" style={{ '--stagger-delay': '1.3s' } as React.CSSProperties}>
              <a href="https://github.com/Umar-Ali14" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group" aria-label="GitHub Profile">
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/umar-ali-043b13274/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group" aria-label="LinkedIn Profile">
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="mailto:meumaralli10@gmail.com" className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors duration-300 group" aria-label="Email">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-scroll-arrow">
            <a href="#about" aria-label="Scroll to About section" className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
