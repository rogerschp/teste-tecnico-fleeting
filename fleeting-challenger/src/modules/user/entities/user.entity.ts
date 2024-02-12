import { Todo } from 'src/modules/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
