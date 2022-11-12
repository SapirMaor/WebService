import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Division } from "./Division";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    //many messages to one division
    @ManyToOne(() => Division)
    @JoinColumn()
    divisionId: Division;

    @Column()
    done: boolean

}
