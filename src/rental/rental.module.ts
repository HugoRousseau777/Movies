import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
