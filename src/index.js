const Node = require('./Node');
const Relationship = require('./Relationship');
const executeQuery = require('./db');


var n1 = new Node(['Student'], {'Firstname': 'Trishant', 'Lastname': 'Pahwa'});
// const query1 = n1.create();
// console.log(query1);
// // executeQuery(query1, function(result) {
// //     console.log(result);
// // });
// const query2 = n1.return();
// console.log(query2)
// // executeQuery(query2, function(result) {
// //     result.records.forEach(function(record) {
// //         console.log(record);
// //     })
// // });
// const query3 = n1.update({'Student': 'Engineer'}, {'Lastname': 'pahwa'});
// console.log(query3);
// // executeQuery(query3, function(result) {
// //     console.log(result);
// // });
// const query4 = n1.addLabel(['Software Developer']);
// console.log(query4);
// const query5 = n1.addProperties({'Company': 'Garrud'});
// console.log(query5);
// const query6 = n1.delete();
// console.log(query6);
const query7 = n1.addConstraint('UNIQUE', 'Lastname');
console.log(query7);
const query8 = n1.addConstraint('PROPERTY_EXISTANCE', 'Firstname');
console.log(query8)



// var n2 = new Node(['Student'], {'Firstname': 'Trishant', 'Lastname': 'Pahwa'});
// executeQuery(n1.create(), function(result1) {
//     executeQuery(n2.create(), function(result2) {
//         executeQuery(r1.create(), function(result) {
//             console.log(result);
//         });
//     });
// });