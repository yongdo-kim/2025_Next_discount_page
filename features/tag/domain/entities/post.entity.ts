//태그도
interface TagProps {
  id: string;
  name: string;
}

export class TagEntity {
  public readonly id: string;
  public readonly name: string;

  constructor({ id, name }: TagProps) {
    this.id = id;
    this.name = name;
  }
}
