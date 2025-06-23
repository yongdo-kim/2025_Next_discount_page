interface UserProps {
  id: string;
  nickname: string;
  profileImageUrl: string;
}

export class UserEntity {
  public readonly id: string;
  public readonly nickname: string;
  public readonly profileImageUrl: string;

  constructor({ id, nickname, profileImageUrl }: UserProps) {
    this.id = id;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}
