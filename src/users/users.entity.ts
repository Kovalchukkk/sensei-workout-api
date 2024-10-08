import { TrainingProgram } from '../training-programs/training-programs.entity';
import { UserPhysics } from '../user-physics/user-physics.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Man', 'Woman'],
    nullable: true,
    default: null,
  })
  gender: string;

  @Column({
    default: false,
  })
  isBanned: boolean;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // OneToMany relationship with UserPhysics
  @OneToMany(() => UserPhysics, (userPhysics) => userPhysics.user)
  userPhysics: UserPhysics[];

  @OneToOne(() => TrainingProgram, (trainingProgram) => trainingProgram.user)
  trainingProgram: TrainingProgram;
}
