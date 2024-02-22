import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsEmail({}, { each: true })
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  telephone: string;
}
