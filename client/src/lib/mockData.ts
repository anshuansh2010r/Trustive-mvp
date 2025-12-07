export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  verified: boolean;
  location?: string;
  reply?: string; // Coach reply
}

export interface Coach {
  id: string;
  name: string;
  handle: string; // Instagram
  category: string;
  country?: string; // Added country
  avatar: string; // placeholder text or url
  rating: number; // Calculated dynamically
  reviewCount: number; // Calculated dynamically
  location: string;
  bio: string;
  website?: string; // Optional website
  reviews: Review[];
}

// Initial mock data
const INITIAL_COACHES: Coach[] = [
  {
    id: "coach-1",
    name: "Alex Rivera",
    handle: "@arivera_fit",
    category: "Fat Loss & Lifestyle",
    country: "USA",
    avatar: "AR",
    rating: 0, // Will be calculated
    reviewCount: 0, // Will be calculated
    location: "Los Angeles, CA",
    bio: "Helping busy professionals lose fat and keep it off without giving up their favorite foods.",
    website: "https://alexriverafit.com",
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
    country: "USA",
    avatar: "MM",
    rating: 0,
    reviewCount: 0,
    location: "Austin, TX",
    bio: "Specializing in helping moms get their strength back safely. Diastasis recti safe programming.",
    website: "https://musclemomma.com",
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
    country: "UK",
    avatar: "DC",
    rating: 0,
    reviewCount: 0,
    location: "London, UK",
    bio: "Run fast, lift heavy. Hybrid training for the modern athlete.",
    // No website for testing
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

// Calculate initial ratings
INITIAL_COACHES.forEach(coach => {
  const totalStars = coach.reviews.reduce((acc, r) => acc + r.rating, 0);
  coach.reviewCount = coach.reviews.length;
  coach.rating = coach.reviewCount > 0 ? Number((totalStars / coach.reviewCount).toFixed(1)) : 0;
});


// Simple in-memory store simulation (for MVP session persistence within browser refresh limit, 
// normally we'd use localStorage for everything but let's try to be cleaner)
// Actually, request says "Reviews must be tied to the correct coach profile" and "Reviews should render immediately".
// We will use localStorage to persist the "database" so it works across pages.

const STORAGE_KEY = "trustive_coaches_data";

export function getCoaches(): Coach[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse coaches from storage", e);
  }
  // Initialize storage if empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COACHES));
  return INITIAL_COACHES;
}

export function getCoach(id: string): Coach | undefined {
  const coaches = getCoaches();
  return coaches.find(c => c.id === id);
}

export function addReview(coachId: string, review: Review) {
  const coaches = getCoaches();
  const coachIndex = coaches.findIndex(c => c.id === coachId);
  
  if (coachIndex !== -1) {
    const coach = coaches[coachIndex];
    coach.reviews.unshift(review); // Add to top
    
    // Recalculate stats
    const totalStars = coach.reviews.reduce((acc, r) => acc + r.rating, 0);
    coach.reviewCount = coach.reviews.length;
    coach.rating = coach.reviewCount > 0 ? Number((totalStars / coach.reviewCount).toFixed(1)) : 0;
    
    coaches[coachIndex] = coach;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coaches));
    return true;
  }
  return false;
}

export function createCoach(newCoach: Coach) {
    const coaches = getCoaches();
    coaches.push(newCoach);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coaches));
}

export function updateCoach(updatedCoach: Coach) {
  const coaches = getCoaches();
  const index = coaches.findIndex(c => c.id === updatedCoach.id);
  if (index !== -1) {
    coaches[index] = updatedCoach;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coaches));
    return true;
  }
  return false;
}

// Initialize on load if needed
if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COACHES));
}
