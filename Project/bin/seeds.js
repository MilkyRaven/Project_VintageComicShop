const mongoose = require("mongoose")

// Require the models,  Example: (-- const Book = require("../models/Book.model") --)
const Comic = require("../models/Comics.model")

const MONGO_URI = "mongodb://localhost:27017/vintageComicShop"

const comic = [
  {
    title: "The Batman Meets Doctor Death",
    img: "https://files1.comics.org//img/gcd/covers_by_id/5/w400/5137.jpg?-3164861915678165786",
    author: "Book Kane",
    comicSeries: "Detective Comics",
    year: 1939,
    condition: "Used",
    synopsis: "Dr. Death plans to use his new invention of a poisonous pollen extract on any wealthy person who refuses to pay him tribute.",
    price: 16.99,
    reviewIds: [],
    quantity: 4
  },
  
  {
    title: "Les Cigares du Pharaon",
    img: "https://files1.comics.org//img/gcd/covers_by_id/1493/w400/1493274.jpg?1117383809191476521",
    author: "Hergé",
    comicSeries: "Les Aventures de Tintin",
    year: 1987,
    condition: "Good",
    synopsis: "Holidaying on a Mediterranean cruise ship, Tintin and his dog Snowy meet wealthy film producer Rastapopoulos and eccentric Egyptologist Sophocles Sarcophagus",
    price: 9.99,
    reviewIds: [],
    quantity: 6
  },
    
  {
    title: "Action Comics No. 40",
    img: "https://files1.comics.org//img/gcd/covers_by_id/0/w400/565.jpg?-6831418524261450474",
    author: "Fred Ray",
    comicSeries: "Action Comics",
    year: "1938" ,
    condition: "Used",
    synopsis: "A millionaire agrees to pay $100,000 to charity if Superman helps to straighten out his wayward daughter who spends money as if it were water as various gambling establishments. Only when an emergency arises does the girl see herself in a different vein.",
    price: 199.9,
    reviewIds: [],
    quantity: 2
  },
  {
    title: "Mafalda",
    img: "https://files1.comics.org//img/gcd/covers_by_id/1312/w400/1312954.jpg?7950182444208753492",
    author: "Quino",
    comicSeries: "Mafalda",
    year: 1966,
    condition: "Good",
    synopsis: "Mafalda is a girl who faces reality with the ingenuity and tenderness typical of childhood.",
    price: 22.99,
    reviewIds: [],
    quantity: 2
  },
  {
    title: "Misantropolis",
    img: "https://files1.comics.org//img/gcd/covers_by_id/1012/w400/1012879.jpg?3921397601305097350",
    author: "Tove Jansson",
    comicSeries: "Mummintroll",
    year: 1995,
    condition: "Very Good",
    synopsis: "The main protagonist, the little boy of the family, is interested in and excited about everything he sees and finds, always trying to be good, but sometimes getting into trouble while doing so; he is very brave and always finds a way to make his friends happy.",
    price: 14.99,
    reviewIds: [],
    quantity: 3
  },
  {
    title: "Action Comics No. 27",
    img: "https://files1.comics.org//img/gcd/covers_by_id/0/w400/552.jpg?4303249213407754409",
    author: "Paul Cassidy",
    comicSeries: "Action Comics",
    year: 1940,
    condition: "Used",
    synopsis: "Clark arrives for a date with Lois, who is making a donation to the Brentwood Rehabilitation Home. Clark tells her that the place is more interested in money than their young charges. Lois decides they should visit the home so that she can disprove Clark. After a pleasant visit, Lois and Clark are stopped by a charge, Davey Merrill, who cut his hands climbing the wall just to ask for something to eat. Once they feed him, he tells them all about the horrible conditions at the home",
    price: 169.99,
    reviewIds: [],
    quantity: 1
  },
  {
    title: "Action Comics No. 150",
    img: "https://files1.comics.org//img/gcd/covers_by_id/1138/w400/1138923.jpg?7824686344579582815",
    author: "Wayne Boring",
    comicSeries: "Action Comics",
    year: 1950,
    condition: "Used",
    synopsis: 'Mr. Mxyztplk teams with the Prankster and Lex Luthor to humiliate Superman by making "plastic proxies" (androids) which make it appear as if Lois has jilted Superman for Mxyztplk, make it seem that Superman has falsely accusing Luthor, and make Superman look like the victim of the pranks of the Prankster. But just as the public begins to wonder why they ever admired him, Superman turns the tables on the trio.',
    price: 99.9,
    reviewIds: [],
    quantity: 3
  },
  {
    title: "The Rose of Versailles Vol.1",
    img: "https://files1.comics.org//img/gcd/covers_by_id/1379/w400/1379263.jpg?-6745954624512040830",
    author: "Riyoko Ikea",
    comicSeries: "The Rose of Versailles",
    year: 1981,
    condition: "Used",
    synopsis: "Oscar Francois de Jarjeyes is a young noblewoman raised as a son by her father. As commander of Marie Antoinette's palace guard, Oscar is brought face-to-face with the luxury of King Louis XVI's court at Versailles. Joined by her servant Andre, Oscar is privy to the intrigue and deceit of France's last great royal regime.",
    price: 6.99,
    reviewIds: [],
    quantity: 7
  },
  {
    title: "Nausicaä of the Valley of Wind #1",
    img: "Nausicaä of the Valley of Wind #1",
    author: "Hayao Miyazaki",
    comicSeries: "Nausicaä of the Valley of Wind",
    year: 1988,
    condition: "Very Good",
    synopsis: "Taking place in a post-nuclear futuristic world, the film tells the story of Nausicaä (Shimamoto), the young teenage princess of the Valley of the Wind. She becomes embroiled in a struggle with Tolmekia, a kingdom that tries to use an ancient weapon to eradicate a jungle full of giant mutant insects.",
    price: 34.99,
    reviewIds: [],
    quantity: 1
  },
  {
    title: "Action Comics No. 3",
    img: "https://files1.comics.org//img/gcd/covers_by_id/2/w400/2465.jpg?-4414093043624628871",
    author: "Bill Finger",
    comicSeries: "Batman",
    year: 1940,
    condition: "Used",
    synopsis: "The Caped Crusaders must stop the likes of the Puppet Master, who has set his sights on stealing the Voss Rifle, the Army's newly developed secret gun. But to do it, Batman must overcome the effects of having come under the hypnotic influence of his foe.",
    price: 89.99,
    reviewIds: [],
    quantity: 9 
  }
]


const createSeeds = async function () {
  try {
    const connect = await mongoose.connect(MONGO_URI)
    console.log(`Connected to database: ${connect.connections[0].name}`)

    const deleteAll = await Comic.deleteMany()
    console.log("Db clean")

    const createAll = await Comic.create(comic)
    console.log("comics created")

    const dbClose = await mongoose.connection.close()
    
    console.log("Seeds created")
  } catch (err) {
    console.log(`Error creating the seeds: ${err}`)
  }
}

createSeeds()
