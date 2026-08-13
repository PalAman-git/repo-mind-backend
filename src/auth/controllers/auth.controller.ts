import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { GithubAuthGuard } from '../guards/github-auth.guard';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly configService:ConfigService
  ){}

  @Get('/')
  async homepage(@Res() res:any){
    res.send("hello from home")
  }

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
    const {accessToken} = await this.authService.login(req.user);
    const FRONTEND_URL = this.configService.getOrThrow<string>('FRONTEND_URL');

    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"lax"
      }
    )

    return res.redirect(
      `${FRONTEND_URL}/dashboard`
    );
  }

  @Post('logout')
  logout(@Res({passthrough:true}) res: any){
    res.clearCookie("accessToken",{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"lax"
    })

    return {
      message:"Logged out successfully."
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Req() req:any,
  ){
    return this.authService.getCurrentUser(req.user.id);
  }
}