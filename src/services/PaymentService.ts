import UserRepository from "../repositories/UserRepository";

class PaymentService {
  async getUserAccount(username: string) {
    const user = await UserRepository.findByUsername(username);

    return user;
  }
}

export default new PaymentService();