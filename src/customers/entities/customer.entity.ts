import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'customer'})
export class Customer {

    @PrimaryGeneratedColumn()
    customer_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string;
    
    @Column()
    active: boolean

    @Column()
    create_date: Date

    @Column() 
    utc: number

}
