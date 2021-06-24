
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

const client = new AWS.SecretsManager();
const secretArn = process.env.DB_SECRET_ARN; // this is set by Beanstalk on our CFT, points to the Secret created

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    client.getSecretValue({SecretId: secretArn}, function(err, data) {
        res.send(data.SecretString);
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
