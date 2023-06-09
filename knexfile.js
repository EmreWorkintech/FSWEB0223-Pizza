// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/pizza.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
    pool: {    
      afterCreate: (conn, done) => { 
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
    pool: {    
      afterCreate: (conn, done) => { 
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }

};
