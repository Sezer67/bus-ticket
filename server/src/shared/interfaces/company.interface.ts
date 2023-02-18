import { Company } from 'src/company/company.entity';

export interface ICompanyLookupResponse {
  count: number;
  rows: Company[];
}
