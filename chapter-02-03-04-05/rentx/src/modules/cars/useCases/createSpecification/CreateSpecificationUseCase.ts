import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(data: IRequest) {
    const specification = await this.specificationRepository.findByName(
      data.name
    );

    if (specification) {
      throw new AppError("Specification already exists");
    }

    this.specificationRepository.create(data);
  }
}

export { CreateSpecificationUseCase };
