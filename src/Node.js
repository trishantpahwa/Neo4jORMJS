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

    match() {
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
        query += ')';
        return { 'query': query, 'alias': alias };
    }

    return() {
        const match = this.match();
        return match.query + ' RETURN ' + match.alias + ';';
    }

    update(updatedLabels=null, updatedProperties=null) {
        if(updatedLabels || updatedProperties) {
            const match = this.match();
            var query = match.query + ' ';
            const alias = match.alias;
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
        const match = this.match();
        var query = match.query + ' ';
        labels.forEach(function(label) {
            query += 'SET ' + match.alias + ':' + label + ' '
        });
        return query.substring(0, query.length -1) + ' RETURN ' + match.alias + ';';
    }

    addProperties(properties) {
        const match = this.match();
        var query = match.query + ' ';
        for(var property in properties) {
            query += 'SET ' + match.alias + '.' + property + '=\'' + properties[property] + '\', '
        };
        query = query.substring(0, query.length-2) + ' RETURN ' + match.alias + ';';
        return query;
    }

    delete() {
        const match = this.match();
        return match.query + ' DELETE ' + match.alias + ';';
    }
}

module.exports = Node;