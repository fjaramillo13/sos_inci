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
  Asignaciones,
  Comentarios,
} from '../models';
import {AsignacionesRepository} from '../repositories';

export class AsignacionesComentariosController {
  constructor(
    @repository(AsignacionesRepository) protected asignacionesRepository: AsignacionesRepository,
  ) { }

  @get('/asignaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Asignaciones has many Comentarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comentarios>,
  ): Promise<Comentarios[]> {
    return this.asignacionesRepository.comentarios(id).find(filter);
  }

  @post('/asignaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asignaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {
            title: 'NewComentariosInAsignaciones',
            exclude: ['id'],
            optional: ['asignacionesId']
          }),
        },
      },
    }) comentarios: Omit<Comentarios, 'id'>,
  ): Promise<Comentarios> {
    return this.asignacionesRepository.comentarios(id).create(comentarios);
  }

  @patch('/asignaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asignaciones.Comentarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {partial: true}),
        },
      },
    })
    comentarios: Partial<Comentarios>,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.asignacionesRepository.comentarios(id).patch(comentarios, where);
  }

  @del('/asignaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Asignaciones.Comentarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.asignacionesRepository.comentarios(id).delete(where);
  }
}
