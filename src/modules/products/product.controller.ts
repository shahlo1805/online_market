import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './interface';
import { QueryProductDto } from './dto/get-all-products.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { checkFileSizePipe } from 'src/pipes/check-size-file.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() product: IProduct,
    @UploadedFile(new checkFileSizePipe(12000)) image: Express.Multer.File,
  ) {
    return this.productService.create(product);
  }

  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productService.getAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Partial<IProduct>) {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
