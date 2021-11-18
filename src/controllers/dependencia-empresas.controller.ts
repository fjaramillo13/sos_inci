import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Dependencia,
  Empresas,
} from '../models';
import {DependenciaRepository} from '../repositories';

export class DependenciaEmpresasController {
  constructor(
    @repository(DependenciaRepository)
    public dependenciaRepository: DependenciaRepository,
  ) { }

  @get('/dependencias/{id}/empresas', {
    responses: {
      '200': {
        description: 'Empresas belonging to Dependencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresas)},
          },
        },
      },
    },
  })
  async getEmpresas(
    @param.path.string('id') id: typeof Dependencia.prototype.id,
  ): Promise<Empresas> {
    return this.dependenciaRepository.empresas(id);
  }
}
