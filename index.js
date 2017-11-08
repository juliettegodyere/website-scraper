var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');

function Scraper(serviceId, conf){
    var configuration = conf;
    var scrapeData = [];
    var loadPage = function(url, pin){
        return new Promise(function(resolve, reject){
            console.log('Evaluating '+url);
            var request = require("request");

            var options = { method: 'POST',
                url: 'http://www.askniid.org/CheckPolicy.aspx',
                headers:
                    { 'postman-token': '9f9618d9-d7b1-f4ad-0139-372332e437b4',
                        referer: 'http://www.askniid.org/CheckPolicy.aspx',
                        'x-microsoftajax': 'Delta=true',
                        connection: 'keep-alive',
                        'x-requested-with': 'XMLHttpRequest',
                        'cache-control': 'no-cache',
                        accept: '*/*',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                        'accept-language': 'en-CA,en-GB;q=0.8,en-US;q=0.6,en;q=0.4',
                        'accept-encoding': 'gzip, deflate',
                        origin: 'http://www.askniid.org',
                        cookie: '_ga=GA1.2.193461287.1509717203; _gid=GA1.2.1145934788.1509962209' },
                body: 'ctl00%24ScriptManager1=ctl00%24ContentPlaceHolder1%24UpdatePanel1%7Cctl00%24ContentPlaceHolder1%24btnSearch&ctl00%24ContentPlaceHolder1%24drpOption=Single&ctl00%24ContentPlaceHolder1%24rblNumber=Registration%20Number&ctl00%24ContentPlaceHolder1%24txtNumber='+pin+'&__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=5WffC3C2S9RsJg8Twv718nbTfkGZ7Vnt5HXvl6%2FxaDG%2FLER%2BT8bc3qxA0qKlzjULLHrmSl3yQeIrCpZfnSJAV7FwelshcPr5zbmetNodj%2FCmgfSFgmu2ATDHkmzUsM4oM67qPZ4tTdV4SQQYG4ReB4o8TP41K2siHqb6GTHxtX%2B7gIzs9RkyYLzIka1Ji6nS7pDttypGSqnSPVF68E6xUA4raWu87ioEoVoKOuQeA1OYfaZaNqB%2F7N6T%2F24xhjJgBmm9Z3QwkqlXSZlH5oL6frQIFS2k62xWLBOHPXd0lvikB%2FbR3%2BF18iwsH5muDMkumr6LaIYKcSiIt%2ByrQhvhRvciVShStWB%2BGk3qivx3TBLm9ewq8mKjkF9fSOf71HybAB4s7PXncSsfG0Cw3p8FNIqEhqSyMuU3SBPjfCdid6UY3AWrhW%2Fh7FyCboJ1kIqPMd5PgwfEBbfP9H87xto6TbH8KpDj3znn1lgrJHdibHfqhc7hcFoaEsrGrWxGAZrGD3g18QEzD5PCVAsGdJNqvntBBpa0dubEQou3UK1RU210WFc6OTcwuLWMTBctVXOGSmIya3%2BqZCrWUX6WdkA3Kro3LYbA3PPhkJNBV5Zoj7k5gwfPg67dN74KqggLwTBW5s%2FehITYzxOSkhseHzycEzbLJAu1TxW7fe0OtO4yqejmO4qYG11VY4r9v9KIfddYO3uljkL7srkxwiVJSgR7fnTNRk7MDGLcu1BCqCKTdLh3idnfliLThwUCgUlTZC1b5FObn4xwBSziUI%2BjlqAVmeImYTKIYP%2FHh77jxX6gw75utJUJwmy5ppwOIpc9usslxexezTHq34AZ63yDFcFuVLOHEtSEtriCoyWkTj74c2vUH97iD8cTO3tMk0lI18hgaANZZK%2Fqc1Jw1OeIe58Mfsr8tXLOT1okyOp9mbbmZpvlHYChvwEXzFGQvjsJCuPlTPNim6Gxehtm3VB0c0j%2FhVrtkMR7YdyKviztHZ2KyO%2F1gTkfscDoNWQnJFWiIFIzkjUjhBdHW6hyt7fW53Np8E1C5OhYDAI5aS1Q%2BsWYXVrZ%2ByH88vA%2Fqqubx2bBwIkYtiWpBYs3yXyqUXXPOuHe6K1nItNvp8tSpjq2GMtTMNJperaHsli3SSg9C5C6Tet6XZ5rNlMoEvJfV0V%2BsGg3rH4YTIM%2F3MLzP%2F8XnEnM3q9iJziJbIM%2BSbcLEmqhlqqwIWOIlj%2BRns96IfBZRNnV5IKtrNg4Tl520NCWcNOACCRKGa7FLdasZVE3cZcqbf00YQiHIxhWMeaVV0%2FqTvOE1AQ3E5Uz92Lm%2FVq%2Ftdz3Edq7fPs%2Bqj9RKhfE2Ip1jbv9V4JpkMtnYL2WB%2BcPnwN5MLurIBMlZ0NUNVewNti%2Fggzz%2F7QoVMnHAXoB7WFqmFHYVTdc3E%2FBj7xY%2FMd2vbWXrK%2BPPGldlP1bTyHJNBUbNXI%3D&__VIEWSTATEGENERATOR=FD5FD3B2&__VIEWSTATEENCRYPTED=&__ASYNCPOST=true&ctl00%24ContentPlaceHolder1%24btnSearch=Search' };

            request(options, function (error, response, body) {
                if(!error){
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    };
    return {
        start : async(function(req, res){
            if (!req.query.pin) {
                res.status(400);
                return res.send({
                    status : 'failed',
                    result : 'We need a Pin query parameter'
                });
            }

            var url = "http://www.askniid.org/CheckPolicy.aspx";
            var html = await(loadPage(url, req.query.pin));
            //console.log(html);
            var $ = cheerio.load(html);
            var container = $("#ContentPlaceHolder1_TB_SinglePolicy tr");
            if (!container.length) {
                res.status(404);
                return res.send({
                    status : 'failed',
                    result : 'No Policy Found'
                });
            }
            var resp = {};
            for (var i = 1; i < container.length; i++){
                var key = $("#ContentPlaceHolder1_TB_SinglePolicy tr:nth-of-type("+i+") .chill").html();
                var val = $("#ContentPlaceHolder1_TB_SinglePolicy tr:nth-of-type("+i+") span").html();
                resp[key] = val;
            }
            console.log(resp);
            res.status(200);
            return res.send({
                status : 'success',
                result : resp
            });
        })
    }
}
function PolicyNumber(serviceId, conf){
    var configuration = conf;
    var scrapeData = [];
    var policyPage = function(url, policy_number){
        return new Promise(function(resolve, reject){
            console.log('Evaluating '+url);
            var request = require("request");

            var options = { method: 'POST',
                url: 'http://www.askniid.org/checkpolicy.aspx',
                headers:
                    { 'postman-token': 'edf3f125-1835-3958-bb76-4c73627c2a52',
                        referer: 'http://www.askniid.org/checkpolicy.aspx',
                        'x-microsoftajax': 'Delta=true',
                        connection: 'keep-alive',
                        'x-requested-with': 'XMLHttpRequest',
                        'cache-control': 'no-cache',
                        accept: '*/*',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
                        'accept-language': 'en-CA,en-GB;q=0.8,en-US;q=0.6,en;q=0.4',
                        'accept-encoding': 'gzip, deflate',
                        origin: 'http://www.askniid.org',
                        cookie: '_ga=GA1.2.193461287.1509717203' },
                body: 'ctl00%24ScriptManager1=ctl00%24ContentPlaceHolder1%24UpdatePanel1%7Cctl00%24ContentPlaceHolder1%24btnSearch&ctl00%24ContentPlaceHolder1%24drpOption=Single&ctl00%24ContentPlaceHolder1%24rblNumber=Policy%20Number&ctl00%24ContentPlaceHolder1%24txtNumber='+policy_number+'&__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=VFSgutVJcf03FkuTy5iaPuNMKmgJq28ZMgBX8VCqmV%2Fqq2hCWQXzpEl9BxdBY9nSEIu0EXnSEayLpJgXjqXfD4E9jXAYWSdU3IGQMUhzt61wKExxGTPx1Ze9oGN8%2BEMJhWbIDbqZH1beXprqOSzWZo5dG%2F1%2FmKPvodIGPZgxCVZ9bwvSO3Sbh%2FEKtsAJISerYL%2FFZklKeDboEPOdrWqNPSK2XdsiJtSJQGIh1CrDB2iHUz%2Bz3r3M8NflY6%2BIRELtLOSSpUIYFCXao8XeSH0A%2BPJ1l1D0fNfOuoqki9IWhiKPte9VqEgB5pHP1Fz%2FQO%2FYU0irBEUsEnPTO6O2aDxuVNaQm6MD6bt4vbh6HMNp55G4DxJ2zytJtKJjxO0nsV8xu5kyopXyWJuxXE2LkAxTpU4AbHcoylqWfQZGJapz7nRVXVC93t3U0R1uPKR3xBtml20VvBMky%2BKKJmRsPhItvHGY7AjwF35l5txgEcRJKxZilwy%2BHw%2Bnriqfq%2BLe%2Fd7KWyxJ1OBTumUkn3dGQv0xOFM8c5hxr3tlMbt0X47H2m3CgGy%2BcF13RY%2FOgx2AJZ9JtJHgxNzoACfEsts6%2Bn114qiTcXi90qYf85NhyyD15gYFXNo7pDBAOolaz1FUvmHwRRdTQnEcrVJTXdBL06Yd6DRUOR2DdlFimtVmJwW5lwHisQKPg4IlKnRyfoGnxcar0gehQEY3zTPdBXSdQPb1Gy%2FAq7vzNk6CvCNyEJ%2BxQCz5GNsM6oXzWsvEQolxHgn2y62Su4JwBpfluCkngCRsZzPJNEE1vP9rVE2wO3ZvLD99GWAvKDQ9Z1ZukQZwfMvhFnTVat7zQBHNOVMyH1xgHFMYWDxH1aigvNRj1SVJYJFVQV%2BZcGHlQdqHbi7CsB0fF3YW1PfYD5fI6ojGjIvhq1vr0zhXbOzae%2FdBYZRqiQg%2FWrZafyc7SkU1rgqDFmr6lIvQzNHwfpTu2Yor9heh%2F6cbNL2PW3AbahDPbwCftpULvcMusVN%2FeorEkpqIk7vz9wo9V4XAeUUJ9ASfP7HEQ8Hwe7%2FQ6Lddp3avvu8NKUhL6V9QNDjYcXZ%2BOqb96uomkR6cyyyaOJF99rsE1gmme2IfBHphKvNCS92dZDWeDgvGjcEsLd5sahajoxQSw1yaCi%2F72ds2HQ1nI6Nz5X6n2EybZI9pkkqsIqZoaha8159hrWJCq0cTL1nOffP%2Fmph5s2SlR%2FpnIKrZEmo%2FCh7eB%2B2rZpAFq%2FGJYMpQCOOwyWlDhGvcv4WuFpGIleArNqWvdA9N%2FP2YIcR4c252361iuBpoebdyx0gg3vQWj%2BWivsPpvAvQW%2BuO9cV11DExEjDithlNJaf5cvDVdbso3LnENjlNX3g%2BcN8ILjl3NslsVO9uZPV6KaXf31vsumpSAB5ZyNQW7VCiCWP6IzoEQ85W5cU8gCKCGY7ZVhg4yUB1gRA%3D&__VIEWSTATEGENERATOR=FD5FD3B2&__VIEWSTATEENCRYPTED=&__ASYNCPOST=true&ctl00%24ContentPlaceHolder1%24btnSearch=Search' };

            request(options, function (error, response, body) {
                if(!error){
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    };
    return {
        start : async(function(req, res){
            if (!req.query.policy_number) {
                res.status(400);
                return res.send({
                    status : 'failed',
                    result : 'We need a Pin query parameter'
                });
            }

            var url = "http://www.askniid.org/CheckPolicy.aspx";
            var html = await(policyPage(url, req.query.policy_number));
            //console.log(html);
            var $ = cheerio.load(html);
            var container = $("#ContentPlaceHolder1_TB_SinglePolicy tr");
            if (!container.length) {
                res.status(404);
                return res.send({
                    status : 'failed',
                    result : 'No Policy Found'
                });
            }
            var resp = {};
            for (var i = 1; i < container.length; i++){
                var key = $("#ContentPlaceHolder1_TB_SinglePolicy tr:nth-of-type("+i+") .chill").html();
                var val = $("#ContentPlaceHolder1_TB_SinglePolicy tr:nth-of-type("+i+") span").html();
                resp[key] = val;
            }
            console.log(resp);
            res.status(200);
            return res.send({
                status : 'success',
                result : resp
            });
        })
    }
}
var url = process.env.PORT || 2000;

app.get('/', function(req, res){
    new Scraper(1, 1).start(req, res);
});
app.get('/policy', function(req, res){
    new PolicyNumber(1, 1).start(req, res);
});
app.listen(url, function(){
    console.log('Listening on '+url);
});

exports = module.exports = app;