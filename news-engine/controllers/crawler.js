var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

    url = 'http://www.news.ro/';

    request(url, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { link : ""};

            $('.container-img').filter(function(){

                var data = $(this);

                title = data.children().first().attr('href').text();

                // Once we have our title, we'll store it to the our json object.
                json.title = title;
            })
        }
    })

})

app.listen('8081')
console.log('');
exports = module.exports = app;
