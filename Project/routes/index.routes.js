const express = require('express');
const router = express.Router();

const Comic = require("../models/Comics.model");
const Item = require('../models/Items.model');
const Cart = require('../models/ShoppingCart.model');

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require('../models/User.model');
const Review = require('../models/Reviews.model');



router.get("/cart", isLoggedIn, async (req, res, next) => {
  try{
    const currUser = req.session.currentUser
    const findCarrito = await Cart.findOne({ userId: currUser})
    const carritoItems = await Item.find({cartId: findCarrito._id}).populate('comicId')
    
    //We get an array with the price of each comic
    const priceArray = [];
      carritoItems.map((comic) => {
        priceArray.push(comic.comicId.price);
      })
    //console.log(priceArray)
    // We sum the array prices to get the total
    const cartSum = priceArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    console.log(cartSum)
    res.render("cart", {carritoItems, currUser}) 
  }
  catch(err){
    console.log(err)
  }
})

// router.get("/cart", async (req, res) => {
//   console.log("Done")
//   try {
//     const user = req.session.currentUser
//     const carrito = await Cart.findOne({userId: user})
//     const carrItems = await Item.find({cartId: carrito._id})
//     res.render("cart", carrItems)
//   } catch (err) {
//     console.log(err)
//   }
//   console.log("carttt")
// })




/* GET home page */
router.get("/", (req, res, next) => {
  const currUser = req.session.currentUser
  res.render("index", {currUser});
});
// ------------------------ catalogue Routes ------------------------
router.get("/catalogue", async (req, res, next) => {
  //console.log("We are inside the catalogue!")
  try{
  const currUser = req.session.currentUser
  const allComics = await Comic.find()
  //console.log("This are all the comics : ", {allComics})
  res.render("catalogue", {allComics, currUser})
  } catch (err) {
    console.log("Error getting catalogue:" + err)
  }
})
// --------------------- Product details Routes ------------------------
router.get("/catalogue/:comicId", async (req, res, next) => {
  try{
    const currUser = req.session.currentUser
    const comic = await Comic.findById(req.params.comicId).populate("reviewIds")
    console.log(comic)
    res.render("product-details", {comic, currUser})
  } catch (err){
    console.log("Error getting product details:" + err)
  }
  
})

//CART ROUTES

router.post("/catalogue/:comicId/add", isLoggedIn, async (req, res, next) => {
  //console.log("we are inside!")
  const currUser = req.session.currentUser
  //console.log(currUser)

  const {comicId} = req.params

  try{
    const newItem = await Item.create({comicId})
    //console.log(newItem)
    const findCarrito = await Cart.findOne({ userId: currUser})
    //console.log(findCarrito)
    const addItemtoCarro = await Item.updateMany({newItem, cartId: findCarrito})
    //console.log(addItemtoCarro)
    res.redirect("/catalogue")
  }
  catch(err){console.log(err)}
})

//delete item from the cart
  router.post("/cart/:itemId/delete", isLoggedIn, async (req, res, next) => {
    const {itemId} = req.params
    try {
      const deleteItem = await Item.deleteOne({itemId})
      res.redirect("/cart")
    }
    catch(err){
      console.log(err)
    } 
  })

  //checkout route
  router.post("/cart/checkout", isLoggedIn, async (req, res, next) => {
    const currUser = req.session.currentUser
    //res.redirect("/cart/checkout")
    try {
      //first we find the cart of the current user
      const findCarrito = await Cart.findOne({ userId: currUser})
      //then, we find the items that correspond to that cart
      const newPurchases = await Item.find({cartId: findCarrito})
      console.log("this are new purchases", newPurchases)
      const comics = newPurchases[0].comicId
      const comicArray = [];
      newPurchases.map((comic) => {
        comicArray.push(comic.comicId);
      })
      //later on, we update the User.purchases with the comicIds
      const updatePurchases = await User.findByIdAndUpdate(currUser, {$push: {purchases: comicArray}}, {new: true})
      console.log("this is the updated history:", updatePurchases)
      //finally we refresh the cart
      const deleteAll = await Item.deleteMany({cartId: findCarrito})
      res.redirect("/cart/checkout")
      }
    catch(err){
       console.log(err)
     } 
  })
  router.get("/cart/checkout", isLoggedIn, async (req, res, next) => {
    const currUser = req.session.currentUser
    res.render("checkout", {currUser})
  })

// profile page
router.get("/myprofile", isLoggedIn, async(req, res, next) => {
  const currUser = req.session.currentUser
  try{
    const findUser = await User.findById(currUser).populate("purchases")
    console.log(findUser)
    res.render("profile", {findUser, currUser})
  }
  catch(err){
    console.log(err)
  }
})

//review page
router.get("/:comicId/review", isLoggedIn, async(req, res, next) => {
  try{
    const currUser = req.session.currentUser
    const {comicId} = req.params
    const comicToReview = await Comic.findById(comicId)
    console.log(comicToReview)
    res.render("review-form", {currUser, comicToReview})
  }
  catch(err){
    console.log(err)
  }
})
 router.post("/:comicId/review/post", isLoggedIn, async(req, res, next) => {
  const user = req.session.currentUser
  try{
        const {comicId} = req.params
        const {title, star, description} = req.body
        const newReview = await Review.create({userId: user, username: user.username, comicId: comicId, title: title, content: description, rating: star})
        console.log(newReview)
        const updateComic = await Comic.findByIdAndUpdate(comicId, {reviewIds: newReview})
        res.redirect("/")
    }
    catch(err){console.log(err)}
 })


module.exports = router;
