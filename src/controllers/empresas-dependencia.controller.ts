import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresas,
  Dependencia,
} from '../models';
import {EmpresasRepository} from '../repositories';

export class EmpresasDependenciaController {
  constructor(
    @repository(EmpresasRepository) protected empresasRepository: EmpresasRepository,
  ) { }

  @get('/empresas/{id}/dependencias', {
    responses: {
      '200': {
        description: 'Array of Empresas has many Dependencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dependencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Dependencia>,
  ): Promise<Dependencia[]> {
    return this.empresasRepository.dependencias(id).find(filter);
  }

  @post('/empresas/{id}/dependencias', {
    responses: {
      '200': {
        description: 'Empresas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dependencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dependencia, {
            title: 'NewDependenciaInEmpresas',
            exclude: ['id'],
            optional: ['empresasId']
          }),
        },
      },
    }) dependencia: Omit<Dependencia, 'id'>,
  ): Promise<Dependencia> {
    return this.empresasRepository.dependencias(id).create(dependencia);
  }

  @patch('/empresas/{id}/dependencias', {
    responses: {
      '200': {
        description: 'Empresas.Dependencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dependencia, {partial: true}),
        },
      },
    })
    dependencia: Partial<Dependencia>,
    @param.query.object('where', getWhereSchemaFor(Dependencia)) where?: Where<Dependencia>,
  ): Promise<Count> {
    return this.empresasRepository.dependencias(id).patch(dependencia, where);
  }

  @del('/empresas/{id}/dependencias', {
    responses: {
      '200': {
        description: 'Empresas.Dependencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Dependencia)) where?: Where<Dependencia>,
  ): Promise<Count> {
    return this.empresasRepository.dependencias(id).delete(where);
  }
}
