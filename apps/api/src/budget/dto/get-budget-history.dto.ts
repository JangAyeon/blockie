import { IsInt, Min, Max, IsOptional } from 'class-validator';
// import { Transform } from 'class-transformer';

export class GetBudgetHistoryDto {
  @IsOptional()
  @IsInt()
  //   @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(24)
  months?: number = 6; // 기본값: 최근 6개월

  @IsOptional()
  @IsInt()
  //   @Transform(({ value }) => parseInt(value))
  startYear?: number;

  @IsOptional()
  @IsInt()
  //   @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(12)
  startMonth?: number;

  @IsOptional()
  @IsInt()
  //   @Transform(({ value }) => parseInt(value))
  endYear?: number;

  @IsOptional()
  @IsInt()
  //   @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(12)
  endMonth?: number;
}
