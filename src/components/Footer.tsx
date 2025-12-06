import { Cloud, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container-narrow px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-foreground">
              Umar<span className="text-primary">Ali</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Umar Ali. Built with <Heart className="w-4 h-4 text-primary inline" /> and cloud dreams.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
