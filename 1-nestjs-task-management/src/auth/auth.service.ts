import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.reposity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async singUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async singIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username });
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (user && hashedPassword) {
      return 'Success';
    }
    throw new UnauthorizedException('Please, check your login credentials');
  }
}
