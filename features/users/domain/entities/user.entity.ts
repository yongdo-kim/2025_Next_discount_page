export class UserEntity {
  id: number;
  email: string;
  nickname: string;
  name: string;
  picture: string;
  provider: string;
  role: string;
  apple_user_identifier?: string;

  constructor(params: {
    id: number;
    email: string;
    nickname: string;
    name: string;
    picture: string;
    provider: string;
    role: string;
    apple_user_identifier?: string;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.nickname = params.nickname;
    this.name = params.name;
    this.picture = params.picture;
    this.provider = params.provider;
    this.role = params.role;
    this.apple_user_identifier = params.apple_user_identifier;
  }
}
