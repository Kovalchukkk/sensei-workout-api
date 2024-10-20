import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Goal } from '../goals/goals.entity';
import { FatPercentage } from '../fat-percentages/fat-percentage.entity';

@Entity()
export class UserPhysics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // relation with user table

  @Column({ nullable: true })
  goalId: number; // relation with goal table

  @Column({ nullable: true })
  age: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  height: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userPhysics)
  user: User;

  @ManyToOne(() => Goal, (goal) => goal.userPhysics, { nullable: true })
  goal: Goal;

  @ManyToOne(() => FatPercentage, (fatPercentage) => fatPercentage.userPhysics, { nullable: true })
  fatPercentage: FatPercentage;
}
