import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private roleHierarchy = {
    admin: ['admin', 'user'],
    user: ['user'],
  }

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // capture which roles are required
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
    ]);

    if(!requiredRoles) {
      throw new ForbiddenException(`no roles defined`);
    }

    // check if the current user has those roles, return true if valid, false if invalid
    const request = context.switchToHttp().getRequest();
    
    return requiredRoles.some((role) => this.roleHierarchy[request.user.roles]?.includes(role));
  }
}