import { RoleType } from '../enum';

export class JwtUserPayload {
  readonly userId!: number;

  readonly role!: RoleType;
}

export class JwtUserRequestDto extends JwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
