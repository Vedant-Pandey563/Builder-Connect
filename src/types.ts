// User related types
export interface User {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  user_type: 'client' | 'builder' | 'admin';
  is_verified: boolean;
  verification_status: 'pending' | 'verified' | 'rejected';
  registered_at: string;
  profile_photo?: string;
}

export interface Builder {
  builder_id: number;
  user_id?: number;
  name: string;
  address: string;
  license_no?: string;
  gst_number?: string;
  is_gst_verified: boolean;
  experience: string;
  category: 'newcomer' | 'beginner' | 'established';
  projects_completed: number;
  contact_info: {
    phone: string | null;
    email: string;
  };
  builder_image?: string;
  portfolio_images?: string[];
  registered_at: string;
  specializations?: string[];
  rating?: number;
  total_reviews?: number;
  verified?: boolean;
}

export interface ClientRequest {
  request_id: number;
  client_id: number;
  builder_id: number;
  project_type: string;
  budget_range: string;
  location: string;
  request_details: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed';
  created_at: string;
}

export interface Message {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
}

export interface Review {
  review_id: number;
  client_id: number;
  builder_id: number;
  project_id: number;
  rating: number;
  review_text: string;
  project_photos: string[];
  created_at: string;
}

export interface Project {
  project_id: number;
  builder_id: number;
  client_id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  completion_date: string;
  status: 'ongoing' | 'completed';
  photos: string[];
  budget_range: string;
}

export interface SearchFilters {
  location: string;
  service: string;
  rating: number;
  experience: number;
  category?: 'newcomer' | 'beginner' | 'established';
}