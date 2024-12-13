import { ObjectType } from '@nestjs/graphql';
import { MutationPlaceholderOutput } from '~/common';

@ObjectType()
export abstract class DeleteUnavailabilityOutput extends MutationPlaceholderOutput {}
