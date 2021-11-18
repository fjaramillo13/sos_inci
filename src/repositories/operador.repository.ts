import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Operador, OperadorRelations, Incidencia, Asignaciones, Persona} from '../models';
import {AsignacionesRepository} from './asignaciones.repository';
import {IncidenciaRepository} from './incidencia.repository';
import {PersonaRepository} from './persona.repository';

export class OperadorRepository extends DefaultCrudRepository<
  Operador,
  typeof Operador.prototype.id,
  OperadorRelations
> {

  public readonly incidencias: HasManyThroughRepositoryFactory<Incidencia, typeof Incidencia.prototype.id,
          Asignaciones,
          typeof Operador.prototype.id
        >;

  public readonly persona: BelongsToAccessor<Persona, typeof Operador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignacionesRepository') protected asignacionesRepositoryGetter: Getter<AsignacionesRepository>, @repository.getter('IncidenciaRepository') protected incidenciaRepositoryGetter: Getter<IncidenciaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Operador, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.incidencias = this.createHasManyThroughRepositoryFactoryFor('incidencias', incidenciaRepositoryGetter, asignacionesRepositoryGetter,);
    this.registerInclusionResolver('incidencias', this.incidencias.inclusionResolver);
  }
}
