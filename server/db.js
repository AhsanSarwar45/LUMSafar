const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Lumsafar:bulbul123@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const CatSchema = mongoose.Schema({
    name:String, 
    age:Number, 
    test:Boolean
})

const Cat = mongoose.model("Cat", CatSchema);

// const kitty = new Cat({ name: 'Zildjian' });
const pussy = new Cat(
    {
        name:"Omer",
        age:69,
        test:true
    }
);
const kitty = new Cat(
    {
        name:"Muiz gandu",
        age:70,
        test:false
    }
);

Cat.insertMany([pussy, kitty],(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Succesfully inserted ");
    }
});
// kitty.save().then(() => console.log('meow'));