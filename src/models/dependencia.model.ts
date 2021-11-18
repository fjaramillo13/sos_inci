import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empresas} from './empresas.model';
import {Usuario} from './usuario.model';

@model()
export class Dependencia extends Entity {
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
  codigo: string;

  @belongsTo(() => Empresas)
  empresasId: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Dependencia>) {
    super(data);
  }
}

export interface DependenciaRelations {
  // describe navigational properties here
}

export type DependenciaWithRelations = Dependencia & DependenciaRelations;
