import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PostgresService } from 'src/database';
import { categoryTableModel } from './models';
import { FsHelper } from '../../helpers/fs.helper';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    private readonly pg: PostgresService,
    private fs: FsHelper,
  ) {}

  async onModuleInit() {
    try {
      await this.pg.query(categoryTableModel);
      console.log('Category table yaratildi');
    } catch (error) {
      console.log('Category table yaratishda xatolik');
    }
  }

  async getAllCategories() {
    const categories = await this.pg.query('SELECT * FROM categories');
    return {
      message: 'success',
      count: categories.length,
      data: categories,
    };
  }

  async createCategory(
    payload: { name: string; category_id?: number },
    image?: Express.Multer.File,
  ) {
    let imageUrl: string | null = null; 
    if(image){
        const catImage = (await this.fs.uploadFile(image)); 
        imageUrl = catImage.fileUrl;
    }
    

    const category = await this.pg.query(
      'INSERT INTO categories(name, category_id, image_url) VALUES ($1,$2,$3) RETURNING *',
      [payload.name, payload.category_id ?? null, imageUrl],
    );

    return {
      message: 'success',
      data: category[0],
    };
  }

  async deleteCategory(id: number) {
    const result = await this.pg.query(
      'Delete from categories where id = $1 RETURNING *',
      [id],
    );
    return {
      message: 'succeess',
      data: result[0],
    };
  }
}
