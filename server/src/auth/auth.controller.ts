import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalGuard } from 'src/guards/local.guard';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Get('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return this.authService.generateChangePasswordToken(email);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.ACCEPTED)
  changePassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.changePassword(body.token, body.newPassword);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Req() req: Request, @Body() user: LoginUserDto) {
    return req.session;
  }

  @UseGuards(LoggedInGuard)
  @Get('me')
  me(@Req() req) {
    return req.session.passport.user;
  }

  @UseGuards(LoggedInGuard)
  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    // Odhlasi uživateľa, vymaže session cookie a zruší session medzi serverom a uživateľom
    req.logout();
    res.clearCookie('connect.sid');
    req.session.destroy();

    res.status(200).send(true);
  }
}
