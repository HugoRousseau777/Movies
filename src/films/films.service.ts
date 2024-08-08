import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {

  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>
  ) {
     
  }


  async create(createFilmDto: CreateFilmDto) {
    const film = this.filmsRepository.create(createFilmDto);
    return await this.filmsRepository.save(film);
  }

  async findAll() {
    return await this.filmsRepository.find();
  }

  async findOne(film_id: number) {
    return await this.filmsRepository.findOne({
      where: { film_id }
    });
  }

  async update(film_id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.findOne(film_id);
    if(!film){
      throw new NotFoundException();
    }

    Object.assign(film, updateFilmDto);

    return await this.filmsRepository.save(film);
  }

  async remove(film_id: number) {
    const film = await this.findOne(film_id);
    if(!film) {
      throw new NotFoundException();
    }
    return await this.filmsRepository.remove(film);
  }
}
