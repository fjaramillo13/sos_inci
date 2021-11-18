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
Asignaciones,
Operador,
} from '../models';
import {IncidenciaRepository} from '../repositories';

export class IncidenciaOperadorController {
  constructor(
    @repository(IncidenciaRepository) protected incidenciaRepository: IncidenciaRepository,
  ) { }

  @get('/incidencias/{id}/operadors', {
    responses: {
      '200': {
        description: 'Array of Incidencia has many Operador through Asignaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Operador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Operador>,
  ): Promise<Operador[]> {
    return this.incidenciaRepository.operadors(id).find(filter);
  }

  @post('/incidencias/{id}/operadors', {
    responses: {
      '200': {
        description: 'create a Operador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Operador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Incidencia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operador, {
            title: 'NewOperadorInIncidencia',
            exclude: ['id'],
          }),
        },
      },
    }) operador: Omit<Operador, 'id'>,
  ): Promise<Operador> {
    return this.incidenciaRepository.operadors(id).create(operador);
  }

  @patch('/incidencias/{id}/operadors', {
    responses: {
      '200': {
        description: 'Incidencia.Operador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operador, {partial: true}),
        },
      },
    })
    operador: Partial<Operador>,
    @param.query.object('where', getWhereSchemaFor(Operador)) where?: Where<Operador>,
  ): Promise<Count> {
    return this.incidenciaRepository.operadors(id).patch(operador, where);
  }

  @del('/incidencias/{id}/operadors', {
    responses: {
      '200': {
        description: 'Incidencia.Operador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Operador)) where?: Where<Operador>,
  ): Promise<Count> {
    return this.incidenciaRepository.operadors(id).delete(where);
  }
}
