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
const gifSearch = require ('gif-search');
const catNames = require('cat-names');


const specialSkillz = ["Hardly sounds like he’s from Boston at all.", "Willing to be big spoon or little spoon.", "Has a terrific family recipe for brownies.", "Used to be able to do “the worm” kind of.", "Very reliable for giving rides to/ from the airport."]


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

function getRandomPrice(min,max)
{
  return (Math.floor(Math.random()*(max-min+1)+min)) / 100 ;
}

//// Parse and return characteristics ////
app.get('/dogs/*', (req, res) => {
  let numberOfDogs = req.url.slice('/dogs/'.length)

  const doggies = {}
  doggies.dogs = []
  let counter = 0;

  for (let i = 0; i < numberOfDogs; i++) {
    let newDog = {
      name: dogNames.allRandom(),
      color: colors[randomIntFromInterval(0, colors.length - 1)],
    }

    newDog["add-on-price"] = getRandomPrice(0, 7000);
    newDog["breed-id"] = randomIntFromInterval(0,6)

    randomPuppy()
    .then(url => {
        newDog.url = url;
        doggies.dogs.push(newDog);
        counter++;
        if (counter == numberOfDogs) {
          res.json(doggies)
        }
    })
  }

})

app.get('/cats/*', (req, res) => {
  let numberOfCats = req.url.slice('/cats/'.length)

  const kittens = {}
  kittens.cats = []
  let counter = 0;

  for (let i = 0; i < numberOfCats; i++) {
    let newCat = {
      name: catNames.random(),
      color: colors[randomIntFromInterval(0, colors.length - 1)],
    }

    newCat["specialSkill"] = [getRandomPrice(0, 7000)];
    newCat["numberOfToes"] = randomIntFromInterval(0,20)


    gifSearch.query('cat').then((gifUrl) => {
      newCat.imageUrl = gifUrl;
      kittens.cats.push(newCat);
      counter++;
      if (counter == numberOfCats) {
        res.json(kittens)
      }
    });
  }

})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
