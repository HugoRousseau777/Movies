import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  private readonly logger = new Logger(AppService.name);


  getHello(): string {
    return 'Hello World!';
  }

}
