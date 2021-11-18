import {Entity, model, property, hasMany} from '@loopback/repository';
import {AdjuntosAsignaciones} from './adjuntos-asignaciones.model';
import {Comentarios} from './comentarios.model';

@model()
export class Asignaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
  })
  fecha_fin?: string;

  @hasMany(() => AdjuntosAsignaciones)
  adjuntosAsignaciones: AdjuntosAsignaciones[];

  @hasMany(() => Comentarios)
  comentarios: Comentarios[];

  @property({
    type: 'string',
  })
  incidenciaId?: string;

  @property({
    type: 'string',
  })
  operadorId?: string;

  constructor(data?: Partial<Asignaciones>) {
    super(data);
  }
}

export interface AsignacionesRelations {
  // describe navigational properties here
}

export type AsignacionesWithRelations = Asignaciones & AsignacionesRelations;
