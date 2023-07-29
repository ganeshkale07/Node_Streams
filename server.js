import http  from "http";
import fs from 'fs';

const server = http.createServer((req,res)=>{
    //Note - by default on home url "/" browser make one more call fro "Faviocon"  - "/favicon"
    if(req.url != "/"){
        res.end();
    }
    
    //reading file from server bad way
    /* try{
        const readFile = fs.readFileSync('sample.txt');
        return res.end(readFile);
    }
    catch(error){
        console.log("catch Block ",error)
    } */

    //reading file from server STREAM way
    /*  
    const readFileStream = fs.createReadStream('sample.txt');
    console.log(readFileStream);
    readFileStream.pipe(res);
     */

    //Writing file bad way
    //const readFile = fs.readFileSync('sample.txt');
    //const writeFile = fs.writeFileSync('dummy.txt',readFile); 

    //writing file using streams
    const readFile = fs.createReadStream('sample.txt');
    const writeFile = fs.createWriteStream('dummy.txt');

    //Event listerner we added for writing file
    //Node js internally invoked "data" event then writing will start
    readFile.on('data', (chunks) => {
        writeFile.write(chunks);
    })
    
    res.end();




})

server.listen(5000,(error) => {
    if(error) { 
        throw error;
    }
    console.log("We are started Listening!");
    
})