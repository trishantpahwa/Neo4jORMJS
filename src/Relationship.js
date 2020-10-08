const Node = require('./Node');
const { makeAlias } = require('./support');

class Relationship {
    
    constructor(leftNode, rightNode, labels, properties, direction) {

        if(!(leftNode instanceof Node)) {
            throw 'leftNode should be an object of class Node';
        }
        if(!(rightNode instanceof Node)) {
            throw 'rightNode should be an object of class Node';
        }
        if(!Array.isArray(labels)) {
            throw 'labels should be of type Array.';
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
        this.labels = labels;
        this.properties = properties;
        this.direction = direction;
    }

    create() {
        const alias = makeAlias();
        const leftMatch = this.leftNode.match();
        const rightMatch = this.rightNode.match();
        var query = leftMatch.query + ',' + rightMatch.query.split('MATCH ')[1];
        if(this.direction == '>') {
            query += ' CREATE (' + leftMatch.alias + ')-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += '->(' + rightMatch.alias + ');';
        }
        if(this.direction == '<') {
            query += ' CREATE (' + leftMatch.alias + ')<-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += '-(' + rightMatch.alias + ');';
        }
        if(this.direction == '-') {
            query += ' CREATE (' + leftMatch.alias + ')-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
            if(Object.keys(this.properties).length) {
                query += '{';
                for(var property in this.properties) {
                    query += property + ':\'' + this.properties[property] + '\', ';
                }
                query = query.substring(0, query.length-2) + '}';
            }
            query += '-(' + rightMatch.alias + ');';
        }
        return query;
    }

    match() {
        const alias = makeAlias();
        const leftMatch = this.leftNode.match();
        const rightMatch = this.rightNode.match();
        if(this.direction == '>') {
            var query = leftMatch.query + '-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
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
            var query = leftMatch.query + '<-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
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
            var query = leftMatch.query + '-[' + alias;
            this.labels.forEach(function(label) {
                query += ':' + label;
            });
            if(Object.keys(this.properties).length) {
                query += '{'
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
        
    }
}

module.exports = Relationship;



// var query = leftMatch.query + ',' + rightMatch.query.split('MATCH ')[1] + ' RETURN ' + leftMatch.alias + ', ' + rightMatch.alias + ';';