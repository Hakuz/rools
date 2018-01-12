const assert = require('assert');

class Rule {
  constructor({
    name, when, then, priority = 0, final = false,
  }) {
    this.name = name;
    this.when = Array.isArray(when) ? when : [when];
    this.then = then;
    this.priority = priority;
    this.final = final;
    this.assert();
  }

  assert() {
    const isFunc = func => typeof func === 'function';
    const isArray = array => Array.isArray(array);
    assert(this.name, 'rule "name" is required');
    assert(this.when, `rule "when" is required: "${this.name}"`);
    assert(this.then, `rule "then" is required: "${this.name}"`);
    assert(
      isFunc(this.when) || (isArray(this.when) && !this.when.filter(f => !isFunc(f)).length),
      `rule "when" must be a function or an array of functions: "${this.name}"`,
    );
    assert(
      isFunc(this.then),
      `rule "then" must be a function: "${this.name}"`,
    );
  }
}

module.exports = Rule;
