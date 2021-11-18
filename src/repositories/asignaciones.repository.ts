import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignaciones, AsignacionesRelations, AdjuntosAsignaciones, Comentarios} from '../models';
import {AdjuntosAsignacionesRepository} from './adjuntos-asignaciones.repository';
import {ComentariosRepository} from './comentarios.repository';

export class AsignacionesRepository extends DefaultCrudRepository<
  Asignaciones,
  typeof Asignaciones.prototype.id,
  AsignacionesRelations
> {

  public readonly adjuntosAsignaciones: HasManyRepositoryFactory<AdjuntosAsignaciones, typeof Asignaciones.prototype.id>;

  public readonly comentarios: HasManyRepositoryFactory<Comentarios, typeof Asignaciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdjuntosAsignacionesRepository') protected adjuntosAsignacionesRepositoryGetter: Getter<AdjuntosAsignacionesRepository>, @repository.getter('ComentariosRepository') protected comentariosRepositoryGetter: Getter<ComentariosRepository>,
  ) {
    super(Asignaciones, dataSource);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentariosRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.adjuntosAsignaciones = this.createHasManyRepositoryFactoryFor('adjuntosAsignaciones', adjuntosAsignacionesRepositoryGetter,);
    this.registerInclusionResolver('adjuntosAsignaciones', this.adjuntosAsignaciones.inclusionResolver);
  }
}
