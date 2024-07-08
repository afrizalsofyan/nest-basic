import { Injectable } from '@nestjs/common';

@Injectable()
export class LearnService {
  getLearn() {
    return {
      name: 'latian',
      data: true,
    };
  }
}
