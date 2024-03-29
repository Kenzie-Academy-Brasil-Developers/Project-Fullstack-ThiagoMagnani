import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsString,

} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;
}
