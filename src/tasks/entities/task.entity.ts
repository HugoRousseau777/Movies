import { Rental } from "src/rental/entities/rental.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    task_id: number;

    @ManyToOne(() => Rental, rental => rental.rental_id, {
        lazy: true, // To allow the join column to appear
        nullable: false, // To allow the join column to appear
        eager: true, // To allow the join column to appear
        cascade: true // To allow the join column to appear
    })
    @JoinColumn([
        {name: "rental_id", referencedColumnName: "rental_id"} 
    ])
    rental: Rental

    @Column()
    reminder_one:Boolean

    @Column()
    reminder_two:Boolean

}
