import { Component, Input } from '@angular/core';
import { Link } from '../../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:g>
      <svg:line
          class="link"
          [attr.x1]="link.source.x"
          [attr.y1]="link.source.y"
          [attr.x2]="link.target.x"
          [attr.y2]="link.target.y"
      ></svg:line>
      <svg:text 
          class="node-name"
          [attr.x]="link.source.x"
          [attr.y]="link.source.y" 
      >aaa</svg:text>
    </svg:g>
  `,
  styleUrls: ['./link.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
}