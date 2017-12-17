import { PathfinderService } from './pathfinder.service';
import { Node, Link } from '../../d3';
describe('PathfinderService', () => {

    let service: PathfinderService;
    const graph: any = {
        'A': { 'B': 1, 'C': 4, 'D': 10 },
        'B': { 'E': 3 },
        'C': { 'D': 4, 'F': 2 },
        'D': { 'E': 1 },
        'E': { 'B': 3, 'A': 2 },
        'F': { 'D': 1 }
    };

    beforeEach(() => {
        service = new PathfinderService();
    });

    it('#findCost should reject if input invalid', () => {

    });

    it('#findShortest without source or destination should do nothing', () => {
        expect(service.findShortest('', 'D', graph)).toEqual(undefined);
        expect(service.findShortest('', '', graph)).toEqual(undefined);
        expect(service.findShortest('A', '', graph)).toEqual(undefined);
    });

    it('#findShortest E-D shoule be 9', () => {
        expect(service.findShortest('E', 'D', graph)).toEqual({ cost: 9 });
    });

    it('#findShortest E-E shoule be 6', () => {
        expect(service.findShortest('E', 'E', graph)).toEqual({ cost: 6 });
    });

    it('#findAllPath without source or destination should do nothing', () => {
        expect(service.findAllPath('', 'D', 4, graph, false, undefined)).toEqual(undefined);
        expect(service.findAllPath('', '', 4, graph, false, undefined)).toEqual(undefined);
        expect(service.findAllPath('E', '', 4, graph, false, undefined)).toEqual(undefined);
    });

    it('#findAllPath use same route but not have cost limit shold do nothing', () => {
        expect(service.findAllPath('E', 'D', 4, graph, true, undefined)).toEqual(undefined);
        expect(service.findAllPath('E', 'D', 4, graph, true, 0)).toEqual(undefined);
        expect(service.findAllPath('E', 'D', 4, graph, true, null)).toEqual(undefined);
    });

    it('#findAllPath E-D shoule be 3 route', () => {
        expect(service.findAllPath('E', 'D', 4, graph, false, undefined).length).toEqual(3);
    });

    it('#findAllPath E-E shoule be 5 route', () => {
        expect(service.findAllPath('E', 'E', 4, graph, false, undefined).length).toEqual(5);
    });

    it('#findAllPath E-E with repeat route and cost not over 20 shoule be 29 route', () => {
        expect(service.findAllPath('E', 'E', 4, graph, true, 20).length).toEqual(29);
    });
});
