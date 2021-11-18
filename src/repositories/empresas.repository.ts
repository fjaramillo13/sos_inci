import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresas, EmpresasRelations, Dependencia} from '../models';
import {DependenciaRepository} from './dependencia.repository';

export class EmpresasRepository extends DefaultCrudRepository<
  Empresas,
  typeof Empresas.prototype.id,
  EmpresasRelations
> {

  public readonly dependencias: HasManyRepositoryFactory<Dependencia, typeof Empresas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DependenciaRepository') protected dependenciaRepositoryGetter: Getter<DependenciaRepository>,
  ) {
    super(Empresas, dataSource);
    this.dependencias = this.createHasManyRepositoryFactoryFor('dependencias', dependenciaRepositoryGetter,);
    this.registerInclusionResolver('dependencias', this.dependencias.inclusionResolver);
  }
}
