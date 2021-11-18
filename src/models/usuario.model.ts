import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Incidencia} from './incidencia.model';
import {Dependencia} from './dependencia.model';
import {Persona} from './persona.model';

@model()
export class Usuario extends Entity {
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
  cargo: string;

  @hasMany(() => Incidencia)
  incidencias: Incidencia[];

  @belongsTo(() => Dependencia)
  dependenciaId: string;

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
