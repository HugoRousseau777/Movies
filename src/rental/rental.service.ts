import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalsRepository: Repository<Rental>,
    private readonly tasksService: TasksService,
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

    const rentalSaved = await this.rentalsRepository.save(rental)

    return await this.createTasks(rental);   
    
  }

  async createTasks(rental:Rental){
    await this.tasksService.create({
      rental: rental, reminder_one: false, reminder_two: false})
  }  

  async findallTasks(){
    return await this.tasksService.findAll();
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
  async remove(id: number) {
    const rental = await this.findOne(id);
    if(!rental) {
      throw new NotFoundException();
    }
    return await this.rentalsRepository.remove(rental);
  }

  @Cron('* * * * * *')
  async handleCron(){
    const allTasks = await this.findallTasks();
    const millisecondsPerDay = 24*60*60*1000;
    const millisecondsPerHour = 60*60*1000;

    // Works console.log(allTasks);


    let now = new Date(Date());
    allTasks.forEach( task => {
      

      console.log(task.rental);
      console.log(task.rental.return_date);
          
      
      let return_date = new Date(task.rental.return_date);
    })
    /*
      for (let i=0; i < allTasks.length ; i++ ) {
       // console.log(allTasks[i].rental.return_date);
        

        if(((return_date.getTime() - now.getTime()) / millisecondsPerDay)
        <= 5 && ((return_date.getTime() - now.getTime()) / millisecondsPerDay) > 3 
        && allTasks[i].reminder_one == false) {
          console.log(`Bonjour ${allTasks[i].rental.customer_id.first_name}, n'oubliez pas
            de rendre le film ${allTasks[i].rental.film_id.title} avant le ${allTasks[i].rental.return_date}`);
            this.tasksService.update(allTasks[i].task_id, {reminder_one : true, reminder_two : false});
        }
        if(((return_date.getTime() - now.getTime()) / millisecondsPerDay)
        <= 3 && allTasks[i].reminder_two == false) {
          console.log(`Bonjour ${allTasks[i].rental.customer_id.first_name}, n'oubliez pas
            de rendre le film ${allTasks[i].rental.film_id.title} avant le ${allTasks[i].rental.return_date}`);
            this.tasksService.update(allTasks[i].task_id, {reminder_one : true, reminder_two : true});
        }
      }
    
*/
  } 
}
