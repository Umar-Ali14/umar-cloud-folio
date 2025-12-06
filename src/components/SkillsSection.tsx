import { Cloud, Database, Terminal, Code, Settings, Shield } from 'lucide-react';

const skillCategories = [
  {
    title: 'Cloud Services',
    icon: Cloud,
    skills: [
      { name: 'AWS EC2', level: 80 },
      { name: 'AWS S3', level: 85 },
      { name: 'AWS VPC', level: 75 },
      { name: 'AWS IAM', level: 70 },
    ],
  },
  {
    title: 'Infrastructure',
    icon: Settings,
    skills: [
      { name: 'Terraform', level: 75 },
      { name: 'Linux', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'CI/CD', level: 65 },
    ],
  },
  {
    title: 'Programming',
    icon: Code,
    skills: [
      { name: 'Python', level: 80 },
      { name: 'C', level: 70 },
      { name: 'C++', level: 65 },
      { name: 'Bash', level: 75 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            My Skills
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A blend of cloud technologies, infrastructure automation, and programming skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className="glass-card p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          background: 'var(--gradient-primary)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Other technologies I work with:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'GitHub Actions', 'Nginx', 'MySQL', 'PostgreSQL', 'VS Code', 'Vim', 'SSH'].map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 bg-secondary text-muted-foreground rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
