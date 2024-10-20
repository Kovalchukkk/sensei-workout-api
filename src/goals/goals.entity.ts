import { UserPhysics } from '../user-physics/user-physics.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Gain', 'Recomposition', 'Dry'],
  })
  name: string;

  // OneToMany relationship with UserPhysics
  @OneToMany(() => UserPhysics, (userPhysics) => userPhysics.goal)
  userPhysics: UserPhysics[];
}
