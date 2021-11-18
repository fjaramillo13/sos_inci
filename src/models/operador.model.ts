import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Incidencia} from './incidencia.model';
import {Asignaciones} from './asignaciones.model';
import {Persona} from './persona.model';

@model()
export class Operador extends Entity {
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
  jornada: string;

  @property({
    type: 'string',
    required: true,
  })
  contrato: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_ingreso: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
  })
  fecha_fin?: string;

  @hasMany(() => Incidencia, {through: {model: () => Asignaciones}})
  incidencias: Incidencia[];

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<Operador>) {
    super(data);
  }
}

export interface OperadorRelations {
  // describe navigational properties here
}

export type OperadorWithRelations = Operador & OperadorRelations;
