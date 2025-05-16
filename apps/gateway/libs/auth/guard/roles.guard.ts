import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get('roles', context.getHandler());

    if (!requiredRoles || !Array.isArray(requiredRoles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { role: string };
    return requiredRoles.includes(user.role);
  }
}
