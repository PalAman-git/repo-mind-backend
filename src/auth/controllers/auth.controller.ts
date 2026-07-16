import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { GithubAuthGuard } from '../guards/github-auth.guard';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly configService:ConfigService
  ){}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {
    // Passport redirects to GitHub.
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(
    @Req() req: any,
    @Res() res: any,
  ) {
    const token = await this.authService.login(req.user);
    const FRONTEND_URL = this.configService.getOrThrow<string>('FRONTEND_URL');

    return res.redirect(
      `${FRONTEND_URL}/auth/callback?token=${token}`
    );
  }
}