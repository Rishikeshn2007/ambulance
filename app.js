const express=require('express');

const search=require('./algorithem/search');

const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//API
app.get('/callambulance', async (req, res) => {
    try {
        const { lat, lon } = req.query;

        // Empty request
        if (!lat || !lon) {
            return res.status(400).json({
                error: 'lat and lon query parameters are required'
            });
        }

        const latitude = Number(lat);
        const longitude = Number(lon);

        // Invalid numbers
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                error: 'lat and lon must be valid numbers'
            });
        }

        // Range validation
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).json({
                error: 'lat or lon values are out of range'
            });
        }

        const response = await search(latitude, longitude);

        console.log('Request:',{latitude,longitude});
        console.log('Response:',response);

        res.json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to process ambulance request'
        });
    }
});

//Testing post request 
//{
// 	"lat":14.47526, 
//  "lon": 75.88586
// }

app.listen(port,(req,res)=>{
    console.log(`Server has started on: 127.0.0.1${port}`);
});