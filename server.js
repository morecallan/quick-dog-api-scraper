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

const cropAddOn = "?crop=250:165;0,0&downsize=715";

const prettyGifs = [];

const catGifs = ["https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/13/enhanced/webdr10/anigif_enhanced-3148-1446487779-9.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/10/enhanced/webdr06/anigif_original-grid-image-14660-1446477682-15.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-21208-1446481436-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr05/anigif_enhanced-29363-1446481605-18.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-22194-1446481827-6.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr13/anigif_enhanced-12805-1446481904-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/13/enhanced/webdr04/anigif_enhanced-7250-1446487722-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr10/anigif_enhanced-17445-1446481940-10.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/13/enhanced/webdr11/anigif_enhanced-6320-1446488067-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr08/anigif_enhanced-11728-1446481996-20.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr11/anigif_enhanced-19791-1446482500-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr13/anigif_enhanced-17467-1446482522-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr06/anigif_enhanced-27866-1446482550-28.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr11/anigif_enhanced-19123-1446482575-20.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr11/anigif_enhanced-23578-1446482598-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/13/enhanced/webdr01/anigif_enhanced-21301-1446489701-6.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/14/enhanced/webdr14/anigif_enhanced-18432-1446491682-15.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-22830-1446482729-4.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-22830-1446482729-4.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-22849-1446482767-9.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-22830-1446482796-9.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr07/anigif_enhanced-5865-1446482866-10.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/14/enhanced/webdr14/anigif_enhanced-19150-1446492035-9.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/14/enhanced/webdr13/anigif_enhanced-10200-1446492059-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr09/anigif_enhanced-26523-1446483536-5.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr13/anigif_enhanced-18084-1446483578-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr07/anigif_enhanced-9094-1446483872-7.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/11/enhanced/webdr11/anigif_enhanced-23578-1446482692-7.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr04/anigif_enhanced-28964-1446483931-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr10/anigif_enhanced-21787-1446483970-9.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr11/anigif_enhanced-24900-1446484009-7.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr12/anigif_enhanced-1659-1446484096-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr04/anigif_enhanced-28149-1446484224-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr11/anigif_enhanced-24820-1446484272-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr05/anigif_enhanced-2462-1446484330-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr06/anigif_enhanced-1080-1446484438-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr02/anigif_enhanced-5240-1446484894-12.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr11/anigif_enhanced-30345-1446484983-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr11/anigif_enhanced-28840-1446485158-10.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr15/anigif_enhanced-29802-1446485228-10.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr15/anigif_enhanced-29802-1446485228-10.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr07/anigif_enhanced-21011-1446486948-2.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/13/enhanced/webdr02/anigif_enhanced-18416-1446487690-3.gif", "https://img.buzzfeed.com/buzzfeed-static/static/2015-11/2/12/enhanced/webdr13/anigif_enhanced-22939-1446485296-10.gif"];

catGifs.forEach((gif) => {
  prettyGifs.push(gif.concat(cropAddOn));
})


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
    newCat["imageUrl"] = prettyGifs[randomIntFromInterval(0, prettyGifs.length - 1)]
    newCat["ownerId"] = randomIntFromInterval(0,3);


    kittens.cats.push(newCat);
    counter++;
      if (counter == numberOfCats) {
        res.json(kittens)
      }
    }
})


//// You know, like, listen on the port or something something darkside
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
