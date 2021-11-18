import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Dependencia,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDependenciaController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/dependencia', {
    responses: {
      '200': {
        description: 'Dependencia belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dependencia)},
          },
        },
      },
    },
  })
  async getDependencia(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Dependencia> {
    return this.usuarioRepository.dependencia(id);
  }
}
