import { Credential } from "src/credentials/entities/credential.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToOne(type => Credential, credentials => credentials.id)
    credentials: Credential;
}
