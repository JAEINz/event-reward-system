export class RefreshTokenUserPayload {
  readonly userId!: string;
}

export class RefreshTokenUserRequestDto extends RefreshTokenUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
