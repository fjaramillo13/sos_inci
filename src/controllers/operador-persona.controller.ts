import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Operador,
  Persona,
} from '../models';
import {OperadorRepository} from '../repositories';

export class OperadorPersonaController {
  constructor(
    @repository(OperadorRepository)
    public operadorRepository: OperadorRepository,
  ) { }

  @get('/operadors/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Operador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Operador.prototype.id,
  ): Promise<Persona> {
    return this.operadorRepository.persona(id);
  }
}
