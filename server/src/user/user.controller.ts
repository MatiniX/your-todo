import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get('details')
  async details(@Req() req) {
    return this.userService.findById(req.session.passport.user.id);
  }

  // Refaktorizovať! Poslať vhodnú odpoveď na základe úspechu
  @UseGuards(LoggedInGuard)
  @Post('friend-request/:to')
  async sendFriendRequest(
    @Req() req,
    @Param('to', new ParseIntPipe()) toUserId,
  ) {
    const fromUserId = req.session.passport.user.id;

    await this.userService.sendFriendRequest(fromUserId, toUserId);
  }

  @UseGuards(LoggedInGuard)
  @Get('friend-request/:id')
  async acceptFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    await this.userService.acceptFriendRequest(friendRequestId);
  }

  @UseGuards(LoggedInGuard)
  @Delete('friend-request/:id')
  async rejectFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    await this.userService.rejectFriendRequest(friendRequestId);
  }
}
