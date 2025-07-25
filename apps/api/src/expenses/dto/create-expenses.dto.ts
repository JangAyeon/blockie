import { IsNonEmptyString } from '../../validate-decorators';

import { IsInt, IsISO8601, Min } from 'class-validator';

export class CreateExpensesDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsNonEmptyString()
  category: string;

  @IsISO8601() // YYYY-MM-DD or ISO DateTime
  expenseDate: string;
}
