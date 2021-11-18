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
Operador,
Asignaciones,
Incidencia,
} from '../models';
import {OperadorRepository} from '../repositories';

export class OperadorIncidenciaController {
  constructor(
    @repository(OperadorRepository) protected operadorRepository: OperadorRepository,
  ) { }

  @get('/operadors/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Array of Operador has many Incidencia through Asignaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Incidencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Incidencia>,
  ): Promise<Incidencia[]> {
    return this.operadorRepository.incidencias(id).find(filter);
  }

  @post('/operadors/{id}/incidencias', {
    responses: {
      '200': {
        description: 'create a Incidencia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incidencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Operador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {
            title: 'NewIncidenciaInOperador',
            exclude: ['id'],
          }),
        },
      },
    }) incidencia: Omit<Incidencia, 'id'>,
  ): Promise<Incidencia> {
    return this.operadorRepository.incidencias(id).create(incidencia);
  }

  @patch('/operadors/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Operador.Incidencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {partial: true}),
        },
      },
    })
    incidencia: Partial<Incidencia>,
    @param.query.object('where', getWhereSchemaFor(Incidencia)) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.operadorRepository.incidencias(id).patch(incidencia, where);
  }

  @del('/operadors/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Operador.Incidencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Incidencia)) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.operadorRepository.incidencias(id).delete(where);
  }
}
