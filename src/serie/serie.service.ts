import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { SERIE } from './serie.entity';
import { CriaSerieDTO } from './dto/criaSerie.dto';
import { AlteraSerieDTO } from './dto/atualizaSerie.dto';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';


@Injectable()
export class SerieService {
  constructor(
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<SERIE>,
  ) {}

  async listar(): Promise<SERIE[]> {
    return this.generoRepository.find();
  }

  async inserir(dados: CriaSerieDTO): Promise<RetornoCadastroDTO>{
    let serie = new SERIE();
    serie.ID = uuid();
    serie.NOMESERIE = dados.NOMESERIE;
    serie.TEMPORADA = dados.TEMPORADA;

    return this.generoRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "Serie cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })
  }

  localizarID(ID: string): Promise<SERIE> {
    return this.generoRepository.findOne({
      where: {
        ID,
      },
    });
  }

  localizarNome(NOMESERIE: string): Promise<SERIE> {
    return this.generoRepository.findOne({
      where: {
        NOMESERIE,
      },
    });
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);
    
    return this.generoRepository.remove(serie)
    .then((result) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Serie excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          serie[chave] = valor;
      }
    )

    return this.generoRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "Serie alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}