import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageInputModalComponent } from './image-input-modal.component';

describe('ImageInputModalComponent', () => {
  let component: ImageInputModalComponent;
  let fixture: ComponentFixture<ImageInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImageInputModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
