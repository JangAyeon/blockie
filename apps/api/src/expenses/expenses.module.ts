import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseStatsService } from './services/expense-stats.service';
import { ExpenseTrendService } from './services/expense-trend.service';
import { ExpenseStreakService } from './services/expense-streak.service';
@Module({
  providers: [
    ExpensesService,
    ExpenseStatsService,
    ExpenseTrendService,
    ExpenseStreakService,
  ],
  controllers: [ExpensesController],
  exports: [
    ExpensesService,
    ExpenseStatsService,
    ExpenseTrendService,
    ExpenseStreakService,
  ],
})
export class ExpensesModule {}
