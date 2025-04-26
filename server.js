const express = require("express")
const validator = require("validator")

const app = express()

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.listen(4000, () => {
    console.log("Listening on port 3000")
})

app.get("/shoes", (req, res) => {

    const q = req.query

    const matchingShoes = shoes.filter((shoe) => {
        
        let result = true;//start by making any shoe be true in all checks
        const minprice = parseInt(q.minprice)
        const maxprice = parseInt(q.maxprice)

        if(q.minprice && minprice >= shoe.price){
            
            result = false;//if it does pass this condition then it means that the shoe is cheaper than what the user wants so skip it
        }
        if (q.maxprice && maxprice <= shoe.price){
            
            result = false;
        }
        if(q.type && q.type.toLowerCase() !== shoe.type){//if it is not equal to it, it will be false to not add to the list 
        // but if it is true that they are equal then result remains true so it displays the shoe
            result = false;
        }
        return result;
        // return (
        //     (!q.minprice || shoe.price >= minprice) &&
        //     (!q.maxprice || shoe.price <= maxprice) &&
        //     (!q.type || shoe.type === q.type)
        // );
    });

    res.send(matchingShoes)
});
app.get("/greetings/:username", (req, res) => {
    res.send(`Hello there, ${req.params.username}`)
})
app.get("/roll/:num", (req, res) => {
    
    let num = req.params.num

    if(validator.isNumeric(num)){
        let random = Math.floor(Math.random() * num);
        res.send(`You rolled a ${random}`)
    }else{
        res.send(`You must specify a num`)
    }
})

app.get("/collectibles/:index", (req, res) => {
    
    let index = parseInt(req.params.index)

    if(typeof collectibles[index] === 'undefined'){
        res.send(`This item is not yet in stock. Check back soon!`)
    } else {
        const item = collectibles[index]
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
    }
})

