const http = require("http");
const fs = require('fs');
const strftime = require('strftime');
const { connect } = require("../routes/todos");
const concat = require('concat-stream')
const args = require('yargs').argv;
const host = 'localhost';
const port = 5000;
// 1. create server using http and test with specified port
const server = http.createServer();
server.listen(port, host, () => {
    console.log(` Server is running on http://${host}:${port}`);
});

// 2 reading file and print content

fs.readFileSync('data.txt', 'utf8', function(err, contents) {
    //console.log(`contect in data.txt file : `,contents);
});

//3 file list in specific folder
const testFolder = '../../Todo_App-with-Node-express.js-MongoDB'
fs.readdir(testFolder, (err, files) => {
    console.log(`File list in ${testFolder} folder : `);
    files.forEach((file,i) => {
      //console.log(`${i} files: `,file);
    });
  });
//4 And 10
 //5 word coidences found 
 const word = 'john'
 let text = fs.readFileSync("data.txt","utf-8");
 function WordCount(text) {
     console.log("test",text)
    return text.replace(',',' ').replace('.',' ').split(' ')
           .filter(function(n) { return n == word })
           .length+1;
}
console.log("word coidences cont --->",WordCount(text))
 //6
 //7 display local server time
 function time(){
    var d = new Date();
    return strftime('%Y-%m-%d: %H:%M', d); 
}
console.log('strftime time:--->',time())

7//
//8 sum of integer in txt file
let numbers = fs.readFileSync("integer.txt","utf-8");
numbers = numbers.split(",").map(Number);
const total = numbers.reduce((sum,num)=> sum+num,0)
console.log("sum of integer--->", total)

//9 process local test and return values as a array
//4 and 10 create text file with the text passed as a parameter
let writeStream = fs.createWriteStream('mySuperText.txt');
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if(index > 1){
    writeStream.write(`${val} `, 'utf-8');
    }
  });
  writeStream.on('finish', () => {
    console.log('The file was saved!==================');
});
//11 read file write console the content
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log("ead file write console the content-->",data);
});
//12
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
console.log("current date and time ",year + "-" + month + "-" + date);
//13
const name = args == 'Arnav!' ? 'Jerry!' :'Arnav!'
console.log(`${name} Hello, ${name}`)
  
