import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from 'apps/libs/enum/event.enum';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @ApiProperty({ enum: EventStatus })
  @IsNotEmpty()
  @IsEnum(EventStatus)
  readonly status!: EventStatus;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  readonly startDate!: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  readonly endDate!: string;
}
