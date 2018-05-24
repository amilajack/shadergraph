// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Block   = require('./block');

/*
  Join multiple disconnected nodes
*/
class Join extends Block {
  constructor(nodes) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.nodes = nodes;
    super(...arguments);
  }

  clone() {
    return new Join(this.nodes);
  }

  makeOutlets() { return []; }

  call(program, depth) {
    return (() => {
      const result = [];
      for (let node of Array.from(this.nodes)) {
        const block = node.owner;
        result.push(block.call(program, depth));
      }
      return result;
    })();
  }

  export(layout, depth) {
    return (() => {
      const result = [];
      for (let node of Array.from(this.nodes)) {
        const block = node.owner;
        result.push(block.export(layout, depth));
      }
      return result;
    })();
  }
}

module.exports = Join;