import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { D3Service, D3_DIRECTIVES } from './d3';
import { GraphComponent } from './d3/components/graph/graph.component';
import { SHARED_VISUALS } from './d3/components/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GraphComponent,
        ...D3_DIRECTIVES,
        ...SHARED_VISUALS
      ],
      imports: [
        FormsModule
      ],
      providers: [D3Service]
    }).compileComponents();
  }));
 /*  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'DeliveryService'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DeliveryService');
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  })); */
});
