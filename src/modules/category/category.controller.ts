import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";


@Controller("categories")
export class categoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllCategories() {
        return await this.categoryService.getAllCategories()
    }

    @Post()
    async createCategory (@Body() body: any){
        return await this.categoryService.createCategory(body)
    }

    @Delete(":id")
    async deletecategory (@Param() param: any){
        return this.categoryService.deleteCategory(+param?.id)
    }
}