
interface CategoryProps {
  id: number;
  name: string;
}

export class CategoryEntity {
  public readonly id: number;
  public readonly name: string;

  constructor({ id, name }: CategoryProps) {
    this.id = id;
    this.name = name;
  }
}
