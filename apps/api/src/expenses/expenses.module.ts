import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseStatsService } from './services/expense-stats.service';
import { ExpenseTrendService } from './services/expense-trend.service';

@Module({
  providers: [ExpensesService, ExpenseStatsService, ExpenseTrendService],
  controllers: [ExpensesController],
  exports: [ExpensesService, ExpenseStatsService, ExpenseTrendService],
})
export class ExpensesModule {}
