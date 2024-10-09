
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class PESSOA {
    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    NOME: string;

    @Column()
    NASCIMENTO: Date;

    @Column({length: 255})
    PAIS: string;

    
}