require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const server = require('../../server/app');
const { captureOne } = require('./seed-data-creation');

describe('Captures GET', () => {
  it(`Should raise validation error with error code 422 -- 'approved' query parameter should be a boolean  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        approved: 'approved',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"approved" must be a boolean');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'capture_uuid' query parameter should be a uuid  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        capture_uuid: 'capture_uuid',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"capture_uuid" must be a valid GUID');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'limit' query parameter should be an integer  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        limit: 8.965,
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"limit" must be an integer');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'limit' query parameter should be greater than 0  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        limit: 0,
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"limit" must be greater than 0');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'limit' query parameter should be less than 1001  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        limit: 1001,
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"limit" must be less than 1001');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'offset' query parameter should be an integer  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        offset: 4.45,
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"offset" must be an integer');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'offset' query parameter should be at least 0  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        offset: -1,
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"offset" must be greater than -1');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'since' query parameter should be a date  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        since: 'since',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql(
          '"since" must be in ISO 8601 date format',
        );
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'since_date_paid' query parameter should be a date  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        since_date_paid: 'since_date_paid',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql(
          '"since_date_paid" must be in ISO 8601 date format',
        );
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'since_capture_created_at' query parameter should be a date  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        since_capture_created_at: 'since_capture_created_at',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql(
          '"since_capture_created_at" must be in ISO 8601 date format',
        );
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'token_id' query parameter should be a uuid  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        token_id: 'token_id',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"token_id" must be a valid GUID');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'planting_organization_uuid' query parameter should be a uuid  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        planting_organization_uuid: 'planting_organization_uuid',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql(
          '"planting_organization_uuid" must be a valid GUID',
        );
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'sort_by' query parameter should be one of the allowed values  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        sort_by: 'sort_by',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql(
          '"sort_by" must be one of [capture_uuid, capture_created_at, planter_first_name, planter_last_name, planter_identifier, created_at, lat, lon, note, approved, planting_organization_uuid, planting_organization_name, date_paid, paid_by, payment_local_amt, species, token_id]',
        );
        if (err) return done(err);
        return done();
      });
  });

  it(`Should raise validation error with error code 422 -- 'order' query parameter should be one of asc or desc  `, function (done) {
    request(server)
      .get(`/capture`)
      .query({
        order: 'ascending',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .end(function (err, res) {
        expect(res.body.message).to.eql('"order" must be one of [asc, desc]');
        if (err) return done(err);
        return done();
      });
  });

  it(`Should get captures successfully`, function (done) {
    request(server)
      .get(`/capture`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.keys(['captures', 'links', 'totalCount']);
        expect(res.body.links).to.have.keys(['prev', 'next']);
        expect(res.body.totalCount).to.eq(3);

        for (const capture of res.body.captures) {
          expect(capture).to.have.keys([
            'capture_uuid',
            'capture_created_at',
            'planter_first_name',
            'planter_last_name',
            'planter_identifier',
            'created_at',
            'lat',
            'lon',
            'note',
            'approved',
            'planting_organization_uuid',
            'planting_organization_name',
            'date_paid',
            'paid_by',
            'payment_local_amt',
            'species',
            'token_id',
          ]);
        }
        return done();
      });
  });

  it(`Should get captures successfully -- with sort_by query `, function (done) {
    request(server)
      .get(`/capture`)
      .query({ sort_by: 'planter_first_name', order: 'desc' })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.keys(['captures', 'links', 'totalCount']);
        expect(res.body.links).to.have.keys(['prev', 'next']);
        expect(res.body.totalCount).to.eq(3);
        expect(res.body.captures[0].planter_first_name).to.eq('c');
        return done();
      });
  });

  it(`Should get captures successfully -- with filters `, function (done) {
    const capture = { ...captureOne };
    delete capture.created_at;
    delete capture.date_paid;
    delete capture.lat;
    delete capture.lon;
    delete capture.note;
    delete capture.payment_local_amt;
    delete capture.capture_created_at;
    capture.since = captureOne.created_at;
    capture.since_date_paid = captureOne.date_paid;
    capture.since_capture_created_at = captureOne.capture_created_at;
    request(server)
      .get(`/capture`)
      .query({ ...capture })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.keys(['captures', 'links', 'totalCount']);
        expect(res.body.links).to.have.keys(['prev', 'next']);
        expect(res.body.links.prev).to.eq(null);
        expect(res.body.totalCount).to.eq(1);
        expect(res.body.captures[0]).to.eql({ ...captureOne });
        return done();
      });
  });
});

describe('Captures Statistics GET', () => {
  const checkObjectProperties = (array) => {
    for (const object of array) {
      expect(object).to.have.keys(['name', 'number']);
    }
  };
  it(`Should get captures stastics successfully`, function (done) {
    it(`Should raise validation error with error code 422 -- 'capture_created_start_date' query parameter should be a date  `, function (done) {
      request(server)
        .get(`/capture/statistics`)
        .query({
          capture_created_start_date: 'capture_created_start_date',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          console.log(res.body);
          expect(res.body.message).to.eql(
            '"capture_created_start_date" must be in ISO 8601 date format',
          );
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'capture_created_end_date' query parameter should be a date  `, function (done) {
      request(server)
        .get(`/capture/statistics`)
        .query({
          capture_created_end_date: 'capture_created_end_date',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          console.log(res.body);
          expect(res.body.message).to.eql(
            '"capture_created_end_date" must be in ISO 8601 date format',
          );
          return done();
        });
    });

    request(server)
      .get(`/capture/statistics`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.keys([
          'planters',
          'species',
          'captures',
          'unverified_captures',
          'top_planters',
        ]);
        expect(res.body.planters).to.have.keys(['total', 'planters']);
        expect(res.body.species).to.have.keys(['total', 'species']);
        expect(res.body.captures).to.have.keys(['total', 'captures']);
        expect(res.body.unverified_captures).to.have.keys([
          'total',
          'unverified_captures',
        ]);
        expect(res.body.top_planters).to.have.keys(['average', 'top_planters']);
        checkObjectProperties(res.body.planters.planters);
        checkObjectProperties(res.body.species.species);
        checkObjectProperties(res.body.captures.captures);
        checkObjectProperties(res.body.unverified_captures.unverified_captures);
        checkObjectProperties(res.body.top_planters.top_planters);
        return done();
      });
  });

  describe('Get Capture Stastics Single Card', () => {
    it(`Should raise validation error with error code 422 -- 'card_title' query parameter is required `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"card_title" is required');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'card_title' query parameter should be one of the select values `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({ card_title: 'card_title' })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql(
            '"card_title" must be one of [planters, species, captures, unverified_captures, top_planters]',
          );
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'limit' query parameter should be an integer  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          limit: 8.965,
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"limit" must be an integer');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'limit' query parameter should be greater than 0  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          limit: 0,
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"limit" must be greater than 0');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'limit' query parameter should be less than 101  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          limit: 101,
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"limit" must be less than 101');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'offset' query parameter should be an integer  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          offset: 4.45,
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"offset" must be an integer');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'offset' query parameter should be at least 0  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          offset: -1,
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eql('"offset" must be greater than -1');
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'capture_created_start_date' query parameter should be a date  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          capture_created_start_date: 'capture_created_start_date',
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          console.log(res.body);
          expect(res.body.message).to.eql(
            '"capture_created_start_date" must be in ISO 8601 date format',
          );
          return done();
        });
    });

    it(`Should raise validation error with error code 422 -- 'capture_created_end_date' query parameter should be a date  `, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          capture_created_end_date: 'capture_created_end_date',
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(422)
        .end(function (err, res) {
          if (err) return done(err);
          console.log(res.body);
          expect(res.body.message).to.eql(
            '"capture_created_end_date" must be in ISO 8601 date format',
          );
          return done();
        });
    });

    it(`Should get captures stastics card details successfully`, function (done) {
      request(server)
        .get(`/capture/statistics/card`)
        .query({
          card_title: 'planters',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.keys(['card_information', 'links']);
          expect(res.body.links).to.have.keys(['prev', 'next']);
          checkObjectProperties(res.body.card_information);
          return done();
        });
    });
  });
});
