import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { request } from 'express';
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
  sendFriendRequest(@Req() req, @Param('to', new ParseIntPipe()) toUserId) {
    const fromUserId = req.session.passport.user.id;

    if (fromUserId === toUserId) {
      throw new BadRequestException(
        'You can not send friend request to yourself!',
      );
    }

    return this.userService.sendFriendRequest(fromUserId, toUserId);
  }

  @UseGuards(LoggedInGuard)
  @Get('friend-request/:id')
  acceptFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    return this.userService.acceptFriendRequest(friendRequestId);
  }

  @UseGuards(LoggedInGuard)
  @Delete('friend-request/:id')
  rejectFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    return this.userService.rejectFriendRequest(friendRequestId);
  }

  @UseGuards(LoggedInGuard)
  @Delete('cancel-friendship/:id')
  cancelFriendship(@Req() req, @Param('id', new ParseIntPipe()) friendId) {
    this.userService.cancelFriendship(req.session.passport.user.id, friendId);
  }
}
