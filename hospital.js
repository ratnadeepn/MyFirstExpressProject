const express = require('express');

const app = express();

app.use(express.json());

const users = [
    {
        name: "John",
        kidneys: [{healthy: false}]
        
    }
];

// read all kidney data
app.get('/', function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<numberOfKidneys; i++)
    {
        if(johnKidneys[i].healthy)
        {
            numberOfHealthyKidneys+=1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json(
            {
                numberOfKidneys,
                numberOfHealthyKidneys,
                numberOfUnhealthyKidneys
            }
    )
})

// create a new healthy/unhealthy kidney
app.post('/', function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({healthy: isHealthy})
    res.json({ msg: "Done bro"})

})

// update any unhealthy kidney to healthy
app.put('/', function(req, res){
    if (existsUnhealthyKidney()){
        for(let i =0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({msg: 'Done'})
    }
    else{
        res.status(411).json({msg: 'unhealthy kidneys do not exist'})
    }
    

})

// delete unhealthy kidneys
app.delete('/', function(req, res){
    if(existsUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({healthy: true})
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: 'Done'})
    }
    else{
        res.status(411).json({msg: "You have no unhealthy kidneys"})
    }
})

function existsUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i =0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);