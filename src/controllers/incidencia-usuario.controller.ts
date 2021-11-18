import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Incidencia,
  Usuario,
} from '../models';
import {IncidenciaRepository} from '../repositories';

export class IncidenciaUsuarioController {
  constructor(
    @repository(IncidenciaRepository)
    public incidenciaRepository: IncidenciaRepository,
  ) { }

  @get('/incidencias/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Incidencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Incidencia.prototype.id,
  ): Promise<Usuario> {
    return this.incidenciaRepository.usuario(id);
  }
}
