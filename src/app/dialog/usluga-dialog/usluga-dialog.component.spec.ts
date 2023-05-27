import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugaDialogComponent } from './usluga-dialog.component';

describe('UslugaDialogComponent', () => {
  let component: UslugaDialogComponent;
  let fixture: ComponentFixture<UslugaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UslugaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UslugaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
