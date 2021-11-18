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
import {Asignaciones} from '../models';
import {AsignacionesRepository} from '../repositories';

export class AsignacionController {
  constructor(
    @repository(AsignacionesRepository)
    public asignacionesRepository : AsignacionesRepository,
  ) {}

  @post('/asignaciones')
  @response(200, {
    description: 'Asignaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asignaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignaciones, {
            title: 'NewAsignaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    asignaciones: Omit<Asignaciones, 'id'>,
  ): Promise<Asignaciones> {
    return this.asignacionesRepository.create(asignaciones);
  }

  @get('/asignaciones/count')
  @response(200, {
    description: 'Asignaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asignaciones) where?: Where<Asignaciones>,
  ): Promise<Count> {
    return this.asignacionesRepository.count(where);
  }

  @get('/asignaciones')
  @response(200, {
    description: 'Array of Asignaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asignaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asignaciones) filter?: Filter<Asignaciones>,
  ): Promise<Asignaciones[]> {
    return this.asignacionesRepository.find(filter);
  }

  @patch('/asignaciones')
  @response(200, {
    description: 'Asignaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignaciones, {partial: true}),
        },
      },
    })
    asignaciones: Asignaciones,
    @param.where(Asignaciones) where?: Where<Asignaciones>,
  ): Promise<Count> {
    return this.asignacionesRepository.updateAll(asignaciones, where);
  }

  @get('/asignaciones/{id}')
  @response(200, {
    description: 'Asignaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asignaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asignaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Asignaciones>
  ): Promise<Asignaciones> {
    return this.asignacionesRepository.findById(id, filter);
  }

  @patch('/asignaciones/{id}')
  @response(204, {
    description: 'Asignaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignaciones, {partial: true}),
        },
      },
    })
    asignaciones: Asignaciones,
  ): Promise<void> {
    await this.asignacionesRepository.updateById(id, asignaciones);
  }

  @put('/asignaciones/{id}')
  @response(204, {
    description: 'Asignaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignaciones: Asignaciones,
  ): Promise<void> {
    await this.asignacionesRepository.replaceById(id, asignaciones);
  }

  @del('/asignaciones/{id}')
  @response(204, {
    description: 'Asignaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignacionesRepository.deleteById(id);
  }
}
