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
  Persona,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPersonaController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Persona> {
    return this.usuarioRepository.persona(id);
  }
}
