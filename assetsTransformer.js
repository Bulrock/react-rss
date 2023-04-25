/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  process(__, filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
