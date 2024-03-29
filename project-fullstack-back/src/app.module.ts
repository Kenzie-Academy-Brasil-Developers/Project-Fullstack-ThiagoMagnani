import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ContactsModule } from './module/contact/contact.module';

@Module({
  imports: [UsersModule, AuthModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
