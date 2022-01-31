import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { NotificationService } from 'src/services/notification.service';
import { UserService } from './user.service';

@UseGuards(LoggedInGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get('details')
  details(@Req() req) {
    return this.userService.findByIdFull(req.session.passport.user.id);
  }

  @Get('notifications')
  getNotifications(@Req() req) {
    return this.notificationService.getUserNotifications(
      req.session.passport.user.id,
    );
  }

  @Get('friends')
  getFriends(@Req() req) {
    return this.userService.getFriends(req.session.passport.user.id);
  }

  @Get('friends/:id')
  getFriendDetails(@Param('id', new ParseIntPipe()) friendId) {
    return this.userService.getFriendDetails(friendId);
  }

  @Get('friend-request/:id')
  async acceptFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    const friendRequest = await this.userService.acceptFriendRequest(
      friendRequestId,
    );
    return { id: friendRequest.id, newState: friendRequest.state };
  }

  @Get('leaderboard')
  getLeaderboard(@Req() req) {
    return this.userService.getLeaderboard(req.session.passport.user.id);
  }

  @Patch('notifications')
  markSeenNotifications(@Body() ids: number[]) {
    return this.notificationService.markAsSeen(ids);
  }

  @Post('friend-request/:to')
  async sendFriendRequest(@Req() req, @Param('to') toUsername) {
    const fromUserId = req.session.passport.user.id;
    const toUser = await this.userService.findByUsername(toUsername);
    if (!toUser) {
      throw new BadRequestException(`User ${toUsername} does not exists!`);
    }

    if (fromUserId === toUser.id) {
      throw new BadRequestException(
        'You can not send friend request to yourself!',
      );
    }

    const friendRequest = await this.userService.sendFriendRequest(
      fromUserId,
      toUser.id,
    );

    return `Friend request sent to ${friendRequest.toUser.username}`;
  }

  @Delete('friend-request/:id')
  async rejectFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    const friendRequest = await this.userService.rejectFriendRequest(
      friendRequestId,
    );
    return { id: friendRequest.id, newState: friendRequest.state };
  }

  @Delete('cancel-friendship/:id')
  cancelFriendship(@Req() req, @Param('id', new ParseIntPipe()) friendId) {
    return this.userService.cancelFriendship(
      req.session.passport.user.id,
      friendId,
    );
  }
}
