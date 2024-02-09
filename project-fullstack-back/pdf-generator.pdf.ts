import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfGeneratorService {
  generatePdf(usersAndContacts) {
    const doc = new PDFDocument();

    usersAndContacts.forEach((user, index) => {
      if (index !== 0) {
        doc.addPage();
      }

      doc.font('Helvetica-Bold');
      doc.text('User Information:\n\n');
      doc.font('Helvetica');
      doc.text(
        `  - Name: ${user.name}\n  - Email: ${user.email}\n  - Telephone: ${this.formatPhoneNumber(user.telephone)}\n  - Registration Date: ${user.registration_date}\n\n\n`,
      );

      doc.font('Helvetica-Bold');
      doc.text('Contacts:\n\n');
      doc.font('Helvetica');

      user.contacts.forEach((contact) => {
        const contactHeight = this.calculateContactCont(contact);
        const remainingSpace =
          doc.page.height - doc.y - doc.page.margins.bottom;

        if (remainingSpace < contactHeight) {
          doc.addPage();
          doc.font('Helvetica-Bold');
          doc.text(`Contacts ${user.name} (continued):\n\n`);
          doc.font('Helvetica');
        }

        doc.text(
          `  - Name: ${contact.name}\n  - Email: 
          • ${contact.email.join(`
          • `)}\n  - Telephone:   
          • ${contact.telephone.map((phone) => this.formatPhoneNumber(phone))
            .join(`
          • `)}\n - Registration Date: ${contact.registration_date}\n________________________________\n\n`,
        );
      });
    });

    const pdfPath = `user_contacts.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();

    return pdfPath;
  }

  private calculateContactCont(contact): number {
    const doc = new PDFDocument();
    const lines = [
      `  - Name: ${contact.name}`,
      `  - Email: ${contact.email.join('\n')}`,
      `  - Telephone: ${contact.telephone.join('\n')}`,
      ` - Registration Date: ${contact.registration_date}`,
      '________________________________\n\n',
    ];

    return lines.reduce(
      (totalHeight, line) => totalHeight + doc.heightOfString(line),
      0,
    );
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  }
}
