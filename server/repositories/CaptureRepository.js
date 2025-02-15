const BaseRepository = require('./BaseRepository');

class CaptureRepository extends BaseRepository {
  constructor(session) {
    super('capture_denormalized', session);
    this._tableName = 'capture_denormalized';
    this._session = session;
  }

  async getCaptures(filter, { limit, offset, order, orderBy }) {
    const whereBuilder = function (object, builder) {
      const result = builder;
      const filterObject = { ...object };
      if (filterObject.created_at) {
        result.where('created_at', '>=', filterObject.created_at);
        delete filterObject.created_at;
      }
      if (filterObject.date_paid) {
        result.where('date_paid', '>=', filterObject.date_paid);
        delete filterObject.date_paid;
      }
      if (filterObject.capture_created_at) {
        result.where(
          'capture_created_at',
          '>=',
          filterObject.capture_created_at,
        );
        delete filterObject.capture_created_at;
      }
      result.where(filterObject);
    };
    let promise = this._session
      .getDB()(this._tableName)
      .where((builder) => whereBuilder(filter, builder));
    if (limit) {
      promise = promise.limit(limit);
    }
    if (offset) {
      promise = promise.offset(offset);
    }
    if (orderBy) {
      promise = promise.orderBy(orderBy, order);
    }

    const count = await this._session
      .getDB()(this._tableName)
      .count('*')
      .where((builder) => whereBuilder(filter, builder));
    return { captures: await promise, count: +count[0].count };
  }

  async getStatistics(filter, options = { limit: 3, offset: 0 }) {
    const whereBuilder = function (object, builder) {
      const result = builder;
      const filterObject = { ...object };
      delete filterObject.card_title;
      if (filterObject.capture_created_start_date) {
        result.where(
          'capture_created_at',
          '>=',
          filterObject.capture_created_start_date,
        );
        delete filterObject.capture_created_start_date;
      }
      if (filterObject.capture_created_end_date) {
        result.where(
          'capture_created_at',
          '<=',
          filterObject.capture_created_end_date,
        );
        delete filterObject.capture_created_end_date;
      }
      result.where(filterObject);
    };
    const knex = this._session.getDB();

    const totalOrganizationPlantersQuery = knex(this._tableName)
      .countDistinct('planting_organization_uuid as totalPlanters')
      .where((builder) => whereBuilder(filter, builder));

    const topOrganizationPlantersQuery = knex(this._tableName)
      .select(knex.raw('planting_organization_name, count(*) as count'))
      .where((builder) => whereBuilder(filter, builder))
      .groupBy('planting_organization_uuid', 'planting_organization_name')
      .orderBy('count', 'desc')
      .limit(options.limit)
      .offset(options.offset);

    const topPlantersQuery = knex(this._tableName)
      .select(
        knex.raw('planter_first_name, planter_last_name, count(*) as count'),
      )
      .where((builder) => whereBuilder(filter, builder))
      .groupBy('planter_first_name', 'planter_last_name', 'planter_identifier')
      .orderBy('count', 'desc')
      .limit(options.limit)
      .offset(options.offset);

    const averageCapturePerPlanterQuery = knex(this._tableName)
      .avg('totalPlanters')
      .from(function () {
        this.count('* as totalPlanters')
          .from('capture_denormalized')
          .where((builder) => whereBuilder(filter, builder))
          .groupBy(
            'planter_first_name',
            'planter_last_name',
            'planter_identifier',
          )
          .as('planters');
      });

    const totalSpeciesQuery = knex(this._tableName)
      .where((builder) => whereBuilder(filter, builder))
      .countDistinct('species as totalSpecies');

    const topSpeciesQuery = knex(this._tableName)
      .select(knex.raw('species, count(*) as count'))
      .where((builder) => whereBuilder(filter, builder))
      .groupBy('species')
      .orderBy('count', 'desc')
      .limit(options.limit)
      .offset(options.offset);

    const totalApprovedCapturesQuery = knex(this._tableName)
      .count()
      .where((builder) => whereBuilder({ ...filter, approved: true }, builder));

    const topApprovedCapturesQuery = knex(this._tableName)
      .select(knex.raw('planting_organization_name, count(*) as count'))
      .where((builder) => whereBuilder({ ...filter, approved: true }, builder))
      .groupBy('planting_organization_uuid', 'planting_organization_name')
      .orderBy('count', 'desc')
      .limit(options.limit)
      .offset(options.offset);

    const totalUnverifiedCapturesQuery = knex(this._tableName)
      .count()
      .where((builder) =>
        whereBuilder({ ...filter, approved: false }, builder),
      );

    const topUnverifiedCapturesQuery = knex(this._tableName)
      .select(knex.raw('planting_organization_name, count(*) as count'))
      .where((builder) => whereBuilder({ ...filter, approved: false }, builder))
      .groupBy('planting_organization_uuid', 'planting_organization_name')
      .orderBy('count', 'desc')
      .limit(options.limit)
      .offset(options.offset);

    if (filter?.card_title) {
      const { card_title } = filter;

      switch (card_title) {
        case 'planters': {
          const topOrganizationPlanters = await topOrganizationPlantersQuery;
          return { topOrganizationPlanters };
        }
        case 'species': {
          const topSpecies = await topSpeciesQuery;
          return { topSpecies };
        }
        case 'captures': {
          const topApprovedCaptures = await topApprovedCapturesQuery;
          return { topCaptures: topApprovedCaptures };
        }
        case 'unverified_captures': {
          const topUnverifiedCaptures = await topUnverifiedCapturesQuery;
          return { topUnverifiedCaptures };
        }
        case 'top_planters': {
          const topPlanters = await topPlantersQuery;
          return { topPlanters };
        }

        default:
          break;
      }
    }

    const totalOrganizationPlanters = await totalOrganizationPlantersQuery;
    const topPlanters = await topPlantersQuery;
    const averageCapturePerPlanter = await averageCapturePerPlanterQuery;
    const topOrganizationPlanters = await topOrganizationPlantersQuery;
    const totalSpecies = await totalSpeciesQuery;
    const topSpecies = await topSpeciesQuery;
    const totalApprovedCaptures = await totalApprovedCapturesQuery;
    const topApprovedCaptures = await topApprovedCapturesQuery;
    const totalUnverifiedCaptures = await totalUnverifiedCapturesQuery;
    const topUnverifiedCaptures = await topUnverifiedCapturesQuery;

    return {
      totalOrganizationPlanters: +totalOrganizationPlanters[0].totalPlanters,
      topPlanters,
      averageCapturePerPlanter: +averageCapturePerPlanter[0].avg,
      topOrganizationPlanters,
      totalSpecies: +totalSpecies[0].totalSpecies,
      topSpecies,
      totalCaptures: +totalApprovedCaptures[0].count,
      topCaptures: topApprovedCaptures,
      totalUnverifiedCaptures: +totalUnverifiedCaptures[0].count,
      topUnverifiedCaptures,
    };
  }
}

module.exports = CaptureRepository;
