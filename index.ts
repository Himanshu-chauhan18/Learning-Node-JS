// import path from 'node:path';
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// const url = path.join('users','desktop','test');
// console.log(path.join(url,'index.html'))
// console.log(path.join(url,'../index.html'))

import fs, { existsSync, readFile } from 'node:fs'
import path from 'node:path';
class MyFileSystemSync {
    makeDirectory(dirpath:string){
        if(!existsSync(dirpath)){
            fs.mkdirSync(dirpath);
            console.log("2")
        }
    }

    makeFile(filepath:string,content:string){
        if(!existsSync(filepath)){
            fs.writeFileSync(filepath,content);
        }
    }

    appendFile(filepath:string,content:string){
        if(existsSync(filepath)){
            fs.appendFileSync(filepath,content);
        }
    }

    readFile(filepath:string):any{
        if(existsSync(filepath)){
            const data = fs.readFileSync(filepath,'utf-8');
            return data;
        }
    }

    deleteFile(filepath:string){
        if(existsSync(filepath)){
           fs.unlinkSync(filepath);
        }
    }

    deleteDirectory(dirpath:string){
        if(existsSync(dirpath)){
            fs.rmdirSync(dirpath);
         }
    }
}

class MyFileSystemAsync extends MyFileSystemSync{
    makeDirectory(dirpath:string){
        if(!existsSync(dirpath)){
           fs.mkdir(dirpath,(err)=>{
             if(err){
                console.log(err);
                return;
             }
             console.log("Directory Created Successfully")
           });
        }
    }

    makeFile(filepath:string,content:string){
        if(!existsSync(filepath)){
            fs.writeFile(filepath,content,(err)=>{
                if(err){
                    console.log(err);
                    return;
                 }
                 console.log("FIle created successfully")
            });
        }
    }

    appendFile(filepath:string,content:string){
        if(existsSync(filepath)){
            fs.appendFile(filepath,content,(err)=>{
                if(err){
                    console.log(err);
                    return;
                 }
                 console.log("Data Appended successfully")
            });
        }
    }

   async readFile(filepath:string){
        if(existsSync(filepath)){
            const data = await new Promise((resolve, reject) =>{
                fs.readFile(filepath,'utf-8',(err,data)=>{
                    if(err){
                      reject(err)
                    }else{
                     resolve(data)
                    }
                  });
            })
            return data;
        }
    }

    deleteFile(filepath:string){
        if(existsSync(filepath)){
           fs.unlink(filepath,(err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("file Deleted Successfully")
           });
        }
    }

    deleteDirectory(dirpath:string){
        console.log(dirpath)
        if(existsSync(dirpath)){
            fs.rmdir(dirpath,(err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Directory Deleted Successfully")
               });
         }
    }
}

// SYNCRONOUS FILE READING
// const syncfileobj = new MyFileSystemSync();
// const dirname = "Uploads";
// const filename = "one.txt";
// const exactpath = path.join(dirname, filename)
// console.log("1")
// syncfileobj.makeDirectory(dirname);
// console.log("3")
// syncfileobj.makeFile(exactpath,"hello world");
// syncfileobj.appendFile(exactpath," after hello world content"); 
// console.log(syncfileobj.readFile(exactpath));
// syncfileobj.deleteFile(exactpath);
// syncfileobj.deleteDirectory(dirname);

// ASYNCRONOUS FILE READING
// const asyncfileobj = new MyFileSystemAsync();
// const dirname = "Uploads";
// const filename = "one.txt";
// const exactpath = path.join(dirname, filename)
// asyncfileobj.makeDirectory(dirname);
// asyncfileobj.makeFile(exactpath,"hello world");
// asyncfileobj.appendFile(exactpath," after hello world content"); 
// asyncfileobj.readFile(exactpath).then(data => console.log(data));
// asyncfileobj.deleteFile(exactpath);
// asyncfileobj.deleteDirectory(dirname); 
 
 
