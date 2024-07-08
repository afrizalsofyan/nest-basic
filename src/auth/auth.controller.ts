import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async detailUser(@Req() req) {
    return await this.authService.profileUser(req.user.id);
  }
}
