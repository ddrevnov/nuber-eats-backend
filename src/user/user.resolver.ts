import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateAccountInput } from './dtos/create-account.dto';
import { AuthUserOutput } from './dtos/user-output.dto';
import { LoginInput } from './dtos/login.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => AuthUserOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<AuthUserOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation(() => AuthUserOutput)
  login(@Args('input') loginInput: LoginInput): Promise<AuthUserOutput> {
    return this.userService.login(loginInput);
  }
}
