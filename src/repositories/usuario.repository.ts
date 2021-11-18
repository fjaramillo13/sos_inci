import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Incidencia, Dependencia, Persona} from '../models';
import {IncidenciaRepository} from './incidencia.repository';
import {DependenciaRepository} from './dependencia.repository';
import {PersonaRepository} from './persona.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly incidencias: HasManyRepositoryFactory<Incidencia, typeof Usuario.prototype.id>;

  public readonly dependencia: BelongsToAccessor<Dependencia, typeof Usuario.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('IncidenciaRepository') protected incidenciaRepositoryGetter: Getter<IncidenciaRepository>, @repository.getter('DependenciaRepository') protected dependenciaRepositoryGetter: Getter<DependenciaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Usuario, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.dependencia = this.createBelongsToAccessorFor('dependencia', dependenciaRepositoryGetter,);
    this.registerInclusionResolver('dependencia', this.dependencia.inclusionResolver);
    this.incidencias = this.createHasManyRepositoryFactoryFor('incidencias', incidenciaRepositoryGetter,);
    this.registerInclusionResolver('incidencias', this.incidencias.inclusionResolver);
  }
}
