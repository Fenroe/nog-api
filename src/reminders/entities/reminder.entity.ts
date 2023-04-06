import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reminder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    message: string;

    @Column()
    date: Date;
}
