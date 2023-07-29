import { Transform } from "stream";

const transformingStream = new Transform({
        
    transform(chunk, encoding, callback) {
        //stimulate the error
        //transformingStream.emit('error', new Error('something went wrong'));
       console.log("chunks", chunk)
        callback(null, chunk.toString().replaceAll(/ipsum/gi , "COOLer"));
      }
});

export default transformingStream;