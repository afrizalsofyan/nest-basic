import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SchoolService', () => {
  let service: SchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all school', () => {
    it('should return list of school', async () => {
      const existingSchool = [
        {
          id: 1,
          school_name: 'this first school name',
          email: null,
          address: null,
          phone: null,
        },
      ];

      const result = await service.findAll(1);
      expect(result.data).toHaveLength(1);
      expect(result.data).toEqual(existingSchool);
    });
  });

  describe('get detail school', () => {
    it('should return detail of school', async () => {
      const existingSchool = {
        id: 1,
        school_name: 'this first school name',
        email: null,
        address: null,
        phone: null,
      };

      const result = await service.findOne(1);

      expect(result.data).toEqual(existingSchool);
      expect(result.data).toHaveProperty('id');
    });

    it('should throw NotFoundException if school not exists', async () => {
      await expect(service.findOne(2)).rejects.toThrow('School not found');
    });
  });
});
