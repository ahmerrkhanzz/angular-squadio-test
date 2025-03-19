import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSalesChartComponent } from './pet-sales-chart.component';

describe('PetSalesChartComponent', () => {
  let component: PetSalesChartComponent;
  let fixture: ComponentFixture<PetSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
