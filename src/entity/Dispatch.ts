import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Message } from "./Message";
import { Agent } from "./Agent";

@Entity()
export class Dispatch {

    @PrimaryGeneratedColumn()
    id: number

    //one message to one dispatch
    @OneToOne(() => Message)
    @JoinColumn()
    messageId: Message

    //many dispatches to one agent
    @ManyToOne(() => Agent)
    @JoinColumn()
    agentId: Agent;

    @CreateDateColumn()
    timestamp : Date

}
