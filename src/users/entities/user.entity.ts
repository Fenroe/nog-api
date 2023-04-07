import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email?: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
}
