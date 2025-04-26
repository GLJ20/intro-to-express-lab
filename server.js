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

        if(q.minprice && minprice > shoe.price){
            
            result = false;//if it does pass this condition then it means that the shoe is cheaper than what the user wants so skip it
        }
        if (q.maxprice && maxprice < shoe.price){
            
            result = false;
        }
        if(q.type && q.type.toLowerCase() !== shoe.type){//if it is not equal to it, it will be false to not add to the list 
        // but if it is true that they are equal then result remains true so it displays the shoe
            result = false;
        }
        return result;
    });

    //check if the array has results in it
    if(matchingShoes.length > 0){
        let output = matchingShoes.map(shoe => // takes one shoe object from the array mathcingshoes with the results, then through map 
            //it runs the callback, which is turning it into a string
            `Name: ${shoe.name}, Price: $${shoe.price}, Type: ${shoe.type}`
        ).join('<br/> <br/>');//then using join, it outputs each string in the new array created by map into a split string with break. cause with another seperator res.send would print combined strings
        res.send(`${output}`)
    }else{//to display a msg if no shoe based on params based was found
        res.send("Sorry, no shoes!")
    }
    
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

