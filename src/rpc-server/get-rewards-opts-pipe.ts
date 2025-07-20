import { Injectable, type PipeTransform } from '@nestjs/common';
import { QueryParamsConverter } from '../rpc-shared/query-params-converter';
import type { GetRewardsOpts } from '../model';

@Injectable()
export class GetRewardsOptsPipe
  implements PipeTransform<object, GetRewardsOpts>
{
  transform(value: object): GetRewardsOpts {
    return QueryParamsConverter.toGetRewardsOpts(value);
  }
}
