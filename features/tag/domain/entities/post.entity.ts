//태그도
interface TagProps {
  id: number;
  name: string;
}

export class TagEntity {
  public readonly id: number;
  public readonly name: string;

  constructor({ id, name }: TagProps) {
    this.id = id;
    this.name = name;
  }
}
