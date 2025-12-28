export interface Internship {
  id: string;
  title: string;
  company: string;
  type: string;
  duration: string;
  stipend: string;
  location: string;
  domain: string;
  description: string;
  requirements: string[];
  posted: string;
}

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'KushiraX Technology',
    type: 'Remote',
    duration: '3 months',
    stipend: '₹8,000/month',
    location: 'Remote',
    domain: 'Web Development',
    description: 'Work on React-based projects and learn modern frontend development practices.',
    requirements: ['React basics', 'JavaScript ES6+', 'Git/GitHub'],
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'AI/ML Intern',
    company: 'KushiraX Technology',
    type: 'Hybrid',
    duration: '6 months',
    stipend: '₹12,000/month',
    location: 'Bangalore',
    domain: 'Artificial Intelligence',
    description: 'Build AI models and work on real-world data science projects.',
    requirements: ['Python', 'TensorFlow/PyTorch', 'Statistics'],
    posted: '5 days ago',
  },
  {
    id: '3',
    title: 'Digital Marketing Intern',
    company: 'KushiraX Technology',
    type: 'Remote',
    duration: '2 months',
    stipend: '₹5,000/month',
    location: 'Remote',
    domain: 'Marketing',
    description: 'Manage social media campaigns, SEO, and content marketing strategies.',
    requirements: ['Content writing', 'Social media basics', 'Canva'],
    posted: '1 week ago',
  },
  {
    id: '4',
    title: 'Cybersecurity Analyst Intern',
    company: 'KushiraX Technology',
    type: 'On-site',
    duration: '4 months',
    stipend: '₹10,000/month',
    location: 'Delhi',
    domain: 'Cybersecurity',
    description: 'Assist in security audits, penetration testing, and vulnerability assessments.',
    requirements: ['Network basics', 'Linux', 'Ethical hacking interest'],
    posted: '3 days ago',
  },
];
