import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSalesDetailsComponent } from './pet-sales-details.component';

describe('PetSalesDetailsComponent', () => {
  let component: PetSalesDetailsComponent;
  let fixture: ComponentFixture<PetSalesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetSalesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
