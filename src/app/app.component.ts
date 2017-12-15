import { Component } from '@angular/core';

import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  path_input: string;

  constructor() {
    const N = APP_CONFIG.N,
    getIndex = number => number - 1;

  for (let i = 1; i <= N; i++) {
    this.nodes.push(new Node(i));
  }

  for (let i = 1; i <= N; i++) {
    for (let m = 2; i * m <= N; m++) {
      this.nodes[getIndex(i)].linkCount++;
      this.nodes[getIndex(i * m)].linkCount++;

      this.links.push(new Link(i, i * m));
    }
  }
  console.log(this.nodes);
  console.log(this.links)
  }

  addPath(path_codes) {
    
   /*  console.log(path_codes)
    let path_code_array = path_codes.split(',');
    path_code_array.forEach(path_code => {
      var info = path_code.split('');

      this.nodes.push(new Node(info[0]));
      this.nodes.push(new Node(info[1]));
      this.links.push(new Link(info[0],info[1]));
    }); */
  }
}
