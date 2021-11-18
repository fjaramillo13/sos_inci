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
import {AdjuntosIncidencia} from '../models';
import {AdjuntosIncidenciaRepository} from '../repositories';

export class AdjincidenciaController {
  constructor(
    @repository(AdjuntosIncidenciaRepository)
    public adjuntosIncidenciaRepository : AdjuntosIncidenciaRepository,
  ) {}

  @post('/adjuntos-incidencias')
  @response(200, {
    description: 'AdjuntosIncidencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdjuntosIncidencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosIncidencia, {
            title: 'NewAdjuntosIncidencia',
            exclude: ['id'],
          }),
        },
      },
    })
    adjuntosIncidencia: Omit<AdjuntosIncidencia, 'id'>,
  ): Promise<AdjuntosIncidencia> {
    return this.adjuntosIncidenciaRepository.create(adjuntosIncidencia);
  }

  @get('/adjuntos-incidencias/count')
  @response(200, {
    description: 'AdjuntosIncidencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdjuntosIncidencia) where?: Where<AdjuntosIncidencia>,
  ): Promise<Count> {
    return this.adjuntosIncidenciaRepository.count(where);
  }

  @get('/adjuntos-incidencias')
  @response(200, {
    description: 'Array of AdjuntosIncidencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdjuntosIncidencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdjuntosIncidencia) filter?: Filter<AdjuntosIncidencia>,
  ): Promise<AdjuntosIncidencia[]> {
    return this.adjuntosIncidenciaRepository.find(filter);
  }

  @patch('/adjuntos-incidencias')
  @response(200, {
    description: 'AdjuntosIncidencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosIncidencia, {partial: true}),
        },
      },
    })
    adjuntosIncidencia: AdjuntosIncidencia,
    @param.where(AdjuntosIncidencia) where?: Where<AdjuntosIncidencia>,
  ): Promise<Count> {
    return this.adjuntosIncidenciaRepository.updateAll(adjuntosIncidencia, where);
  }

  @get('/adjuntos-incidencias/{id}')
  @response(200, {
    description: 'AdjuntosIncidencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdjuntosIncidencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdjuntosIncidencia, {exclude: 'where'}) filter?: FilterExcludingWhere<AdjuntosIncidencia>
  ): Promise<AdjuntosIncidencia> {
    return this.adjuntosIncidenciaRepository.findById(id, filter);
  }

  @patch('/adjuntos-incidencias/{id}')
  @response(204, {
    description: 'AdjuntosIncidencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosIncidencia, {partial: true}),
        },
      },
    })
    adjuntosIncidencia: AdjuntosIncidencia,
  ): Promise<void> {
    await this.adjuntosIncidenciaRepository.updateById(id, adjuntosIncidencia);
  }

  @put('/adjuntos-incidencias/{id}')
  @response(204, {
    description: 'AdjuntosIncidencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() adjuntosIncidencia: AdjuntosIncidencia,
  ): Promise<void> {
    await this.adjuntosIncidenciaRepository.replaceById(id, adjuntosIncidencia);
  }

  @del('/adjuntos-incidencias/{id}')
  @response(204, {
    description: 'AdjuntosIncidencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adjuntosIncidenciaRepository.deleteById(id);
  }
}
