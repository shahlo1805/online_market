import {
    Injectable,
    PipeTransform,
    BadRequestException,
  } from '@nestjs/common';
  import { Express } from 'express';
  
  @Injectable()
  export class CheckMultipleFileSizePipe implements PipeTransform {
    constructor(private maxSize: number) {}
  
    transform(files: Express.Multer.File[]) {
      for (const file of files) {
        if (file.size > this.maxSize) {
          throw new BadRequestException(
            `${file.originalname} fayli maksimal ${this.maxSize / 1024}KB dan oshmasligi kerak`,
          );
        }
      }
      return files;
    }
  }