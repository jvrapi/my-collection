import {
  Field, InputType, Int, registerEnumType
} from 'type-graphql';
import { Types } from '../../../../types/card-types';

registerEnumType(Types, {
  name: 'Types'
});

@InputType()
export class GetCardsInput {
  @Field({ nullable: true })
    name?: string;

  @Field({ nullable: true })
    setCode?: string;

  @Field(() => [Types], { nullable: true })
    cardType?: Types[];

  @Field(() => Int)
    page: number;
}
