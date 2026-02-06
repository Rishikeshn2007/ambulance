const express=require('express');

const search=require('./algorithem/search');

const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/callambulance',async (req,res)=>{
    const {lat,lon}=req.body;
    const responce=await search(lat,lon);
    console.log('Request',req.body);
    console.log('Responce:',responce);
    res.json(responce);
});

//Testing post request 
//{
// 	"lat":14.47526, 
//   "lon": 75.88586
// }

app.listen(port,(req,res)=>{
    console.log('Server has started on: 127.0.0.1');
});