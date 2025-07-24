import { IsInt, Min, Max } from 'class-validator';

export class GetCategoryStatsDto {
  @IsInt()
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;
}
