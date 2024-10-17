import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { USUARIO } from './usuario.entity';
import { criaUsuarioDTO } from './dto/usuario.dto';
import { alteraUsuarioDTO } from './dto/alteraUsuario.dto';
import { PESSOA } from 'src/pessoa/pessoa.entity';
import { PessoaService } from 'src/pessoa/pessoa.service';
import Datas from 'src/utils/data';



@Injectable()
export class USUARIOService {
  objDatas: Datas; 
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
    private readonly pessoaService: PessoaService,   
  ) {
    this.objDatas = new Datas();
  }

  async listar(): Promise<USUARIO[]> {
    return this.usuarioRepository.find();
  }

async adicionaAssinatura(id:string ,dias: number){
    const usuario = await this.localizarID(id);

    usuario.ASSINATURA = this.objDatas.adicionarDias(usuario.ASSINATURA,dias);
    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "USUARIO alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
}

  async inserir(dados: criaUsuarioDTO): Promise<RetornoCadastroDTO>{
    let usuario = new USUARIO();
        usuario.ID = uuid();

    let retornoPessoa = await this.pessoaService.inserir(dados.PESSOA)
    let pessoa = await this.pessoaService.localizarID(retornoPessoa.id)
    
    usuario.CIDADE = dados.CIDADE;
    usuario.EMAIL = dados.EMAIL;
    usuario.trocaSenha(dados.SENHA)
    usuario.TELEFONE = dados.TELEFONE;
    usuario.ASSINATURA = this.objDatas.dataAtual();
    usuario.PESSOA = pessoa;
        

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "USUARIO cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  async localizarID(ID: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        ID,
      },
    });
  }

  async localizarEmail(EMAIL: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        EMAIL,
      },
    });
  }

  async Login(email:string ,senha:string){
    //primeiro é pesquisado o usuário por meio do email
    const possivelUsuario = await this.localizarEmail(email)

    return {
        //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
        usuario: possivelUsuario.login(senha)?possivelUsuario:null,
        status: possivelUsuario.login(senha)
    };
}

async validaEmail(emailNovo: string){
    const possivelUsuario = await this.localizarEmail(emailNovo)
    
    return (possivelUsuario == null)
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);
    
    return this.usuarioRepository.remove(usuario)
    .then((result) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "USUARIO excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: alteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'ID'){
              return;
          }
          else if(chave === 'PESSOA'){
            this.pessoaService.alterar(usuario.PESSOA.ID,valor)
          }
          usuario[chave] = valor;
      }
    )

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "USUARIO alterado!"
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