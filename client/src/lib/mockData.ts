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
  // New properties for ownership/claims
  claimed?: boolean;
  claim_status?: "unclaimed" | "pending" | "claimed";
  owner_coach_id?: string; // ID from auth system
}

// Initial mock data
const INITIAL_COACHES: Coach[] = [
  {
    id: "coach-1",
    name: "Alex Rivera",
    handle: "@arivera_trades",
    category: "Forex & Crypto",
    country: "USA",
    avatar: "AR",
    rating: 0, // Will be calculated
    reviewCount: 0, // Will be calculated
    location: "Los Angeles, CA",
    bio: "Helping busy professionals consistently profit from the markets without staring at charts all day.",
    website: "https://alexriveratrades.com",
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        title: "Changed my portfolio!",
        content: "I've tried every strategy out there. Alex's approach is the only one that works. He's supportive but holds you accountable.",
        verified: true,
        location: "New York, NY"
      },
      {
        id: "r2",
        author: "James K.",
        rating: 4,
        date: "1 week ago",
        title: "Great signals, slow alerts",
        content: "The trade setups are top notch. The discord he uses is a bit glitchy sometimes, but the mentorship itself is solid.",
        verified: true,
        location: "Chicago, IL"
      }
    ]
  },
  {
    id: "coach-2",
    name: "Crypto Queen",
    handle: "@cryptoqueen_pro",
    category: "Altcoins & DeFi",
    country: "USA",
    avatar: "CQ",
    rating: 0,
    reviewCount: 0,
    location: "Austin, TX",
    bio: "Specializing in helping beginners navigate DeFi safely. Rugpull-proof strategies.",
    website: "https://cryptoqueen.com",
    reviews: [
      {
        id: "r3",
        author: "Emily R.",
        rating: 5,
        date: "3 days ago",
        title: "Finally profitable again",
        content: "After my second liquidation, I thought I'd never trade again. 6 months in and I'm up 300%.",
        verified: true,
        location: "Seattle, WA"
      }
    ]
  },
  {
    id: "coach-3",
    name: "David Chen",
    handle: "@dchen_capital",
    category: "Day Trading",
    country: "UK",
    avatar: "DC",
    rating: 0,
    reviewCount: 0,
    location: "London, UK",
    bio: "Trade fast, profit heavy. Day trading for the modern market.",
    // No website for testing
    reviews: [
      {
        id: "r4",
        author: "Tom B.",
        rating: 2,
        date: "2 months ago",
        title: "Ghosted me",
        content: "Paid for 3 months, heard from him twice. Great signals but zero communication.",
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
// We will use localStorage to persist the "database" so it works across pages.

const STORAGE_KEY = "trustive_gurus_data";
const USERS_KEY = "trustive_users";
const COACH_ACCOUNTS_KEY = "trustive_coach_accounts";

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

// Rate Limiting
const RATE_LIMIT_KEY = "trustive_review_timestamps";
const MAX_REVIEWS_PER_MINUTE = 5;

export function checkReviewRateLimit(): boolean {
    const now = Date.now();
    let timestamps: number[] = [];
    try {
        const stored = localStorage.getItem(RATE_LIMIT_KEY);
        if (stored) timestamps = JSON.parse(stored);
    } catch {}

    // Filter timestamps from last 60 seconds
    timestamps = timestamps.filter(t => now - t < 60000);

    if (timestamps.length >= MAX_REVIEWS_PER_MINUTE) {
        return false;
    }

    timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
    return true;
}

export function addReview(coachId: string, review: Review) {
  if (!checkReviewRateLimit()) {
      return "RATE_LIMIT";
  }

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

export function removeCoachProfile(id: string) {
    let coaches = getCoaches();
    const initialLength = coaches.length;
    coaches = coaches.filter(c => c.id !== id);
    if (coaches.length !== initialLength) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(coaches));
        return true;
    }
    return false;
}

// Initialize on load if needed
if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COACHES));
}
