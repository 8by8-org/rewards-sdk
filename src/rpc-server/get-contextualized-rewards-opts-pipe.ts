import { Injectable, type PipeTransform } from '@nestjs/common';
import { QueryParamsConverter } from '../rpc-shared/query-params-converter';
import type { GetContextualizedRewardsOpts } from '../model';

@Injectable()
export class GetContextualizedRewardsOptsPipe
  implements PipeTransform<object, GetContextualizedRewardsOpts>
{
  transform(value: object): GetContextualizedRewardsOpts {
    return QueryParamsConverter.toGetContextualizedRewardsOpts(value);
  }
}
