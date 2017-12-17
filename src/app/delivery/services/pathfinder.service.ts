import { Injectable } from '@angular/core';
import { Node, Link } from '../../d3';

export interface Route {
    path: string;
    cost: number;
}

@Injectable()
export class PathfinderService {

    all_route: Array<Route>;
    constructor() { }

    findCost(routes, links) {
        const route = routes.split('-');
        let total_cost = 0;
        for (let index = 0; index < route.length - 1; index++) {
            const src_town = route[index];
            const dest_town = route[index + 1];
            const travel_cost = this.checkLink(src_town, dest_town, links);
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

    findAllPath(from, to, stop, nodes: Node[], links: Link[], can_repeat: Boolean, cost_limit: number) {
        const graph = this.createGraph(links);
        this.all_route = [];
        this.traverseNode(from, to, graph, [], [], 0, true, can_repeat, cost_limit);
        return this.all_route;
    }

    traverseNode(from, to, graph, visited_node, path, cost, start, can_repeat, cost_limit) {

        // at destination and not have repeat option
        if (from === to && start !== true && !can_repeat) {
            path.push({ from, cost });
            this.addRoute(path);
        } else if (visited_node.indexOf(from) !== -1) {
            // at visited node
            return;
        } else {
            if (can_repeat) {
                let total_cost = 0;
                path.forEach(element => {
                    total_cost += element.cost;
                });
                if (total_cost >= cost_limit) {
                    return;
                } else {
                    if (total_cost !== 0) {
                        // if current node is at destination node
                        if (path[path.length - 1].from === to) {
                            this.addRoute(path);
                        }
                    }
                }
            }
            path.push({ from, cost });

            if (!can_repeat) {
                visited_node.push(from);
            }

            const adj = graph[from];
            for (const key in adj) {
                this.traverseNode(key, to, graph, visited_node, path, adj[key], false, can_repeat, cost_limit);
            }
        }

        path.pop();
        visited_node.pop();

    }

    addRoute(path) {

        const print_path = [];
        let print_cost = 0;
        path.forEach(element => {
            print_path.push(element.from);
            print_cost += element.cost;
        });

        const dupplicate = this.all_route.filter(route => {
            return route.path === print_path.join(' ');
        });

        if (dupplicate.length === 0) {
            this.all_route.push({
                path: print_path.join(' '),
                cost: print_cost
            });
        }
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
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            const link_src = <Node>link.source;
            const link_dest = <Node>link.target;
            if (link_src.label === src && link_dest.label === dest) {
                return link.cost;
            }
        }
        return 0;
    }
}
