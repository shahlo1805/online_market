import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class checkFileSizePipe implements PipeTransform {
  limit: number;
  constructor(limit: number) {
    this.limit = limit;
  }
  transform(file: any, metadata: ArgumentMetadata) {
    if (file.size > this.limit) {
      throw new BadRequestException(
        "Fayl o'lchami 12 mb dan kichik bo'lishi kerak",
      );
    } else {
      return file;
    }
  }
}
