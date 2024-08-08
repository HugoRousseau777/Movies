import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'films'})
export class Film {
    @PrimaryGeneratedColumn()
    film_id: number;

    @Column()
    title: string;

    
}
