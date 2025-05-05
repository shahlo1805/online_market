import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';

@Injectable()
export class ProductUploadHelper {
  private readonly uploadPath = path.join(process.cwd(), 'uploads', 'productImage');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const uploadedFilePaths: string[] = [];
    console.log(files);
    

    for (const file of files) {
      const fileName = `${Date.now()}-file.${file.originalname.split(".").at(-1)}`;
      console.log(fileName);
      
      const filePath = path.join(this.uploadPath, fileName);
      await fsPromise.writeFile(filePath, file.buffer);
      uploadedFilePaths.push(filePath);
    }

    return {
      message: 'success',
      files: uploadedFilePaths,
    };
  }
}