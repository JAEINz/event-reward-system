import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimRewardRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly rewardId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly eventId!: string;
}
