import { UserEntity } from "@/features/users/domain/entities/user.entity";


export interface UsersRepository {
  getMe(): Promise<UserEntity>;
}