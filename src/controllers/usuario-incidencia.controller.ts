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
  Usuario,
  Incidencia,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioIncidenciaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Incidencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Incidencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Incidencia>,
  ): Promise<Incidencia[]> {
    return this.usuarioRepository.incidencias(id).find(filter);
  }

  @post('/usuarios/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Incidencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {
            title: 'NewIncidenciaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) incidencia: Omit<Incidencia, 'id'>,
  ): Promise<Incidencia> {
    return this.usuarioRepository.incidencias(id).create(incidencia);
  }

  @patch('/usuarios/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Usuario.Incidencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incidencia, {partial: true}),
        },
      },
    })
    incidencia: Partial<Incidencia>,
    @param.query.object('where', getWhereSchemaFor(Incidencia)) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.usuarioRepository.incidencias(id).patch(incidencia, where);
  }

  @del('/usuarios/{id}/incidencias', {
    responses: {
      '200': {
        description: 'Usuario.Incidencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Incidencia)) where?: Where<Incidencia>,
  ): Promise<Count> {
    return this.usuarioRepository.incidencias(id).delete(where);
  }
}
