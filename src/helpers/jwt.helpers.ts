import { JwtService } from '@nestjs/jwt';

export const generateJwt = (
  jwtService: JwtService,
  payload: any,
  secret_key: string | Buffer,
  expired: string | number,
) => {
  return jwtService?.sign(payload, { secret: secret_key, expiresIn: expired });
};
