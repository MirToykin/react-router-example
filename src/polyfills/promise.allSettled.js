const makeAllSettledPolyfill = () => {
  if(!Promise.allSettled) {
    Promise.allSettled = function(promises) {
      return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
        state: 'fulfilled',
        value: value
      }), error => ({
        state: 'rejected',
        reason: error
      }))));
    };
  }
}

export default makeAllSettledPolyfill;