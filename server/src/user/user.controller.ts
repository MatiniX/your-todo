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
import { User } from 'src/entities/User';
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
    return this.userService.findById(req.session.passport.user.id);
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

  @Get('friend-request/:id')
  async acceptFriendRequest(@Param('id', new ParseIntPipe()) friendRequestId) {
    const friendRequest = await this.userService.acceptFriendRequest(
      friendRequestId,
    );
    return { id: friendRequest.id, newState: friendRequest.state };
  }

  @Patch('notifications')
  markSeenNotifications(@Body() ids: number[]) {
    return this.notificationService.markAsSeen(ids);
  }

  @Post('friend-request/:to')
  async sendFriendRequest(
    @Req() req,
    @Param('to', new ParseIntPipe()) toUserId,
  ) {
    const fromUserId = req.session.passport.user.id;

    if (fromUserId === toUserId) {
      throw new BadRequestException(
        'You can not send friend request to yourself!',
      );
    }

    const friendRequest = await this.userService.sendFriendRequest(
      fromUserId,
      toUserId,
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
