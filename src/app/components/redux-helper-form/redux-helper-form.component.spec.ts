import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxHelperFormComponent } from './redux-helper-form.component';

describe('ReduxHelperFormComponent', () => {
  let component: ReduxHelperFormComponent;
  let fixture: ComponentFixture<ReduxHelperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxHelperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxHelperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
