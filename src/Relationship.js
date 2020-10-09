const Node = require('./Node');
const { makeAlias } = require('./support');

class Relationship {
    
    constructor(leftNode, rightNode, label, properties, direction) {

        if(!(leftNode instanceof Node)) {
            throw 'leftNode should be an object of class Node';
        }
        if(!(rightNode instanceof Node)) {
            throw 'rightNode should be an object of class Node';
        }
        if(typeof label !== 'string') {
            throw 'label should be of type String.';
        }
        if(typeof properties !== 'object' && properties === null) {
            throw 'properties should be of type Object';
        }
        switch(direction) {
            case '>':
                break;
            case '<':
                break;
            case '-':
                break;
            default:
                throw 'direction should be string containing symbol ">" or "<" or "-"';
        }


        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.label = label;
        this.properties = properties;
        this.direction = direction;
    }

    create() {
        const alias = makeAlias();
        const leftMatch = this.leftNode.match();
        const rightMatch = this.rightNode.match();
        var query = leftMatch.query + ',' + rightMatch.query.split('MATCH ')[1];
        if(this.direction == '>') {
            query += ' CREATE (' + leftMatch.alias + ')-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']->(' + rightMatch.alias + ');';
        }
        if(this.direction == '<') {
            query += ' CREATE (' + leftMatch.alias + ')<-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']-(' + rightMatch.alias + ');';
        }
        if(this.direction == '-') {
            query += ' CREATE (' + leftMatch.alias + ')<-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']-(' + rightMatch.alias + ');';
        }
        return query;
    }

    match() {
        const alias = makeAlias();
        const leftMatch = this.leftNode.match();
        const rightMatch = this.rightNode.match();
        if(this.direction == '>') {
            var query = leftMatch.query + '-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{'
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']->' + rightMatch.query.split('MATCH ')[1];
        }
        if(this.direction == '<') {
            var query = leftMatch.query + '<-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{'
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']-' + rightMatch.query.split('MATCH ')[1];
        }
        if(this.direction == '-') {
            var query = leftMatch.query + '-[' + alias + ':' + this.label;
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += ']-' + rightMatch.query.split('MATCH ')[1];
        }
        return {'leftNodeAlias': leftMatch.alias, 'rightNodeAlias': rightMatch.alias, 'alias': alias, 'query': query};
    }

    return() {
        const match = this.match();
        return match.query + ' RETURN ' + match.leftNodeAlias + ', ' + match.rightNodeAlias + ', ' + match.alias + ';';
    }

    update(updatedProperties=null) {
        if(updatedProperties) {
            const match = this.match();
            var query = match.query + ' ';
            for(var property in updatedProperties) {
                query += 'SET ' + match.alias + '.' + property + '=' + updatedProperties[property];
            }
            return query;
        } else {
            return '()';
        }
    }

    delete() {
        const match = this.match()
        return match.query + ' DELETE ' + match.alias + ';';
    }
}

module.exports = Relationship;