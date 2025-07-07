import { UserEntity } from "../user.entity";

export interface UsersRepository {
  getMe(): Promise<UserEntity>;
}