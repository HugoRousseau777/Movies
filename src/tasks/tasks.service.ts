import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  static create: any;

  constructor(
    @InjectRepository(Task)  
    private readonly tasksRepository: Repository<Task>
  ) {
     
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);

    return await this.tasksRepository.save(task);
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(task_id: number) {
    return await this.tasksRepository.findOne({
      where: { task_id }
    });
  }
  async update(task_id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(task_id);
    if(!task){
      throw new NotFoundException();
    }

    Object.assign(task, updateTaskDto);

    return await this.tasksRepository.save(task);
  }

  async remove(task_id: number) {
    const task = await this.findOne(task_id);
    if(!task) {
      throw new NotFoundException();
    }
    return await this.tasksRepository.remove(task);
  }
}
