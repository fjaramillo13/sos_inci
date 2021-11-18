import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AdjuntosIncidencia, AdjuntosIncidenciaRelations, Incidencia} from '../models';
import {IncidenciaRepository} from './incidencia.repository';

export class AdjuntosIncidenciaRepository extends DefaultCrudRepository<
  AdjuntosIncidencia,
  typeof AdjuntosIncidencia.prototype.id,
  AdjuntosIncidenciaRelations
> {

  public readonly incidencia: BelongsToAccessor<Incidencia, typeof AdjuntosIncidencia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('IncidenciaRepository') protected incidenciaRepositoryGetter: Getter<IncidenciaRepository>,
  ) {
    super(AdjuntosIncidencia, dataSource);
    this.incidencia = this.createBelongsToAccessorFor('incidencia', incidenciaRepositoryGetter,);
    this.registerInclusionResolver('incidencia', this.incidencia.inclusionResolver);
  }
}
