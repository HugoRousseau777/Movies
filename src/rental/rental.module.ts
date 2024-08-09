import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { Customer } from 'src/customers/entities/customer.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { Rental } from './entities/rental.entity';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Task, Customer]), TasksModule, CustomersModule, EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
