import { Cloud, Server, Code2, Terminal } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const highlights = [
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Building scalable infrastructure on AWS',
  },
  {
    icon: Server,
    title: 'Infrastructure as Code',
    description: 'Automating deployments with Terraform',
  },
  {
    icon: Code2,
    title: 'Multi-Language',
    description: 'Proficient in Python, C, and C++',
  },
  {
    icon: Terminal,
    title: 'Linux Expert',
    description: 'System administration & scripting',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card/30">
      <div className="container-narrow">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
              About Me
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Passionate About the <span className="gradient-text">Cloud</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <AnimatedSection animation="fade-right" delay={100}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Umar Ali</span>, a Bachelor of Business Information Technology (BBIT) student driven by a deep passion for cloud computing, modern infrastructure, and AI-enabled DevOps workflows. I combine strong expertise in CI/CD, automation, and scalable cloud architectures with an active focus on integrating AI-driven tools to optimize cloud operations and accelerate development efficiency. I'm committed to growing as an AI-enabled Cloud & DevOps Engineer, delivering resilient, efficient, and future-ready solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey into technology began with a curiosity about how systems work at scale. Today, I'm focused on becoming a Cloud Solutions Architect, mastering AWS services including EC2, S3, VPC, and IAM, while building a strong foundation in Infrastructure as Code with Terraform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond cloud technologies, I'm expanding my programming expertise in Python, C, and C++, complemented by strong Linux system administration skills. I believe in writing clean, efficient code and building robust, scalable architectures.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {['AWS', 'Terraform', 'Linux', 'Python', 'Docker'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Highlight Cards */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div 
                  key={item.title}
                  className="glass-card p-6 transition-all duration-500 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
