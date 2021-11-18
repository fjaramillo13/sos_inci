import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asignaciones} from './asignaciones.model';

@model()
export class Comentarios extends Entity {
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
  descripcion: string;

  @belongsTo(() => Asignaciones)
  asignacionesId: string;

  constructor(data?: Partial<Comentarios>) {
    super(data);
  }
}

export interface ComentariosRelations {
  // describe navigational properties here
}

export type ComentariosWithRelations = Comentarios & ComentariosRelations;
