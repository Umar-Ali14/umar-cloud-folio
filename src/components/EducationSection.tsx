import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ibmCloudCertificate from '@/assets/certificates/ibm-cloud-certificate.jpg';

const education = [
  {
    degree: 'Bachelor of Business & Information Technology',
    institution: 'Punjab University Quaid e Azam, Lahore',
    period: '2024 - 2028',
    description: 'Focusing on business applications of IT, software development, and cloud computing technologies.',
    icon: GraduationCap,
  },
];

const certifications = [
  {
    name: 'Introduction to Cloud Computing',
    issuer: 'IBM SkillBuild',
    status: 'Completed',
    icon: Award,
    certificate: ibmCloudCertificate,
  },
  {
    name: 'Artificial Intelligence for Social Impact',
    issuer: 'ADBInstitute',
    status: 'Completed',
    icon: Award,
  },
  {
    name: 'AI for Business Professionals',
    issuer: 'HP LIFE',
    status: 'Completed',
    icon: Award,
  },
  {
    name: 'AWS Networking Basics V01.01.003',
    issuer: 'Coursera',
    status: 'Completed',
    icon: Award,
  },
  {
    name: 'AWS Zero To Hero Course',
    issuer: 'trainwithshubham',
    status: 'Completed',
    icon: Award,
  },
  {
    name: 'AWS Cloud Computing | AWS 3 in 1 Certification Course Bundle',
    issuer: 'Kamyab Freelancer Program CM Punjab Pakistan',
    status: 'In Progress',
    icon: Award,
  },
];

const courses = [
  'Cloud Computing Fundamentals',
  'Linux System Administration',
  'Python Programming',
  'Database Management Systems',
  'Network Security',
  'DevOps Practices',
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Education
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Education */}
          <div className="space-y-8">
            <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              Formal Education
            </h3>
            
            {education.map((item) => (
              <div key={item.degree} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground text-lg">
                      {item.degree}
                    </h4>
                    <p className="text-primary text-sm font-medium mb-2">
                      {item.institution}
                    </p>
                    <p className="text-muted-foreground text-sm mb-3">
                      {item.period}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-3 pt-4">
              <Award className="w-6 h-6 text-primary" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="glass-card p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <cert.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cert.certificate && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <img 
                            src={cert.certificate} 
                            alt={`${cert.name} Certificate`}
                            className="w-full h-auto rounded-lg"
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'In Progress' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Courses */}
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-primary" />
              Relevant Coursework
            </h3>
            
            <div className="glass-card p-6">
              <div className="grid gap-4">
                {courses.map((course, index) => (
                  <div 
                    key={course}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="mt-8 glass-card p-6 border-primary/30">
              <h4 className="font-display font-semibold text-foreground mb-4">
                Currently Learning
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Kubernetes', 'AWS Solutions Architect', 'Ansible', 'Jenkins'].map((item) => (
                  <span 
                    key={item}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
