// training-program.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class TrainingProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // relation with user table

  @Column({
    type: 'enum',
    enum: ['Beginner', 'Advanced'],
  })
  trainingLevel: string;

  @Column()
  daysPerWeek: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.trainingProgram)
  @JoinColumn()
  user: User;
}
