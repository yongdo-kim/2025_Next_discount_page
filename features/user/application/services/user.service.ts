import { UserRepository } from "../../domain/repositories/user.repository";

//복수의 useCase 추가 가능
export class UserService {
  constructor(private userRepository: UserRepository) {}


}
