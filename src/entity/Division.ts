import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Division {

    @PrimaryGeneratedColumn()
    id: number
    
}
