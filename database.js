const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Sandhya@563',
        database: 'sandy'
    }
});

// candidate table
knex.schema.hasTable("candidate").then(function (exits) {
    if (!exits) {
        return knex.schema.createTable("candidate",function (table){
            table.increments("id").primary();
            table.string("Name");
            table.string("email");
            table.string("address");
        })

    }


    // test_score table
    knex.schema.hasTable("test_score").then(function (exits) {
        if (!exits) {
            return knex.schema.createTable("candidate",function (table){
                table.increments("id").primary();
                table.integer("user_id");
                table.integer("first_round");
                table.integer("second_round");
                table.integer("third_round");

            })
        }
    }).then((data) => {
        console.log("Table test_score");
    })
    .catch((err) => {
        console.log("test_score Table Already Exist!!");
    });
}).then((data) => {
    console.log("Table candidate");
})
.catch((err) => {
    console.log("test_score Table Already Exist!!");
});



module.exports = knex;