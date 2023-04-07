import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reminder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event: string;

    @Column()
    message: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    eventDate: Date;

    @Column()
    remindOn: Date;

    @Column()
    discordServerId: string;

    @Column()
    recursOn: string;

    @ManyToOne(type => User)
    user: User;
}
