import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectsTableComponent } from './objects-table.component';

describe('ObjectsTableComponent', () => {
  let component: ObjectsTableComponent;
  let fixture: ComponentFixture<ObjectsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObjectsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
