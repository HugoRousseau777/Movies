export class RentalCreatedEvent {
    constructor(public readonly rentalId: number, public readonly return_date: Date) {}
}