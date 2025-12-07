export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  verified: boolean;
  location?: string;
}

export interface Coach {
  id: string;
  name: string;
  handle: string; // Instagram
  category: string;
  avatar: string; // placeholder text or url
  rating: number;
  reviewCount: number;
  location: string;
  bio: string;
  reviews: Review[];
}

export const MOCK_COACHES: Coach[] = [
  {
    id: "coach-1",
    name: "Alex Rivera",
    handle: "@arivera_fit",
    category: "Fat Loss & Lifestyle",
    avatar: "AR",
    rating: 4.8,
    reviewCount: 124,
    location: "Los Angeles, CA",
    bio: "Helping busy professionals lose fat and keep it off without giving up their favorite foods.",
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        title: "Changed my life!",
        content: "I've tried every diet out there. Alex's approach is the only one that stuck. He's supportive but holds you accountable.",
        verified: true,
        location: "New York, NY"
      },
      {
        id: "r2",
        author: "James K.",
        rating: 4,
        date: "1 week ago",
        title: "Great program, slow app",
        content: "The workout programming is top notch. The app he uses is a bit glitchy sometimes, but the coaching itself is solid.",
        verified: true,
        location: "Chicago, IL"
      }
    ]
  },
  {
    id: "coach-2",
    name: "Muscle Momma",
    handle: "@musclemomma_pro",
    category: "Postpartum & Strength",
    avatar: "MM",
    rating: 4.9,
    reviewCount: 89,
    location: "Austin, TX",
    bio: "Specializing in helping moms get their strength back safely. Diastasis recti safe programming.",
    reviews: [
      {
        id: "r3",
        author: "Emily R.",
        rating: 5,
        date: "3 days ago",
        title: "Finally feel like myself again",
        content: "After my second baby, I thought I'd never lift heavy again. 6 months in and I'm stronger than pre-pregnancy.",
        verified: true,
        location: "Seattle, WA"
      }
    ]
  },
  {
    id: "coach-3",
    name: "David Chen",
    handle: "@dchen_performance",
    category: "Hybrid Athlete",
    avatar: "DC",
    rating: 3.5,
    reviewCount: 42,
    location: "London, UK",
    bio: "Run fast, lift heavy. Hybrid training for the modern athlete.",
    reviews: [
      {
        id: "r4",
        author: "Tom B.",
        rating: 2,
        date: "2 months ago",
        title: "Ghosted me",
        content: "Paid for 3 months, heard from him twice. Great plans but zero communication.",
        verified: false,
        location: "Manchester, UK"
      }
    ]
  }
];
