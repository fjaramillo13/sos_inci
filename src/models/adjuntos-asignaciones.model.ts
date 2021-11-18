import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asignaciones} from './asignaciones.model';

@model()
export class AdjuntosAsignaciones extends Entity {
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
  url: string;

  @belongsTo(() => Asignaciones)
  asignacionesId: string;

  constructor(data?: Partial<AdjuntosAsignaciones>) {
    super(data);
  }
}

export interface AdjuntosAsignacionesRelations {
  // describe navigational properties here
}

export type AdjuntosAsignacionesWithRelations = AdjuntosAsignaciones & AdjuntosAsignacionesRelations;
