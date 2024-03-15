import http from 'node:http';
import json from './country.json';
import fs from 'node:fs';
import querystring from 'querystring';
const server = http.createServer((req,res)=>{
    // REQUEST OBJECT
    // console.log(req.url)
    // console.log(req.method)
    // console.log(req.headers)
    // ROUTING
       const route = req.url;
       if(route=='/about'){
            res.writeHead(200,{"Content-Type": "text/html"})
            res.end("<h1> Hello I AM About </h1>");
       }else if(route=='/contact'){
            res.writeHead(200,{"Content-Type": "application/json"})
            res.end(JSON.stringify(json));
       }
       else if(route=='/loginpage'){
        const html = fs.readFileSync('./index.html','utf-8');
        res.end(html);
       }
       else if(route=='/login' && req.method=='POST'){
         try{
            let data = '';
            req.on('data',(chunk) =>{
                data+=chunk;
            })
            req.on('end',()=>{
                // console.log(req.headers['content-type'])
                // res.end();
                if(req.headers['content-type']=='application/json'){
                    let empobj = JSON.parse(data)
                    let {username,password} = empobj;
                    res.end(`<h1>My name is ${username} and ${password}</h1>`);
                }else if(req.headers['content-type']=='application/x-www-form-urlencoded'){
                    let empobj = querystring.parse(data);
                    let {username,password} = empobj;
                    res.end(`<h1>My name is ${username} and ${password}</h1>`);
                }
            })
         }catch(err){
            console.log(err);
         }
       }
       else{
            res.writeHead(200,{"Content-Type": "text/html"})
            res.end("<h1>Page not Found</h1>");
       }
    // SENDING RESPONSE 
    // res.write("<h1>hello<h1>");
    // res.writeHead(200,{"Content-Type": "text/plain"})
    // res.writeHead(200,{"Content-Type": "text/html"})
    // res.end('<h1>hello world<h1>');
   
})

server.listen(8000,()=>{
    console.log("running on port 8000")
})