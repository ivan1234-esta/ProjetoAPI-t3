import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'pdb1055.awardspace.net', // Endereço do Banco de Dados
        port: 3306, // Porta do Banco de Dados
        username: '4120380_senac', // Nome de Usuário do Banco de Dados
        password: '123Mudar@7', // Insira a senha aqui
        database: '4120380_senac', // Nome do Banco de Dados
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        connectTimeout: 30000, // Aumenta o tempo limite para 30 segundos

      });
      
      return dataSource.initialize();
    },
  },
];
