type IdType = {
  id?: string;
};

export class Database<T> {
  private readonly items: Array<T & IdType>;

  constructor() {
    this.items = [];
  }

  getAll = (): Array<T & IdType> => this.items;

  getById = (id: string): T & IdType =>
    this.items.find((item) => item.id === id);

  delete = (id: string): void => {
    const itemIndex = this.items.findIndex((user) => user.id === id);
    this.items.splice(itemIndex, 1);
  };

  create = (params: T): T & IdType => {
    this.items.push(params);
    return params;
  };

  update = (id: string, params: T): T & IdType => {
    const itemIndex = this.items.findIndex((user) => user.id === id);

    if (itemIndex === -1) {
      return null;
    }

    this.items[itemIndex] = params;

    return params;
  };
}
