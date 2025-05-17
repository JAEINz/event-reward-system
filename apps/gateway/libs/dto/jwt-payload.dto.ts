import { UserRoleType } from '../enum';

export class JwtUserPayload {
  readonly userId!: number;

  readonly role!: UserRoleType;
}

export class JwtUserRequestDto extends JwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
