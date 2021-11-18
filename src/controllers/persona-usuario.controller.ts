import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Usuario,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaUsuarioController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Usuario> {
    return this.personaRepository.usuario(id);
  }
}
