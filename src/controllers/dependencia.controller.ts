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
import {Dependencia} from '../models';
import {DependenciaRepository} from '../repositories';

export class DependenciaController {
  constructor(
    @repository(DependenciaRepository)
    public dependenciaRepository : DependenciaRepository,
  ) {}

  @post('/dependencias')
  @response(200, {
    description: 'Dependencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dependencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dependencia, {
            title: 'NewDependencia',
            exclude: ['id'],
          }),
        },
      },
    })
    dependencia: Omit<Dependencia, 'id'>,
  ): Promise<Dependencia> {
    return this.dependenciaRepository.create(dependencia);
  }

  @get('/dependencias/count')
  @response(200, {
    description: 'Dependencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dependencia) where?: Where<Dependencia>,
  ): Promise<Count> {
    return this.dependenciaRepository.count(where);
  }

  @get('/dependencias')
  @response(200, {
    description: 'Array of Dependencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dependencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dependencia) filter?: Filter<Dependencia>,
  ): Promise<Dependencia[]> {
    return this.dependenciaRepository.find(filter);
  }

  @patch('/dependencias')
  @response(200, {
    description: 'Dependencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dependencia, {partial: true}),
        },
      },
    })
    dependencia: Dependencia,
    @param.where(Dependencia) where?: Where<Dependencia>,
  ): Promise<Count> {
    return this.dependenciaRepository.updateAll(dependencia, where);
  }

  @get('/dependencias/{id}')
  @response(200, {
    description: 'Dependencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dependencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dependencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Dependencia>
  ): Promise<Dependencia> {
    return this.dependenciaRepository.findById(id, filter);
  }

  @patch('/dependencias/{id}')
  @response(204, {
    description: 'Dependencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dependencia, {partial: true}),
        },
      },
    })
    dependencia: Dependencia,
  ): Promise<void> {
    await this.dependenciaRepository.updateById(id, dependencia);
  }

  @put('/dependencias/{id}')
  @response(204, {
    description: 'Dependencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dependencia: Dependencia,
  ): Promise<void> {
    await this.dependenciaRepository.replaceById(id, dependencia);
  }

  @del('/dependencias/{id}')
  @response(204, {
    description: 'Dependencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dependenciaRepository.deleteById(id);
  }
}
