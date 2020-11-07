var assert = require('assert');
const Node = require('../Node');
const Node = require('../Relationship');


describe('Should conduct operations related to a Node', function () {
  describe('create', function () {
    var n1 = new Node([], {});
    var n2 = new Node(['Student']);
    var n3 = new Node(['Student', 'Engineer', 'Developer']);
    it('should create an empty Node with no labels or properties', function () {
      
    });
  });
});