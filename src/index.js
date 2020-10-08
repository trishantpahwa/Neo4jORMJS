const Node = require('./Node');
const Relationship = require('./Relationship');
const executeQuery = require('./db');


var n = new Node(['Student'], {'Firstname': 'Trishant', 'Lastname': 'Pahwa'});
const query1 = n.create();
console.log(query1);
// executeQuery(query1, function(result) {
//     console.log(result);
// });
const query2 = n.return();
console.log(query2)
// executeQuery(query2, function(result) {
//     result.records.forEach(function(record) {
//         console.log(record);
//     })
// });
const query3 = n.update({'Student': 'Engineer'}, {'Lastname': 'pahwa'});
console.log(query3);
// executeQuery(query3, function(result) {
//     console.log(result);
// });
const query4 = n.addLabel(['Software Developer']);
console.log(query4);
const query5 = n.addProperties({'Company': 'Garrud'});
console.log(query5);
const query6 = n.delete();
console.log(query6);