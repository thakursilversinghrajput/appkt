export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Rajat Ranjan Pratap Singh',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '2',
    name: 'Devesh Tripathi',
    role: 'Co-Founder & Co-CEO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    id: '3',
    name: 'Ayush Kabadwal',
    role: 'Co-Founder & Chief Advising Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
];
