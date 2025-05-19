import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { UserRewardRequestHistoryTable } from './type';
import { UserRewardRequestHistoryStatus } from 'apps/libs/enum';

export class GetAllRewardRequestHistoryListListRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  readonly page!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  readonly pageSize!: number;
}

class GetAllRewardRequestHistoryListResponseDto {
  @ApiProperty()
  readonly eventTitle: string;

  @ApiProperty()
  readonly userEmail: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly status: UserRewardRequestHistoryStatus;

  private constructor({
    eventTitle,
    userEmail,
    status,
  }: {
    eventTitle: string;
    userEmail: string;
    status: UserRewardRequestHistoryStatus;
  }) {
    this.eventTitle = eventTitle;
    this.userEmail = userEmail;
    this.status = status;
  }

  static from(event: UserRewardRequestHistoryTable) {
    const { userId, rewardId, status } = event;

    return new GetAllRewardRequestHistoryListResponseDto({
      userEmail:
        typeof userId === 'object' && 'email' in userId ? userId.email : '',
      eventTitle:
        typeof rewardId === 'object' && 'email' in rewardId
          ? rewardId.title
          : '',
      status,
    });
  }
}

export class GetAllRewardRequestHistoryListListResponseDto {
  @ApiProperty({ type: [GetAllRewardRequestHistoryListResponseDto] })
  readonly eventList: GetAllRewardRequestHistoryListResponseDto[];

  @ApiProperty()
  readonly totalCount: number;

  private constructor(
    eventList: GetAllRewardRequestHistoryListResponseDto[],
    totalCount: number,
  ) {
    this.eventList = eventList;
    this.totalCount = totalCount;
  }

  static of(eventList: UserRewardRequestHistoryTable[], totalCount: number) {
    return new GetAllRewardRequestHistoryListListResponseDto(
      eventList.map((event) =>
        GetAllRewardRequestHistoryListResponseDto.from(event),
      ),
      totalCount,
    );
  }
}
