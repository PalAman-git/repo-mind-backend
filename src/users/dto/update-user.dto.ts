export class UpdateUserDto {
  githubId!: number;
  username : string | undefined;
  displayName: string | null = null;
  email: string | null = null;
  avatarUrl: string | null = null;
  githubProfileUrl: string | null = null;
}