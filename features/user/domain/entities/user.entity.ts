export type UserEntityProps = {
  id: number;
  email: string;
  nickname: string;
  name: string;
  picture: string;
  provider: string;
  role: string;
  apple_user_identifier?: string;
};

export class UserEntity {
  id: number;
  email: string;
  nickname: string;
  name: string;
  picture: string;
  provider: string;
  role: string;
  apple_user_identifier?: string;

  constructor(props: UserEntityProps) {
    this.id = props.id;
    this.email = props.email;
    this.nickname = props.nickname;
    this.name = props.name;
    this.picture = props.picture;
    this.provider = props.provider;
    this.role = props.role;
    this.apple_user_identifier = props.apple_user_identifier;
  }
}
