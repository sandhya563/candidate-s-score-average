const router = require("express").Router()
const knex = require('./database')

// Insert data into candidate table
router.post('/candidate-info', (req, res) => {
    const user_data = {
        Name: req.body.Name,
        Email: req.body.Email,
        address: req.body.address
    }
    knex('candidate').insert(user_data)
        .then((data) => {
                res.send({
                "statusCode": 200,
                "message": "candidate data inserted sucssfully"
            })

        }).catch((er) => {
            console.log(er, "error");
            res.send({ "statusCode": 404 })
        })
})
// Insert data into test_score table
router.post('/userscore-info', (req, res) => {
    const user_data = {
        user_id: req.body.user_id,
        first_round: req.body.first_round,
        second_round: req.body.second_round,
        third_round: req.body.third_round
    }
    knex('test_score').insert(user_data)
        .then((data) => {
            res.send({
                "statusCode": 200,
                "message": "test_score data inserted sucssfully"
            })
        }).catch((er) => {
            res.send({ "statusCode": 404 })
        })
    knex('users')
})
// Getting data the from candidate table
router.get('/candidate-data', (req, res) => {
    knex().select('*').from('candidate')
        .then((data) => {
            res.send({
                "statusCode": 200,
                "message": "get the data from candidate table sucssfully"
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({ "statusCode": 404 })
        })
})
// Getting data the from test_score table
router.get('/score-data', (req, res) => {
    knex().select('*').from('test_score')
        .then((data) => {
            console.log(data);
            res.send({
                "statusCode": 200,
                "message": "get the data from test_score table sucssfully"
            })
        })
        .catch((err) => {
            res.send({ "statusCode": 404 })
        })
})
// Join the two table user_scores, Show the score of test_score table data.
router.get('/user_scores', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({
                "statusCode": 200,
                "message": "User score data is sucssfully"
            })
            console.log('All test score is this')
            for (i in data) {
                console.log(data[i]['first_round'], data[i]['second_round'], data[i]['third_round']);
            }
        }).catch((error => {
            console.log(error)
            res.send({ "statusCode": 404 })
        }))
})

// Find the all round's average from test_score table.
router.get('/average_scores', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({
                "statusCode": 200,
                "message": "Average of test score sucssfully"
            })
            var first_round_sum = 0;
            var second_round_sum = 0;
            var third_round_sum = 0;
            var count = 0;
            for (i in data) {
                count = count + 1
                first_round_sum = first_round_sum + data[i]['first_round']
                second_round_sum = second_round_sum + data[i]['second_round']
                third_round_sum = third_round_sum + data[i]['third_round']
            }
            console.log('This is the first_round average =', first_round_sum / count)
            console.log('This is the  second_round average =', second_round_sum / count)
            console.log('This is the third_round average =', third_round_sum / count)

            // Finde the heighest average of test score table.
            const first_round_average = first_round_sum / count
            const second_round_average = second_round_sum / count
            const third_round_average = third_round_sum / count
            if (first_round_average > second_round_average && first_round_average > third_round_average) {
                console.log(`Heighest average of first_round_average is = ${first_round_average}`);

            } else if (second_round_average > first_round_average && second_round_average > third_round_average) {
                console.log(`Heighest average of second_round_average is = ${second_round_average}`);

            } else if (third_round_average > first_round_average && third_round_average > second_round_average) {
                console.log(`Heighest average of third_round_average is = ${third_round_average}`);
            }
        })
        .catch((error => {
            res.send({ "statusCode": 404 })
        }))
})
// Find the heighest score from test_score table.
router.get('/heighest-scores', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({
                "statusCode": 200,
                "message": "Heighest scores data from test_score  table sucssfully"
            })
            var total_score = []
            for (i in data) {
                var score = (data[i].first_round + data[i].second_round + data[i].third_round);
                total_score.push(score)
            }
            console.log(total_score);
            console.log("Heighest score of test_score table = ",Math.max.apply(Math, total_score))
        })
        .catch((error => {
            res.send({ "statusCode": 404 })
        }))
})
// Updating the data from candidate table.
router.put('/candidate-update/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('candidate').where('id', req.params.id)
        .then(() => {
            res.send({
                "statusCode": 200,
                "message": "candidate data  has updated sucssfully"
            })
        })
        .catch((err) => {
            res.send({ "statusCode": 404 })
        })
})
// Updating the data from test_score table.
router.put('/score-updatedate/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('test_score').where('id', req.params.id)
        .then(() => {
            res.send({
                "statusCode": 200,
                "message": "test_score data has updated sucssfully"
            })
        })
        .catch((err) => {
            res.send({ "statusCode": 404 })
        })
})
// Delete the data from candidate table.
router.delete('/candidatedata-delete/:id', (req, res) => {
    knex('candidate')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({
                "statusCode": 200,
                "message": "candidate data has deleted sucssfully"
            })
        })
        .catch((err) => {
            res.send({ "statusCode": 404 })
        })
})
// Delete the data from test_score table.
router.delete('/scoredata-delete/:id', (req, res) => {
    knex('test_score')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({
                "statusCode": 200,
                "message": " test_score data has deleted sucssfully"
            })
        })
        .catch((err) => {
            res.send({ "statusCode": 404 })
        })
})
module.exports = router;