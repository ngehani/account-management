var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hpe_account_management';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(200) not null)');
query.on('end', function() { client.end(); });
