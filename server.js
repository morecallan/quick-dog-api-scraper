#!/usr/bin/env node
"use strict";

//Setting Up App
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const request = require('request');
const { load } = require('cheerio');
const dogNames = require('dog-names');
const randomPuppy = require('random-puppy');




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "Brown", "Grey", "Poop-Colored"];

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//// Parse and return characteristics ////
app.get('/dogs/*', (req, res) => {
  let numberOfDogs = req.url.slice('/dogs/'.length)
  console.log(numberOfDogs);

  const dogs = []
  let counter = 0;

  for (let i = 0; i < numberOfDogs; i++) {
    let newDog = {
      name: dogNames.allRandom(),
      color: colors[randomIntFromInterval(0, colors.length - 1)],
    }

    randomPuppy()
    .then(url => {
        newDog.url = url;
        dogs.push(newDog);
        counter++;
        if (counter == numberOfDogs) {
          res.send(dogs)
        }
    })
  }

})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
