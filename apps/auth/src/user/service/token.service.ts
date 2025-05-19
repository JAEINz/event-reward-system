import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JwtUserPayload, RefreshTokenUserPayload } from 'apps/gateway/libs/dto';
import { createHash } from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createRefreshToken(payload: RefreshTokenUserPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
  }

  validateRefreshToken(refreshToken: string): RefreshTokenUserPayload {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('리프레시 토큰이 만료되었습니다.');
      } else if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('유효하지 않는 리프레시 토큰입니다.');
      } else {
        throw new InternalServerErrorException('jwt decode 실패');
      }
    }
  }

  hashRefreshToken(hashedRefreshToken: string) {
    return createHash('sha256').update(hashedRefreshToken).digest('hex');
  }

  createAccessToken(payload: JwtUserPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
  }
}
