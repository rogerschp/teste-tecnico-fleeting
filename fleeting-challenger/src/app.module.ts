import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TodoModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'fleeting_challenger',
      username: 'rogerschp',
      password: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
