const neo4j = require('neo4j-driver');

function executeQuery(query, callback) {

    var driver = neo4j.driver(
        'neo4j://localhost',
        neo4j.auth.basic('neo4j', 'password')
    );

    var session = driver.session();
    session.run(query).then(function(result) {
        callback(result);
    }).catch(function(error) {
        console.log(error);
    }).then(function() {
        session.close();
        driver.close();
    });
}

module.exports = executeQuery;