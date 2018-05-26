// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// let markup;
import { Graph } from '../graph/index.js';

export const serialize = require('./serialize');
export const markup = markup    = require('./markup');

function _visualize(graph) {
  if (!graph) { return; }
  if (!graph.nodes) { return graph; }

  const data   = serialize(graph);
  return markup.process(data);
};

function resolve(arg) {
  if (arg == null) { return arg; }
  if (arg instanceof Array) { return arg.map(resolve); }
  if ((arg.vertex != null) && (arg.fragment != null)) { return [resolve(arg.vertex, resolve(arg.fragment))]; }
  if (arg._graph != null) { return arg._graph; }
  if (arg.graph != null) { return arg.graph; }
  return arg;
};

function merge(args) {
  let out = [];
  for (let arg of Array.from(args)) {
    if (arg instanceof Array) {
      out = out.concat(merge(arg));
    } else if (arg != null) {
      out.push(arg);
    }
  }
  return out;
};

export function visualize() {
  // const list = merge(resolve([].slice.call(arguments)));
  const list = [];
  return markup.merge((Array.from(list).filter((graph) => graph).map((graph) => _visualize(graph))));
};

export function inspect() {
  const element  = markup.overlay(contents);

  for (let el of Array.from(document.querySelectorAll('.shadergraph-overlay'))) {
    el.remove();
  }
  document.body.appendChild(element);
  contents.update();

  return element;
};
