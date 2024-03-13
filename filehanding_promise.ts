import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
class MyFileSystemPromise{

   async makeDirectory(dirpath:string){
       if(!fs.existsSync(dirpath)){
            try{
                await fsp.mkdir(dirpath);
            }catch(err){
                console.log(err);
            }
       }
    }

   async makeFile(filename:string,content:string){
       if(!fs.existsSync(filename)){
            try{
                await fsp.writeFile(filename,content);
            }catch(err){
                console.log(err);
            }
       }
    }

   async appendFile(filepath:string,content:string){
        if(fs.existsSync(filepath)){
           await fsp.appendFile(filepath,content);
        }
    }

    async readFile(filepath:string){
        if(fs.existsSync(filepath)){
            const response = await fsp.readFile(filepath,'utf-8');
            return response;
        }
    }

   async deleteFile(filepath:string){
        if(fs.existsSync(filepath)){
          await fsp.unlink(filepath);
        }
    }

   async deleteDirectory(dirpath:string){
        if(fs.existsSync(dirpath)){
           await fsp.rmdir(dirpath);
         }
    }
}
const fileobj = new MyFileSystemPromise();
const dirname = "Uploads";
const filename = "one.txt";
const exactpath = path.join(dirname, filename);
fileobj.makeDirectory(dirname);
fileobj.makeFile(exactpath,"content");
// fileobj.appendFile(exactpath,"---next content"); 
console.log(fileobj.readFile(exactpath))