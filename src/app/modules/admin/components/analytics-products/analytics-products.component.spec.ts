import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsProductsComponent } from './analytics-products.component';

describe('AnalyticsProductsComponent', () => {
  let component: AnalyticsProductsComponent;
  let fixture: ComponentFixture<AnalyticsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
