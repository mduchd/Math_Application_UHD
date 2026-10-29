import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('STUDENT' | 'TEACHER')[]) => SetMetadata(ROLES_KEY, roles);
