import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


import { D3Service, D3_DIRECTIVES } from './d3';
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
    BrowserModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
