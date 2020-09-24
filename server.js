let express = require('express');
let app = express();
//var util = require('util');
const bodyParser = require('body-parser')
var exec = require('child_process').exec;
let port = process.env.PORT || 3000;
console.log('RESTful API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', function (req, res) {
    var callerID = req.body.callerID; 
    
    console.log(callerID);
    
    //var command = `curl -v -d '{"callerID":"${callerID}"}' --http2 --cert voipCert.pem:FOREVERalone3110 https://api.development.push.apple.com/3/device/b7de50db22e52ee5c1d0477fdd96fdda736a3e60b79f57a7c9ed625230e95f36`
    var command = `curl -v -d '{}' --http2 --cert voipCert.pem:FOREVERalone3110 https://api.development.push.apple.com/3/device/b7de50db22e52ee5c1d0477fdd96fdda736a3e60b79f57a7c9ed625230e95f36`

    child = exec(command, function (error, stdout, stderr) {

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
            var result = {
                "code": 0,
                "message": `Error ${error}` 
            }
            res.send(result);
        }
        else {
            var result = {
                "code": 1,
                "message": `Success` 
            }
            res.send(result);
        }

    });

});


app.listen(port);
