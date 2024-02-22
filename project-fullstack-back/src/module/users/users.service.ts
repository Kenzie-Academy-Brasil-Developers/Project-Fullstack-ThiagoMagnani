import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
      registration_date: new Date().toLocaleDateString('pt-BR'),
    });
    await this.prisma.user.create({
      data: { ...user },
    });
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { contacts: true },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return plainToInstance(User, updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const contacts = await this.prisma.contact.findMany({
      where: { clientId: id },
    });

    for (const contact of contacts) {
      await this.prisma.contact.delete({ where: { id: contact.id } });
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
