const { v4: uuid } = require('uuid');
const knex = require('../../server/database/knex');

const planting_organization_uuid = uuid();

const captureOne = Object.freeze({
  capture_uuid: uuid(),
  planter_first_name: 'a',
  planter_last_name: 'a',
  planter_identifier: 'a',
  capture_created_at: new Date('11/11/2012').toISOString(),
  created_at: new Date('12/12/2012').toISOString(),
  lat: '4.44',
  lon: '4.44',
  note: 'note',
  approved: true,
  planting_organization_name: 'planters',
  planting_organization_uuid,
  date_paid: new Date('12/12/2012').toISOString(),
  paid_by: 'paid_by',
  payment_local_amt: '200',
  species: 'species1',
  token_id: uuid(),
});
const captureTwo = Object.freeze({
  capture_uuid: uuid(),
  planter_first_name: 'b',
  planter_last_name: 'b',
  planter_identifier: 'b',
  capture_created_at: new Date('11/11/2012').toISOString(),
  created_at: new Date('11/11/2012').toISOString(),
  lat: '4.44',
  lon: '5.44',
  note: 'note',
  approved: true,
  planting_organization_name: 'planters',
  planting_organization_uuid,
  date_paid: new Date('12/12/2012').toISOString(),
  paid_by: 'paid_by',
  payment_local_amt: '400',
  species: 'species2',
  token_id: uuid(),
});
const captureThree = Object.freeze({
  capture_uuid: uuid(),
  planter_first_name: 'c',
  planter_last_name: 'c',
  planter_identifier: 'c',
  capture_created_at: new Date('11/11/2012').toISOString(),
  created_at: new Date('11/11/2012').toISOString(),
  lat: '4.44',
  lon: '5.44',
  note: 'note',
  approved: true,
  planting_organization_name: 'planters',
  planting_organization_uuid,
  date_paid: new Date('12/12/2012').toISOString(),
  paid_by: 'paid_by',
  payment_local_amt: '400',
  species: 'species2',
  token_id: uuid(),
});

before(async () => {
  await knex('capture_denormalized').insert([
    captureOne,
    captureTwo,
    captureThree,
  ]);
});

after(async () => {
  await knex.raw(`

    DELETE FROM capture_denormalized
    WHERE lat = '${captureThree.lat}';
  `);
});

module.exports = {
  captureOne,
};
