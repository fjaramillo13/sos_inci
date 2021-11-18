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
import {Empresas} from '../models';
import {EmpresasRepository} from '../repositories';

export class EmpresaController {
  constructor(
    @repository(EmpresasRepository)
    public empresasRepository : EmpresasRepository,
  ) {}

  @post('/empresas')
  @response(200, {
    description: 'Empresas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empresas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {
            title: 'NewEmpresas',
            exclude: ['id'],
          }),
        },
      },
    })
    empresas: Omit<Empresas, 'id'>,
  ): Promise<Empresas> {
    return this.empresasRepository.create(empresas);
  }

  @get('/empresas/count')
  @response(200, {
    description: 'Empresas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empresas) where?: Where<Empresas>,
  ): Promise<Count> {
    return this.empresasRepository.count(where);
  }

  @get('/empresas')
  @response(200, {
    description: 'Array of Empresas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empresas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empresas) filter?: Filter<Empresas>,
  ): Promise<Empresas[]> {
    return this.empresasRepository.find(filter);
  }

  @patch('/empresas')
  @response(200, {
    description: 'Empresas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {partial: true}),
        },
      },
    })
    empresas: Empresas,
    @param.where(Empresas) where?: Where<Empresas>,
  ): Promise<Count> {
    return this.empresasRepository.updateAll(empresas, where);
  }

  @get('/empresas/{id}')
  @response(200, {
    description: 'Empresas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empresas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empresas, {exclude: 'where'}) filter?: FilterExcludingWhere<Empresas>
  ): Promise<Empresas> {
    return this.empresasRepository.findById(id, filter);
  }

  @patch('/empresas/{id}')
  @response(204, {
    description: 'Empresas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresas, {partial: true}),
        },
      },
    })
    empresas: Empresas,
  ): Promise<void> {
    await this.empresasRepository.updateById(id, empresas);
  }

  @put('/empresas/{id}')
  @response(204, {
    description: 'Empresas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empresas: Empresas,
  ): Promise<void> {
    await this.empresasRepository.replaceById(id, empresas);
  }

  @del('/empresas/{id}')
  @response(204, {
    description: 'Empresas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empresasRepository.deleteById(id);
  }
}
