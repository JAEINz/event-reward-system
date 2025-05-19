import { UserRewardRequestHistoryStatus } from 'apps/libs/enum';

interface UserSummary {
  _id: string;
  email: string;
}

interface EventSummary {
  _id: string;
  title: string;
}

export type UserRewardRequestHistoryTable = {
  _id: string;
  createdAt: Date;
  userId: string | UserSummary;
  rewardId: string | EventSummary;
  status: UserRewardRequestHistoryStatus;
};
