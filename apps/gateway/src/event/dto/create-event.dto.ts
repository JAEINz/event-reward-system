import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from 'apps/gateway/libs/enum/event.enum';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEventRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @ApiProperty({ enum: EventStatus })
  @IsNotEmpty()
  @IsEnum(EventStatus)
  readonly status!: EventStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly conditionType!: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly conditionQuantity!: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  readonly startDate!: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  readonly endDate!: string;
}
