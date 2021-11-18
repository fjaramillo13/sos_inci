import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Dependencia, DependenciaRelations, Empresas, Usuario} from '../models';
import {EmpresasRepository} from './empresas.repository';
import {UsuarioRepository} from './usuario.repository';

export class DependenciaRepository extends DefaultCrudRepository<
  Dependencia,
  typeof Dependencia.prototype.id,
  DependenciaRelations
> {

  public readonly empresas: BelongsToAccessor<Empresas, typeof Dependencia.prototype.id>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Dependencia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresasRepository') protected empresasRepositoryGetter: Getter<EmpresasRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Dependencia, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.empresas = this.createBelongsToAccessorFor('empresas', empresasRepositoryGetter,);
    this.registerInclusionResolver('empresas', this.empresas.inclusionResolver);
  }
}
