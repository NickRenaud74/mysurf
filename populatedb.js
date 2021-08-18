#! /usr/bin/env node

console.log('This script populates some test brands, categories and products to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Brand = require('./models/brand')
const Category = require('./models/category')
const Product= require('./models/product')


const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const brands = []
const categories = []
const products = []

function brandCreate(title, description, image, cb) {
  const brand = new Brand({
      title: title, 
      description: description, 
      image: image
    });
       
  brand.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand)
  });
};

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function productCreate(name, description, category, price, inStock, brand, image, cb) {
  const product = new Product({
    name, description, category, price, inStock, brand, image
  });

  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}


function createBrandCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Surfboards', 'All of our boards are custom made in our shop by our pro shaper Leeann', callback);
        },
        function(callback) {
          categoryCreate('Wetsuits', 'Tailored wetsuits for men and women in any shape or size.', callback);
        },
        function(callback) {
          categoryCreate('Fins', 'Any shape or style fins', callback);
        },
        function(callback) {
          brandCreate('Kahunas', 'Worlds largest surf brand since 1991', './public/images/kahuna-logo.jpeg', callback);
        },
        function(callback) {
          brandCreate('Bonfire', 'Established in 1997 on Vancouver Island', './public/images/bonfire-logo.jpeg', callback);
        },
        function(callback) {
          brandCreate('Endless', 'Endless surfing est. 1964', './public/images.endless-surfing.jpeg', callback);
        }],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Fish tail surfboard', 'The upside down “v” cut out from a square tail essentially creates a pair of pin tails that bite really well in and out of turns. The relatively wide outline helps users to generate high speeds through any mushy or slow sections of a wave.', categories[0], 1000, 9, brands[0], './public/images/fish-tail.jpeg', callback);
        },
        function(callback) {
          productCreate('Round tail surfboard', 'The round tail is a compromise between a big wave tail (pin tail) and a performance tail like the squash tail. The extra volume compared to the pin tail will create more lift, translating into a surfboard that is faster and easier to turn', categories[0], 999, 5, brands[2], './public/images/round-tail.jpeg', callback);
        },
        function(callback) {
          productCreate('Squash tail surfboard', "The square or squash tail is easily the most popular tail design in today's high-performance surfboards. Its two square (or slightly rounded) edges act as a pair of release points for the water flowing off the back of your board that allows for quick, sharp turns in small to medium surf.", categories[0], 700, 7, brands[2], './public/images/squash-tail.jpeg', callback);
        },
        function(callback) {
          productCreate( 'Fins', 'A surfboard fin or skeg is a hydrofoil mounted at the tail of a surfboard or similar board to improve directional stability and control through foot-steering', categories[2], 100, 27, brands[1], './public/images/fins.jpeg',  callback);
        },
        function(callback) {
          productCreate('Wetsuit', 'A wetsuit keeps you warm by trapping a thin layer of water between your skin and the neoprene. Your body heats this water up, and your wetsuit prevents this water from leaving the suit and any more water from entering.', categories[1], 300, 15, brands[1], './public/images/wetsuit.jpeg', callback);
        },
        function(callback) {
          productCreate('Another Fish', 'Summary of Fish board', categories[0], 1500, 3, brands[0], './public/images/fish-tail.jpeg', callback);
        }],
        // optional callback
        cb);
}

async.series([
    createBrandCategories,
    createProducts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Products: '+products);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});