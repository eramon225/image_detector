import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageOffsideComponent } from './image-offside.component';

describe('ImageModalComponent', () => {
  let component: ImageOffsideComponent;
  let fixture: ComponentFixture<ImageOffsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImageOffsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageOffsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
