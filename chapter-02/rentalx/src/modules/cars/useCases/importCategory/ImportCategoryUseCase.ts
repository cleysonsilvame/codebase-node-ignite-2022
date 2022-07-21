import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const existsCategory = this.categoriesRepository.findByName(
        category.name
      );

      if (!existsCategory) {
        this.categoriesRepository.create(category);
      }
    });
  }

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", reject);
    });
  }
}

export { ImportCategoryUseCase };