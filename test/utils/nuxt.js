
import path from 'path'
import fs from 'fs'

export { version } from '../../packages/core/package.json'
export { default as Utils } from '../../packages/common/src/index'
export { Options } from '../../packages/common/src/index'
export { Nuxt } from '../../packages/core/src/index'
export { Builder, Generator } from '../../packages/builder/src/index'

export const loadFixture = async function (fixture, overrides) {
  const rootDir = path.resolve(__dirname, '..', 'fixtures', fixture)
  const configFile = path.resolve(rootDir, 'nuxt.config.js')

  let config = fs.existsSync(configFile) ? (await import(`../fixtures/${fixture}/nuxt.config`)).default : {}
  if (typeof config === 'function') {
    config = await config()
  }

  config.rootDir = rootDir
  config.dev = false

  return defaultsDeep({}, overrides, config)
}
