export default class Fetcher {
  constructor(fetchFunc) {
    this._fetchFunc = fetchFunc;

    this._ids = null;
    this._resolvers = null;

    this._scheduled = false;
  }

  fetch(id) {
    if (!this._scheduled) {
      process.nextTick(this._performFetch.bind(this));
      this._ids = [];
      this._resolvers = [];
      this._scheduled = true;
    }

    this._ids.push(id);
    return new Promise(resolve => {
      this._resolvers.push(resolve);
    });
  }

  _performFetch() {
    const resolvers = this._resolvers;
    this._fetchFunc(this._ids).then(items => {
      for (let i = 0; i < resolvers.length; ++i) {
        resolvers[i](items[i]);
      }
    });

    this._ids = null;
    this._resolvers = null;
    this._scheduled = false;
  }
}
