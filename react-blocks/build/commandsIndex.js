/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./react-blocks/src/commandsIndex.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react-blocks/src/blocks/Articles/ArticlesConfig.js":
/*!************************************************************!*\
  !*** ./react-blocks/src/blocks/Articles/ArticlesConfig.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var shortCodeTag = 'shortcake_articles';
var gutenbergTag = 'planet4-blocks/articles';
var shortCodeAttributes = {
  article_heading: {
    type: 'string',
    shortcode: function shortcode(_ref) {
      var _ref$named$article_he = _ref.named.article_heading,
          article_heading = _ref$named$article_he === void 0 ? null : _ref$named$article_he;
      return article_heading;
    }
  },
  articles_description: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.articles_description;
    }
  },
  article_count: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.article_count;
    }
  },
  read_more_text: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.read_more_text;
    }
  },
  read_more_link: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.read_more_link;
    }
  },
  button_link_new_tab: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.button_link_new_tab;
    }
  },
  ignore_categories: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.ignore_categories;
    }
  },
  tags: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.tags ? attributes.named.tags.split(',') : [];
    }
  },
  post_types: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.post_types ? attributes.named.post_types.split(',') : [];
    }
  },
  posts: {
    type: 'string',
    shortcode: function shortcode(attributes) {
      return attributes.named.posts ? attributes.named.posts.split(',') : [];
    }
  }
};
var gutenbergAttributes = {
  article_heading: {
    type: 'string'
  },
  articles_description: {
    type: 'string'
  },
  article_count: {
    type: 'integer',
    default: 3
  },
  tags: {
    type: 'array',
    default: []
  },
  posts: {
    type: 'array',
    default: []
  },
  post_types: {
    type: 'array',
    default: []
  },
  read_more_text: {
    type: 'string'
  },
  read_more_link: {
    type: 'string',
    default: ''
  },
  button_link_new_tab: {
    type: 'boolean',
    default: false
  }
};
exports.shortCodeTag = shortCodeTag;
exports.gutenbergTag = gutenbergTag;
exports.shortCodeAttributes = shortCodeAttributes;
exports.gutenbergAttributes = gutenbergAttributes;

/***/ }),

/***/ "./react-blocks/src/commands/convertBlocks.js":
/*!****************************************************!*\
  !*** ./react-blocks/src/commands/convertBlocks.js ***!
  \****************************************************/
/*! exports provided: convertBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertBlocks", function() { return convertBlocks; });
/* harmony import */ var _blocks_Articles_ArticlesConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blocks/Articles/ArticlesConfig */ "./react-blocks/src/blocks/Articles/ArticlesConfig.js");
/* harmony import */ var _blocks_Articles_ArticlesConfig__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blocks_Articles_ArticlesConfig__WEBPACK_IMPORTED_MODULE_0__);

var convertBlocks = function convertBlocks() {
  console.log(_blocks_Articles_ArticlesConfig__WEBPACK_IMPORTED_MODULE_0___default.a);
};

/***/ }),

/***/ "./react-blocks/src/commandsIndex.js":
/*!*******************************************!*\
  !*** ./react-blocks/src/commandsIndex.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commands_convertBlocks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/convertBlocks.js */ "./react-blocks/src/commands/convertBlocks.js");

Object(_commands_convertBlocks_js__WEBPACK_IMPORTED_MODULE_0__["convertBlocks"])();

/***/ })

/******/ });
//# sourceMappingURL=commandsIndex.js.map