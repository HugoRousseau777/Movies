import { Rental } from "src/rental/entities/rental.entity";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    task_id: number;

    @OneToOne(() => Rental)
    @JoinColumn([
        {name: "rental_id", referencedColumnName: "rental_id"} 
    ])
    rental: Rental
}
