import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRecipientsComponent } from './display-recipients.component';

describe('DisplayRecipientsComponent', () => {
  let component: DisplayRecipientsComponent;
  let fixture: ComponentFixture<DisplayRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
