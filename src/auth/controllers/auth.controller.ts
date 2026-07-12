import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { GithubAuthGuard } from '../guards/github-auth.guard';

@Controller('auth')
export class AuthController {

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
    return res.json(req.user);
  }
}