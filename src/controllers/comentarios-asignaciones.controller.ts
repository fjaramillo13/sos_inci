import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentarios,
  Asignaciones,
} from '../models';
import {ComentariosRepository} from '../repositories';

export class ComentariosAsignacionesController {
  constructor(
    @repository(ComentariosRepository)
    public comentariosRepository: ComentariosRepository,
  ) { }

  @get('/comentarios/{id}/asignaciones', {
    responses: {
      '200': {
        description: 'Asignaciones belonging to Comentarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignaciones)},
          },
        },
      },
    },
  })
  async getAsignaciones(
    @param.path.string('id') id: typeof Comentarios.prototype.id,
  ): Promise<Asignaciones> {
    return this.comentariosRepository.asignaciones(id);
  }
}
