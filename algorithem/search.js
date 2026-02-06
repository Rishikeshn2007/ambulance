const points=[
    {
        name: "Point A",
        lan: 14.45437,
        lon: 75.91907,
        addess: "X area, 10st floor, near bus stop, Mangalore",
        contact: 1234567890
    },
    {
        name: "Point B",
        lan: 14.47509,
        lon: 75.92028,
        addess: "Y road, near food mart, Mangalore",
        contact: 1234567890
    },
    {
        name: "Point C",
        lan: 14.48501,
        lon: 75.90384,
        addess: "ABC markets, 1st cross, Mangalore",
        contact: 1234567890
    },
    {
        name: "Point D",
        lan: 14.45158,
        lon: 75.93433,
        addess: "# 1234 Jaya bagar davangere, Mangalore",
        contact: 1234567890
    },
    {
        name: "Point E",
        lan: 14.4515844,
        lon:  75.9343272,
        addess: "X markets, 1st floor, Vrinda nagar, Mangalore",
        contact: 1234567890
    },
]

async function nearest(lan1,lon1,lat2,log2) {
    const url=`https://router.project-osrm.org/route/v1/driving/${lon1},${lan1};${log2},${lat2}?overview=false`;
    const result=await fetch(url);
    const data=await result.json();
    if(data.code!=="Ok"){
        throw new Error("Route not found");
    }
    const r=data.routes[0];

    return {
        distance: r.distance/1000,
        duration: r.duration/3600
    }
}

async function search(lan,lon)
{
    let distance=[];
    let duration=[];
    for(let i=0;i<points.length;i++)
    {
        let res=await nearest(lan,lon,points[i].lan,points[i].lon);
        distance.push(res.distance);
        duration.push(res.duration);
    }

    let min_time=Math.min(...duration);
    let point=duration.indexOf(min_time);
    return {
        time: min_time,
        dis: distance[point],
        details: points[point]
    };
}

module.exports=search;



