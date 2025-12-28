export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  enrolled: number;
  rating: number;
  price: number;
  category: 'fullstack' | 'ai' | 'cybersecurity';
  modules: number;
  image: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Full-Stack Development Bootcamp',
    description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world projects with mentorship.',
    duration: '12 weeks',
    level: 'Intermediate',
    enrolled: 1250,
    rating: 4.8,
    price: 15999,
    category: 'fullstack',
    modules: 24,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  },
  {
    id: '2',
    title: 'AI & Data Science Program',
    description: 'Learn Machine Learning, Deep Learning, and AI with hands-on projects and real datasets.',
    duration: '8 weeks',
    level: 'Advanced',
    enrolled: 890,
    rating: 4.9,
    price: 18999,
    category: 'ai',
    modules: 16,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
  },
  {
    id: '3',
    title: 'Cybersecurity Essentials',
    description: 'Master pentesting, ethical hacking, and network security. Get certified and job-ready.',
    duration: '6 weeks',
    level: 'Beginner',
    enrolled: 670,
    rating: 4.7,
    price: 12999,
    category: 'cybersecurity',
    modules: 12,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  },
];
