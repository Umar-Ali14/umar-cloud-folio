import { ExternalLink, Github, Cloud, Server, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'AWS VPC Architecture',
    description: 'Designed and implemented a multi-tier VPC with public and private subnets, NAT gateways, and security groups for a secure cloud infrastructure.',
    tags: ['AWS VPC', 'Terraform', 'Networking'],
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'EC2 Auto Scaling Solution',
    description: 'Built an auto-scaling infrastructure with load balancing to handle variable traffic loads efficiently while optimizing costs.',
    tags: ['AWS EC2', 'Auto Scaling', 'ELB'],
    icon: Server,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'S3 Static Website Hosting',
    description: 'Deployed a highly available static website using S3, CloudFront CDN, and Route 53 for global content delivery.',
    tags: ['AWS S3', 'CloudFront', 'Route 53'],
    icon: Database,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'IAM Security Framework',
    description: 'Implemented comprehensive IAM policies and roles following least privilege principle for secure access management.',
    tags: ['AWS IAM', 'Security', 'Policies'],
    icon: Lock,
    color: 'from-green-500 to-emerald-500',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-card/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Cloud <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real-world cloud infrastructure projects demonstrating AWS expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Header with Gradient */}
              <div className={`h-32 bg-gradient-to-br ${project.color} opacity-80 flex items-center justify-center relative overflow-hidden`}>
                <project.icon className="w-16 h-16 text-white/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View All on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
