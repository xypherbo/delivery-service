import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


import { D3Service, D3_DIRECTIVES } from './d3';
import { PathfinderService } from './delivery/services';
import { GraphComponent } from './d3/components/graph/graph.component';
import { SHARED_VISUALS } from './d3/components/shared';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...D3_DIRECTIVES,
    ...SHARED_VISUALS
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [D3Service,PathfinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
