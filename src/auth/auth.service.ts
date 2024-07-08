import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { generateJwt } from 'src/helpers/jwt.helpers';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/configs/config_jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * register a new user
   * @param data
   * @returns
   */
  async register(data: RegisterDTO) {
    const checkUserExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (checkUserExists) {
      throw new HttpException('Email user already exists', HttpStatus.FOUND);
    }

    data.password = await hash(data.password, 12);

    const createUser = await this.prisma.users.create({
      data,
    });

    if (!createUser) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { success: true, message: 'Register successfuly' };
  }

  /**
   * Login a user to app
   * @param data
   * @returns
   */
  async login(data: LoginDTO) {
    const checkUserExists = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(
      data.password,
      checkUserExists.password,
    );

    if (!checkPassword) {
      throw new HttpException(
        'Email or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = generateJwt(
      this.jwtService,
      {
        sub: checkUserExists.id,
        name: checkUserExists.name,
        email: checkUserExists.email,
      },
      jwt_config.secret,
      jwt_config.exired,
    );

    return { success: true, message: 'Login success', accessToken: token };
  }
}
