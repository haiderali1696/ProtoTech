import { CourseCategory } from '../types/courses';

export const courseCategories: CourseCategory[] = [
  {
    id: 'software-web',
    title: 'Software & Web Development Track',
    icon: 'software',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    courses: [
      { id: 'sw1', name: 'Web Development (MERN / Laravel)', duration: '12 Weeks', fee: '50,000', category: 'Software & Web', description: 'HTML5, CSS3, JavaScript, MERN Stack (MongoDB, Express, React, Node), Laravel & REST APIs, Full-Stack Project' },
      { id: 'sw2', name: 'Mobile App Development', duration: '12 Weeks', fee: '50,000', category: 'Software & Web', description: 'Cross-Platform App Development, API Integration & Firebase, App UI/UX Design, Play Store Deployment' },
      { id: 'sw3', name: 'WordPress / Shopify Development', duration: '8 Weeks', fee: '15,000', category: 'Software & Web', description: 'Learn to build professional websites and ecommerce stores.' },
    ]
  },
  {
    id: 'freelance-digital',
    title: 'Freelancing & Digital Skills',
    icon: 'business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    courses: [
      { id: 'fd1', name: 'Digital Marketing', duration: '8 Weeks', fee: '20,000', category: 'Freelance & Digital', description: 'Complete digital marketing strategies.' },
      { id: 'fd2', name: 'Advance SEO', duration: '8 Weeks', fee: '15,000', category: 'Freelance & Digital', description: 'Search Engine Optimization mastery.' },
      { id: 'fd3', name: 'Amazon Expert', duration: '12 Weeks', fee: '24,000', category: 'Freelance & Digital', description: 'Complete Amazon selling and FBA expertise.' },
      { id: 'fd4', name: 'Copywriting', duration: '4 Weeks', fee: '10,000', category: 'Freelance & Digital', description: 'Learn professional copywriting techniques.' },
      { id: 'fd5', name: 'UI / UX Design', duration: '12 Weeks', fee: '24,000', category: 'Freelance & Digital', description: 'User interface and user experience design.' },
      { id: 'fd6', name: 'Freelancing Platforms', duration: '4 Weeks', fee: '10,000', category: 'Freelance & Digital', description: 'Master platforms like Upwork and Fiverr.' },
    ]
  },
  {
    id: 'data-ai-db',
    title: 'Data, AI & Databases',
    icon: 'ai',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=80',
    courses: [
      { id: 'dad1', name: 'AI & Machine Learning', duration: '8 Weeks', fee: '50,000', category: 'Data & AI', description: 'Artificial Intelligence and Machine Learning fundamentals.' },
      { id: 'dad2', name: 'Data Analytics & Power BI', duration: '4 Weeks', fee: '50,000', category: 'Data & AI', description: 'Data analysis and visualization with Power BI.' },
      { id: 'dad3', name: 'SQL Server/Oracle, MySQL', duration: '4 Weeks', fee: '20,000', category: 'Data & AI', description: 'Database management systems.' },
      { id: 'dad4', name: 'Big Data & Cloud Basics', duration: '8 Weeks', fee: '40,000', category: 'Data & AI', description: 'Introduction to big data and cloud technologies.' },
      { id: 'dad5', name: 'Advance Python Course', duration: '8 Weeks', fee: '30,000', category: 'Data & AI', description: 'Advanced Python programming.' },
    ]
  },
  {
    id: 'short-term',
    title: 'Short Term Certifications',
    icon: 'short',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    courses: [
      { id: 'st1', name: 'Office Automation', duration: '6 Weeks', fee: '12,000', category: 'Short Term', description: 'MS Office and general computer automation.' },
      { id: 'st2', name: 'Data Entry', duration: '12 Weeks', fee: '18,000', category: 'Short Term', description: 'Professional data entry skills.' },
      { id: 'st3', name: 'Graphics Designing', duration: '6 Weeks', fee: '20,000', category: 'Short Term', description: 'Graphic design fundamentals.' },
      { id: 'st4', name: 'Spoken English', duration: '12 Weeks', fee: '24,000', category: 'Short Term', description: 'English communication skills.' },
      { id: 'st5', name: 'Programming Languages', duration: '6 Weeks', fee: '16,000', category: 'Short Term', description: 'Basics of various programming languages.' },
      { id: 'st6', name: 'HTML/CSS/Javascript', duration: '8 Weeks', fee: '16,000', category: 'Short Term', description: 'Frontend web basics.' },
      { id: 'st7', name: 'AutoCad (Mechanical/Civil)', duration: '12 Weeks', fee: '24,000', category: 'Short Term', description: 'AutoCad design for engineering.' },
    ]
  }
];

export const monthlyOffers = [
  {
    id: 'april-2026',
    month: 'April 2026',
    title: 'React Learning Festival',
    discount: '50%',
    validUntil: 'April 30, 2026',
    courses: [
      { id: 'react-beginner', name: 'React.js Beginner Course', originalFee: '16,000', discountedFee: '7,999' },
    ],
  },
];
