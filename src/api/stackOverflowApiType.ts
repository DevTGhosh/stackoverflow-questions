//Added types for all key value pairs in the JSON object from API call
export interface Owner {
  reputation: number;
  user_id: number;
  user_type: string;
  accept_rate: number;
  profile_image: string;
  display_name: string;
  link: string;
}

export interface Item {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  accepted_answer_id: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
  body: string;
}
// Root Interface
export interface ApiResponse {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
export interface PaginatedApiResponse {
  data: ApiResponse;
  nextPageNumber: number;
}
