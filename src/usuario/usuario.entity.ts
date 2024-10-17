import * as bcrypt from 'bcrypt';
import { PESSOA } from 'src/pessoa/pessoa.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

//classe de usuário, utilizado para manter padrão dos usuários armazenados
@Entity()
export class USUARIO{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    CIDADE: string;

    @Column({length: 255})
    EMAIL: string;

    @Column({length: 255})
    TELEFONE: string;

    @Column({ type: 'date' })
    ASSINATURA: Date; 

    @Column({length: 255})
    SENHA: string; 


    @OneToOne(() => PESSOA)
    @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    PESSOA: PESSOA;
  
    trocaSenha(senha){
        const saltOrRounds = 10;
        this.SENHA = bcrypt.hashSync(senha,saltOrRounds)
    }

    login(senha){
        return bcrypt.compareSync(senha,this.SENHA);
    }
}