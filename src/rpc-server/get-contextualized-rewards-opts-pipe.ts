import { Injectable, type PipeTransform } from '@nestjs/common';
import { QueryParamsConverter } from '../rpc-shared/query-params-converter';
import type { GetContextualizedRewardsOpts } from '../schema';
// eslint-ignore-next-line
import { IRewardsService } from '../schema';

/**
 * A class that can be used to pipe query parameters into the
 * `getContextualizedRewards` method of an {@link IRewardsService} instance.
 */
@Injectable()
export class GetContextualizedRewardsOptsPipe
  implements PipeTransform<object, GetContextualizedRewardsOpts>
{
  /**
   * Transforms a query parameters object into a
   * {@link GetContextualizedRewardsOpts} object, which can be passed as an
   * argument to the `getContextualizedRewards` method of an
   * {@link IRewardsService} instance.
   *
   * @param queryParams
   */
  transform(queryParams: object): GetContextualizedRewardsOpts {
    return QueryParamsConverter.toGetContextualizedRewardsOpts(queryParams);
  }
}
