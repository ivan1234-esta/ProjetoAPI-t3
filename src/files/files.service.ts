import { Inject, Injectable } from '@nestjs/common';
import { FILES } from './files.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO } from 'src/dto/retorno.dto';

@Injectable()
export class FilesService {
    constructor(
        @Inject('FILES_REPOSITORY')
        private filesRepository: Repository<FILES>
        ) {}
  arquivos = [];  
  
  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new FILES();
    var nome = file.filename;
    var nome2 = nome.split('_id_');
    var nome3 = nome.path.parse(file.originalname).exts
    arquivo.ID = nome2[1];
    arquivo.FILENAME = nome2[0];
    arquivo.CONTENTLENGTH = file.size;
    arquivo.CONTENTTYPE = file.mimetype;
    arquivo.URL = `${file.filename}`;

    return this.filesRepository.save(arquivo)
        .then((result) => {
        return <RetornoCadastroDTO>{
            id: arquivo.ID,
            message: "Arquivo inserido!"
        };
        })
        .catch((error) => {
        return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
  }

  async validaArquivo(ID: string){
    const possivelArquivo = this.filesRepository.findOne(
        {where: 
            {ID}
        }
    );
    return(possivelArquivo!==undefined)
  }

  async localizar(ID: string){
    const possivelArquivo = await this.filesRepository.findOne(
        {where: 
            {ID}
        }
    );
    return possivelArquivo
  }


}