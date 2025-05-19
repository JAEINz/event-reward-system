import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { EventTable } from './type';
import { EventStatus } from 'apps/libs/enum/event.enum';

export class GetAllEventListRequestDto {
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

class GetAllEventResponseDto {
  @ApiProperty()
  readonly eventId: string;

  @ApiProperty()
  readonly userEmail: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly status: EventStatus;

  private constructor({
    eventId,
    userEmail,
    title,
    status,
  }: {
    eventId: string;
    userEmail: string;
    title: string;
    status: EventStatus;
  }) {
    this.eventId = eventId;
    this.userEmail = userEmail;
    this.title = title;
    this.status = status;
  }

  static from(event: EventTable) {
    const { _id, userId, title, status } = event;

    return new GetAllEventResponseDto({
      eventId: _id,
      userEmail:
        typeof userId === 'object' && 'email' in userId ? userId.email : '',
      title,
      status,
    });
  }
}

export class GetAllEventListResponseDto {
  @ApiProperty({ type: [GetAllEventResponseDto] })
  readonly eventList: GetAllEventResponseDto[];

  @ApiProperty()
  readonly totalCount: number;

  private constructor(eventList: GetAllEventResponseDto[], totalCount: number) {
    this.eventList = eventList;
    this.totalCount = totalCount;
  }

  static of(eventList: EventTable[], totalCount: number) {
    return new GetAllEventListResponseDto(
      eventList.map((event) => GetAllEventResponseDto.from(event)),
      totalCount,
    );
  }
}
