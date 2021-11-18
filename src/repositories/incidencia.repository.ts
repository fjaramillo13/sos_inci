import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Incidencia, IncidenciaRelations, Usuario, AdjuntosIncidencia, Operador, Asignaciones} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {AdjuntosIncidenciaRepository} from './adjuntos-incidencia.repository';
import {AsignacionesRepository} from './asignaciones.repository';
import {OperadorRepository} from './operador.repository';

export class IncidenciaRepository extends DefaultCrudRepository<
  Incidencia,
  typeof Incidencia.prototype.id,
  IncidenciaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Incidencia.prototype.id>;

  public readonly adjuntosIncidencias: HasManyRepositoryFactory<AdjuntosIncidencia, typeof Incidencia.prototype.id>;

  public readonly operadors: HasManyThroughRepositoryFactory<Operador, typeof Operador.prototype.id,
          Asignaciones,
          typeof Incidencia.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('AdjuntosIncidenciaRepository') protected adjuntosIncidenciaRepositoryGetter: Getter<AdjuntosIncidenciaRepository>, @repository.getter('AsignacionesRepository') protected asignacionesRepositoryGetter: Getter<AsignacionesRepository>, @repository.getter('OperadorRepository') protected operadorRepositoryGetter: Getter<OperadorRepository>,
  ) {
    super(Incidencia, dataSource);
    this.operadors = this.createHasManyThroughRepositoryFactoryFor('operadors', operadorRepositoryGetter, asignacionesRepositoryGetter,);
    this.registerInclusionResolver('operadors', this.operadors.inclusionResolver);
    this.adjuntosIncidencias = this.createHasManyRepositoryFactoryFor('adjuntosIncidencias', adjuntosIncidenciaRepositoryGetter,);
    this.registerInclusionResolver('adjuntosIncidencias', this.adjuntosIncidencias.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
