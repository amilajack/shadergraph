// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Graph from '../graph';

import Block from './block';

/*
  Re-use a subgraph as a callback
*/
class Callback extends Block {
  constructor(graph) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.graph = graph;
    super(...arguments);
  }

  refresh() {
    super.refresh(...arguments);
    return delete this.subroutine;
  }

  clone() {
    return new Callback(this.graph);
  }

  makeOutlets() {
    this.make();

    const outlets = [];
    let ins     = [];
    let outs    = [];

    // Pass-through existing callbacks
    // Collect open inputs/outputs
    const handle = (outlet, list) => {
      if (outlet.meta.callback) {
        if (outlet.inout === Graph.IN) {
          // Dupe outlet and create two-way link between cloned outlets
          const dupe = outlet.dupe();
          if (dupe  .meta.child == null) { dupe.meta.child = outlet; }
          outlet.meta.parent = dupe;

          return outlets.push(dupe);
        }
      } else {
        return list.push(outlet.type);
      }
    };

    for (var outlet of Array.from(this.graph.inputs())) { handle(outlet, ins); }
    for (outlet of Array.from(this.graph.outputs())) { handle(outlet, outs); }

    // Merge inputs/outputs into new callback signature
    ins  = ins.join(',');
    outs = outs.join(',');
    const type = `(${ins})(${outs})`;

    outlets.push({
      name:  'callback',
      type,
      inout: Graph.OUT,
      meta: {
        callback: true,
        def: this.subroutine.main
      }
    });

    return outlets;
  }

  make() {
    return this.subroutine = this.graph.compile(this.namespace);
  }

  export(layout, depth) {
    if (!layout.visit(this.namespace, depth)) { return; }

    this._link(this.subroutine, layout, depth);
    return this.graph.export(layout, depth);
  }

  call(program, depth) {
    return this._require(this.subroutine, program, depth);
  }

  callback(layout, depth, name, external, outlet) {
    this._include(this.subroutine, layout, depth);
    return this._callback(this.subroutine, layout, depth, name, external, outlet);
  }
}

export default Callback;