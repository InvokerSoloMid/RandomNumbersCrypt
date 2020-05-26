import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptComponent } from './crypt.component';

describe('CryptComponent', () => {
  let component: CryptComponent;
  let fixture: ComponentFixture<CryptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
