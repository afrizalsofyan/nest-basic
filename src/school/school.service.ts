import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto) {
    try {
      const school = await this.prisma.schools.create({
        data: createSchoolDto,
      });
      if (!school) {
        throw new HttpException(
          'Created school data failed',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        data: school,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        console.log({ error });
        throw new HttpException('Request invalid', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const school = await this.prisma.schools.findMany();
    return { data: school };
  }

  async findOne(id: number) {
    return {
      data: await this.prisma.schools.findFirst({
        where: {
          id,
        },
      }),
    };
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    // return `This action updates a #${id} school`;
    const checkSchool = await this.findOne(id);
    if (!checkSchool.data) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND);
    }
    const updateSchool = await this.prisma.schools.update({
      where: {
        id: id,
      },
      data: updateSchoolDto,
    });

    return {
      success: true,
      message: 'Success updated school',
      data: updateSchool,
    };
  }

  async remove(id: number) {
    const checkSchool = await this.findOne(id);
    console.log({ checkSchool });

    if (!checkSchool.data) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND);
    }

    const deletedSchool = await this.prisma.schools.delete({
      where: {
        id,
      },
    });

    if (!deletedSchool) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      message: 'Success deleted school',
    };
  }
}
