import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Photo from './photo.model';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
  })
  updatedAt!: Date;

  @Column()
  deletedAt!: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos!: Photo[];
}

export default User;
