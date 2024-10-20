import { UserPhysics } from '../user-physics/user-physics.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class FatPercentage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('decimal', { precision: 5, scale: 2 })
  min: number;

  @Column('decimal', { precision: 5, scale: 2 })
  max: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // OneToMany relationship with UserPhysics
  @OneToMany(() => UserPhysics, (userPhysics) => userPhysics.fatPercentage)
  userPhysics: UserPhysics[];
}
