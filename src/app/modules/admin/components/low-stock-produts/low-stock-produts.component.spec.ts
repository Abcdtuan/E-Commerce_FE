import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockProdutsComponent } from './low-stock-produts.component';

describe('LowStockProdutsComponent', () => {
  let component: LowStockProdutsComponent;
  let fixture: ComponentFixture<LowStockProdutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockProdutsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockProdutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
