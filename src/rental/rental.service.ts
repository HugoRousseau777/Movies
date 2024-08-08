import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalsRepository: Repository<Rental>
  ) {}


  async create(createRentalDto: CreateRentalDto) {
    const rental = this.rentalsRepository.create(createRentalDto);

    let rental_date = new Date(createRentalDto.rental_date);
    let return_date = new Date (createRentalDto.return_date)
    const millisecondsPerDay = 24*60*60*1000

    if((return_date.getTime() - rental_date.getTime())
    / millisecondsPerDay < 7 ||
    ((return_date.getTime() - rental_date.getTime())
    / millisecondsPerDay > 21) )
    {
      throw "la location doit durer entre 1 semaine et 3 semaines" + ((return_date.getTime() - rental_date.getTime())
      / millisecondsPerDay);
    }
    console.log((return_date.getTime() - rental_date.getTime())
    / millisecondsPerDay)
    return await this.rentalsRepository.save(rental);
  }

  async findAll() {
    return await this.rentalsRepository.find();
  }

  async findOne(rental_id: number) {
    return await this.rentalsRepository.findOne({
      where: { rental_id }
    });
  }
/* Seulement pour les employés en magasin avec une clé de sécurité
  async update(rental_id: number, updateRentalDto: UpdateRentalDto) {
    const rental = await this.findOne(rental_id);
    if(!rental){
      throw new NotFoundException();
    }

    Object.assign(rental, updateRentalDto);

    return await this.rentalsRepository.save(rental);
  }
*/
  async remove(rental_id: number) {
    const rental = await this.findOne(rental_id);
    if(!rental) {
      throw new NotFoundException();
    }
    return await this.rentalsRepository.remove(rental);
  }
}
