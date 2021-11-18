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
  Dependencia,
  Usuario,
} from '../models';
import {DependenciaRepository} from '../repositories';

export class DependenciaUsuarioController {
  constructor(
    @repository(DependenciaRepository) protected dependenciaRepository: DependenciaRepository,
  ) { }

  @get('/dependencias/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Dependencia has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.dependenciaRepository.usuarios(id).find(filter);
  }

  @post('/dependencias/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Dependencia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Dependencia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInDependencia',
            exclude: ['id'],
            optional: ['dependenciaId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.dependenciaRepository.usuarios(id).create(usuario);
  }

  @patch('/dependencias/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Dependencia.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.dependenciaRepository.usuarios(id).patch(usuario, where);
  }

  @del('/dependencias/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Dependencia.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.dependenciaRepository.usuarios(id).delete(where);
  }
}
