import { Controller, Get } from '@nestjs/common';
import { LearnService } from './learn.service';

@Controller('learn')
export class LearnController {
  constructor(private learnService: LearnService) {}
  @Get()
  getLearn() {
    return this.learnService.getLearn();
  }
}
