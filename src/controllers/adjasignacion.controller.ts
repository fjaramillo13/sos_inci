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
import {AdjuntosAsignaciones} from '../models';
import {AdjuntosAsignacionesRepository} from '../repositories';

export class AdjasignacionController {
  constructor(
    @repository(AdjuntosAsignacionesRepository)
    public adjuntosAsignacionesRepository : AdjuntosAsignacionesRepository,
  ) {}

  @post('/adjuntos-asignaciones')
  @response(200, {
    description: 'AdjuntosAsignaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdjuntosAsignaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosAsignaciones, {
            title: 'NewAdjuntosAsignaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    adjuntosAsignaciones: Omit<AdjuntosAsignaciones, 'id'>,
  ): Promise<AdjuntosAsignaciones> {
    return this.adjuntosAsignacionesRepository.create(adjuntosAsignaciones);
  }

  @get('/adjuntos-asignaciones/count')
  @response(200, {
    description: 'AdjuntosAsignaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdjuntosAsignaciones) where?: Where<AdjuntosAsignaciones>,
  ): Promise<Count> {
    return this.adjuntosAsignacionesRepository.count(where);
  }

  @get('/adjuntos-asignaciones')
  @response(200, {
    description: 'Array of AdjuntosAsignaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdjuntosAsignaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdjuntosAsignaciones) filter?: Filter<AdjuntosAsignaciones>,
  ): Promise<AdjuntosAsignaciones[]> {
    return this.adjuntosAsignacionesRepository.find(filter);
  }

  @patch('/adjuntos-asignaciones')
  @response(200, {
    description: 'AdjuntosAsignaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosAsignaciones, {partial: true}),
        },
      },
    })
    adjuntosAsignaciones: AdjuntosAsignaciones,
    @param.where(AdjuntosAsignaciones) where?: Where<AdjuntosAsignaciones>,
  ): Promise<Count> {
    return this.adjuntosAsignacionesRepository.updateAll(adjuntosAsignaciones, where);
  }

  @get('/adjuntos-asignaciones/{id}')
  @response(200, {
    description: 'AdjuntosAsignaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdjuntosAsignaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdjuntosAsignaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<AdjuntosAsignaciones>
  ): Promise<AdjuntosAsignaciones> {
    return this.adjuntosAsignacionesRepository.findById(id, filter);
  }

  @patch('/adjuntos-asignaciones/{id}')
  @response(204, {
    description: 'AdjuntosAsignaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdjuntosAsignaciones, {partial: true}),
        },
      },
    })
    adjuntosAsignaciones: AdjuntosAsignaciones,
  ): Promise<void> {
    await this.adjuntosAsignacionesRepository.updateById(id, adjuntosAsignaciones);
  }

  @put('/adjuntos-asignaciones/{id}')
  @response(204, {
    description: 'AdjuntosAsignaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() adjuntosAsignaciones: AdjuntosAsignaciones,
  ): Promise<void> {
    await this.adjuntosAsignacionesRepository.replaceById(id, adjuntosAsignaciones);
  }

  @del('/adjuntos-asignaciones/{id}')
  @response(204, {
    description: 'AdjuntosAsignaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adjuntosAsignacionesRepository.deleteById(id);
  }
}
