import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Parameters, PaymentTransactionDto, Status } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent {

  public displayedColumns: string[] = [ "id", "amount", "currency", "description", "status", "createdAt"];
  public itemsList: PaymentTransactionDto[] = [];
  public totalItems: number = 0;
  public status: Status | "" = "";
  public createdAtStart: FormControl<Date | null> = new FormControl(null);
  public createdAtEnd: FormControl<Date | null> = new FormControl(null);
  public parameters: Parameters = { page: 0, size: 5 };
  public parameters$: BehaviorSubject<Parameters> = new BehaviorSubject<Parameters>(this.parameters);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.parameters$.pipe(
      switchMap(pagination => {
        return this.apiService.getTransactions(
          pagination.page,
          pagination.size,
          pagination.status,
          pagination.createdAtStart,
          pagination.createdAtEnd
        );
      })
    ).subscribe(data => {
      this.itemsList = data.items;
      this.totalItems = data.totalNumberOfItems;
    });
  }

  onPageChange(event: PageEvent): void {
    this.parameters.page = event.pageIndex;
    this.parameters.size = event.pageSize;
    this.parameters$.next(this.parameters);
  }

  onStatusChange(event: MatSelectChange): void {
    this.parameters.status = event.value;
  }

  applyFilters(): void {
    this.parameters.createdAtStart = this.createdAtStart?.value?.toISOString().split('T')[0]?? undefined;
    this.parameters.createdAtEnd = this.createdAtEnd?.value?.toISOString().split('T')[0]?? undefined;
    this.parameters$.next(this.parameters);
  }
}
