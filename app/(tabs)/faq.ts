export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is KushiraX Technology?',
    answer: 'KushiraX Technology is a digital solutions company that empowers startups, enterprises, and youth with digital growth through training, services, and innovation.',
  },
  {
    id: '2',
    question: 'What services do you offer?',
    answer: 'We offer Digital Marketing Services, Consultancy Services, Creative Services, Education & Training, and Business Support Services. Each service is designed to support brands, students, and businesses at every stage of growth.',
  },
  {
    id: '3',
    question: 'Do you offer training or internship programs?',
    answer: 'Yes! We offer bootcamps in Full-Stack Development, AI & Data Science, and Cybersecurity. We also provide internship opportunities for students to gain real-world experience.',
  },
  {
    id: '4',
    question: 'Can businesses outsource operational support services to you?',
    answer: 'Absolutely! We provide BPO training & support, data entry, chat support, email support, and other business operational services.',
  },
  {
    id: '5',
    question: 'Do you provide creative and design solutions?',
    answer: 'Yes! Our creative team specializes in graphic design, animation, video editing, photo editing, and brand identity creation.',
  },
  {
    id: '6',
    question: 'Do you offer custom or bundled service packages?',
    answer: 'Yes, we offer both custom solutions tailored to your needs and bundled packages for comprehensive digital transformation.',
  },
];
