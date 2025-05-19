import { ApiProperty } from '@nestjs/swagger';
import { ConditionType, RewardType } from 'apps/libs/enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class RewardDataRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly quantity!: number;
}

export class AddRewardRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly eventId!: string;

  @ApiProperty({ enum: ConditionType })
  @IsNotEmpty()
  @IsEnum(ConditionType)
  readonly conditionType!: ConditionType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly targetCount!: number;

  @ApiProperty({ enum: RewardType })
  @IsNotEmpty()
  @IsEnum(RewardType)
  readonly rewardType!: RewardType;

  @ApiProperty({ type: RewardDataRequestDto })
  @ValidateNested()
  @Type(() => RewardDataRequestDto)
  @IsNotEmpty()
  readonly data!: RewardDataRequestDto;
}
