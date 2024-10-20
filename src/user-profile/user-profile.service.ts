import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, Between, DeepPartial } from 'typeorm';
import { User } from '../users/users.entity';
import { UserPhysics } from '../user-physics/user-physics.entity';
import { Goal } from '../goals/goals.entity';
import { FatPercentage } from '../fat-percentages/fat-percentage.entity';
import { TrainingProgram } from '../training-programs/training-programs.entity';
import { Step } from '../steps/steps.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPhysics)
    private userPhysicsRepository: Repository<UserPhysics>,
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
    @InjectRepository(FatPercentage)
    private fatPercentageRepository: Repository<FatPercentage>,
    @InjectRepository(TrainingProgram)
    private trainingProgramRepository: Repository<TrainingProgram>,
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
  ) {}

  async updateUserProfile(user: DeepPartial<User>, profileData: {
    username?: string;
    gender?: 'Man' | 'Woman';
    age?: number;
    weight?: number;
    height?: number;
    fatPercentage?: number;
    trainingLevel?: 'Beginner' | 'Advanced';
    daysPerWeek?: number;
    goalName?: 'Gain' | 'Recomposition' | 'Dry';
    steps?: number;
  }) {
    // Update User entity
    if (profileData.username || profileData.gender) {
      await this.userRepository.update(user.id, {
        username: profileData.username,
        gender: profileData.gender,
      });
    }

    // Find or create UserPhysics for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let userPhysics = await this.userPhysicsRepository.findOne({
      where: { 
        userId: user.id,
        createdAt: MoreThanOrEqual(today)
      },
      order: { createdAt: 'DESC' },
    });

    if (!userPhysics) {
      const latestUserPhysics = await this.userPhysicsRepository.findOne({
        where: { userId: user.id },
        order: { createdAt: 'DESC' },
      });

      userPhysics = this.userPhysicsRepository.create({
        userId: user.id,
        age: latestUserPhysics?.age,
        weight: latestUserPhysics?.weight,
        height: latestUserPhysics?.height,
        goal: latestUserPhysics?.goal,
        fatPercentage: null,
      });
    }

    // Update UserPhysics
    if (profileData.age) userPhysics.age = profileData.age;
    if (profileData.weight) userPhysics.weight = profileData.weight;
    if (profileData.height) userPhysics.height = profileData.height;

    if (profileData.goalName) {
      const goal = await this.goalRepository.findOne({ where: { name: profileData.goalName } });
      if (goal) {
        userPhysics.goal = goal;
      }
    }

    if (profileData.fatPercentage) {
      // Find or create FatPercentage for today
      let fatPercentage = await this.fatPercentageRepository.findOne({
        where: { 
          userId: user.id,
          createdAt: MoreThanOrEqual(today)
        },
        order: { createdAt: 'DESC' },
      });

      if (!fatPercentage) {
        fatPercentage = this.fatPercentageRepository.create({
          userId: user.id,
          min: profileData.fatPercentage,
          max: profileData.fatPercentage,
        });
      } else {
        fatPercentage.min = profileData.fatPercentage;
        fatPercentage.max = profileData.fatPercentage;
      }

      await this.fatPercentageRepository.save(fatPercentage);
      userPhysics.fatPercentage = fatPercentage;
    }

    await this.userPhysicsRepository.save(userPhysics);

    // Find or create TrainingProgram for today
    if (profileData.trainingLevel || profileData.daysPerWeek) {
      let trainingProgram = await this.trainingProgramRepository.findOne({
        where: { 
          userId: user.id,
          createdAt: MoreThanOrEqual(today)
        },
        order: { createdAt: 'DESC' },
      });

      if (!trainingProgram) {
        const latestTrainingProgram = await this.trainingProgramRepository.findOne({
          where: { userId: user.id },
          order: { createdAt: 'DESC' },
        });

        trainingProgram = this.trainingProgramRepository.create({
          userId: user.id,
          trainingLevel: latestTrainingProgram?.trainingLevel,
          daysPerWeek: latestTrainingProgram?.daysPerWeek,
        });
      }

      if (profileData.trainingLevel) {
        trainingProgram.trainingLevel = profileData.trainingLevel;
      }
      if (profileData.daysPerWeek) {
        trainingProgram.daysPerWeek = profileData.daysPerWeek;
      }
      await this.trainingProgramRepository.save(trainingProgram);
    }

    // Update steps if provided
    if (profileData.steps) {
      await this.addSteps(user, profileData.steps);
    }

    return await this.getUserProfile(user);
  }

  async addSteps(user: DeepPartial<User>, count: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let step = await this.stepRepository.findOne({
      where: {
        userId: user.id,
        createdAt: MoreThanOrEqual(today)
      },
      order: { createdAt: 'DESC' },
    });

    if (step) {
      step.count = count;
    } else {
      step = this.stepRepository.create({ userId: user.id, count });
    }

    return this.stepRepository.save(step);
  }

  async getSteps(user: DeepPartial<User>, startDate: Date, endDate: Date) {
    return this.stepRepository.find({
      where: {
        userId: user.id,
        createdAt: Between(startDate, endDate),
      },
      order: { createdAt: 'ASC' },
    });
  }

  async getUserProfile(user: DeepPartial<User>) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch the latest user data
    const latestUser = await this.userRepository.findOne({
      where: { id: user.id }
    });

    const latestUserPhysics = await this.userPhysicsRepository.findOne({
      where: { 
        userId: user.id,
        createdAt: MoreThanOrEqual(today)
      },
      order: { createdAt: 'DESC' },
      relations: ['goal', 'fatPercentage'],
    });
    
    const latestTrainingProgram = await this.trainingProgramRepository.findOne({
      where: { 
        userId: user.id,
        createdAt: MoreThanOrEqual(today)
      },
      order: { createdAt: 'DESC' },
    });

    const latestSteps = await this.stepRepository.findOne({
      where: {
        userId: user.id,
        createdAt: MoreThanOrEqual(today)
      },
      order: { createdAt: 'DESC' },
    });

    return {
      username: latestUser?.username,
      gender: latestUser?.gender,
      age: latestUserPhysics?.age,
      weight: latestUserPhysics?.weight,
      height: latestUserPhysics?.height,
      fatPercentage: latestUserPhysics?.fatPercentage?.min || null,
      trainingLevel: latestTrainingProgram?.trainingLevel || null,
      daysPerWeek: latestTrainingProgram?.daysPerWeek || null,
      goal: latestUserPhysics?.goal?.name || null,
      steps: latestSteps?.count || 0,
    };
  }
}
