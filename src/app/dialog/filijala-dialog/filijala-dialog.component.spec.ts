import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilijalaDialogComponent } from './filijala-dialog.component';

describe('FilijalaDialogComponent', () => {
  let component: FilijalaDialogComponent;
  let fixture: ComponentFixture<FilijalaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilijalaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilijalaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
