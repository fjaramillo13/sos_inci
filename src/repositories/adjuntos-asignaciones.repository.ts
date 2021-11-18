import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AdjuntosAsignaciones, AdjuntosAsignacionesRelations, Asignaciones} from '../models';
import {AsignacionesRepository} from './asignaciones.repository';

export class AdjuntosAsignacionesRepository extends DefaultCrudRepository<
  AdjuntosAsignaciones,
  typeof AdjuntosAsignaciones.prototype.id,
  AdjuntosAsignacionesRelations
> {

  public readonly asignaciones: BelongsToAccessor<Asignaciones, typeof AdjuntosAsignaciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignacionesRepository') protected asignacionesRepositoryGetter: Getter<AsignacionesRepository>,
  ) {
    super(AdjuntosAsignaciones, dataSource);
    this.asignaciones = this.createBelongsToAccessorFor('asignaciones', asignacionesRepositoryGetter,);
    this.registerInclusionResolver('asignaciones', this.asignaciones.inclusionResolver);
  }
}
