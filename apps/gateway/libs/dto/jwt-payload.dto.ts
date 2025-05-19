export class JwtUserPayload {
  readonly userId!: string;

  readonly role!: string;
}

export class JwtUserRequestDto extends JwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
