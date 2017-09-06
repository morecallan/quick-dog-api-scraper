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



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "Brown", "Grey", "Poop-Colored"];

const specialSkillz = ["Expertly quotes and recognizes dialogue from early seasons of The Simpsons.","Can be around boobs without staring creepily at them.","Proficient in air guitar","Able to lift slightly more than you’d think.","Gives sincere apologies.","Owns a Nintendo Power Glove.","Not too shabby at spelling.","Will not make a scene when your grandmother says something mildly anti-Semitic.","Gives thoughtful and creative birthday presents.","Adept at talking self and others out of fights.","Takes the morning shift driving on road trips.","Admits he is wrong","Is not racist.","Talks about sports with enthusiasm and accuracy.","Sits back seat middle if necessary.","Participates in karaoke but does not force others to go out to karaoke.","Dances when he has to.","Does not freak out if you haven’t seen his favorite movie (The Big Lebowski).","Will loan you books without freaking out if you have them for a while.","Can read (but cannot understand) Hebrew.","Is totally laid back if you spell his name wrong.","Gives compliments when compliments are due.","Able to stop chewing ice or whistling on request.","Just picks the tomatoes off of a sandwich instead of requesting a whole new sandwich.","Drives at a safe rate of speed in snow or rain.","Knows who Michel Foucault is.","Doesn’t get weirded out by the word “moist.”","Comfortable in the outdoors for up to eight hours.","Can prove he is a real man by drinking whiskey.","Gives hugs with appropriate pressure and for the right length of time.","Showers regularly.","Is comfortable with jokes about his receding hairline.","Will pet your cat even though he does not like your cat.","Exhibits eagerness to visit any non-Holocaust museum.","Burps minimally.","Listens attentively to boring stories.","Always up for dessert."]


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

    newCat["specialSkill"] = specialSkillz[randomIntFromInterval(0, specialSkillz.length - 1)];
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
