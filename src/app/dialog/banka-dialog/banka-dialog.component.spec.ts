import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaDialogComponent } from './banka-dialog.component';

describe('BankaDialogComponent', () => {
  let component: BankaDialogComponent;
  let fixture: ComponentFixture<BankaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
