import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const usuario = await this.authService.validateUser(loginDto.username, loginDto.password);
    return this.authService.login(usuario);
  }
}
