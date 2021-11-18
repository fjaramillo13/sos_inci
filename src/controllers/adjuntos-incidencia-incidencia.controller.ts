import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AdjuntosIncidencia,
  Incidencia,
} from '../models';
import {AdjuntosIncidenciaRepository} from '../repositories';

export class AdjuntosIncidenciaIncidenciaController {
  constructor(
    @repository(AdjuntosIncidenciaRepository)
    public adjuntosIncidenciaRepository: AdjuntosIncidenciaRepository,
  ) { }

  @get('/adjuntos-incidencias/{id}/incidencia', {
    responses: {
      '200': {
        description: 'Incidencia belonging to AdjuntosIncidencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Incidencia)},
          },
        },
      },
    },
  })
  async getIncidencia(
    @param.path.string('id') id: typeof AdjuntosIncidencia.prototype.id,
  ): Promise<Incidencia> {
    return this.adjuntosIncidenciaRepository.incidencia(id);
  }
}
