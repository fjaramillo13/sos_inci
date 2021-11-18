import {Entity, model, property, hasMany} from '@loopback/repository';
import {Dependencia} from './dependencia.model';

@model()
export class Empresas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Dependencia)
  dependencias: Dependencia[];

  constructor(data?: Partial<Empresas>) {
    super(data);
  }
}

export interface EmpresasRelations {
  // describe navigational properties here
}

export type EmpresasWithRelations = Empresas & EmpresasRelations;
