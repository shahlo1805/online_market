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
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './interface';
import { QueryProductDto } from './dto/get-all-products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CheckMultipleFileSizePipe } from 'src/pipes/check-files-size.pipe';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() product: IProduct,
    @UploadedFiles(new CheckMultipleFileSizePipe(120000000)) images: Express.Multer.File[],
  ) {
    return this.productService.create(product, images);
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
