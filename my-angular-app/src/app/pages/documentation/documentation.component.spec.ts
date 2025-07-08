import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentationComponent } from './documentation.component';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with modal closed', () => {
    expect(component.showModal).toBeFalse();
    expect(component.modalTitle).toBe('');
    expect(component.modalContent).toBe('');
  });

  it('should open modal when showTechniqueDetails is called with valid technique', () => {
    component.showTechniqueDetails('mindfulness');
    
    expect(component.showModal).toBeTrue();
    expect(component.modalTitle).toBe('Mindfulness Meditation');
    expect(component.modalContent).toContain('What is Mindfulness Meditation?');
  });

  it('should open modal when showAdvancedTopic is called with valid topic', () => {
    component.showAdvancedTopic('routine');
    
    expect(component.showModal).toBeTrue();
    expect(component.modalTitle).toBe('Creating a Meditation Routine');
    expect(component.modalContent).toContain('Building a Sustainable Practice');
  });

  it('should close modal when closeModal is called', () => {
    // First open a modal
    component.showTechniqueDetails('mindfulness');
    expect(component.showModal).toBeTrue();
    
    // Then close it
    component.closeModal();
    
    expect(component.showModal).toBeFalse();
    expect(component.modalTitle).toBe('');
    expect(component.modalContent).toBe('');
  });

  it('should handle invalid technique parameter gracefully', () => {
    component.showTechniqueDetails('invalid-technique');
    
    expect(component.showModal).toBeFalse();
    expect(component.modalTitle).toBe('');
    expect(component.modalContent).toBe('');
  });

  it('should handle invalid topic parameter gracefully', () => {
    component.showAdvancedTopic('invalid-topic');
    
    expect(component.showModal).toBeFalse();
    expect(component.modalTitle).toBe('');
    expect(component.modalContent).toBe('');
  });

  it('should have all required meditation techniques', () => {
    const techniques = ['mindfulness', 'loving-kindness', 'body-scan', 'breath-awareness'];
    
    techniques.forEach(technique => {
      component.showTechniqueDetails(technique);
      expect(component.showModal).toBeTrue();
      expect(component.modalTitle).toBeTruthy();
      expect(component.modalContent).toBeTruthy();
      component.closeModal();
    });
  });

  it('should have all required advanced topics', () => {
    const topics = ['routine', 'goals', 'integration', 'science'];
    
    topics.forEach(topic => {
      component.showAdvancedTopic(topic);
      expect(component.showModal).toBeTrue();
      expect(component.modalTitle).toBeTruthy();
      expect(component.modalContent).toBeTruthy();
      component.closeModal();
    });
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[routerLink="/intro"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/support"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/documentation"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/login"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/register"]')).toBeTruthy();
  });

  it('should render main sections', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#getting-started')).toBeTruthy();
    expect(compiled.querySelector('#meditation-techniques')).toBeTruthy();
    expect(compiled.querySelector('#platform-features')).toBeTruthy();
    expect(compiled.querySelector('#troubleshooting')).toBeTruthy();
    expect(compiled.querySelector('#advanced-topics')).toBeTruthy();
  });

  it('should render sidebar navigation', () => {
    const compiled = fixture.nativeElement;
    const sidebarLinks = compiled.querySelectorAll('nav a');
    expect(sidebarLinks.length).toBeGreaterThan(0);
  });

  it('should render technique cards', () => {
    const compiled = fixture.nativeElement;
    const techniqueCards = compiled.querySelectorAll('.bg-white.border');
    expect(techniqueCards.length).toBeGreaterThan(0);
  });

  it('should render modal when showModal is true', () => {
    component.showModal = true;
    component.modalTitle = 'Test Modal';
    component.modalContent = 'Test Content';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.fixed.inset-0')).toBeTruthy();
    expect(compiled.textContent).toContain('Test Modal');
    expect(compiled.textContent).toContain('Test Content');
  });

  it('should not render modal when showModal is false', () => {
    component.showModal = false;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.fixed.inset-0')).toBeFalsy();
  });

  it('should call scrollToSection when navigation link is clicked', () => {
    spyOn(component, 'scrollToSection');
    const compiled = fixture.nativeElement;
    const navLink = compiled.querySelector('a[href="#getting-started"]');
    
    if (navLink) {
      navLink.click();
      expect(component.scrollToSection).toHaveBeenCalledWith('getting-started');
    }
  });

  it('should initialize mobile menu functionality', () => {
    // Mock DOM elements
    const mockMenuToggle = document.createElement('button');
    const mockMobileMenu = document.createElement('div');
    mockMobileMenu.classList.add('hidden');
    
    spyOn(document, 'getElementById').and.returnValues(mockMenuToggle, mockMobileMenu);
    spyOn(mockMenuToggle, 'addEventListener');
    
    component.ngOnInit();
    
    expect(document.getElementById).toHaveBeenCalledWith('menu-toggle');
    expect(document.getElementById).toHaveBeenCalledWith('mobile-menu');
    expect(mockMenuToggle.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
  });

  it('should handle missing DOM elements gracefully', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    
    expect(() => component.ngOnInit()).not.toThrow();
  });
}); 