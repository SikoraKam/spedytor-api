import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }

  @Post('auth/register')
  async register(@Request() request) {
    return this.authService.register(request.body);
  }

  @Post('auth/reset')
  async sendCode(@Body() passwordResetBody: { email: string }) {
    return this.authService.sendCode(passwordResetBody.email);
  }

  @Post('auth/reset/password')
  async resetPassword(
    @Body()
    newPasswordBody: {
      code: string;
      newPassword: string;
      email: string;
    },
  ) {
    return this.authService.updatePassword(newPasswordBody);
  }
}
