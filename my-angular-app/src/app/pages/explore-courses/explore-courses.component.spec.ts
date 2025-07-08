import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreCoursesComponent } from './explore-courses.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../../components/footer/footer.component';
import { By } from '@angular/platform-browser';

describe('ExploreCoursesComponent', () => {
  let component: ExploreCoursesComponent;
  let fixture: ComponentFixture<ExploreCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreCoursesComponent, RouterTestingModule, FooterComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ExploreCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section', () => {
    const hero = fixture.nativeElement.querySelector('.hero-section');
    expect(hero).toBeTruthy();
    expect(hero.textContent).toContain('Explore Our Meditation Courses');
  });

  it('should render at least one course card', () => {
    const cards = fixture.debugElement.queryAll(By.css('.course-card'));
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render enroll buttons in each course card', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.course-card button'));
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(btn => {
      expect(btn.nativeElement.textContent).toContain('Enroll Now');
    });
  });

  it('should render the footer', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });
}); 