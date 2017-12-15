import {
    Component, ChangeDetectorRef,
    ChangeDetectionStrategy, Input
} from '@angular/core';
import { D3Service, ForceDirectedGraph, Node } from '../../';

@Component({
    selector: 'graph',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height" style="border:1px solid black">
      <g>
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"></g>
      </g>
    </svg>
  `,
    styleUrls: ['./graph.component.css']
})
export class GraphComponent {
    @Input('nodes') nodes;
    @Input('links') links;

    graph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) { }

    ngOnInit() {
        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
        this.graph.ticker.subscribe((d) => {
            this.ref.markForCheck();
        });
    }

    ngAfterViewInit() {
        this.graph.initSimulation(this.options);
    }

    private _options: { width, height } = { width: 500, height: 300 };

    get options() {
        return this._options = {
            width: 500, height: 500
        };
    }
}