var bodyParser = require('body-parser');
var os = require('os');

module.exports = function(app) {

    // bodyParser will help with parsing data from URL
    // it is used for many things including pattern matching
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true}));


    function getCPUInfo(){
        var cpus = os.cpus();

        var user = 0;
        var nice = 0;
        var sys = 0;
        var idle = 0;
        var irq = 0;
        var total = 0;

        for(var cpu in cpus){
            if (!cpus.hasOwnProperty(cpu)) continue;
            user += cpus[cpu].times.user;
            nice += cpus[cpu].times.nice;
            sys += cpus[cpu].times.sys;
            irq += cpus[cpu].times.irq;
            idle += cpus[cpu].times.idle;
        }

        var total = user + nice + sys + idle + irq;

        return {
            'idle': idle,
            'total': total
        };
    }

    app.get('/api/usage', function(req, res) {
        // http response
        res.header('Access-Control-Allow-Origin', '*'); //TODO change wildcard and make comma separated list of domains instead.
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

        // console.log(os.cpus());
        console.log(os.totalmem());
        console.log(os.freemem());

        var stats1 = getCPUInfo();
        var startIdle = stats1.idle;
        var startTotal = stats1.total;
        var usage;
        setTimeout(function() {
            var stats2 = getCPUInfo();
            var endIdle = stats2.idle;
            var endTotal = stats2.total;

            var idle 	= endIdle - startIdle;
            var total 	= endTotal - startTotal;
            var perc	= idle / total;
            usage       = (1 - perc) * 100;
            console.log(usage + '%');
            res.send({'usage' : usage});
        }, 1000 );


        // just sending string of todos back. Will be in JSON format as mongoDb stores it as documents of JSONs

    });
}
