import { Injectable } from '@nestjs/common';

@Injectable()
export class FavouriteService {
  create() {
    return 'This action adds a new favourite';
  }

  findAll() {
    return `This action returns all favourite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: number) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`;
  }
}
