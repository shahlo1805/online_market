import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FsHelper } from '../../helpers/fs.helper';
import { checkFileSizePipe } from 'src/pipes/check-size-file.pipe';

@Controller('categories')
export class categoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() body: any,
    @UploadedFile(new checkFileSizePipe(1200000000000)) image?: Express.Multer.File,
  ) {
    return await this.categoryService.createCategory(body, image);
  }

  @Delete(':id')
  async deletecategory(@Param() param: any) {
    return this.categoryService.deleteCategory(+param?.id);
  }
}
