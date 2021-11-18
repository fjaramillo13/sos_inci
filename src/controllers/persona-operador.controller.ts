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
  Operador,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaOperadorController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/operador', {
    responses: {
      '200': {
        description: 'Operador belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Operador)},
          },
        },
      },
    },
  })
  async getOperador(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Operador> {
    return this.personaRepository.operador(id);
  }
}
