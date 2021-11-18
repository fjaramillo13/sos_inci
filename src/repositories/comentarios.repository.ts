import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Comentarios, ComentariosRelations, Asignaciones} from '../models';
import {AsignacionesRepository} from './asignaciones.repository';

export class ComentariosRepository extends DefaultCrudRepository<
  Comentarios,
  typeof Comentarios.prototype.id,
  ComentariosRelations
> {

  public readonly asignaciones: BelongsToAccessor<Asignaciones, typeof Comentarios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignacionesRepository') protected asignacionesRepositoryGetter: Getter<AsignacionesRepository>,
  ) {
    super(Comentarios, dataSource);
    this.asignaciones = this.createBelongsToAccessorFor('asignaciones', asignacionesRepositoryGetter,);
    this.registerInclusionResolver('asignaciones', this.asignaciones.inclusionResolver);
  }
}
