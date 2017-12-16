import { Injectable } from '@angular/core';
import { Node, Link } from '../../d3';
@Injectable()
export class PathfinderService {

    cost: number;
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

    findShortest(from, to, nodes: Node[], links: Link[]) {
        const graph = this.createGraph(links);
        const cost = {};
        const prev = {};
        let unvisited_node = nodes.map(node => node.label);

        nodes.forEach(node => {
            cost[node.label] = Number.POSITIVE_INFINITY;
            prev[node.label] = undefined;
        });

        cost[from] = 0;
        while (unvisited_node.length > 0) {
            const next_node_to_investigate = this.getLeastDistanceNode(unvisited_node, cost);
            unvisited_node = this.removeVisitedNode(next_node_to_investigate, unvisited_node);
            const neighbor = graph[next_node_to_investigate];
            if (cost[from] !== 0 && next_node_to_investigate === to) {
                // stop finding if at destination node
                return {
                    cost: cost[to]
                };
            } else {
                for (const key in neighbor) {
                    if (neighbor.hasOwnProperty(key)) {
                        const neighbor_cost = neighbor[key];
                        const temp = cost[next_node_to_investigate] + neighbor_cost;
                        if (temp < cost[key]) {
                            cost[key] = temp;
                            prev[key] = next_node_to_investigate;
                        }
                    }
                }
                if (cost[from] === 0) {
                    cost[from] = Number.POSITIVE_INFINITY;
                    unvisited_node.push(from);
                }
            }
        }
    }

    findAllPath(from, to, stop, nodes: Node[], links: Link[]) {
        const graph = this.createGraph(links);
        this.traverseNode(from, to, graph, [], [], true);
    }

    traverseNode(from, to, graph, visited_node, path, start) {
        // console.log('AT:' + from);
        // console.log(visited_node);
        if (from === to && start !== true) {
            path.push(from);
            console.log(path.join(' '));
        } else if (visited_node.indexOf(from) !== -1) {
            return;
        } else {
            path.push(from);
            visited_node.push(from);
            const adj = graph[from];
            // console.log(adj);
            for (const key in adj) {
                this.cost += adj[key];
                // console.log('TRAVERSE :' + key);
                this.traverseNode(key, to, graph, visited_node, path, false);
            }
        }

        path.pop();
        visited_node.pop();
    }

    createGraph(links: Link[]) {
        const graph = {};
        links.forEach(link => {
            const src_node = <Node>link.source;
            const dest_node = <Node>link.target;
            if (!graph[src_node.label]) {
                graph[src_node.label] = {};
            }
            graph[src_node.label][dest_node.label] = link.cost;
        });
        return graph;
    }

    getLeastDistanceNode(unvisited_node, cost) {
        let lowest_cost = Number.POSITIVE_INFINITY;
        let lowest_cost_name = '';
        unvisited_node.forEach(node => {
            const node_cost = cost[node];
            if (node_cost < lowest_cost) {
                lowest_cost = node_cost;
                lowest_cost_name = node;
            }
        });
        return lowest_cost_name;
    }

    removeVisitedNode(node_to_remove, nodes) {
        nodes.forEach((node, index) => {
            if (node === node_to_remove) {
                nodes.splice(index, 1);
            }
        });
        return nodes;
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
