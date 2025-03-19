import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-common-table',
  standalone: false,
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = []; // Input data (users or attractions)
  @Input() columns: { key: string; header: string }[] = []; // Column definitions
  @Input() totalItems: number = 0; // Total number of items for pagination
  @Input() pageSize: number = 10; // Items per page
  @Input() pageIndex: number = 0; // Current page index

  @Output() pageChange = new EventEmitter<PageEvent>(); // Emit pagination events
  @Output() searchChange = new EventEmitter<string>(); // Emit search events
  @Output() edit = new EventEmitter<any>(); // Emit edit event
  @Output() delete = new EventEmitter<any>(); // Emit delete event

  dataSource = new MatTableDataSource<any>(); // DataSource for the table
  displayedColumns: string[] = []; // Columns to display

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator
  @ViewChild(MatSort) sort!: MatSort; // Sorting

  private searchSubject = new Subject<string>(); // Subject for search input

  ngOnInit(): void {
    this.displayedColumns = [...this.columns.map((col) => col.key), 'actions']; // Set displayed columns
    // Debounce search input to avoid too many API calls
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last input
        distinctUntilChanged() // Only emit if the search term changes
      )
      .subscribe((searchTerm) => {
        this.searchChange.emit(searchTerm); // Emit search term to the parent
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.dataSource.data = this.data; // Update data source when data changes
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Connect paginator to data source
    this.dataSource.sort = this.sort; // Connect sorting to data source
  }

  // Handle page change event
  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event); // Emit pagination event to the parent
  }

  // Apply search filter
  onSearchChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue); // Emit search term to the parent
  }

  // Handle edit action
  onEdit(row: any): void {
    this.edit.emit(row); // Emit the row data to the parent
  }

  // Handle delete action
  onDelete(row: any): void {
    this.delete.emit(row); // Emit the row data to the parent
  }
}
