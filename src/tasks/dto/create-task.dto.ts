import { Rental } from "src/rental/entities/rental.entity";

export class CreateTaskDto {
    rental: Rental;
    reminder_one: Boolean;
    reminder_two: Boolean;
}
