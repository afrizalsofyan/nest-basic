import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @Get('profile')
  async detailUser(@Req() req) {
    return await this.authService.profileUser(req.user.id);
  }

  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'public/uploads/image',
        filename: (req, file, cb) => {
          const mimetype = file.mimetype.split('/');
          const user = req.user;
          cb(
            null,
            // @ts-ignore
            `${user.name}_${file.fieldname}_${new Date().getTime()}.${mimetype[mimetype.length - 1]}`,
          );
        },
      }),
    }),
  )
  @UseGuards(AuthGuard)
  @Patch('avatar')
  async updateAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadAvatar(
      req.user.id,
      file?.path.replace('public', ''),
    );
  }
}
