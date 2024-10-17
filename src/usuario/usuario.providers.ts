import { DataSource } from 'typeorm';
import { USUARIO } from './usuario.entity';

export const pessoaProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(USUARIO),
    inject: ['DATA_SOURCE'],
  },
];