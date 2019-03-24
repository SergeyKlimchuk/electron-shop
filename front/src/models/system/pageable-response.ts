import { Pageable } from 'src/models/system/pageable';
import { Sort } from './sort';

export class PageableResponse<TResponse> {
  content: TResponse[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
