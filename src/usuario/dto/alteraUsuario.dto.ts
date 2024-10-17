//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SenhaForte } from "../validacao/strongpass.validator";
import { AlteraPessoaDTO } from "src/pessoa/dto/atualizaPessoa.dto";

export class alteraUsuarioDTO{

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "joao@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    EMAIL: string;

    @MinLength(8, {message: "senha deve ter no minimo 8 digitos"})
    @ApiPropertyOptional({
        example: "Senha@444151241",
        description: "Senha do usuário, deve ter pelo menos 8 digitos, tendo numeros, letras e caracteres especiais"
    })
    @IsOptional()
    @SenhaForte({message:"Senha deve ter complexidade maior. Está muito fraca"})
    SENHA:string;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: "1990",
        description: "Ano de nascimento do usuário, deve ser informado como Numero(number)"
    })
    IDADE: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Bauru",
        description: "Cidade do usuário, deve ser informado um texto com a cidade"
    })
    CIDADE: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    TELEFONE: string;

    @IsOptional()
    PESSOA: AlteraPessoaDTO;
    
}