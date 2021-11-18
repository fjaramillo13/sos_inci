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
import {Comentarios} from '../models';
import {ComentariosRepository} from '../repositories';

export class ComentarioController {
  constructor(
    @repository(ComentariosRepository)
    public comentariosRepository : ComentariosRepository,
  ) {}

  @post('/comentarios')
  @response(200, {
    description: 'Comentarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comentarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {
            title: 'NewComentarios',
            exclude: ['id'],
          }),
        },
      },
    })
    comentarios: Omit<Comentarios, 'id'>,
  ): Promise<Comentarios> {
    return this.comentariosRepository.create(comentarios);
  }

  @get('/comentarios/count')
  @response(200, {
    description: 'Comentarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comentarios) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.comentariosRepository.count(where);
  }

  @get('/comentarios')
  @response(200, {
    description: 'Array of Comentarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comentarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comentarios) filter?: Filter<Comentarios>,
  ): Promise<Comentarios[]> {
    return this.comentariosRepository.find(filter);
  }

  @patch('/comentarios')
  @response(200, {
    description: 'Comentarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {partial: true}),
        },
      },
    })
    comentarios: Comentarios,
    @param.where(Comentarios) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.comentariosRepository.updateAll(comentarios, where);
  }

  @get('/comentarios/{id}')
  @response(200, {
    description: 'Comentarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comentarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comentarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Comentarios>
  ): Promise<Comentarios> {
    return this.comentariosRepository.findById(id, filter);
  }

  @patch('/comentarios/{id}')
  @response(204, {
    description: 'Comentarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {partial: true}),
        },
      },
    })
    comentarios: Comentarios,
  ): Promise<void> {
    await this.comentariosRepository.updateById(id, comentarios);
  }

  @put('/comentarios/{id}')
  @response(204, {
    description: 'Comentarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comentarios: Comentarios,
  ): Promise<void> {
    await this.comentariosRepository.replaceById(id, comentarios);
  }

  @del('/comentarios/{id}')
  @response(204, {
    description: 'Comentarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comentariosRepository.deleteById(id);
  }
}
