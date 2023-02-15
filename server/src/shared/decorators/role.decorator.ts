import { SetMetadata } from '@nestjs/common';
import { userEnum } from '../enums';

export const Roles = (...roles: userEnum.Role[]) => SetMetadata('roles', roles);
