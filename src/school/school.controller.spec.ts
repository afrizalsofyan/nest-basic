import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SchoolController', () => {
  let controller: SchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [SchoolService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<SchoolController>(SchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when request school', () => {
    describe('and get detail school', () => {
      it('should get details of school response', async () => {
        const existingSchool = {
          data: {
            id: 1,
            school_name: 'this first school name',
            email: null,
            address: null,
            phone: null,
          },
        };

        expect(await controller.findOne('1')).toEqual(existingSchool);
      });
    });
  });
});
