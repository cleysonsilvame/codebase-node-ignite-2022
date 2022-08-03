import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    const carImages = images_name.map((image_name) => {
      return this.carsImagesRepository.create(car_id, image_name);
    });

    await Promise.all(carImages);
  }
}

export { UploadCarImagesUseCase };