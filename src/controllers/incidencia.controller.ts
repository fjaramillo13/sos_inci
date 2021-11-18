import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Incidencia} from '../models';
import {IncidenciaRepository} from '../repositories';

export class IncidenciaController {
  constructor(
    @repository(IncidenciaRepository)
    public incidenciaRepository : IncidenciaRepository,
  ) {}

  @post('/incidencias')
  @response(200, {
    description: 'Incidencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Incidencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {
            title: 'NewIncidencia',
            exclude: ['id'],
          }),
        },
      },
    })
    incidencia: Omit<Incidencia, 'id'>,
  ): Promise<Incidencia> {
    return this.incidenciaRepository.create(incidencia);
  }

  @get('/incidencias/count')
  @response(200, {
    description: 'Incidencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Incidencia) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.incidenciaRepository.count(where);
  }

  @get('/incidencias')
  @response(200, {
    description: 'Array of Incidencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Incidencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Incidencia) filter?: Filter<Incidencia>,
  ): Promise<Incidencia[]> {
    return this.incidenciaRepository.find(filter);
  }

  @patch('/incidencias')
  @response(200, {
    description: 'Incidencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {partial: true}),
        },
      },
    })
    incidencia: Incidencia,
    @param.where(Incidencia) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.incidenciaRepository.updateAll(incidencia, where);
  }

  @get('/incidencias/{id}')
  @response(200, {
    description: 'Incidencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Incidencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Incidencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Incidencia>
  ): Promise<Incidencia> {
    return this.incidenciaRepository.findById(id, filter);
  }

  @patch('/incidencias/{id}')
  @response(204, {
    description: 'Incidencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {partial: true}),
        },
      },
    })
    incidencia: Incidencia,
  ): Promise<void> {
    await this.incidenciaRepository.updateById(id, incidencia);
  }

  @put('/incidencias/{id}')
  @response(204, {
    description: 'Incidencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() incidencia: Incidencia,
  ): Promise<void> {
    await this.incidenciaRepository.replaceById(id, incidencia);
  }

  @del('/incidencias/{id}')
  @response(204, {
    description: 'Incidencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.incidenciaRepository.deleteById(id);
  }
}
