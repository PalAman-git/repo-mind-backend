export interface GithubProfile {
  githubId: number;
  username: string | undefined;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  githubProfileUrl: string | null;
}