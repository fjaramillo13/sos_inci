import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {AdjuntosIncidencia} from './adjuntos-incidencia.model';
import {Operador} from './operador.model';
import {Asignaciones} from './asignaciones.model';

@model()
export class Incidencia extends Entity {
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
  codigo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_creacion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  relevancia: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => AdjuntosIncidencia)
  adjuntosIncidencias: AdjuntosIncidencia[];

  @hasMany(() => Operador, {through: {model: () => Asignaciones}})
  operadors: Operador[];

  constructor(data?: Partial<Incidencia>) {
    super(data);
  }
}

export interface IncidenciaRelations {
  // describe navigational properties here
}

export type IncidenciaWithRelations = Incidencia & IncidenciaRelations;
