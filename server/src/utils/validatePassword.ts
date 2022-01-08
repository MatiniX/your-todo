import { BadRequestException } from '@nestjs/common';

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new BadRequestException(
      'Password must be at least 8 charachters long!',
    );
  }
  if (!password.match(/[0-9]/)) {
    throw new BadRequestException('Password must contain a number!');
  }
  return true;
};
