const env = process.env.NODE_ENV || 'development'

/* config.json
 * configuration for this project is kept in config.json
 * this file is not commited to source control
*/

if (env === 'development' || env === 'test') {
  const envConfig = require('./config.json')[env]
  Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key])
}
