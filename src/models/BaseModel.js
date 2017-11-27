export default class BaseModel {
  static CACHE_KEY = undefined
  static SERIALIZE_KEY = '__constructor__'

  cacheKey() {
    if (!this.constructor.CACHE_KEY) {
      throw new Error(`${this.constructor.name}.CACHE_KEY is undefined`)
    }

    return this.constructor.CACHE_KEY
  }

  toJSON = () => ({
    [BaseModel.SERIALIZE_KEY]: this.cacheKey(),
    ...this,
  })
}
