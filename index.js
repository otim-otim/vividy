
const express=require('express');
const joi=require('joi');
const logger=require('./logger');

const app=express();

app.use(express.json);
app.use(logger);
let movies=[{id:1,title:"hard target",actor:"van damme"},
            {id:2,title:"body guard from beijing",actor:"jet li"},
            {id:3,title:"mr nice",actor:"jackie chan"},
            {id:4,title:"aladdin",actor:"will smith"},
            {id:5,title:"fast and furious",actor:"vin diesel"},
            {id:6,title:"black panther",actor:"michael b jordan"}];
app.get('/api/movies',(req,res)=>{
    res.send(movies);
    
});  
app.get('api/movies/:id',(req,res)=>{
    const movie=movies.find(m=>m.id===parseInt(req.params.id));
    if(!movie) return res.status(404).send(`requested movie is not available`);
    res.send(movie);
});  
app.post('api/movies',(req,res)=>{
    const {error}=validateMovie(req.body);
    if(error) return res.status(400).send(`${error.details[0].message}`);
    const movie={
        id:movies.length +1,
        name: req.body.name
    }
    movies.push(movie);
    res.send(movie);
}); 

app.put('api/movies/:id',(req,res)=>{
    const movie=movies.find(m=>m.id===parseInt(req.params.id));
    if(!movie) return res.status(404).send(`requested movie is not available so you cant update anything`);

    const {error}=validateMovie(req.body);
    if(error) return res.status(400).send(`${error.details[0].message}`);

    movie.name=req.body.name;

    res.send(movie);

});

app.delete('api/movies/:id',(req,res)=>{
    const movie=movies.find(m=>m.id===parseInt(req.params.id));
    if(!movie) return res.status(404).send(`requested movie is not available so you cant delete anything`);

    movies.splice()

});

let validateMovie=(obName)=>{
    const schema={
        name:joi.string().min(1).required()
    };
    return joi.validate(obName,schema);
};
const port=process.env.PORT || 1890;
app.listen(port,()=>console.log(`Listening on port ${port}`));