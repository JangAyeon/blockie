import { Controller, Get, Body, Query, UseGuards, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

import { BudgetsService } from './budget.service';

import { getUser } from 'src/users/users.decorator';
import { UpsertBudgetDto } from './dto/upsert-budget.dto';
import { AuthUser } from '@repo/types';
import { GetBudgetHistoryDto } from './dto/get-budget-history.dto';
import { BudgetHistoryResponseEntity } from './entity/budget-history.entity';
import { EnhancedBudgetStatusEntity } from './entity/budget-status.entity';

@ApiTags('Budget (예산 관련 API)')
@Controller('budget')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('status')
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
    description: '연도 (예: 2025)',
  })
  @ApiQuery({
    name: 'month',
    type: Number,
    required: true,
    description: '월 (1~12)',
  })
  @ApiOperation({
    summary: '월별 예산 현황 조회 (향상된 버전)',
    description: `해당 연/월의 상세한 예산 현황을 확인합니다. 
    기본 정보뿐만 아니라 일일 지출 분석, 트렌드, 권장 지출액 등 
    풍부한 정보를 제공합니다.`,
  })
  @ApiOkResponse({
    type: EnhancedBudgetStatusEntity,
    description: '향상된 예산 현황 조회 성공',
  })
  async getStatus(
    @getUser() user: AuthUser,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.budgetsService.getStatus(user.id, year, month);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '월별 예산 설정',
    description: '특정 연/월의 예산을 생성 또는 수정합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['year', 'month', 'amount'],
      properties: {
        year: {
          type: 'integer',
          example: 2025,
          description: '년 (예: 2025)',
        },
        month: {
          type: 'integer',
          example: 6,
          description: '월 (1~12)',
        },

        amount: {
          type: 'integer',
          example: 100000,
          description: '예산 금액 (원 단위)',
        },
      },
    },
  })
  upsertBudget(@getUser() user: AuthUser, @Body() dto: UpsertBudgetDto) {
    return this.budgetsService.upsert(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('history')
  @ApiOperation({
    summary: '예산 내역 조회',
    description:
      '사용자의 월별 예산 및 지출 내역을 조회합니다. History 탭에서 사용됩니다.',
  })
  @ApiQuery({
    name: 'months',
    type: Number,
    required: false,
    description: '조회할 최근 월 수 (기본값: 6, 최대: 24)',
    example: 6,
  })
  @ApiQuery({
    name: 'startYear',
    type: Number,
    required: false,
    description: '시작 연도 (endYear, startMonth, endMonth와 함께 사용)',
    example: 2024,
  })
  @ApiQuery({
    name: 'startMonth',
    type: Number,
    required: false,
    description: '시작 월 (1~12)',
    example: 1,
  })
  @ApiQuery({
    name: 'endYear',
    type: Number,
    required: false,
    description: '종료 연도',
    example: 2025,
  })
  @ApiQuery({
    name: 'endMonth',
    type: Number,
    required: false,
    description: '종료 월 (1~12)',
    example: 7,
  })
  @ApiOkResponse({
    type: BudgetHistoryResponseEntity,
    description: '예산 내역 조회 성공',
  })
  getHistory(@getUser() user: AuthUser, @Query() dto: GetBudgetHistoryDto) {
    return this.budgetsService.getHistory(user.id, {
      months: dto.months,
      startYear: dto.startYear,
      startMonth: dto.startMonth,
      endYear: dto.endYear,
      endMonth: dto.endMonth,
    });
  }
}
