import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class checkFileSizePipe implements PipeTransform {
    limit: number;
    constructor(limit: number){
        this.limit= limit
    }
    transform(file: any, metadata: ArgumentMetadata) {
         if(file.size > 12000 )
                 throw new BadRequestException("Fayl o'lchami 12 mb dan kichik bo'lishi kerak")
            }
    }
