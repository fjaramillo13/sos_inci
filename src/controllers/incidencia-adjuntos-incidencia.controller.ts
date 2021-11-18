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
  Incidencia,
  AdjuntosIncidencia,
} from '../models';
import {IncidenciaRepository} from '../repositories';

export class IncidenciaAdjuntosIncidenciaController {
  constructor(
    @repository(IncidenciaRepository) protected incidenciaRepository: IncidenciaRepository,
  ) { }

  @get('/incidencias/{id}/adjuntos-incidencias', {
    responses: {
      '200': {
        description: 'Array of Incidencia has many AdjuntosIncidencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AdjuntosIncidencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AdjuntosIncidencia>,
  ): Promise<AdjuntosIncidencia[]> {
    return this.incidenciaRepository.adjuntosIncidencias(id).find(filter);
  }

  @post('/incidencias/{id}/adjuntos-incidencias', {
    responses: {
      '200': {
        description: 'Incidencia model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdjuntosIncidencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Incidencia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosIncidencia, {
            title: 'NewAdjuntosIncidenciaInIncidencia',
            exclude: ['id'],
            optional: ['incidenciaId']
          }),
        },
      },
    }) adjuntosIncidencia: Omit<AdjuntosIncidencia, 'id'>,
  ): Promise<AdjuntosIncidencia> {
    return this.incidenciaRepository.adjuntosIncidencias(id).create(adjuntosIncidencia);
  }

  @patch('/incidencias/{id}/adjuntos-incidencias', {
    responses: {
      '200': {
        description: 'Incidencia.AdjuntosIncidencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosIncidencia, {partial: true}),
        },
      },
    })
    adjuntosIncidencia: Partial<AdjuntosIncidencia>,
    @param.query.object('where', getWhereSchemaFor(AdjuntosIncidencia)) where?: Where<AdjuntosIncidencia>,
  ): Promise<Count> {
    return this.incidenciaRepository.adjuntosIncidencias(id).patch(adjuntosIncidencia, where);
  }

  @del('/incidencias/{id}/adjuntos-incidencias', {
    responses: {
      '200': {
        description: 'Incidencia.AdjuntosIncidencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AdjuntosIncidencia)) where?: Where<AdjuntosIncidencia>,
  ): Promise<Count> {
    return this.incidenciaRepository.adjuntosIncidencias(id).delete(where);
  }
}
