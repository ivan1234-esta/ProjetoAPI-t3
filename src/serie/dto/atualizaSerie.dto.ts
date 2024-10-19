import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export class AlteraSerieDTO{
    @IsString()
    @Optional()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOMESERIE: string;

    @IsString()
    @Optional()
    @IsNotEmpty({message: "Temporada não pode ser vazio"})
    TEMPORADA: string;
}