/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
* Performs the first pass on an html import, returning the AST for each
* script, style, and template in the import.
*/
(function(context){
  "use strict"
  var Parser = require('parse5').Parser;

  function addNode(node, registry) {
    if (registry.hasOwnProperty(node.tagName)) {
      registry[node.tagName].push(node);
    }
  }

  var importParse = function importParse(htmlString){
    var parser = new Parser();
    try {
      var doc = parser.parse(htmlString);
    } catch (err) {
      debugger;
    }

    var registry = {template: [], script: [], style: []};

    var queue = [].concat(doc.childNodes);
    var nextNode;
    while (queue.length > 0) {
      nextNode = queue.pop();
      if (nextNode && nextNode.tagName) {
        queue = queue.concat(nextNode.childNodes);
        addNode(nextNode, registry);
      }
    }
    return registry;
  };

  context.exports = importParse;
}(module));