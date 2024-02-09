import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { PdfGeneratorService } from 'pdf-generator.pdf';

@Module({
  controllers: [UsersController, ContactController],
  providers: [UsersService, ContactService, PrismaService, PdfGeneratorService],
})
export class ContactsModule {}
