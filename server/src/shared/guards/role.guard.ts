import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { userEnum } from '../enums';
import { User } from 'src/user/user.entity';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<userEnum.Role[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requireRoles) return true;
    const { user } = context.switchToHttp().getRequest();

    return requireRoles.some((role) => (user as User).role === role);
  }
}
