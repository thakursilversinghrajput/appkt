export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Lallan Kushwaha',
    feedback: 'Best designing service in Kushinagar — highly recommended! Affordable pricing with premium quality. They truly understand the client\'s vision.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Kushwaha',
    feedback: 'Branding, logo, and social media creatives — everything was done professionally and perfectly aligned with my business identity. Their work helped me gain more clients.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Vivek Singh',
    feedback: 'I needed a poster urgently and they delivered within hours without compromising on quality. Communication was smooth, the design was creative, and pricing was budget-friendly. Absolutely reliable team.',
    rating: 5,
  },
];
