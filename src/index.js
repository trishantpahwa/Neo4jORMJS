const Node = require('./Node');
const executeQuery = require('./db');


var n = new Node(['Student'], {'Firstname': 'Trishant', 'Lastname': 'Pahwa'});
const query1 = n.create();
executeQuery(query1, function(result) {
    console.log(result);
});
const query2 = n.return();
executeQuery(query2, function(result) {
    result.records.forEach(function(record) {
        console.log(record);
    })
});
const query3 = n.update({'Student': 'Engineer'}, {'Lastname': 'pahwa'});
executeQuery(query3, function(result) {
    console.log(result);
});