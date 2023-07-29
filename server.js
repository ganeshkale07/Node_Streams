import http  from "http";
import fs from 'fs';
import {pipeline} from "stream";
import transformingStream from "./uppercaseTransfrom.js";

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
    //const readFile = fs.createReadStream('sample.txt');
    //const writeFile = fs.createWriteStream('dummy.txt');

    //Event listerner we added for writing file
    //Node js internally invoked "data" event then writing will start
    //invoking happens when chunks of data started coming inside readable CMP
    
    //readFile.on('data', (chunks) => {
    //    writeFile.write(chunks);
    //})


    //Custom streams | pipes | error handlings in pip with pipeline
    
    /* CREATE YOUR OWN CUSTOM STREAMS
     const readStreamForFile = new Readable({
        read(){}
    });
    const writeStreamForFile = new Writable({
        write(s){
            console.log("Writing", s);
        }
    });

    readStreamForFile.on('data', (chunks) =>{
        const finalString = chunks.toString().toUpperCase();
        writeStreamForFile.write(finalString);
    })

    readStreamForFile.push('hello World ');
     */


    const readStreamForFile = fs.createReadStream('sample.txt');
    const writeStreamForFile = fs.createWriteStream("desireOutput.txt");
    


    //left side of pipe are always reading stream
    //right side always writing stream
    //transform stream are both read and write stream

    //Using pipe but in these case we have to handle error on each pipe
    /* 
    readStreamForFile
    .pipe(transformingStream)
    .on('error',(error) => {
        console.log(error);
    })
    .pipe(writeStreamForFile)
    .on('error',(error) => {
        console.log(error);
    });
     */

    //In order handle error use pipeline built in method
    pipeline(readStreamForFile,transformingStream,writeStreamForFile,(error) => {
        if(error){
            console.log("Pipeline Error:::::::::::", error);
        }
    })
    
    res.end();




})

server.listen(5000,(error) => {
    if(error) { 
        throw error;
    }
    console.log("We are started Listening!");
    
})