import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Goal } from '../goals/goals.entity';
import { FatPercentage } from '../fat-percentages/fat-percentage.entity';

@Entity()
export class UserPhysics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // relation with user table

  @Column()
  goalId: number; // relation with goal table

  @Column()
  age: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @ManyToOne(() => User, (user) => user.userPhysics)
  user: User;

  @ManyToOne(() => Goal, (goal) => goal.userPhysics)
  goal: Goal;

  @ManyToOne(() => FatPercentage, (fatPercentage) => fatPercentage.userPhysics)
  fatPercentage: FatPercentage;
}
