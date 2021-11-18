import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Usuario, Operador} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {OperadorRepository} from './operador.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Persona.prototype.id>;

  public readonly operador: BelongsToAccessor<Operador, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('OperadorRepository') protected operadorRepositoryGetter: Getter<OperadorRepository>,
  ) {
    super(Persona, dataSource);
    this.operador = this.createBelongsToAccessorFor('operador', operadorRepositoryGetter,);
    this.registerInclusionResolver('operador', this.operador.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
