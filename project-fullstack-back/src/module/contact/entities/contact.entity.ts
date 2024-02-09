import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  telephone: string;
  registration_date: string;

  constructor() {
    this.id = randomUUID();
  }
}
