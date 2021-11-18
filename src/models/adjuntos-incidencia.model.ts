import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Incidencia} from './incidencia.model';

@model()
export class AdjuntosIncidencia extends Entity {
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

  @belongsTo(() => Incidencia)
  incidenciaId: string;

  constructor(data?: Partial<AdjuntosIncidencia>) {
    super(data);
  }
}

export interface AdjuntosIncidenciaRelations {
  // describe navigational properties here
}

export type AdjuntosIncidenciaWithRelations = AdjuntosIncidencia & AdjuntosIncidenciaRelations;
