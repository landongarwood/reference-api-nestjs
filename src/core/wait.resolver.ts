import { Args, Query, Resolver } from '@nestjs/graphql';
import { delay } from 'core/common';

@Resolver()
export class WaitResolver {
  @Query(() => Boolean)
  async wait(@Args('delay') duration: string) {
    await delay(duration);
    return true;
  }
}
