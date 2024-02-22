import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(id: string, createContactDto: CreateContactDto) {
    const client = await this.prisma.user.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    const contact = new Contact();
    Object.assign(contact, {
      ...createContactDto,
      registration_date: new Date().toString(),
      client: { connect: { ...client } },
    });
    await this.prisma.contact.create({
      data: { ...contact },
    });
    return plainToInstance(Contact, contact);
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany();
    return plainToInstance(Contact, contacts);
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return plainToInstance(Contact, contact);
  }

  async findOneUser(clientId: string) {
    const contact = await this.prisma.contact.findMany({
      where: { clientId },
    });
    if (!contact) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(Contact, contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });

    return plainToInstance(Contact, updatedContact);
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.prisma.contact.delete({ where: { id } });
  }

  async getUsersAndContacts() {
    const usersAndContacts = await this.prisma.user.findMany({
      include: { contacts: true },
    });

    return usersAndContacts.map((user) => {
      return {
        ...user,
        contacts: plainToInstance(Contact, user.contacts),
      };
    });
  }
}
