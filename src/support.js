const { v4: uuidv4 } = require('uuid');

function makeAlias() {
    return '_' + uuidv4().split('-').join('').substring(0, 12);
}

module.exports = {
    makeAlias
};