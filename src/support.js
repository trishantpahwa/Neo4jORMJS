const { v4: uuidv4 } = require('uuid');

function makeAlias() {
    return '_' + uuidv4().split('-').join('').substring(0, 12);
}

function addConstraint(constraint, labels, property) {

    if(constraint !== 'UNIQUE' || constraint !== 'PROPERTY_EXISTANCE') {
        throw 'constraint not found.';
    }
    if(!Array.isArray(labels)) {
        throw 'labels should be an array.'
    }
    if(typeof myVar !== 'string' || !(myVar instanceof String)) {
        throw 'properties should be a string.'
    }

    const alias = makeAlias();
    var query = 'CREATE CONSTRAINT ON (' + alias;
    labels.forEach(function(label) {
        query += ':' + label;
    });
    query += ') ASSERT ';
    switch(constraint) {
        case 'UNIQUE':
            query += alias + '.' + property + ' IS UNIQUE;';
            break;
        case 'PROPERTY_EXISTANCE':
            query += 'exists( ' + alias + '.' + property + ');';
            break;
    }
    return query;
}

module.exports = {
    makeAlias,
    addConstraint
};