import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoStatus } from '../todo-status-enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id_Todo: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  userId: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id_user' })
  user: User;
}
