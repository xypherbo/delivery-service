import { Injectable } from '@angular/core';
import { Node } from '../../d3';
@Injectable()
export class PathfinderService {

    constructor() { }

    findCost(routes, links) {
        const route = routes.split('-');
        console.log(route);
        let total_cost = 0;
        for (let index = 0; index < route.length - 1; index++) {
            const src_town = route[index];
            const dest_town = route[index + 1];
            const travel_cost = this.checkLink(src_town, dest_town, links);
            console.log(travel_cost);
            if (travel_cost > 0) {
                total_cost += travel_cost;
            } else {
                return 'No Such Route';
            }
        }
        return total_cost;
    }

    checkLink(src, dest, links) {
        console.log('cjeck', src, dest);
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            const link_src = <Node>link.source;
            const link_dest = <Node>link.target;
            console.log(link_src.label, link_dest.label);
            if (link_src.label === src && link_dest.label === dest) {
                return link.cost;
            }
        }
        return 0;
    }
}
