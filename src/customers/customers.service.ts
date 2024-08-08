import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>
  ) {
     
  }

    async create(createCustomerDto: CreateCustomerDto) {
     if (createCustomerDto.utc < -12 || createCustomerDto.utc > 12) {
        throw "Only between -12 and 12 !";
      }
    const customer = this.customersRepository.create(createCustomerDto);
    return await this.customersRepository.save(customer);
  }

  async findAll() {
    return await this.customersRepository.find();
  }

  async findOne(customer_id: number) {
    return await this.customersRepository.findOne({
      where: { customer_id }
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    if(!customer){
      throw new NotFoundException();
    }

    Object.assign(customer, updateCustomerDto);

    return await this.customersRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    if(!customer) {
      throw new NotFoundException();
    }
    return await this.customersRepository.remove(customer);
  }
}
