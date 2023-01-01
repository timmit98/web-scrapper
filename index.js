const PORT = 8000;

const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const app = express();

const URL = 'https://www.stuff.co.nz/';
axios(URL)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html);
        const articles = [];
        $('app-homepage-article', html).each(function() {
            const title = $(this).text()
            const href =  $(this).find('a').attr('href')
            const url = (href.startsWith("https")) ? href : URL + href
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))