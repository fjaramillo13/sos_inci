import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AdjuntosAsignaciones,
  Asignaciones,
} from '../models';
import {AdjuntosAsignacionesRepository} from '../repositories';

export class AdjuntosAsignacionesAsignacionesController {
  constructor(
    @repository(AdjuntosAsignacionesRepository)
    public adjuntosAsignacionesRepository: AdjuntosAsignacionesRepository,
  ) { }

  @get('/adjuntos-asignaciones/{id}/asignaciones', {
    responses: {
      '200': {
        description: 'Asignaciones belonging to AdjuntosAsignaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignaciones)},
          },
        },
      },
    },
  })
  async getAsignaciones(
    @param.path.string('id') id: typeof AdjuntosAsignaciones.prototype.id,
  ): Promise<Asignaciones> {
    return this.adjuntosAsignacionesRepository.asignaciones(id);
  }
}
