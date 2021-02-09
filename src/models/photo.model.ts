import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  ManyToOne,
  Generated,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './user.model';

@Entity('photos')
class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated('uuid')
  name!: string;

  @Column()
  convertedName!: string;

  @Column()
  clientName!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column()
  url!: string;

  @Column()
  createdAt!: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
  })
  updatedAt!: Date;

  @Column()
  deletedAt!: Date;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

export default Photo;
