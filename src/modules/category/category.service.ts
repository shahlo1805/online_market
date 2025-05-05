import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PostgresService } from 'src/database';
import { categoryTableModel } from './models';

@Injectable()
export class CategoryService  implements OnModuleInit{
    constructor(private readonly pg: PostgresService) {}

    async onModuleInit() {
        try {
            await this.pg.query(categoryTableModel);
            console.log("Category table yaratildi");
            
        } catch (error) {
            console.log("Category table yaratishda xatolik");
            
        }
    }

    async getAllCategories() {
        throw new BadRequestException("Ishladi")
        const categories = await this.pg.query("SELECT * FROM categories")
        return {
            message: "success",
            count: categories.length,
            data: categories

        };
    }

    async createCategory(payload: {name: string, category_id?: number}) {
        const  category = await this.pg.query("INSERT INTO categories(name, category_id) VALUES ($1,$2) RETURNING *",
         [payload.name, payload.category_id]);

         return {
            message: "success",
            data: category[0]
         }
    }

    async deleteCategory(id:number){
        const result = await this.pg.query("Delete * from categories where id = $1 RETURNING *", 
            [id],
        )
        return {
            message: "succeess",
            data: result[0]
        }
    }


}
 