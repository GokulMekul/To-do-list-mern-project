const express =require('express');
const app=express();
const bodyparse=require('body-parser');
app.use(bodyparse.urlencoded({extended:true}));
const mongoose =require('mongoose');
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/GokulDB",{useNewUrlParser :"true"});
const itemsc= {
  name:String
}
const Item=mongoose.model("item",itemsc);


const item1=new Item({
    name:"Hello"
});
const item2=new Item({
    name:"Its"
});
const item3=new Item({
    name:"Gokul"
})

app.get('/',(req,res)=>{

      Item.find({}).then(function(founditem){
  
     if(founditem.length==0){
        const def=[item1,item2,item3];
        Item.insertMany(def);
        res.render('home',{data:founditem});
     }else{
        console.log("nope");
        res.render('home',{data:founditem});
     }
   
    });

});

app.post('/',(req,res)=>{
    const newitem = req.body.event;
    const item = new Item({
        name:newitem
    })
    item.save();
    res.redirect('/');
})




app.post('/delete',(req,res)=>{
 const id=req.body.checkbox;
 console.log(id);
 
 
 Item.findByIdAndRemove(id)
 .then((deletedItem) => {
   if (deletedItem) {
     console.log('Deleted item:', deletedItem);
   } else {
     console.log('Item not found');
   }
 })
 .catch((err) => {
   console.error('Error deleting item:', err);
 });


 res.redirect('/');
});



app.listen(3000,()=>{
    console.log("3000");
    });

   













