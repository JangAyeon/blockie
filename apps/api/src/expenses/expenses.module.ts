import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseStatsService } from './services/expense-stats.service';

@Module({
  providers: [ExpensesService, ExpenseStatsService],
  controllers: [ExpensesController],
  exports: [ExpensesService, ExpenseStatsService],
})
export class ExpensesModule {}
