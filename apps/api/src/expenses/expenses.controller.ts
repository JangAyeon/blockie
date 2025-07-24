import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ExpensesEntity } from './entity/expenses.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { getUser } from 'src/users/users.decorator';
import { CreateExpensesDto } from './dto/create-expenses.dto';
import { UpdateExpensesDto } from './dto/update-expenses.dto';
import { AuthUser } from '@repo/types';
// import { GetCategoryStatsDto } from './dto/category-stats.dto';
import { CategoryStatsResponseEntity } from './entity/category-stats.entity';
import { GetTrendAnalysisDto } from './dto/trend-analysis.dto';
import { TrendAnalysisEntity } from './entity/trend-analysis.entity';

@ApiTags('Expense (지출 관련 API)')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // ✅ 지출 생성
  /*
   * POST
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') // 👈 위에서 설정한 name과 일치해야 함
  @Post()
  @ApiOperation({
    summary: '새로운 지출 생성하기',
    description: '새로운 지출을 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['amount', 'category', 'expenseDate'],
      properties: {
        amount: {
          type: 'integer',
          example: 15000,
          description: '지출 금액',
        },
        category: {
          type: 'string',
          example: '식비',
          description: '지출 카테고리',
        },

        expenseDate: {
          type: 'string',
          format: 'date-time',
          example: '2025-06-07T00:00:00.000Z',
          description: '지출이 발생한 날짜 (ISO 8601 형식)',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: ExpensesEntity,
  })
  create(
    @getUser() user: AuthUser,
    @Body() createExpensesDto: CreateExpensesDto,
  ) {
    return this.expensesService.createExpense(user.id, createExpensesDto);
  }

  // ✅ 사용자 지출 전체 조회
  /*
   * GET
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({
    summary: '요청한 유저의 전체 지출 내역 검색하기',
    description: '요청한 유저를 기준으로 지출 내역 검색합니다.',
  })
  // @ApiQuery({
  //   name: 'userId',
  //   required: false,
  //   type: String,
  //   description: '검색할 지출내역의 userId',
  // })
  // @ApiQuery({
  //   name: 'expenseId',
  //   required: false,
  //   type: String,
  //   description: '검색할 지출 내역의 고유 id',
  // })
  @ApiOkResponse({ type: ExpensesEntity })
  @ApiNotFoundResponse({
    description: '해댱 유저의 지출 내역를 찾을 수 없습니다',
  })
  getMyExpenses(@getUser() user: AuthUser) {
    return this.expensesService.getExpensesByUser(user.id);
  }

  // ✅ 지출 수정
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @ApiOperation({
    summary: '요청한 본인 유저의 특정 지출 내역 수정하기',
    description: '요청한 본인 유저의 특정 지출 내역 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: '수정할 지출 내역의 고유 id',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['amount', 'category', 'expenseDate'],
      properties: {
        amount: {
          type: 'integer',
          example: 15000,
          description: '지출 금액',
        },
        category: {
          type: 'string',
          example: '식비',
          description: '지출 카테고리',
        },

        expenseDate: {
          type: 'string',
          format: 'date-time',
          example: '2025-06-07T00:00:00.000Z',
          description: '지출이 발생한 날짜 (ISO 8601 형식)',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ExpensesEntity,
  })
  @ApiNotFoundResponse()
  updateExpense(
    @getUser() user: AuthUser,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateExpensesDto,
  ) {
    const userId = user.id;
    return this.expensesService.updateExpense(userId, id, updateUserDto);
  }

  // ✅ 지출 삭제
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '요청한 본인 유저의 특정 지출 내역 삭제하기',
    description: '요청한 본인 유저의 특정 지출 내역 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: '삭제할 지출 내역의 고유 id',
  })
  @Delete(':id')
  deleteExpense(@getUser() user: AuthUser, @Param('id') id: string) {
    return this.expensesService.deleteExpense(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('stats/daily')
  @ApiOperation({
    summary: '일간 지출 통계 조회',
    description:
      '해당 날짜(date)에 대한 사용자의 지출 총합을 반환합니다. 예: /daily?date=2025-06-06',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: '기준 일자 (예: 2025-06-06)',
  })
  @ApiOkResponse({
    description: '총 지출 금액과 지출 목록',
    schema: {
      example: {
        total: 152000,
        expenses: [
          {
            id: 'abc123',
            amount: 32000,
            category: '식비',
            expenseDate: '2025-06-05T13:22:00.000Z',
            createdAt: '2025-06-05T13:25:00.000Z',
          },
        ],
      },
    },
  })
  getDailyStats(@getUser() user: AuthUser, @Query('date') date: string) {
    return this.expensesService.getDailyStats(user.id, new Date(date));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('stats/weekly')
  @ApiOperation({
    summary: '주간 지출 통계 조회',
    description:
      '해당 날짜가 속한 주(월~일)에 대한 사용자의 지출 총합을 반환합니다.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: '기준 일자 (예: 2025-06-06)',
  })
  @ApiOkResponse({
    description: '총 지출 금액과 지출 목록',
    schema: {
      example: {
        total: 152000,
        expenses: [
          {
            id: 'abc123',
            amount: 32000,
            category: '식비',
            expenseDate: '2025-06-05T13:22:00.000Z',
            createdAt: '2025-06-05T13:25:00.000Z',
          },
        ],
      },
    },
  })
  getWeeklyStats(@getUser() user: AuthUser, @Query('date') date: string) {
    return this.expensesService.getWeeklyStats(user.id, new Date(date));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('stats/monthly')
  @ApiOperation({
    summary: '월간 지출 통계 조회',
    description: '해당 날짜가 속한 달의 지출 총합을 반환합니다.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: '기준 일자 (예: 2025-06-06)',
  })
  @ApiOkResponse({
    description: '총 지출 금액과 지출 목록',
    schema: {
      example: {
        total: 152000,
        expenses: [
          {
            id: 'abc123',
            amount: 32000,
            category: '식비',
            expenseDate: '2025-06-05T13:22:00.000Z',
            createdAt: '2025-06-05T13:25:00.000Z',
          },
        ],
      },
    },
  })
  getMonthlyStats(@getUser() user: AuthUser, @Query('date') date: string) {
    return this.expensesService.getMonthlyStats(user.id, new Date(date));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('stats/category')
  @ApiOperation({
    summary: '카테고리별 지출 통계 조회',
    description:
      '특정 년월의 카테고리별 지출 통계를 조회합니다. 도넛 차트 데이터로 활용할 수 있습니다.',
  })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
    description: '조회할 연도 (예: 2025)',
    example: 2025,
  })
  @ApiQuery({
    name: 'month',
    type: Number,
    required: true,
    description: '조회할 월 (1~12)',
    example: 7,
  })
  @ApiOkResponse({
    type: CategoryStatsResponseEntity,
    description: '카테고리별 지출 통계 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 기간에 지출 데이터가 없습니다',
  })
  getCategoryStats(
    @getUser() user: AuthUser,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.expensesService.getCategoryStats(
      user.id,
      Number(year),
      Number(month),
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('trends/analysis')
  @ApiOperation({
    summary: '지출 추이 분석',
    description: `지출 패턴의 상세한 트렌드 분석을 제공합니다. 
  월별/주별/일별 분석이 가능하며, 카테고리별 트렌드, 변동성 분석, 
  예측 정보, 맞춤 인사이트를 포함합니다.`,
  })
  @ApiQuery({
    name: 'months',
    type: Number,
    required: false,
    description: '분석할 기간 (개월 수, 기본값: 6, 최대: 24)',
    example: 6,
  })
  @ApiQuery({
    name: 'period',
    enum: ['monthly', 'weekly', 'daily'],
    required: false,
    description: '분석 단위 (기본값: monthly)',
    example: 'monthly',
  })
  @ApiQuery({
    name: 'startYear',
    type: Number,
    required: false,
    description: '시작 연도 (명시적 기간 설정시)',
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
    type: TrendAnalysisEntity,
    description: '지출 추이 분석 완료',
  })
  getTrendAnalysis(
    @getUser() user: AuthUser,
    @Query() dto: GetTrendAnalysisDto,
  ) {
    return this.expensesService.getTrendAnalysis(user.id, {
      months: dto.months,
      period: dto.period,
      startYear: dto.startYear,
      startMonth: dto.startMonth,
      endYear: dto.endYear,
      endMonth: dto.endMonth,
    });
  }
}
