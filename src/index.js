/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Block     = require('./block');
const Factory   = require('./factory');
const GLSL      = require('./glsl');
const Graph     = require('./graph');
const Linker    = require('./linker');
const Visualize = require('./visualize');

const { library }   = Factory;
const { cache }     = Factory;
const { visualize } = Visualize;
const { inspect }   = Visualize;

const { Snippet }   = Linker;

const merge = function(a, b) {
  if (b == null) { b = {}; }
  const out = {};
  for (let key in a) { const value = a[key]; out[key] = b[key] != null ? b[key] : a[key]; }
  return out;
};

class ShaderGraph {
  static initClass() {
  
    // Expose class hierarchy
    this.Block =     Block;
    this.Factory =   Factory;
    this.GLSL =      GLSL;
    this.Graph =     Graph;
    this.Linker =    Linker;
    this.Visualize = Visualize;
  }
  constructor(snippets, config) {
    if (!(this instanceof ShaderGraph)) { return new ShaderGraph(snippets, config); }

    const defaults = {
      globalUniforms:   false,
      globalVaryings:   true,
      globalAttributes: true,
      globals:          [],
      autoInspect:      false
    };

    this.config = merge(defaults, config);
    this.fetch  = cache(library(GLSL, snippets, Snippet.load));
  }

  shader(config) {
    if (config == null) { config = {}; }
    const _config = merge(this.config, config);
    return new Factory.Factory(GLSL, this.fetch, _config);
  }

  material(config) {
    return new Factory.Material(this.shader(config), this.shader(config));
  }

  overlay(shader) { return ShaderGraph.overlay(shader); }
  visualize(shader) { return ShaderGraph.visualize(shader); }

  // Static visualization method
  static inspect(shader) { return inspect(shader); }
  static visualize(shader) { return visualize(shader); }
}
ShaderGraph.initClass();

module.exports = ShaderGraph;
if (typeof window !== 'undefined') { window.ShaderGraph = ShaderGraph; }
