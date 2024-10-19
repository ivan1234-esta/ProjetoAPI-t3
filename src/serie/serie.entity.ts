import { FILME } from "src/filmes/filme.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SERIE{
    @PrimaryColumn()
    ID:string;

    @Column({length:255})
    NOMESERIE:string;

    @Column({length:255})
    TEMPORADA: string;

    @Column({length:255})
    EPISODIO: string;

    @OneToOne(()=> FILME, filme => filme.serie)
    filmes: FILME[];
}