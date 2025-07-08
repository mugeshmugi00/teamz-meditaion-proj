import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SupportComponent } from './support.component';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with FAQ states as false', () => {
    expect(component.openFaqs).toEqual([false, false, false, false]);
  });

  it('should toggle FAQ state when toggleFaq is called', () => {
    // Toggle first FAQ
    component.toggleFaq(0);
    expect(component.openFaqs[0]).toBeTrue();
    expect(component.openFaqs[1]).toBeFalse();
    expect(component.openFaqs[2]).toBeFalse();
    expect(component.openFaqs[3]).toBeFalse();

    // Toggle first FAQ again
    component.toggleFaq(0);
    expect(component.openFaqs[0]).toBeFalse();

    // Toggle second FAQ
    component.toggleFaq(1);
    expect(component.openFaqs[0]).toBeFalse();
    expect(component.openFaqs[1]).toBeTrue();
  });

  it('should handle multiple FAQ toggles independently', () => {
    component.toggleFaq(0);
    component.toggleFaq(2);
    
    expect(component.openFaqs[0]).toBeTrue();
    expect(component.openFaqs[1]).toBeFalse();
    expect(component.openFaqs[2]).toBeTrue();
    expect(component.openFaqs[3]).toBeFalse();
  });

  it('should handle invalid FAQ index gracefully', () => {
    const originalState = [...component.openFaqs];
    
    // Try to toggle non-existent FAQ
    component.toggleFaq(10);
    
    expect(component.openFaqs).toEqual(originalState);
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

  it('should call console.log when browseFAQ is called', () => {
    spyOn(console, 'log');
    
    component.browseFAQ();
    
    expect(console.log).toHaveBeenCalledWith('Browse FAQ clicked');
  });

  it('should call console.log when contactSupport is called', () => {
    spyOn(console, 'log');
    
    component.contactSupport();
    
    expect(console.log).toHaveBeenCalledWith('Contact Support clicked');
  });

  it('should call console.log when startLiveChat is called', () => {
    spyOn(console, 'log');
    
    component.startLiveChat();
    
    expect(console.log).toHaveBeenCalledWith('Start Live Chat clicked');
  });

  it('should redirect to email when sendEmail is called', () => {
    spyOn(window.location, 'href', 'set');
    
    component.sendEmail();
    
    expect(window.location.href).toBe('mailto:support@mindfulmeditations.com');
  });

  it('should redirect to phone when callSupport is called', () => {
    spyOn(window.location, 'href', 'set');
    
    component.callSupport();
    
    expect(window.location.href).toBe('tel:+1-800-MEDITATE');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[routerLink="/intro"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/support"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/documentation"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/login"]')).toBeTruthy();
    expect(compiled.querySelector('a[routerLink="/register"]')).toBeTruthy();
  });

  it('should render support cards', () => {
    const compiled = fixture.nativeElement;
    const supportCards = compiled.querySelectorAll('.support-card');
    expect(supportCards.length).toBeGreaterThan(0);
  });

  it('should render FAQ items', () => {
    const compiled = fixture.nativeElement;
    const faqItems = compiled.querySelectorAll('.faq-item');
    expect(faqItems.length).toBeGreaterThan(0);
  });

  it('should render hero section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero-section')).toBeTruthy();
  });

  it('should render contact information section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.bg-gray-50')).toBeTruthy();
  });

  it('should toggle FAQ visibility when button is clicked', () => {
    const compiled = fixture.nativeElement;
    const faqButtons = compiled.querySelectorAll('.faq-item button');
    
    if (faqButtons.length > 0) {
      const firstButton = faqButtons[0];
      const faqContent = firstButton.parentElement?.querySelector('div[class*="px-6"]');
      
      // Initially FAQ should be closed
      expect(faqContent?.classList.contains('hidden')).toBeTrue();
      
      // Click the button
      firstButton.click();
      fixture.detectChanges();
      
      // FAQ should now be open
      expect(component.openFaqs[0]).toBeTrue();
    }
  });

  it('should render support contact buttons', () => {
    const compiled = fixture.nativeElement;
    const emailButton = compiled.querySelector('a[href="mailto:support@mindfulmeditations.com"]');
    const phoneButton = compiled.querySelector('a[href="tel:+1-800-MEDITATE"]');
    
    expect(emailButton).toBeTruthy();
    expect(phoneButton).toBeTruthy();
  });

  it('should render FAQ progress bars', () => {
    const compiled = fixture.nativeElement;
    const progressBars = compiled.querySelectorAll('.bg-gray-200.rounded-full');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should render support statistics', () => {
    const compiled = fixture.nativeElement;
    const statItems = compiled.querySelectorAll('.stat-item');
    expect(statItems.length).toBeGreaterThan(0);
  });

  it('should handle mobile menu toggle correctly', () => {
    // Mock DOM elements
    const mockMenuToggle = document.createElement('button');
    const mockMobileMenu = document.createElement('div');
    mockMobileMenu.classList.add('hidden');
    
    spyOn(document, 'getElementById').and.returnValues(mockMenuToggle, mockMobileMenu);
    
    component.ngOnInit();
    
    // Simulate click event
    const clickEvent = new Event('click');
    mockMenuToggle.dispatchEvent(clickEvent);
    
    // Mobile menu should no longer be hidden
    expect(mockMobileMenu.classList.contains('hidden')).toBeFalse();
  });
});
