import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './user.model';

@Entity('photos')
class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Column(uuid())
  // unic random name with uuid
  name: string;

  @Column()
  convertedName: string;

  @Column()
  clientName: string;

  @Column()
  url: string;

  @Column()
  createdAt: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
  })
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}

export default Photo;
