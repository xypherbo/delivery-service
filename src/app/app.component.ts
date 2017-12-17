import { Component } from '@angular/core';
import { Node, Link } from './d3';
import { Route, PathfinderService } from './delivery/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    path_input: string;
    total_cost: string | number;
    shortest: any;
    from: string;
    to: string;
    nodes: Node[] = [];
    uncalc_nodes: Node[] = [];
    links: Link[] = [];
    uncalc_links: Link[] = [];
    all_route: Array<Route> = [];
    can_repeat: boolean;
    cost_limit: number;

    constructor(private pathfinderService: PathfinderService) {

    }

    addPath(path_codes) {
        const path_code_array = path_codes.split(', ');
        path_code_array.forEach(path_code => {
            const src_town = path_code.substring(0, 1);
            const dest_town = path_code.substring(1, 2);
            const cost = parseInt(path_code.substring(2));

            if (this.findNodeIndex(src_town) === -1) {
                this.uncalc_nodes.push(new Node(this.uncalc_nodes.length, src_town));
            }
            if (this.findNodeIndex(dest_town) === -1) {
                this.uncalc_nodes.push(new Node(this.uncalc_nodes.length, dest_town));
            }
            const src_index = this.findNodeIndex(src_town);
            const dest_index = this.findNodeIndex(dest_town);
            this.uncalc_nodes[src_index].linkCount++;
            this.uncalc_nodes[dest_index].linkCount++;
            this.uncalc_links.push(new Link(src_index, dest_index, cost));
            this.nodes = Object.assign([], this.uncalc_nodes);
            this.links = Object.assign([], this.uncalc_links);
            console.log(this.nodes, this.links);
        });
    }

    findCost(route) {
        this.total_cost = this.pathfinderService.findCost(route, this.uncalc_links);
    }

    findShortest(from, to) {
        const graph = this.pathfinderService.createGraph(this.uncalc_links);
        console.log(JSON.stringify(graph));
        this.shortest = this.pathfinderService.findShortest(from, to, graph);
        this.all_route = this.pathfinderService.findAllPath(from, to, 4, graph, this.can_repeat, this.cost_limit);
    }

    findNodeIndex(node_id: any): number {
        const nodes = this.uncalc_nodes;
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            if (node.label === node_id) {
                return index;
            }
        }
        return -1;
    }
}
