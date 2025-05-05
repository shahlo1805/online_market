import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as fsPromise from "fs/promises";
 

@Injectable()
export class FsHelper {
    async uploadFile(file: Express.Multer.File){
        console.log(file);
        
        const fileFolder = path.join(process.cwd(), "uploads", "categoryImage");

        if(!fs.existsSync(fileFolder)){
            fs.mkdirSync(fileFolder, {recursive:true});
        }

        let fileName = `${Date.now()}-file.${file.originalname.split('.').pop()?.toLowerCase()}`;
        await fsPromise.writeFile(path.join(fileFolder, fileName), file.buffer);
     
        

        return {
            message: "success",
            fileUrl: path.join(fileFolder, fileName)
        }
    }
}