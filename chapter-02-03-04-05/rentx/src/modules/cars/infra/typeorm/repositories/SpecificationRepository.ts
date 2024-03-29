import { In, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationRepository";
import dataSource from "@shared/infra/typeorm";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string) {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }

  async findByIds(ids: string[]) {
    const specification = await this.repository.findBy({ id: In(ids) });

    return specification;
  }
}

export { SpecificationRepository };
