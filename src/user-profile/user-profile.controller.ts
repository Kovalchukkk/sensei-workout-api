import { Controller, Get, Put, Post, Body, UseGuards, Query, Request } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthenticateGuard } from 'src/decorators/authenticate.guard';

@Controller('user-profile')
@UseGuards(AuthenticateGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async getUserProfile(@Request() req) {
    return this.userProfileService.getUserProfile(req.user);
  }

  @Put()
  async updateUserProfile(
    @Body() profileData: any,
    @Request() req
  ) {
    return this.userProfileService.updateUserProfile(req.user, profileData);
  }
}
