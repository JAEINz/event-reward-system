import { ApiProperty } from '@nestjs/swagger';
import { UserRoleType } from 'apps/libs/enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password!: string;

  @ApiProperty({ enum: UserRoleType })
  @IsNotEmpty()
  @IsEnum(UserRoleType)
  readonly role!: UserRoleType;
}
