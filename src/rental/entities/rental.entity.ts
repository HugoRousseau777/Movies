import { Customer } from "src/customers/entities/customer.entity";
import { Film } from "src/films/entities/film.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rentals'})
export class Rental {

    @PrimaryGeneratedColumn()
    rental_id: number

    @Column()
    rental_date: Date

    @ManyToOne(() => Film)
    @JoinColumn()
    film_id: Film

    @ManyToOne(() => Customer)
    @JoinColumn()
    customer_id: Customer

    @Column()
    return_date: Date

    @OneToMany(()=> Task, (task) => task.rental)
    rental: Rental

 

}
