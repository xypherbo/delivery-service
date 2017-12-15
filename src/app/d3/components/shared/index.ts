export * from './link/link.component';
export * from './node/node.component';

import { NodeVisualComponent } from './node/node.component';
import { LinkVisualComponent } from './link/link.component';

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent
];