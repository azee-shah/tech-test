import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableComponent } from './transaction-table.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { PaymentDto } from '../../interfaces/interfaces';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['getTransactions']);

    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule, 
        MatDatepickerModule,
        MatButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpyObj },
        provideNativeDateAdapter(),
        provideAnimationsAsync()]
    })
    .compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filters and update parameters', () => {
    const createdAtStart = new FormControl(new Date());
    const createdAtEnd = new FormControl(new Date());
    component.createdAtStart = createdAtStart;
    component.createdAtEnd = createdAtEnd;
    const expectedStart = createdAtStart.value!.toISOString().split('T')[0];
    const expectedEnd = createdAtEnd.value!.toISOString().split('T')[0];

    component.applyFilters();

    expect(component.parameters.createdAtStart).toEqual(expectedStart);
    expect(component.parameters.createdAtEnd).toEqual(expectedEnd);
  });

  it('should update parameters on page change', () => {
    const event = { pageIndex: 2, pageSize: 5 } as PageEvent;

    component.onPageChange(event);

    expect(component.parameters.page).toEqual(event.pageIndex);
    expect(component.parameters.size).toEqual(event.pageSize);
  });

  it('should update parameters on status change', () => {
    const event = { value: 'SUCCESS' } as MatSelectChange;

    component.onStatusChange(event);

    expect(component.parameters.status).toEqual(event.value);
  });

  it('should fetch transactions on initialization', () => {
    const dummyData: PaymentDto = {
      items: [], 
      totalNumberOfItems: 0,
      numberOfPages: 0,
      currentPage: 0,
      pageSize: 5,
      hasNext: false
    };
    apiServiceSpy.getTransactions.and.returnValue(of(dummyData));

    component.ngOnInit();

    expect(apiServiceSpy.getTransactions).toHaveBeenCalledWith(0, 5, undefined, undefined, undefined);
    expect(component.itemsList).toEqual(dummyData.items);
    expect(component.totalItems).toEqual(dummyData.totalNumberOfItems);
  });
});
