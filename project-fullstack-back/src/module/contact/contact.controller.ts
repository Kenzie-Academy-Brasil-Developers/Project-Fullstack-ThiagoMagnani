import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PdfGeneratorService } from 'pdf-generator.pdf';

@Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Post()
  create(@Req() req, @Body() createContactDto: CreateContactDto) {
    return this.contactService.create(req.user.id, createContactDto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Get('user/:clientId')
  findOneUser(@Param('clientId') id: string) {
    return this.contactService.findOneUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }

  @Get('/generate-pdf/user')
  async generatePdf(@Req() req) {
    const usersAndContacts = await this.contactService.getUsersAndContacts();
    const arquive = this.pdfGeneratorService.generatePdf(usersAndContacts);
    return { message: `PDF created successfully: ${arquive}` };
  }
}
