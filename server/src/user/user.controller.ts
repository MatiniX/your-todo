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

@UseGuards(LoggedInGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('details')
  async details(@Req() req) {
    console.log(await this.userService.areFriends(1, 2));
    return this.userService.findById(req.session.passport.user.id);
  }

  @Get('friend-request/:id')
  acceptFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    return this.userService.acceptFriendRequest(friendRequestId);
  }

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

  @Delete('friend-request/:id')
  rejectFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    return this.userService.rejectFriendRequest(friendRequestId);
  }

  @Delete('cancel-friendship/:id')
  cancelFriendship(@Req() req, @Param('id', new ParseIntPipe()) friendId) {
    this.userService.cancelFriendship(req.session.passport.user.id, friendId);
  }
}
