import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asignaciones,
  AdjuntosAsignaciones,
} from '../models';
import {AsignacionesRepository} from '../repositories';

export class AsignacionesAdjuntosAsignacionesController {
  constructor(
    @repository(AsignacionesRepository) protected asignacionesRepository: AsignacionesRepository,
  ) { }

  @get('/asignaciones/{id}/adjuntos-asignaciones', {
    responses: {
      '200': {
        description: 'Array of Asignaciones has many AdjuntosAsignaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AdjuntosAsignaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AdjuntosAsignaciones>,
  ): Promise<AdjuntosAsignaciones[]> {
    return this.asignacionesRepository.adjuntosAsignaciones(id).find(filter);
  }

  @post('/asignaciones/{id}/adjuntos-asignaciones', {
    responses: {
      '200': {
        description: 'Asignaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdjuntosAsignaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosAsignaciones, {
            title: 'NewAdjuntosAsignacionesInAsignaciones',
            exclude: ['id'],
            optional: ['asignacionesId']
          }),
        },
      },
    }) adjuntosAsignaciones: Omit<AdjuntosAsignaciones, 'id'>,
  ): Promise<AdjuntosAsignaciones> {
    return this.asignacionesRepository.adjuntosAsignaciones(id).create(adjuntosAsignaciones);
  }

  @patch('/asignaciones/{id}/adjuntos-asignaciones', {
    responses: {
      '200': {
        description: 'Asignaciones.AdjuntosAsignaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosAsignaciones, {partial: true}),
        },
      },
    })
    adjuntosAsignaciones: Partial<AdjuntosAsignaciones>,
    @param.query.object('where', getWhereSchemaFor(AdjuntosAsignaciones)) where?: Where<AdjuntosAsignaciones>,
  ): Promise<Count> {
    return this.asignacionesRepository.adjuntosAsignaciones(id).patch(adjuntosAsignaciones, where);
  }

  @del('/asignaciones/{id}/adjuntos-asignaciones', {
    responses: {
      '200': {
        description: 'Asignaciones.AdjuntosAsignaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AdjuntosAsignaciones)) where?: Where<AdjuntosAsignaciones>,
  ): Promise<Count> {
    return this.asignacionesRepository.adjuntosAsignaciones(id).delete(where);
  }
}
