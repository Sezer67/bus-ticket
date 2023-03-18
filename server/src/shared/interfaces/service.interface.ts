import { BaseService } from 'src/base-service/base-service.entity';

export interface IBaseServiceLookupResponse {
  count: number;
  rows: BaseService[];
}
