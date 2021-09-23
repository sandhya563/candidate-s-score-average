const router = require("express").Router()
const knex = require('./database')

// insert data into candidate table
router.post('/createdata', (req, res) => {
    const user_data = {
        Name: req.body.Name,
        Email: req.body.Email,
        address: req.body.address
    }
    knex('candidate').insert(user_data)
        .then((data) => {
            console.log(data, ' crete! sucssfully...')
            res.send({"message":"candidate data inserted sucssfully"})
            
        }).catch((er) => {
            console.log(er, "error");
            res.send(er)
        })
})
// insert data into test_score table
router.post('/testscore_data', (req, res) => {
    const user_data = {
        user_id: req.body.user_id,
        first_round: req.body.first_round,
        second_round: req.body.second_round,
        third_round: req.body.third_round
    }
    knex('test_score').insert(user_data)
        .then((data) => {
            console.log(data, ' crete! sucssfully...')
            res.send({"message":"test_score data inserted sucssfully"})
        }).catch((er) => {
            console.log(er, "error");
            res.send(er)
        })
    knex('users')
})
// getting data the from candidate table
router.get('/getdata', (req, res) => {
    knex().select('*').from('candidate')
        .then((data) => {
            console.log('data is coming!....');
            res.send({"message":"get the data from candidate table sucssfully"})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})
// getting data the from test_score table
router.get('/getdata', (req, res) => {
    knex().select('*').from('test_score')
        .then((data) => {
            console.log();
            res.send({"message":"get the data from test_score table sucssfully"})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})
// join the two table user_scores
router.get('/user_scores', (req, res) => {
    knex
        .select("*").from('candidate')
        .join('test_score', function () {
            this.on('candidate.id', 'test_score.user_id')
        })
        .then((data) => {
            res.send({"message":"candidate or test_score table data  has joined sucssfully"})
        // finde the average of test_score
            var total_score = []
            var first_round_sum = 0;
            var second_round_sum = 0;
            var third_round_sum = 0;
            var count = 0;
            for (i in data) {
                var score = (data[i].first_round + data[i].second_round + data[i].third_round);
                total_score.push(score)
                // console.log(score_arry)
                console.log(data[i]['first_round'], data[i]['second_round'], data[i]['third_round']);
                count = count + 1
                first_round_sum = first_round_sum + data[i]['first_round']
                second_round_sum = second_round_sum + data[i]['second_round']
                third_round_sum = third_round_sum + data[i]['third_round']
            }
            console.log('This is the first_round average', first_round_sum / count)
            console.log('This is the  second_round average', second_round_sum / count)
            console.log('This is the third_round average', third_round_sum / count)

            //  finde the heightest average of test score
            const first_round_average = first_round_sum / count
            const second_round_average = second_round_sum / count
            const third_round_average = third_round_sum / count
            if (first_round_average > second_round_average && first_round_average > third_round_average) {
                console.log(`Heightest average of first_round_average is ${first_round_average}`);

            } else if (second_round_average > first_round_average && second_round_average > third_round_average) {
                console.log(`Heightest average of second_round_average is ${second_round_average}`);

            } else if (third_round_average > first_round_average && third_round_average > second_round_average) {
                console.log(`Heightest average of third_round_average is ${third_round_average}`);
            }
            // find maximum score from the test_score table
            console.log(total_score)
            console.log(Math.max.apply(Math, total_score), 'Max score of round')

        }).catch((error => {
            console.log(error)
        }))
})

// updating the data from candidate table
router.put('/updating/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('candidate').where('id', req.params.id)
        .then(() => {
            res.send({"message":"candidate data  has updated sucssfully"})
        })
        .catch((err) => {
            res.send(err)
        })
})
// updating the data from test_score table
router.put('/updatedata/:id', (req, res) => {
    knex.update(
        req.body
    )
        .table('test_score').where('id', req.params.id)
        .then(() => {
            res.send({"message":"test_score data has updated sucssfully"})
        })
        .catch((err) => {
            res.send(err)
        })
})
// delete the data from candidate
router.delete('/deletingdata/:id', (req, res) => {
    knex('candidate')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({"message":"candidate data has deleted sucssfully"})
        })
        .catch((err) => {
            res.send(err)
        })
})
// delete the data from test_score table 
router.delete('/deleting/:id', (req, res) => {
    knex('test_score')
        .where({ 'id': req.params.id }).del()
        .then(() => {
            res.send({"message":" test_score data has deleted sucssfully"})
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = router;