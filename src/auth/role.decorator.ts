import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/enums/userRole.enum';

export type AllowedRoles = keyof typeof UserRole | 'Any';
export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
