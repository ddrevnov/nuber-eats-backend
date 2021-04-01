import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dtos/login.dto';
import { AuthUserOutput, UserOutput } from './dtos/user-output.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<AuthUserOutput> {
    const exists = await this.userRepository.findOne({ email });

    if (exists) {
      throw new ConflictException('There is a user with this email already');
    }

    const user = await this.userRepository.save(
      this.userRepository.create({ email, password, role }),
    );

    delete user.password;

    return {
      currentUser: user as UserOutput,
      token: 'token',
    };
  }

  async login({ email, password }: LoginInput): Promise<AuthUserOutput> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return {
      currentUser: user as UserOutput,
      token: 'token',
    };
  }
}
