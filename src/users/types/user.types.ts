export interface UserRow {
  id: string;
  github_id: number;
  username: string | undefined;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  github_profile_url: string | null;
  created_at: Date;
  updated_at: Date;
}