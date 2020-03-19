#!/usr/bin/env node

const Fixtures = require('node-mongodb-fixtures');
const fixtures = new Fixtures({
  dir: './server/fixtures'
});

const config = require('config');
dbHost = config.get('dbHost');

fixtures
	.connect(dbHost, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => fixtures.unload())
	.then(() => fixtures.load())
	.then(() => fixtures.disconnect());

