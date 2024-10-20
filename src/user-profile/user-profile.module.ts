import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { User } from '../users/users.entity';
import { UserPhysics } from '../user-physics/user-physics.entity';
import { Goal } from '../goals/goals.entity';
import { FatPercentage } from '../fat-percentages/fat-percentage.entity';
import { TrainingProgram } from '../training-programs/training-programs.entity';
import { Step } from '../steps/steps.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPhysics, Goal, FatPercentage, TrainingProgram, Step]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
