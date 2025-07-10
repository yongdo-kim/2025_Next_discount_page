import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";


export interface UsersRepository {
  getMe(): Promise<UserEntity>;
  updateMe(data: UserUpdateReqDto): Promise<UserEntity>;
} 