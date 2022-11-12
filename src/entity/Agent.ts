import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { Division } from "./Division"

@Entity()
export class Agent {

    @PrimaryGeneratedColumn()
    id: number

    //many agents to one division
    @ManyToOne(() => Division)
    @JoinColumn()
    divisionId: Division;
    
}
