const { makeAlias } = require('./support');

class Node {

    constructor(labels, properties) {
        this.labels = labels;
        this.properties = properties;
    }

    create() {
        const alias = makeAlias();
        var query = 'CREATE (' + alias;
        this.labels.forEach(function(label) {
            query += ':' + label;
        });
        if(Object.keys(this.properties).length) {
            query += '{';
            for(var property in this.properties) {
                query += property + ':\'' + this.properties[property] + '\','
            }
            query = query.slice(0, -1) + '}';
        }
        query += ');';
        return query;
    }

    return() {
        const alias = makeAlias();
        var query = 'MATCH (' + alias;
        this.labels.forEach(function(label) {
            query += ':' + label;
        });
        if(Object.keys(this.properties).length) {
            query += '{';
            for(var property in this.properties) {
                query += property + ':\'' + this.properties[property] + '\','
            }
            query = query.slice(0, -1) + '}';
        }
        query += ') RETURN ' + alias + ';';
        return query;
    }

    update(updatedLabels=null, updatedProperties=null) {
        if(updatedLabels || updatedProperties) {
            const alias = makeAlias();
            var query = 'MATCH (' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\','
                }
                query = query.slice(0, -1) + '}';
            }
            query += ') ';
            if(updatedLabels) {
                for(var label in updatedLabels) {
                    query += 'REMOVE ' + alias + ':' + label + ' ';
                    query += 'SET ' + alias + ':' + updatedLabels[label] + ' '
                }
            }
            if(updatedProperties) {
                query += 'SET ';
                for(var property in updatedProperties) {
                    query += alias + '.' + property + '=\'' + updatedProperties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + ' RETURN ' + alias + ';';
            } else {
                query = query.substring(0, query.length-1) + ' RETURN ' + alias + ';';
            }
            return query;
        } else {
            return '()';
        }
    }

    addLabel(labels) {
        const alias = makeAlias();
        var query = 'MATCH (' + alias;
        this.labels.forEach(function(label) {
            query += ':' + label;
        });
        if(Object.keys(this.properties).length) {
            query += '{';
            for(var property in this.properties) {
                query += property + ':\'' + this.properties[property] + '\','
            }
            query = query.slice(0, -1) + '}';
        }
        query += ') ';
        labels.forEach(function(label) {
            query += 'SET ' + alias + ':' + updatedLabels[label] + ' '
        });
        query = query.substring(0, query.length -1) + ' RETURN ' + alias + ';';
        return query;
    }

    addProperties(properties) {
        const alias = makeAlias();
        var query = 'MATCH (' + alias;
        this.labels.forEach(function(label) {
            query += ':' + label;
        });
        if(Object.keys(this.properties).length) {
            query += '{';
            for(var property in this.properties) {
                query += property + ':\'' + this.properties[property] + '\','
            }
            query = query.slice(0, -1) + '}';
        }
        query += ') ';
        for(var property in properties) {
            query += 'SET ' + alias + ':' + updatedProperties[property] + ' '
        };
        query = query.substring(0, query.length -1) + ' RETURN ' + alias + ';';
        return query;
    }

    delete() {
        const alias = makeAlias();
        var query = 'MATCH (' + alias;
        this.labels.forEach(function(label) {
            query += ':' + label;
        });
        if(Object.keys(this.properties).length) {
            query += '{';
            for(var property in this.properties) {
                query += property + ':\'' + this.properties[property] + '\','
            }
            query = query.slice(0, -1) + '}';
        }
        query += ') DELETE ' + alias + ';';
        return query;
    }
}

module.exports = Node;