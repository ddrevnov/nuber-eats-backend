import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserOutput extends OmitType(User, ['password'], ObjectType) {}

@ObjectType()
export class AuthUserOutput {
  @Field(() => UserOutput)
  currentUser: UserOutput;

  @Field(() => String)
  token: string;
}
