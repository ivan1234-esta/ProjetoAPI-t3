import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { SerieService } from "./serie.service";
import { SERIE } from "./serie.entity";
import { CriaSerieDTO } from "./dto/criaSerie.dto";
import { AlteraSerieDTO } from "./dto/atualizaSerie.dto";

@Controller('/genero')
export class SerieController{
    constructor(private readonly generoService: SerieService){
             
    }

    @Get('listar')
    async listar(): Promise<SERIE[]>{
        return this.generoService.listar();
    }

    @Post('')
    async criaGenero(@Body() dados: CriaSerieDTO): Promise<RetornoCadastroDTO>{        
        return this.generoService.inserir(dados)        
    }

    @Put(':id')
    async alterarGenero(@Body() dados: AlteraSerieDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.generoService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<SERIE>{
        return this.generoService.localizarID(id);
    }

    @Delete('remove-:id')
    async removeGenero(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.generoService.remover(id);
    }    

}