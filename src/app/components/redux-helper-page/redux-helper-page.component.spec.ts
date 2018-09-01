import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxHelperPageComponent } from './redux-helper-page.component';

describe('ReduxHelperPageComponent', () => {
  let component: ReduxHelperPageComponent;
  let fixture: ComponentFixture<ReduxHelperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxHelperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxHelperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
