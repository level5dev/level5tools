(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Blog = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Blog, _PageManager);
  function Blog() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.blogFilter(this.context.posts);
    this.fetchRecentPosts();
  }

  // SSCODE 230216: populating the Filter By Tag and Filter By Product list
  ;
  _proto.blogFilter = function blogFilter(posts) {
    var _this = this;
    var tagArr = [];
    var prodTagArr = [];
    $.get("https://sufri.autocode.dev/l5t@dev/getProdListAT/", function (res) {
      res.tagsList.forEach(function (tag) {
        if (!res.productList.includes(tag)) {
          tagArr.push(tag);
        }
      });
      tagArr.forEach(function (tag) {
        var tagFilterTemplate = "<li class=\"blog-sidebar__list-item\">\n            <a href=\"/blog/tag/" + tag + "\">" + tag.toUpperCase() + "</a>\n        </li>";
        $("#tagList").append(tagFilterTemplate);
      });
      if (window.location.href.indexOf("tag") > -1) {
        $("#tagList").append("<li class=\"blog-sidebar__list-item\">\n            <a href=\"/blog/\">SHOW ALL</a>\n        </li>");
      }
      posts.forEach(function (post) {
        post.tags.forEach(function (tag) {
          if (res.productList.includes(tag.name) && !prodTagArr.includes(tag.name)) {
            prodTagArr.push(tag.name);
          }
        });
      });
      prodTagArr.forEach(function (tag) {
        var prodFilterTemplate = "<li class=\"blog-sidebar__list-item product-tag\">\n            <a>" + tag.toUpperCase() + "</a>\n        </li>";
        $("#productList").append(prodFilterTemplate);
      });
      $("#productList").append("<li class=\"blog-sidebar__list-item product-tag\"><a>SHOW ALL</a></li>");
    }).then(function (next) {
      _this.configureIsotope();
    });
  }

  // SSCODE 230216: configuring Isotope(filtering function) for blog cards
  ;
  _proto.configureIsotope = function configureIsotope() {
    var grid = document.getElementById("blogPostsContainer");
    var iso = new Isotope(grid, {
      itemSelector: ".blog-post__card"
    });
    var prodFilterTag = document.querySelectorAll(".product-tag");
    for (var i = 0; i < prodFilterTag.length; i++) {
      prodFilterTag[i].addEventListener("click", function (event) {
        var prodFil = event.target.innerHTML.toLowerCase();
        var arr = prodFil.split(" ");
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        var tagCapitalized = arr.join(" ");
        if (tagCapitalized === "Show All") {
          iso.arrange({
            filter: "*"
          });
        } else {
          iso.arrange({
            filter: function filter(itemElem) {
              var val = itemElem.getAttribute("data-filter");
              if (val.includes(tagCapitalized)) {
                return true;
              } else {
                return false;
              }
            }
          });
        }
      });
    }
  };
  _proto.fetchRecentPosts = function fetchRecentPosts() {
    var $sidebarRecent = $("#blog-sidebar-recent");
    if (!$sidebarRecent.length) return;
    var requestOptions = {
      config: {
        blog: {
          recent_posts: {
            limit: 5
          }
        }
      },
      template: "custom/blog/blog-recent-post-items"
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage("/", requestOptions, function (err, res) {
      $sidebarRecent.html(res);
    });
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmxvZy5qcyJdLCJuYW1lcyI6WyJCbG9nIiwib25SZWFkeSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsImJsb2dGaWx0ZXIiLCJjb250ZXh0IiwicG9zdHMiLCJmZXRjaFJlY2VudFBvc3RzIiwidGFnQXJyIiwicHJvZFRhZ0FyciIsIiQiLCJnZXQiLCJyZXMiLCJ0YWdzTGlzdCIsImZvckVhY2giLCJ0YWciLCJwcm9kdWN0TGlzdCIsImluY2x1ZGVzIiwicHVzaCIsInRhZ0ZpbHRlclRlbXBsYXRlIiwidG9VcHBlckNhc2UiLCJhcHBlbmQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbmRleE9mIiwicG9zdCIsInRhZ3MiLCJuYW1lIiwicHJvZEZpbHRlclRlbXBsYXRlIiwidGhlbiIsIm5leHQiLCJjb25maWd1cmVJc290b3BlIiwiZ3JpZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpc28iLCJJc290b3BlIiwiaXRlbVNlbGVjdG9yIiwicHJvZEZpbHRlclRhZyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJvZEZpbCIsInRhcmdldCIsImlubmVySFRNTCIsInRvTG93ZXJDYXNlIiwiYXJyIiwic3BsaXQiLCJjaGFyQXQiLCJzbGljZSIsInRhZ0NhcGl0YWxpemVkIiwiam9pbiIsImFycmFuZ2UiLCJmaWx0ZXIiLCJpdGVtRWxlbSIsInZhbCIsImdldEF0dHJpYnV0ZSIsIiRzaWRlYmFyUmVjZW50IiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJibG9nIiwicmVjZW50X3Bvc3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsImVyciIsImh0bWwiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDTTtBQUNPO0FBQUEsSUFFakNBLElB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QyxDQUFDLHNCQUFzQixDQUFDO0lBRWhELElBQUksQ0FBQ2tELGNBQWMsQ0FBQ2xCLE1BQU0sRUFBRTtJQUU1QixJQUFNbUIsY0FBYyxHQUFHO01BQ3JCQyxNQUFNLEVBQUU7UUFDTkMsSUFBSSxFQUFFO1VBQ0pDLFlBQVksRUFBRTtZQUNaQyxLQUFLLEVBQUU7VUFDVDtRQUNGO01BQ0YsQ0FBQztNQUNEQyxRQUFRLEVBQUU7SUFDWixDQUFDO0lBRURDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLEdBQUcsRUFBRVIsY0FBYyxFQUFFLFVBQUNTLEdBQUcsRUFBRTFELEdBQUcsRUFBSztNQUNuRGdELGNBQWMsQ0FBQ1csSUFBSSxDQUFDM0QsR0FBRyxDQUFDO0lBQzFCLENBQUMsQ0FBQztFQUNKLENBQUM7RUFBQTtBQUFBLEVBakgrQjRELHFEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay41LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gXCIuL3BhZ2UtbWFuYWdlclwiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tIFwiLi9jb21tb24vY29sbGFwc2libGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvZyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgb25SZWFkeSgpIHtcbiAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICB0aGlzLmJsb2dGaWx0ZXIodGhpcy5jb250ZXh0LnBvc3RzKTtcbiAgICB0aGlzLmZldGNoUmVjZW50UG9zdHMoKTtcbiAgfVxuXG4gIC8vIFNTQ09ERSAyMzAyMTY6IHBvcHVsYXRpbmcgdGhlIEZpbHRlciBCeSBUYWcgYW5kIEZpbHRlciBCeSBQcm9kdWN0IGxpc3RcbiAgYmxvZ0ZpbHRlcihwb3N0cykge1xuICAgIGxldCB0YWdBcnIgPSBbXTtcbiAgICBsZXQgcHJvZFRhZ0FyciA9IFtdO1xuICAgICQuZ2V0KFwiaHR0cHM6Ly9zdWZyaS5hdXRvY29kZS5kZXYvbDV0QGRldi9nZXRQcm9kTGlzdEFUL1wiLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICByZXMudGFnc0xpc3QuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgIGlmICghcmVzLnByb2R1Y3RMaXN0LmluY2x1ZGVzKHRhZykpIHtcbiAgICAgICAgICB0YWdBcnIucHVzaCh0YWcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGFnQXJyLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgICBjb25zdCB0YWdGaWx0ZXJUZW1wbGF0ZSA9IGA8bGkgY2xhc3M9XCJibG9nLXNpZGViYXJfX2xpc3QtaXRlbVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIi9ibG9nL3RhZy8ke3RhZ31cIj4ke3RhZy50b1VwcGVyQ2FzZSgpfTwvYT5cbiAgICAgICAgPC9saT5gO1xuXG4gICAgICAgICQoXCIjdGFnTGlzdFwiKS5hcHBlbmQodGFnRmlsdGVyVGVtcGxhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwidGFnXCIpID4gLTEpIHtcbiAgICAgICAgJChcIiN0YWdMaXN0XCIpLmFwcGVuZChgPGxpIGNsYXNzPVwiYmxvZy1zaWRlYmFyX19saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvYmxvZy9cIj5TSE9XIEFMTDwvYT5cbiAgICAgICAgPC9saT5gKTtcbiAgICAgIH1cblxuICAgICAgcG9zdHMuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgICAgICBwb3N0LnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVzLnByb2R1Y3RMaXN0LmluY2x1ZGVzKHRhZy5uYW1lKSAmJlxuICAgICAgICAgICAgIXByb2RUYWdBcnIuaW5jbHVkZXModGFnLm5hbWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcm9kVGFnQXJyLnB1c2godGFnLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcHJvZFRhZ0Fyci5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZEZpbHRlclRlbXBsYXRlID0gYDxsaSBjbGFzcz1cImJsb2ctc2lkZWJhcl9fbGlzdC1pdGVtIHByb2R1Y3QtdGFnXCI+XG4gICAgICAgICAgICA8YT4ke3RhZy50b1VwcGVyQ2FzZSgpfTwvYT5cbiAgICAgICAgPC9saT5gO1xuXG4gICAgICAgICQoXCIjcHJvZHVjdExpc3RcIikuYXBwZW5kKHByb2RGaWx0ZXJUZW1wbGF0ZSk7XG4gICAgICB9KTtcblxuICAgICAgJChcIiNwcm9kdWN0TGlzdFwiKS5hcHBlbmQoXG4gICAgICAgIGA8bGkgY2xhc3M9XCJibG9nLXNpZGViYXJfX2xpc3QtaXRlbSBwcm9kdWN0LXRhZ1wiPjxhPlNIT1cgQUxMPC9hPjwvbGk+YFxuICAgICAgKTtcbiAgICB9KS50aGVuKChuZXh0KSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZUlzb3RvcGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNTQ09ERSAyMzAyMTY6IGNvbmZpZ3VyaW5nIElzb3RvcGUoZmlsdGVyaW5nIGZ1bmN0aW9uKSBmb3IgYmxvZyBjYXJkc1xuICBjb25maWd1cmVJc290b3BlKCkge1xuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9nUG9zdHNDb250YWluZXJcIik7XG4gICAgbGV0IGlzbyA9IG5ldyBJc290b3BlKGdyaWQsIHsgaXRlbVNlbGVjdG9yOiBcIi5ibG9nLXBvc3RfX2NhcmRcIiB9KTtcblxuICAgIGxldCBwcm9kRmlsdGVyVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0LXRhZ1wiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZEZpbHRlclRhZy5sZW5ndGg7IGkrKykge1xuICAgICAgcHJvZEZpbHRlclRhZ1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGxldCBwcm9kRmlsID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBhcnIgPSBwcm9kRmlsLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcnJbaV0gPSBhcnJbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBhcnJbaV0uc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnQ2FwaXRhbGl6ZWQgPSBhcnIuam9pbihcIiBcIik7XG5cbiAgICAgICAgaWYgKHRhZ0NhcGl0YWxpemVkID09PSBcIlNob3cgQWxsXCIpIHtcbiAgICAgICAgICBpc28uYXJyYW5nZSh7IGZpbHRlcjogXCIqXCIgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsID0gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1maWx0ZXJcIik7XG5cbiAgICAgICAgICAgICAgaWYgKHZhbC5pbmNsdWRlcyh0YWdDYXBpdGFsaXplZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZldGNoUmVjZW50UG9zdHMoKSB7XG4gICAgY29uc3QgJHNpZGViYXJSZWNlbnQgPSAkKFwiI2Jsb2ctc2lkZWJhci1yZWNlbnRcIik7XG5cbiAgICBpZiAoISRzaWRlYmFyUmVjZW50Lmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgYmxvZzoge1xuICAgICAgICAgIHJlY2VudF9wb3N0czoge1xuICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZTogXCJjdXN0b20vYmxvZy9ibG9nLXJlY2VudC1wb3N0LWl0ZW1zXCIsXG4gICAgfTtcblxuICAgIHV0aWxzLmFwaS5nZXRQYWdlKFwiL1wiLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgcmVzKSA9PiB7XG4gICAgICAkc2lkZWJhclJlY2VudC5odG1sKHJlcyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=