(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _custom_its_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/its-category */ "./assets/js/theme/custom/its-category.js");
/* harmony import */ var _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/toggle-category-listing-view */ "./assets/js/theme/custom/toggle-category-listing-view.js");
/* harmony import */ var _custom_its_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/its-global */ "./assets/js/theme/custom/its-global.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);

    /**
     * IntuitSolutions - Custom Category
     */
    _this.ITSCategory = new _custom_its_category__WEBPACK_IMPORTED_MODULE_5__["default"](context);
    _this.toggleCategoryListingView = new _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__["default"](context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$("[data-shop-by-price]").length) return;
    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }
    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.populateGridProduct();
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }
    $("a.reset-btn").on("click", function () {
      return _this3.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.ariaNotifyNoProducts();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this4 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: this.toggleCategoryListingView.getRequestTemplateType("category"),
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);

      /**
       * IntuitSolutions - Category Update
       */
      _this4.ITSCategory.afterFacetUpdate();
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    $("body").on("productViewModeChanged", function () {
      var NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage
            }
          }
        },
        template: {
          productListing: _this4.toggleCategoryListingView.getRequestTemplateType("category"),
          sidebar: "category/sidebar"
        },
        showMore: "category/show-more"
      };
      _this4.facetedSearch.updateRequestOptions(NewOpts);
    });
  }

  //SSCODE: Populate Product Grid in category.html
  ;
  _proto.populateGridProduct = function populateGridProduct() {
    var body = this;
    var UUIDcatc = this.context.UUIDcatc;
    var categoryId = this.context.categoryId;
    axios.get("https://sufri.api.stdlib.com/l5t@dev/getAllProduct/", {
      params: {
        id: categoryId
      }
    }).then(function (response) {
      var gridAllProducts = $("#grid-all-product");
      var data = response.data.product;
      var category = response.data.category;
      data.forEach(function (pr) {
        var img = {};
        for (var i = 0; i < pr["images"].length; i++) {
          if (pr["images"][i]["is_thumbnail"]) {
            img = pr["images"][i];
            break;
          }
        }
        var actionSection = "";
        if (pr["variants"].length > 1) {
          actionSection = "<button type=\"button\" class=\"button button--primary quickview button--quickview\" data-product-id=\"" + pr["id"] + "\">View Options</button>";
        } else {
          actionSection = "\n            <div class=\"card-atc js-card-atc\">\n              <div class=\"card-atc__section card-atc__section--qty\">\n                <label for=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" class=\"card-atc__label is-srOnly\">Quantity:</label>\n                <div class=\"card-atc-increment card-atc-increment--has-buttons js-card-atc-increment\">\n\n                  <input type=\"tel\" class=\"form-input card-atc__input card-atc__input--total js-card-atc__input--total\" name=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" id=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" value=\"1\" min=\"1\" pattern=\"[0-9]*\" aria-live=\"polite\">\n                  <div class=\"card-atc-button-wrapper\">\n                    <button class=\"button button--icon\" data-action=\"inc\" type=\"button\">\n                      <span class=\"is-srOnly\">Increase Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-add\"></use>\n                        </svg>\n                      </span>\n                    </button>\n                    <button class=\"button button--icon\" data-action=\"dec\" type=\"button\">\n                      <span class=\"is-srOnly\">Decrease Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-minus\"></use>PP\n                        </svg>\n                      </span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div class=\"card-atc__section card-atc__section--action\">\n                <button type=\"button\" class=\"card-atc__button button button--primary js-card-atc__button\" id=\"card-atc__add-" + pr["id"] + "-" + UUIDcatc + "\" data-default-message=\"Add to Cart\" data-wait-message=\"Adding to cart\u2026\" data-added-message=\"Add to Cart\" value=\"Add to Cart\" data-card-add-to-cart=\"/cart.php?action=add&amp;product_id=" + pr["id"] + "\" data-event-type=\"product-click\">Add to Cart</button>\n                <span class=\"product-status-message aria-description--hidden\">Adding to cart\u2026 The item has been added</span>\n              </div>\n          </div>";
        }
        var template = "\n          <div id=\"product-" + pr["id"] + "\" sort-order=\"" + pr["sort_order"] + "\" \n          class=\"product\"\n          product-data-category=\"" + getAllCategory(category, pr["categories"]) + "\" \n          product-data-name=\"" + pr["fake-heading"] + "\" \n          product-data-review=\"" + (pr["reviews_count"] === 0 ? 0 : pr["reviews_rating_sum"] / pr["reviews_count"]) + "\"\n          product-review-count=\"" + pr["reviews_count"] + "\" \n          product-data-price=\"" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n          product-date-created=\"" + pr["date_created"] + "\" \n          product-is-featured=\"" + pr["is_featured"] + "\" \n          product-best-selling=\"" + pr["total_sold"] + "\"\n          product-custom-sort-order=\"" + pr["custom-sort-order"] + "\">\n              <div class=\"card-wrapper\">\n                  <article class=\"card\" data-test=\"card-" + pr["id"] + "\">\n                      <figure class=\"card-figure\">\n                          <div class=\"sale-flag-sash\" style=\"display: " + (pr["variants"][0].sale_price !== 0 ? "block;" : "none;") + " \"><span class=\"sale-text\">On Sale</span></div>\n                          <a href=\"" + pr["custom_url"]["url"] + "\" \n                          class=\"card-figure__link\" \n                          aria-label=\"" + pr["name"] + ", \n                          $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\">\n                              <div class=\" card-img-container\">\n                                  <img src=\"" + img["url_thumbnail"] + "\" \n                                  alt=\"img[\"description\"]\" title=\"" + pr["fake-heading"] + "\" \n                                  data-sizes=\"auto\" \n                                  srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  data-srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  class=\"card-image lazyautosizes lazyloaded\" sizes=\"248px\">\n                              </div>\n                          </a>\n                         <figcaption class=\"card-figcaption\">\n                              <div class=\"card-figcaption-body\"></div>\n                         </figcaption>\n                      </figure>\n                      <div class=\"card-body\">\n                          <p class=\"productView-type-title h4\" \n                          product-name=\"\">" + pr["fake-heading"] + "</p>\n                          <h3 class=\"card-title \">\n                              <a aria-label=\"" + pr["name"] + ", \n                                $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n                              href=\"" + pr["custom_url"]["url"] + "\">\n                              " + pr["name"] + "</a>\n                          </h3>\n                          <p class=\"card-text card-text--sku\">\n                              <span> SKU#: " + pr["sku"] + " </span>\n                          </p>\n                          <div class=\"card-text card-text--price\" data-test-info-type=\"price\">\n                              <div class=\"price-section price-section--withoutTax rrp-price--withoutTax h4\" style=\"display: block;\">\n                                  <span class=\"is-srOnly\"> MSRP: </span>\n                                  <span data-product-rrp-price-without-tax=\"\" class=\"price price--rrp h5\">\n                                    " + (pr["variants"][0].sale_price !== 0 ? "$" + pr["variants"][0].retail_price : "") + "\n                                  </span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax non-sale-price--withoutTax h5\" style=\"display: none;\">\n                                <span class=\"is-srOnly\"> Was: </span>\n                                <span data-product-non-sale-price-without-tax=\"\" class=\"price price--non-sale\"></span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax h4\">\n                                <span class=\"price-label is-srOnly\"></span>\n                                <span class=\"price-now-label is-srOnly\" style=\"display: none;\">Now:</span>\n                                <span data-product-price-without-tax=\"\" class=\"price price--withoutTax\">$" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "</span>\n                              </div>\n                          </div>\n                          <p class=\"card-text card-text--extra\" style=\"display: " + (pr["custom_fields"].find(function (field) {
          return field["name"] === "__card-extra-info";
        }) !== undefined ? "relative;" : "none;") + " \"> \n                          " + (pr["custom_fields"].find(function (field) {
          return field["name"] === "__card-extra-info";
        }) !== undefined ? pr["custom_fields"].find(function (field) {
          return field["name"] === "__card-extra-info";
        }).value : "") + "</p>\n                         <div class=\"card-action-wrapper\">\n                              " + actionSection + "\n                              <button type=\"button\" onclick=\"window.location.href=" + pr["custom_url"]["url"] + "\" \n                              class=\"button button--primary button--quickview\" >View Details</button>\n                         </div>\n                      </div>\n                  </article>\n              </div>\n          </div>";
        gridAllProducts.append(template);
      });
      body.configureIsotopeForAll();
      body.startGlobal();
    })["catch"](function (error) {
      console.log("error", error);
    });
    function getAllCategory(cat_list, pr_cat) {
      var cat = "";
      for (var i = 0; i < pr_cat.length; i++) {
        if (cat_list[pr_cat[i]] !== undefined) {
          cat = cat + cat_list[pr_cat[i]]["cat_id"].join(" ") + " ";
        }
      }
      return cat;
    }
  };
  _proto.startGlobal = function startGlobal() {
    Object(_custom_its_global__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
  };
  _proto.configureIsotopeForAll = function configureIsotopeForAll() {
    $(".grid").css("display", "grid");
    $(".lds-block").hide();
    var grid = document.getElementById("grid-all-product");
    var iso;
    var imgLoaded = true;
    var testImgInt = setInterval(function () {
      var cardImgs = document.querySelectorAll("#grid-all-product .card-image");
      if (cardImgs.length > 0) {
        for (var i = 0; i < cardImgs.length; i++) {
          var nonZero = true;
          if (cardImgs[i].offsetHeight < 100) {
            imgLoaded = false;
            nonZero = false;
            break;
          }
          if (nonZero) {
            imgLoaded = true;
          }
        }
      } else {
        imgLoaded = false;
      }
      if (imgLoaded) {
        clearInterval(testImgInt);
        // body.configureIsotopeForAll();
        // body.startGlobal();
        $(".lds-block").hide();
      }
    }, 0);
    setTimeout(function () {}, 0);
    $(window).load(function () {
      iso = new Isotope(grid, {
        // options...
        itemSelector: ".product",
        layoutMode: "fitRows",
        getSortData: {
          name: function name(itemElem) {
            return itemElem.getAttribute("product-data-name");
          },
          price: function price(itemElem) {
            return Number(itemElem.getAttribute("product-data-price"));
          },
          review: function review(itemElem) {
            return itemElem.getAttribute("product-data-review");
          },
          category: function category(itemElem) {
            return itemElem.getAttribute("product-data-category");
          },
          best_selling: function best_selling(itemElem) {
            return Number(itemElem.getAttribute("product-best-selling"));
          },
          newest: function newest(itemElem) {
            return itemElem.getAttribute("product-date-created");
          },
          custom_sort_order: function custom_sort_order(itemElem) {
            return Number(itemElem.getAttribute("product-custom-sort-order"));
          }
        }
      });
    });
    $("#all-sort-select, #all-sort-select-mobile").change(function () {
      var val = $(this).val().split("-");
      if (val[0] === "review") {
        iso.arrange({
          sortBy: [val[0], "rating_count"],
          sortAscending: {
            review: false,
            rating_count: false
          }
        });
      } else {
        iso.arrange({
          sortBy: val[0],
          sortAscending: val[1] === "asc"
        });
      }
    });
    var filter_arr = [];
    $("[checkbox-filter-all]").change(function () {
      var isfeatured = $("#featured-checkbox:checked").length > 0;
      if ($(this).attr("id") !== "featured-checkbox") {
        if (this.checked) {
          filter_arr.push($(this).attr("filter-value"));
        } else {
          var index = filter_arr.indexOf($(this).attr("filter-value"));
          if (index > -1) {
            // only splice array when item is found
            filter_arr.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
      }

      if (filter_arr.length > 0) {
        iso.arrange({
          // item element provided as argument
          filter: function filter(itemElem) {
            var val = itemElem.getAttribute("product-data-category");
            for (var i = 0; i < filter_arr.length; i++) {
              if (val.includes(filter_arr[i])) {
                if (isfeatured) {
                  return itemElem.getAttribute("product-is-featured") === "true";
                } else {
                  return true;
                }
              }
            }
            return false;
          }
        });
      } else if (isfeatured) {
        iso.arrange({
          filter: function filter(itemElem) {
            return itemElem.getAttribute("product-is-featured") === "true";
          }
        });
      } else {
        iso.arrange({
          filter: "*"
        });
      }
    });
    if (this.context.subcategories.length === 0) {
      iso.arrange({
        sortBy: "custom_sort_order",
        sortAscending: true
      });
    } else {
      iso.arrange({
        sortBy: "best_selling",
        sortAscending: false
      });
    }
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/custom/its-category.js":
/*!************************************************!*\
  !*** ./assets/js/theme/custom/its-category.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSCategory; });
var ITSCategory = /*#__PURE__*/function () {
  function ITSCategory(context) {
    this.context = context;
  }
  var _proto = ITSCategory.prototype;
  _proto.afterFacetUpdate = function afterFacetUpdate() {};
  return ITSCategory;
}();


/***/ }),

/***/ "./assets/js/theme/custom/toggle-category-listing-view.js":
/*!****************************************************************!*\
  !*** ./assets/js/theme/custom/toggle-category-listing-view.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToggleCategoryListingView; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");


var ToggleCategoryListingView = /*#__PURE__*/function () {
  function ToggleCategoryListingView(context) {
    var _this = this;
    this.context = context;
    this.defaultViewType = this.context.defaultViewType;
    this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
    this.productsPerPage = this.context.categoryProductsPerPage;
    this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');
    $('body').on('facetedSearchRefresh', function () {
      _this.addToggleEvents();
    });
    this.init();
  }
  var _proto = ToggleCategoryListingView.prototype;
  _proto.getStoredViewType = function getStoredViewType() {
    return sessionStorage.getItem('category-view-type') || null;
  };
  _proto.getRequestTemplateType = function getRequestTemplateType(type) {
    var pageType = this.getStoredViewType();
    return !pageType ? type + "/product-listing" : "custom/category-" + pageType + "-view";
  };
  _proto.storeViewType = function storeViewType(type) {
    sessionStorage.setItem('category-view-type', type);
  };
  _proto.getCategoryPage = function getCategoryPage(pageType) {
    var _this2 = this;
    var config = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: this.productsPerPage
          }
        }
      },
      template: "custom/category-" + pageType + "-view"
    };
    this.loadingOverlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["api"].getPage(_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getUrl(), config, function (err, content) {
      if (err) {
        throw new Error(err);
      }
      $('#product-listing-container').html(content);
      _this2.loadingOverlay.hide();
      _this2.storeViewType(pageType);
      _this2.addToggleEvents();
      $('body').triggerHandler('productViewModeChanged');
    });
  };
  _proto.addToggleEvents = function addToggleEvents() {
    var _this3 = this;
    $('.js-category__toggle-view').on('click', function (e) {
      var type = $(e.currentTarget).data('view-type');
      if ($(e.currentTarget).hasClass('active-category-view')) return;
      _this3.getCategoryPage(type, _this3.addToggleEvents);
    });
  };
  _proto.init = function init() {
    var storedViewType = this.getStoredViewType();
    if (storedViewType === this.defaultViewType || !storedViewType) {
      return this.addToggleEvents();
    }
    this.getCategoryPage(this.oppositeViewType);
  };
  return ToggleCategoryListingView;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiSVRTQ2F0ZWdvcnkiLCJ0b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJwb3B1bGF0ZUdyaWRQcm9kdWN0IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJnZXRSZXF1ZXN0VGVtcGxhdGVUeXBlIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImFmdGVyRmFjZXRVcGRhdGUiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIk5ld09wdHMiLCJ1cGRhdGVSZXF1ZXN0T3B0aW9ucyIsImJvZHkiLCJVVUlEY2F0YyIsImNhdGVnb3J5SWQiLCJheGlvcyIsImdldCIsInBhcmFtcyIsImlkIiwidGhlbiIsInJlc3BvbnNlIiwiZ3JpZEFsbFByb2R1Y3RzIiwiZGF0YSIsInByb2R1Y3QiLCJmb3JFYWNoIiwicHIiLCJpbWciLCJpIiwiYWN0aW9uU2VjdGlvbiIsImdldEFsbENhdGVnb3J5IiwidG9GaXhlZCIsInNhbGVfcHJpY2UiLCJyZXRhaWxfcHJpY2UiLCJmaW5kIiwiZmllbGQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImFwcGVuZCIsImNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwiLCJzdGFydEdsb2JhbCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImNhdF9saXN0IiwicHJfY2F0IiwiY2F0Iiwiam9pbiIsImN1c3RvbUdsb2JhbCIsImNzcyIsImhpZGUiLCJncmlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlzbyIsImltZ0xvYWRlZCIsInRlc3RJbWdJbnQiLCJzZXRJbnRlcnZhbCIsImNhcmRJbWdzIiwicXVlcnlTZWxlY3RvckFsbCIsIm5vblplcm8iLCJvZmZzZXRIZWlnaHQiLCJjbGVhckludGVydmFsIiwic2V0VGltZW91dCIsIndpbmRvdyIsImxvYWQiLCJJc290b3BlIiwiaXRlbVNlbGVjdG9yIiwibGF5b3V0TW9kZSIsImdldFNvcnREYXRhIiwibmFtZSIsIml0ZW1FbGVtIiwiZ2V0QXR0cmlidXRlIiwicHJpY2UiLCJOdW1iZXIiLCJyZXZpZXciLCJiZXN0X3NlbGxpbmciLCJuZXdlc3QiLCJjdXN0b21fc29ydF9vcmRlciIsImNoYW5nZSIsInZhbCIsInNwbGl0IiwiYXJyYW5nZSIsInNvcnRCeSIsInNvcnRBc2NlbmRpbmciLCJyYXRpbmdfY291bnQiLCJmaWx0ZXJfYXJyIiwiaXNmZWF0dXJlZCIsImNoZWNrZWQiLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJzdWJjYXRlZ29yaWVzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0Vmlld1R5cGUiLCJvcHBvc2l0ZVZpZXdUeXBlIiwibG9hZGluZ092ZXJsYXkiLCJhZGRUb2dnbGVFdmVudHMiLCJpbml0IiwiZ2V0U3RvcmVkVmlld1R5cGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0eXBlIiwicGFnZVR5cGUiLCJzdG9yZVZpZXdUeXBlIiwic2V0SXRlbSIsImdldENhdGVnb3J5UGFnZSIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwidXJsVXRpbHMiLCJnZXRVcmwiLCJlcnIiLCJFcnJvciIsInN0b3JlZFZpZXdUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN2QztBQUM4QjtBQUMvQjtBQUFBLElBRTFCQSxRQUFRO0VBQUE7RUFDM0Isa0JBQVlDLE9BQU8sRUFBRTtJQUFBO0lBQ25CLGdDQUFNQSxPQUFPLENBQUM7SUFDZCxNQUFLQyxvQkFBb0IsR0FBR0MsMEdBQTJCLENBQUNGLE9BQU8sQ0FBQzs7SUFFaEU7QUFDSjtBQUNBO0lBQ0ksTUFBS0csV0FBVyxHQUFHLElBQUlBLDREQUFXLENBQUNILE9BQU8sQ0FBQztJQUMzQyxNQUFLSSx5QkFBeUIsR0FBRyxJQUFJQyw0RUFBeUIsQ0FBQ0wsT0FBTyxDQUFDO0lBQUM7RUFDMUU7RUFBQztFQUFBLE9BRURNLHVCQUF1QixHQUF2QixpQ0FBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDMURGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1pDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDZixDQUFDLENBQUM7RUFDSixDQUFDO0VBQUEsT0FFREcsK0JBQStCLEdBQS9CLDJDQUFrQztJQUFBO0lBQ2hDLElBQUksQ0FBQ0MsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNDLE1BQU0sRUFBRTtJQUV2QyxJQUFJRCxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0UsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO01BQzlDRixDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ0csS0FBSyxFQUFFO0lBQ3pDO0lBRUFILENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFO01BQUEsT0FDaEMsTUFBSSxDQUFDWCx1QkFBdUIsQ0FDMUJPLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUM5QixRQUFRLEVBQ1IsV0FBVyxDQUNaO0lBQUEsRUFDRjtFQUNILENBQUM7RUFBQSxPQUVESyxPQUFPLEdBQVAsbUJBQVU7SUFBQTtJQUNSLElBQUksQ0FBQ0MsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRTtJQUUzQlAsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ0ksQ0FBQztNQUFBLE9BQy9DLE1BQUksQ0FBQ2YsdUJBQXVCLENBQzFCTyxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUNDLElBQUksRUFBRSxFQUN6QixRQUFRLEVBQ1IsUUFBUSxDQUNUO0lBQUEsRUFDRjtJQUVELElBQUksQ0FBQ1gsK0JBQStCLEVBQUU7SUFFdENZLHdFQUFlLENBQUMsSUFBSSxDQUFDeEIsT0FBTyxDQUFDO0lBRTdCLElBQUlhLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2xDLElBQUksQ0FBQ1csaUJBQWlCLEVBQUU7SUFDMUIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQyxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDcERDLGdFQUFLLENBQUNYLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNTLGNBQWMsQ0FBQztJQUNuRDtJQUVBYixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7TUFBQSxPQUMzQixNQUFJLENBQUNZLHdCQUF3QixDQUFDaEIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztJQUFBLEVBQzNFO0lBRUQsSUFBSSxDQUFDaUIsb0JBQW9CLEVBQUU7RUFDN0IsQ0FBQztFQUFBLE9BRURBLG9CQUFvQixHQUFwQixnQ0FBdUI7SUFDckIsSUFBTUMsa0JBQWtCLEdBQUdsQixDQUFDLENBQUMsaUNBQWlDLENBQUM7SUFDL0QsSUFBSWtCLGtCQUFrQixDQUFDakIsTUFBTSxFQUFFO01BQzdCaUIsa0JBQWtCLENBQUNmLEtBQUssRUFBRTtJQUM1QjtFQUNGLENBQUM7RUFBQSxPQUVEUyxpQkFBaUIsR0FBakIsNkJBQW9CO0lBQUE7SUFDbEIsNEJBTUksSUFBSSxDQUFDeEIsb0JBQW9CO01BTEwrQixlQUFlLHlCQUFyQ0Msb0JBQW9CO01BQ0VDLGVBQWUseUJBQXJDQyxvQkFBb0I7TUFDR0Msa0JBQWtCLHlCQUF6Q0MscUJBQXFCO01BQ0VDLGtCQUFrQix5QkFBekNDLHFCQUFxQjtNQUNBQyxjQUFjLHlCQUFuQ0MsbUJBQW1CO0lBRXJCLElBQU1DLHdCQUF3QixHQUFHN0IsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO0lBQ2hFLElBQU04Qix1QkFBdUIsR0FBRzlCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUM5RCxJQUFNK0IsZUFBZSxHQUFHLElBQUksQ0FBQzVDLE9BQU8sQ0FBQzZDLHVCQUF1QjtJQUM1RCxJQUFNQyxjQUFjLEdBQUc7TUFDckJDLE1BQU0sRUFBRTtRQUNOQyxRQUFRLEVBQUU7VUFDUkMsYUFBYSxFQUFFLElBQUk7VUFDbkJDLFFBQVEsRUFBRTtZQUNSQyxLQUFLLEVBQUVQO1VBQ1Q7UUFDRjtNQUNGLENBQUM7TUFDRFEsUUFBUSxFQUFFO1FBQ1JDLGNBQWMsRUFDWixJQUFJLENBQUNqRCx5QkFBeUIsQ0FBQ2tELHNCQUFzQixDQUFDLFVBQVUsQ0FBQztRQUNuRUMsT0FBTyxFQUFFO01BQ1gsQ0FBQztNQUNEQyxRQUFRLEVBQUU7SUFDWixDQUFDO0lBRUQsSUFBSSxDQUFDQyxhQUFhLEdBQUcsSUFBSUMsOERBQWEsQ0FDcENaLGNBQWMsRUFDZCxVQUFDYSxPQUFPLEVBQUs7TUFDWGpCLHdCQUF3QixDQUFDa0IsSUFBSSxDQUFDRCxPQUFPLENBQUNOLGNBQWMsQ0FBQztNQUNyRFYsdUJBQXVCLENBQUNpQixJQUFJLENBQUNELE9BQU8sQ0FBQ0osT0FBTyxDQUFDO01BRTdDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDZ0QsY0FBYyxDQUFDLGNBQWMsQ0FBQztNQUV4Q2hELENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQ2lELE9BQU8sQ0FDckI7UUFDRUMsU0FBUyxFQUFFO01BQ2IsQ0FBQyxFQUNELEdBQUcsQ0FDSjs7TUFFRDtBQUNSO0FBQ0E7TUFDUSxNQUFJLENBQUM1RCxXQUFXLENBQUM2RCxnQkFBZ0IsRUFBRTtJQUNyQyxDQUFDLEVBQ0Q7TUFDRUMsdUJBQXVCLEVBQUU7UUFDdkJqQyxlQUFlLEVBQWZBLGVBQWU7UUFDZkUsZUFBZSxFQUFmQSxlQUFlO1FBQ2ZFLGtCQUFrQixFQUFsQkEsa0JBQWtCO1FBQ2xCRSxrQkFBa0IsRUFBbEJBLGtCQUFrQjtRQUNsQkUsY0FBYyxFQUFkQTtNQUNGO0lBQ0YsQ0FBQyxDQUNGO0lBRUQzQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNJLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxZQUFNO01BQzNDLElBQU1pRCxPQUFPLEdBQUc7UUFDZG5CLE1BQU0sRUFBRTtVQUNOQyxRQUFRLEVBQUU7WUFDUkMsYUFBYSxFQUFFLElBQUk7WUFDbkJDLFFBQVEsRUFBRTtjQUNSQyxLQUFLLEVBQUVQO1lBQ1Q7VUFDRjtRQUNGLENBQUM7UUFDRFEsUUFBUSxFQUFFO1VBQ1JDLGNBQWMsRUFDWixNQUFJLENBQUNqRCx5QkFBeUIsQ0FBQ2tELHNCQUFzQixDQUFDLFVBQVUsQ0FBQztVQUNuRUMsT0FBTyxFQUFFO1FBQ1gsQ0FBQztRQUNEQyxRQUFRLEVBQUU7TUFDWixDQUFDO01BRUQsTUFBSSxDQUFDQyxhQUFhLENBQUNVLG9CQUFvQixDQUFDRCxPQUFPLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0VBQ0o7O0VBRUE7RUFBQTtFQUFBLE9BQ0EvQyxtQkFBbUIsR0FBbkIsK0JBQXNCO0lBQ3BCLElBQU1pRCxJQUFJLEdBQUcsSUFBSTtJQUNqQixJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDckUsT0FBTyxDQUFDcUUsUUFBUTtJQUN0QyxJQUFNQyxVQUFVLEdBQUcsSUFBSSxDQUFDdEUsT0FBTyxDQUFDc0UsVUFBVTtJQUMxQ0MsS0FBSyxDQUNGQyxHQUFHLENBQUMscURBQXFELEVBQUU7TUFDMURDLE1BQU0sRUFBRTtRQUFFQyxFQUFFLEVBQUVKO01BQVc7SUFDM0IsQ0FBQyxDQUFDLENBQ0RLLElBQUksQ0FBQyxVQUFVQyxRQUFRLEVBQUU7TUFDeEIsSUFBTUMsZUFBZSxHQUFHaEUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO01BQzlDLElBQU1pRSxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQyxPQUFPO01BQ2xDLElBQU0vQixRQUFRLEdBQUc0QixRQUFRLENBQUNFLElBQUksQ0FBQzlCLFFBQVE7TUFFdkM4QixJQUFJLENBQUNFLE9BQU8sQ0FBQyxVQUFDQyxFQUFFLEVBQUs7UUFDbkIsSUFBSUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUNuRSxNQUFNLEVBQUVxRSxDQUFDLEVBQUUsRUFBRTtVQUM1QyxJQUFJRixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUNFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ25DRCxHQUFHLEdBQUdELEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQ0UsQ0FBQyxDQUFDO1lBQ3JCO1VBQ0Y7UUFDRjtRQUVBLElBQUlDLGFBQWEsR0FBRyxFQUFFO1FBQ3RCLElBQUlILEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ25FLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDN0JzRSxhQUFhLCtHQUF3R0gsRUFBRSxDQUFDLElBQUksQ0FBQyw2QkFBeUI7UUFDeEosQ0FBQyxNQUFNO1VBQ0xHLGFBQWEsK0tBR21CSCxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlaLFFBQVEsK1RBRzhFWSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlaLFFBQVEsOEJBQXVCWSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlaLFFBQVEsd3pDQXNCL0VZLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBSVosUUFBUSxnTkFBNExZLEVBQUUsQ0FBQyxJQUFJLENBQUMsMk9BR3JVO1FBQ1A7UUFFQSxJQUFNN0IsUUFBUSxzQ0FDSzZCLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQWlCQSxFQUFFLENBQUMsWUFBWSxDQUFDLDRFQUVuQ0ksY0FBYyxDQUFDckMsUUFBUSxFQUFFaUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLDJDQUM5Q0EsRUFBRSxDQUFDLGNBQWMsQ0FBQyw4Q0FFckNBLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQ3JCLENBQUMsR0FDREEsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUdBLEVBQUUsQ0FBQyxlQUFlLENBQUMsOENBRTVCQSxFQUFFLENBQUMsZUFBZSxDQUFDLDZDQUV6Q0EsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDbkUsTUFBTSxHQUFHLENBQUMsR0FDckJtRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUNoREwsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDLENBQUMsK0NBRWZMLEVBQUUsQ0FBQyxjQUFjLENBQUMsNkNBQ25CQSxFQUFFLENBQUMsYUFBYSxDQUFDLDhDQUNoQkEsRUFBRSxDQUFDLFlBQVksQ0FBQyxrREFDWEEsRUFBRSxDQUFDLG1CQUFtQixDQUFDLG9IQUVKQSxFQUFFLENBQUMsSUFBSSxDQUFDLDZJQUd0Q0EsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDTSxVQUFVLEtBQUssQ0FBQyxHQUM5QixRQUFRLEdBQ1IsT0FBTyxpR0FFRk4sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyw0R0FFcEJBLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0NBRXRCQSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUNuRSxNQUFNLEdBQUcsQ0FBQyxHQUNyQm1FLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQ2hETCxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUMsQ0FBQyw4SEFHbkJKLEdBQUcsQ0FBQyxlQUFlLENBQUMsb0ZBRTlCRCxFQUFFLENBQUMsY0FBYyxDQUFDLGdIQUdWQyxHQUFHLENBQUMsY0FBYyxDQUFDLGtEQUMzQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsb0RBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG9EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtRUFDTkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrREFDaENBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG9EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxvREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsK2lCQVVYRCxFQUFFLENBQUMsY0FBYyxDQUFDLGtIQUVmQSxFQUFFLENBQUMsTUFBTSxDQUFDLDhDQUV2QkEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDbkUsTUFBTSxHQUFHLENBQUMsR0FDckJtRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2Ysa0JBQWtCLENBQ25CLENBQUNLLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FDWkwsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUNLLE9BQU8sQ0FBQyxDQUFDLENBQUMsbURBRWpDTCxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLDJDQUM3QkEsRUFBRSxDQUFDLE1BQU0sQ0FBQyw0SkFHR0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxpZ0JBT2hCQSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLFVBQVUsS0FBSyxDQUFDLEdBQzlCLEdBQUcsR0FBR04sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDTyxZQUFZLEdBQ3BDLEVBQUUsNDFCQVlWUCxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUNuRSxNQUFNLEdBQUcsQ0FBQyxHQUNyQm1FLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDZixrQkFBa0IsQ0FDbkIsQ0FBQ0ssT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUNaTCxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ssT0FBTyxDQUFDLENBQUMsQ0FBQyw4S0FLM0NMLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQ1EsSUFBSSxDQUN0QixVQUFDQyxLQUFLO1VBQUEsT0FBS0EsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLG1CQUFtQjtRQUFBLEVBQ2pELEtBQUtDLFNBQVMsR0FDWCxXQUFXLEdBQ1gsT0FBTywyQ0FHWFYsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDUSxJQUFJLENBQ3RCLFVBQUNDLEtBQUs7VUFBQSxPQUFLQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssbUJBQW1CO1FBQUEsRUFDakQsS0FBS0MsU0FBUyxHQUNYVixFQUFFLENBQUMsZUFBZSxDQUFDLENBQUNRLElBQUksQ0FDdEIsVUFBQ0MsS0FBSztVQUFBLE9BQ0pBLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxtQkFBbUI7UUFBQSxFQUN4QyxDQUFDRSxLQUFLLEdBQ1AsRUFBRSwyR0FHRlIsYUFBYSwrRkFFYkgsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxzUEFPdEM7UUFFUEosZUFBZSxDQUFDZ0IsTUFBTSxDQUFDekMsUUFBUSxDQUFDO01BQ2xDLENBQUMsQ0FBQztNQUVGZ0IsSUFBSSxDQUFDMEIsc0JBQXNCLEVBQUU7TUFDN0IxQixJQUFJLENBQUMyQixXQUFXLEVBQUU7SUFDcEIsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVQyxLQUFLLEVBQUU7TUFDdEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sRUFBRUYsS0FBSyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVKLFNBQVNYLGNBQWMsQ0FBQ2MsUUFBUSxFQUFFQyxNQUFNLEVBQUU7TUFDeEMsSUFBSUMsR0FBRyxHQUFHLEVBQUU7TUFDWixLQUFLLElBQUlsQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdpQixNQUFNLENBQUN0RixNQUFNLEVBQUVxRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJZ0IsUUFBUSxDQUFDQyxNQUFNLENBQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLUSxTQUFTLEVBQUU7VUFDckNVLEdBQUcsR0FBR0EsR0FBRyxHQUFHRixRQUFRLENBQUNDLE1BQU0sQ0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUNtQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUMzRDtNQUNGO01BQ0EsT0FBT0QsR0FBRztJQUNaO0VBQ0YsQ0FBQztFQUFBLE9BRUROLFdBQVcsR0FBWCx1QkFBYztJQUNaUSxrRUFBWSxDQUFDLElBQUksQ0FBQ3ZHLE9BQU8sQ0FBQztFQUM1QixDQUFDO0VBQUEsT0FFRDhGLHNCQUFzQixHQUF0QixrQ0FBeUI7SUFDdkJqRixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMyRixHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztJQUNqQzNGLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzRGLElBQUksRUFBRTtJQUN0QixJQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGtCQUFrQixDQUFDO0lBQ3RELElBQUlDLEdBQUc7SUFFUCxJQUFJQyxTQUFTLEdBQUcsSUFBSTtJQUVwQixJQUFJQyxVQUFVLEdBQUdDLFdBQVcsQ0FBQyxZQUFNO01BQ2pDLElBQUlDLFFBQVEsR0FBR04sUUFBUSxDQUFDTyxnQkFBZ0IsQ0FBQywrQkFBK0IsQ0FBQztNQUN6RSxJQUFJRCxRQUFRLENBQUNuRyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLEtBQUssSUFBSXFFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzhCLFFBQVEsQ0FBQ25HLE1BQU0sRUFBRXFFLENBQUMsRUFBRSxFQUFFO1VBQ3hDLElBQUlnQyxPQUFPLEdBQUcsSUFBSTtVQUNsQixJQUFJRixRQUFRLENBQUM5QixDQUFDLENBQUMsQ0FBQ2lDLFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDbENOLFNBQVMsR0FBRyxLQUFLO1lBQ2pCSyxPQUFPLEdBQUcsS0FBSztZQUNmO1VBQ0Y7VUFDQSxJQUFJQSxPQUFPLEVBQUU7WUFDWEwsU0FBUyxHQUFHLElBQUk7VUFDbEI7UUFDRjtNQUNGLENBQUMsTUFBTTtRQUNMQSxTQUFTLEdBQUcsS0FBSztNQUNuQjtNQUVBLElBQUlBLFNBQVMsRUFBRTtRQUNiTyxhQUFhLENBQUNOLFVBQVUsQ0FBQztRQUN6QjtRQUNBO1FBQ0FsRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM0RixJQUFJLEVBQUU7TUFDeEI7SUFDRixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRUxhLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU3QnpHLENBQUMsQ0FBQzBHLE1BQU0sQ0FBQyxDQUFDQyxJQUFJLENBQUMsWUFBWTtNQUN6QlgsR0FBRyxHQUFHLElBQUlZLE9BQU8sQ0FBQ2YsSUFBSSxFQUFFO1FBQ3RCO1FBQ0FnQixZQUFZLEVBQUUsVUFBVTtRQUN4QkMsVUFBVSxFQUFFLFNBQVM7UUFDckJDLFdBQVcsRUFBRTtVQUNYQyxJQUFJLEVBQUUsY0FBVUMsUUFBUSxFQUFFO1lBQ3hCLE9BQU9BLFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1VBQ25ELENBQUM7VUFDREMsS0FBSyxFQUFFLGVBQVVGLFFBQVEsRUFBRTtZQUN6QixPQUFPRyxNQUFNLENBQUNILFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7VUFDNUQsQ0FBQztVQUNERyxNQUFNLEVBQUUsZ0JBQVVKLFFBQVEsRUFBRTtZQUMxQixPQUFPQSxRQUFRLENBQUNDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztVQUNyRCxDQUFDO1VBQ0QvRSxRQUFRLEVBQUUsa0JBQVU4RSxRQUFRLEVBQUU7WUFDNUIsT0FBT0EsUUFBUSxDQUFDQyxZQUFZLENBQUMsdUJBQXVCLENBQUM7VUFDdkQsQ0FBQztVQUNESSxZQUFZLEVBQUUsc0JBQVVMLFFBQVEsRUFBRTtZQUNoQyxPQUFPRyxNQUFNLENBQUNILFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7VUFDOUQsQ0FBQztVQUNESyxNQUFNLEVBQUUsZ0JBQVVOLFFBQVEsRUFBRTtZQUMxQixPQUFPQSxRQUFRLENBQUNDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztVQUN0RCxDQUFDO1VBQ0RNLGlCQUFpQixFQUFFLDJCQUFVUCxRQUFRLEVBQUU7WUFDckMsT0FBT0csTUFBTSxDQUFDSCxRQUFRLENBQUNDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1VBQ25FO1FBQ0Y7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRmxILENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDeUgsTUFBTSxDQUFDLFlBQVk7TUFDaEUsSUFBTUMsR0FBRyxHQUFHMUgsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDMEgsR0FBRyxFQUFFLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFFcEMsSUFBSUQsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QjFCLEdBQUcsQ0FBQzRCLE9BQU8sQ0FBQztVQUNWQyxNQUFNLEVBQUUsQ0FBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQztVQUNoQ0ksYUFBYSxFQUFFO1lBQ2JULE1BQU0sRUFBRSxLQUFLO1lBQ2JVLFlBQVksRUFBRTtVQUNoQjtRQUNGLENBQUMsQ0FBQztNQUNKLENBQUMsTUFBTTtRQUNML0IsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1VBQ1ZDLE1BQU0sRUFBRUgsR0FBRyxDQUFDLENBQUMsQ0FBQztVQUNkSSxhQUFhLEVBQUVKLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSztRQUM1QixDQUFDLENBQUM7TUFDSjtJQUNGLENBQUMsQ0FBQztJQUVGLElBQU1NLFVBQVUsR0FBRyxFQUFFO0lBRXJCaEksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUN5SCxNQUFNLENBQUMsWUFBWTtNQUM1QyxJQUFNUSxVQUFVLEdBQUdqSSxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUM7TUFDN0QsSUFBSUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssbUJBQW1CLEVBQUU7UUFDOUMsSUFBSSxJQUFJLENBQUNxSSxPQUFPLEVBQUU7VUFDaEJGLFVBQVUsQ0FBQ0csSUFBSSxDQUFDbkksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxNQUFNO1VBQ0wsSUFBTXVJLEtBQUssR0FBR0osVUFBVSxDQUFDSyxPQUFPLENBQUNySSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNILElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztVQUM5RCxJQUFJdUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2Q7WUFDQUosVUFBVSxDQUFDTSxNQUFNLENBQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQy9CO1FBQ0Y7TUFDRjs7TUFFQSxJQUFJSixVQUFVLENBQUMvSCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCK0YsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1VBQ1Y7VUFDQVcsTUFBTSxFQUFFLGdCQUFVdEIsUUFBUSxFQUFFO1lBQzFCLElBQU1TLEdBQUcsR0FBR1QsUUFBUSxDQUFDQyxZQUFZLENBQUMsdUJBQXVCLENBQUM7WUFDMUQsS0FBSyxJQUFJNUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMEQsVUFBVSxDQUFDL0gsTUFBTSxFQUFFcUUsQ0FBQyxFQUFFLEVBQUU7Y0FDMUMsSUFBSW9ELEdBQUcsQ0FBQ2MsUUFBUSxDQUFDUixVQUFVLENBQUMxRCxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixJQUFJMkQsVUFBVSxFQUFFO2tCQUNkLE9BQ0VoQixRQUFRLENBQUNDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLE1BQU07Z0JBRTNELENBQUMsTUFBTTtrQkFDTCxPQUFPLElBQUk7Z0JBQ2I7Y0FDRjtZQUNGO1lBRUEsT0FBTyxLQUFLO1VBQ2Q7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDLE1BQU0sSUFBSWUsVUFBVSxFQUFFO1FBQ3JCakMsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1VBQ1ZXLE1BQU0sRUFBRSxnQkFBVXRCLFFBQVEsRUFBRTtZQUMxQixPQUFPQSxRQUFRLENBQUNDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLE1BQU07VUFDaEU7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDLE1BQU07UUFDTGxCLEdBQUcsQ0FBQzRCLE9BQU8sQ0FBQztVQUFFVyxNQUFNLEVBQUU7UUFBSSxDQUFDLENBQUM7TUFDOUI7SUFDRixDQUFDLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQ3BKLE9BQU8sQ0FBQ3NKLGFBQWEsQ0FBQ3hJLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDM0MrRixHQUFHLENBQUM0QixPQUFPLENBQUM7UUFDVkMsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQkMsYUFBYSxFQUFFO01BQ2pCLENBQUMsQ0FBQztJQUNKLENBQUMsTUFBTTtNQUNMOUIsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1FBQ1ZDLE1BQU0sRUFBRSxjQUFjO1FBQ3RCQyxhQUFhLEVBQUU7TUFDakIsQ0FBQyxDQUFDO0lBQ0o7RUFDRixDQUFDO0VBQUE7QUFBQSxFQTFnQm1DWSxnREFBVzs7Ozs7Ozs7Ozs7Ozs7QUNUakQ7QUFBQTtBQUFBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0IsQ0FBSUMsVUFBVTtFQUFBLE9BQUssQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ0YsVUFBVSxDQUFDRixZQUFZLENBQUMsQ0FBQyxDQUFDMUksTUFBTTtBQUFBO0FBQ3RHLElBQU0rSSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCLEdBQThCO0VBQ3RELEtBQUssSUFBSTFFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxVQUFtQnJFLE1BQU0sRUFBRXFFLENBQUMsRUFBRSxFQUFFO0lBQ2hELElBQU11RSxVQUFVLEdBQUdJLElBQUksQ0FBQ0MsS0FBSyxDQUFvQjVFLENBQUMsNEJBQURBLENBQUMseUJBQURBLENBQUMsRUFBRTtJQUNwRCxJQUFJc0UsK0JBQStCLENBQUNDLFVBQVUsQ0FBQyxFQUFFO01BQzdDLE9BQU9BLFVBQVU7SUFDckI7RUFDSjtBQUNKLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTXhKLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkIsQ0FBSUYsT0FBTyxFQUFLO0VBQ3BELElBQVFnSyx3QkFBd0IsR0FBd0VoSyxPQUFPLENBQXZHZ0ssd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQ2pLLE9BQU8sQ0FBN0VpSyxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUtsSyxPQUFPLENBQTNDa0ssK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHTixzQkFBc0IsQ0FBQ0csd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdULE1BQU0sQ0FBQ1UsTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ1gsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWMsZUFBZSxHQUFHWCxNQUFNLENBQUNDLElBQUksQ0FBQ08sZ0JBQWdCLENBQUNYLFlBQVksQ0FBQyxDQUFDLENBQUNlLEdBQUcsQ0FBQyxVQUFBQyxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDaEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDaUMsR0FBRyxFQUFFO0VBQUEsRUFBQztFQUVwRyxPQUFPSCxlQUFlLENBQUNJLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVILEdBQUcsRUFBRXJGLENBQUMsRUFBSztJQUMzQ3dGLEdBQUcsQ0FBQ0gsR0FBRyxDQUFDLEdBQUdKLGFBQWEsQ0FBQ2pGLENBQUMsQ0FBQztJQUMzQixPQUFPd0YsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7SUMzQm9CeEssV0FBVztFQUM1QixxQkFBWUgsT0FBTyxFQUFFO0lBQ2pCLElBQUksQ0FBQ0EsT0FBTyxHQUFHQSxPQUFPO0VBQzFCO0VBQUM7RUFBQSxPQUVEZ0UsZ0JBQWdCLEdBQWhCLDRCQUFtQixDQUVuQixDQUFDO0VBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ1BMO0FBQUE7QUFBQTtBQUFBO0FBQWlEO0FBQ0E7QUFBQSxJQUU1QjNELHlCQUF5QjtFQUMxQyxtQ0FBWUwsT0FBTyxFQUFFO0lBQUE7SUFDakIsSUFBSSxDQUFDQSxPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDNEssZUFBZSxHQUFHLElBQUksQ0FBQzVLLE9BQU8sQ0FBQzRLLGVBQWU7SUFDbkQsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUNELGVBQWUsS0FBSyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU07SUFDekUsSUFBSSxDQUFDaEksZUFBZSxHQUFHLElBQUksQ0FBQzVDLE9BQU8sQ0FBQzZDLHVCQUF1QjtJQUMzRCxJQUFJLENBQUNpSSxjQUFjLEdBQUdqSyxDQUFDLENBQUMsaURBQWlELENBQUM7SUFFMUVBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLHNCQUFzQixFQUFFLFlBQU07TUFDdkMsS0FBSSxDQUFDOEosZUFBZSxFQUFFO0lBQzFCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0MsSUFBSSxFQUFFO0VBQ2Y7RUFBQztFQUFBLE9BRURDLGlCQUFpQixHQUFqQiw2QkFBb0I7SUFDaEIsT0FBT0MsY0FBYyxDQUFDQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJO0VBQy9ELENBQUM7RUFBQSxPQUVEN0gsc0JBQXNCLEdBQXRCLGdDQUF1QjhILElBQUksRUFBRTtJQUN6QixJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDSixpQkFBaUIsRUFBRTtJQUN6QyxPQUFPLENBQUNJLFFBQVEsR0FBTUQsSUFBSSw2Q0FBd0NDLFFBQVEsVUFBTztFQUNyRixDQUFDO0VBQUEsT0FFREMsYUFBYSxHQUFiLHVCQUFjRixJQUFJLEVBQUU7SUFDaEJGLGNBQWMsQ0FBQ0ssT0FBTyxDQUFDLG9CQUFvQixFQUFFSCxJQUFJLENBQUM7RUFDdEQsQ0FBQztFQUFBLE9BRURJLGVBQWUsR0FBZix5QkFBZ0JILFFBQVEsRUFBRTtJQUFBO0lBQ3RCLElBQU10SSxNQUFNLEdBQUc7TUFDWEEsTUFBTSxFQUFFO1FBQ0pDLFFBQVEsRUFBRTtVQUNOQyxhQUFhLEVBQUUsSUFBSTtVQUNuQkMsUUFBUSxFQUFFO1lBQ05DLEtBQUssRUFBRSxJQUFJLENBQUNQO1VBQ2hCO1FBQ0o7TUFDSixDQUFDO01BQ0RRLFFBQVEsdUJBQXFCaUksUUFBUTtJQUN6QyxDQUFDO0lBRUQsSUFBSSxDQUFDUCxjQUFjLENBQUNXLElBQUksRUFBRTtJQUUxQkMsOERBQUcsQ0FBQ0MsT0FBTyxDQUFDQywrREFBUSxDQUFDQyxNQUFNLEVBQUUsRUFBRTlJLE1BQU0sRUFBRSxVQUFDK0ksR0FBRyxFQUFFbkksT0FBTyxFQUFLO01BQ3JELElBQUltSSxHQUFHLEVBQUU7UUFDTCxNQUFNLElBQUlDLEtBQUssQ0FBQ0QsR0FBRyxDQUFDO01BQ3hCO01BRUFqTCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQytDLElBQUksQ0FBQ0QsT0FBTyxDQUFDO01BRTdDLE1BQUksQ0FBQ21ILGNBQWMsQ0FBQ3JFLElBQUksRUFBRTtNQUUxQixNQUFJLENBQUM2RSxhQUFhLENBQUNELFFBQVEsQ0FBQztNQUU1QixNQUFJLENBQUNOLGVBQWUsRUFBRTtNQUV0QmxLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ2dELGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztJQUN0RCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRGtILGVBQWUsR0FBZiwyQkFBa0I7SUFBQTtJQUNkbEssQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ0ksQ0FBQyxFQUFLO01BQzlDLElBQU0rSixJQUFJLEdBQUd2SyxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUN3RCxJQUFJLENBQUMsV0FBVyxDQUFDO01BRWpELElBQUlqRSxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUNQLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO01BRXpELE1BQUksQ0FBQ3lLLGVBQWUsQ0FBQ0osSUFBSSxFQUFFLE1BQUksQ0FBQ0wsZUFBZSxDQUFDO0lBQ3BELENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEQyxJQUFJLEdBQUosZ0JBQU87SUFDSCxJQUFNZ0IsY0FBYyxHQUFHLElBQUksQ0FBQ2YsaUJBQWlCLEVBQUU7SUFFL0MsSUFBSWUsY0FBYyxLQUFLLElBQUksQ0FBQ3BCLGVBQWUsSUFBSSxDQUFDb0IsY0FBYyxFQUFFO01BQzVELE9BQU8sSUFBSSxDQUFDakIsZUFBZSxFQUFFO0lBQ2pDO0lBRUEsSUFBSSxDQUFDUyxlQUFlLENBQUMsSUFBSSxDQUFDWCxnQkFBZ0IsQ0FBQztFQUMvQyxDQUFDO0VBQUE7QUFBQSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gXCIuL2NhdGFsb2dcIjtcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSBcIi4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHNcIjtcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gXCIuL2NvbW1vbi9mYWNldGVkLXNlYXJjaFwiO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHNcIjtcbmltcG9ydCBJVFNDYXRlZ29yeSBmcm9tIFwiLi9jdXN0b20vaXRzLWNhdGVnb3J5XCI7XG5pbXBvcnQgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyBmcm9tIFwiLi9jdXN0b20vdG9nZ2xlLWNhdGVnb3J5LWxpc3Rpbmctdmlld1wiO1xuaW1wb3J0IGN1c3RvbUdsb2JhbCBmcm9tIFwiLi9jdXN0b20vaXRzLWdsb2JhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDdXN0b20gQ2F0ZWdvcnlcbiAgICAgKi9cbiAgICB0aGlzLklUU0NhdGVnb3J5ID0gbmV3IElUU0NhdGVnb3J5KGNvbnRleHQpO1xuICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyA9IG5ldyBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3KGNvbnRleHQpO1xuICB9XG5cbiAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICBcImFyaWEtbGl2ZVwiOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgaWYgKCEkKFwiW2RhdGEtc2hvcC1ieS1wcmljZV1cIikubGVuZ3RoKSByZXR1cm47XG5cbiAgICBpZiAoJChcIi5uYXZMaXN0LWFjdGlvblwiKS5oYXNDbGFzcyhcImlzLWFjdGl2ZVwiKSkge1xuICAgICAgJChcImEubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlXCIpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgJChcImEubmF2TGlzdC1hY3Rpb25cIikub24oXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcbiAgICAgICAgJChcInNwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2VcIiksXG4gICAgICAgIFwic3RhdHVzXCIsXG4gICAgICAgIFwiYXNzZXJ0aXZlXCJcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLnBvcHVsYXRlR3JpZFByb2R1Y3QoKTtcbiAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG5cbiAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oXCJjbGlja1wiLCAoZSkgPT5cbiAgICAgIHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXG4gICAgICAgIFwic3RhdHVzXCIsXG4gICAgICAgIFwicG9saXRlXCJcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XG5cbiAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgIGlmICgkKFwiI2ZhY2V0ZWRTZWFyY2hcIikubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgaG9va3Mub24oXCJzb3J0Qnktc3VibWl0dGVkXCIsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgICQoXCJhLnJlc2V0LWJ0blwiKS5vbihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKFwic3Bhbi5yZXNldC1tZXNzYWdlXCIpLCBcInN0YXR1c1wiLCBcInBvbGl0ZVwiKVxuICAgICk7XG5cbiAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gIH1cblxuICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKFwiW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXVwiKTtcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJChcIiNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyXCIpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOlxuICAgICAgICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKFwiY2F0ZWdvcnlcIiksXG4gICAgICAgIHNpZGViYXI6IFwiY2F0ZWdvcnkvc2lkZWJhclwiLFxuICAgICAgfSxcbiAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiLFxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcblxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMFxuICAgICAgICApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDYXRlZ29yeSBVcGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuSVRTQ2F0ZWdvcnkuYWZ0ZXJGYWNldFVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgICQoXCJib2R5XCIpLm9uKFwicHJvZHVjdFZpZXdNb2RlQ2hhbmdlZFwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBOZXdPcHRzID0ge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgcHJvZHVjdExpc3Rpbmc6XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcuZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZShcImNhdGVnb3J5XCIpLFxuICAgICAgICAgIHNpZGViYXI6IFwiY2F0ZWdvcnkvc2lkZWJhclwiLFxuICAgICAgICB9LFxuICAgICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIixcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaC51cGRhdGVSZXF1ZXN0T3B0aW9ucyhOZXdPcHRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vU1NDT0RFOiBQb3B1bGF0ZSBQcm9kdWN0IEdyaWQgaW4gY2F0ZWdvcnkuaHRtbFxuICBwb3B1bGF0ZUdyaWRQcm9kdWN0KCkge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzO1xuICAgIGNvbnN0IFVVSURjYXRjID0gdGhpcy5jb250ZXh0LlVVSURjYXRjO1xuICAgIGNvbnN0IGNhdGVnb3J5SWQgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlJZDtcbiAgICBheGlvc1xuICAgICAgLmdldChcImh0dHBzOi8vc3VmcmkuYXBpLnN0ZGxpYi5jb20vbDV0QGRldi9nZXRBbGxQcm9kdWN0L1wiLCB7XG4gICAgICAgIHBhcmFtczogeyBpZDogY2F0ZWdvcnlJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBncmlkQWxsUHJvZHVjdHMgPSAkKFwiI2dyaWQtYWxsLXByb2R1Y3RcIik7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhLnByb2R1Y3Q7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gcmVzcG9uc2UuZGF0YS5jYXRlZ29yeTtcblxuICAgICAgICBkYXRhLmZvckVhY2goKHByKSA9PiB7XG4gICAgICAgICAgbGV0IGltZyA9IHt9O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJbXCJpbWFnZXNcIl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcltcImltYWdlc1wiXVtpXVtcImlzX3RodW1ibmFpbFwiXSkge1xuICAgICAgICAgICAgICBpbWcgPSBwcltcImltYWdlc1wiXVtpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGFjdGlvblNlY3Rpb24gPSBcIlwiO1xuICAgICAgICAgIGlmIChwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGFjdGlvblNlY3Rpb24gPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IHF1aWNrdmlldyBidXR0b24tLXF1aWNrdmlld1wiIGRhdGEtcHJvZHVjdC1pZD1cIiR7cHJbXCJpZFwiXX1cIj5WaWV3IE9wdGlvbnM8L2J1dHRvbj5gO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3Rpb25TZWN0aW9uID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYXRjIGpzLWNhcmQtYXRjXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Y19fc2VjdGlvbiBjYXJkLWF0Y19fc2VjdGlvbi0tcXR5XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGNsYXNzPVwiY2FyZC1hdGNfX2xhYmVsIGlzLXNyT25seVwiPlF1YW50aXR5OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYXRjLWluY3JlbWVudCBjYXJkLWF0Yy1pbmNyZW1lbnQtLWhhcy1idXR0b25zIGpzLWNhcmQtYXRjLWluY3JlbWVudFwiPlxuXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRlbFwiIGNsYXNzPVwiZm9ybS1pbnB1dCBjYXJkLWF0Y19faW5wdXQgY2FyZC1hdGNfX2lucHV0LS10b3RhbCBqcy1jYXJkLWF0Y19faW5wdXQtLXRvdGFsXCIgbmFtZT1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGlkPVwiY2FyZC1hdGNfX3F0eS0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgdmFsdWU9XCIxXCIgbWluPVwiMVwiIHBhdHRlcm49XCJbMC05XSpcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Yy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiaW5jXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+SW5jcmVhc2UgUXVhbnRpdHkgb2YgdW5kZWZpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1hZGRcIj48L3VzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1pY29uXCIgZGF0YS1hY3Rpb249XCJkZWNcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5EZWNyZWFzZSBRdWFudGl0eSBvZiB1bmRlZmluZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLXdyYXBwZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1pbnVzXCI+PC91c2U+UFBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Y19fc2VjdGlvbiBjYXJkLWF0Y19fc2VjdGlvbi0tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjYXJkLWF0Y19fYnV0dG9uIGJ1dHRvbiBidXR0b24tLXByaW1hcnkganMtY2FyZC1hdGNfX2J1dHRvblwiIGlkPVwiY2FyZC1hdGNfX2FkZC0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgZGF0YS1kZWZhdWx0LW1lc3NhZ2U9XCJBZGQgdG8gQ2FydFwiIGRhdGEtd2FpdC1tZXNzYWdlPVwiQWRkaW5nIHRvIGNhcnTigKZcIiBkYXRhLWFkZGVkLW1lc3NhZ2U9XCJBZGQgdG8gQ2FydFwiIHZhbHVlPVwiQWRkIHRvIENhcnRcIiBkYXRhLWNhcmQtYWRkLXRvLWNhcnQ9XCIvY2FydC5waHA/YWN0aW9uPWFkZCZhbXA7cHJvZHVjdF9pZD0ke3ByW1wiaWRcIl19XCIgZGF0YS1ldmVudC10eXBlPVwicHJvZHVjdC1jbGlja1wiPkFkZCB0byBDYXJ0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXN0YXR1cy1tZXNzYWdlIGFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiPkFkZGluZyB0byBjYXJ04oCmIFRoZSBpdGVtIGhhcyBiZWVuIGFkZGVkPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYFxuICAgICAgICAgIDxkaXYgaWQ9XCJwcm9kdWN0LSR7cHJbXCJpZFwiXX1cIiBzb3J0LW9yZGVyPVwiJHtwcltcInNvcnRfb3JkZXJcIl19XCIgXG4gICAgICAgICAgY2xhc3M9XCJwcm9kdWN0XCJcbiAgICAgICAgICBwcm9kdWN0LWRhdGEtY2F0ZWdvcnk9XCIke2dldEFsbENhdGVnb3J5KGNhdGVnb3J5LCBwcltcImNhdGVnb3JpZXNcIl0pfVwiIFxuICAgICAgICAgIHByb2R1Y3QtZGF0YS1uYW1lPVwiJHtwcltcImZha2UtaGVhZGluZ1wiXX1cIiBcbiAgICAgICAgICBwcm9kdWN0LWRhdGEtcmV2aWV3PVwiJHtcbiAgICAgICAgICAgIHByW1wicmV2aWV3c19jb3VudFwiXSA9PT0gMFxuICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgOiBwcltcInJldmlld3NfcmF0aW5nX3N1bVwiXSAvIHByW1wicmV2aWV3c19jb3VudFwiXVxuICAgICAgICAgIH1cIlxuICAgICAgICAgIHByb2R1Y3QtcmV2aWV3LWNvdW50PVwiJHtwcltcInJldmlld3NfY291bnRcIl19XCIgXG4gICAgICAgICAgcHJvZHVjdC1kYXRhLXByaWNlPVwiJHtcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgIH1cIiBcbiAgICAgICAgICBwcm9kdWN0LWRhdGUtY3JlYXRlZD1cIiR7cHJbXCJkYXRlX2NyZWF0ZWRcIl19XCIgXG4gICAgICAgICAgcHJvZHVjdC1pcy1mZWF0dXJlZD1cIiR7cHJbXCJpc19mZWF0dXJlZFwiXX1cIiBcbiAgICAgICAgICBwcm9kdWN0LWJlc3Qtc2VsbGluZz1cIiR7cHJbXCJ0b3RhbF9zb2xkXCJdfVwiXG4gICAgICAgICAgcHJvZHVjdC1jdXN0b20tc29ydC1vcmRlcj1cIiR7cHJbXCJjdXN0b20tc29ydC1vcmRlclwiXX1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjYXJkXCIgZGF0YS10ZXN0PVwiY2FyZC0ke3ByW1wiaWRcIl19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNhcmQtZmlndXJlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWxlLWZsYWctc2FzaFwiIHN0eWxlPVwiZGlzcGxheTogJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdWzBdLnNhbGVfcHJpY2UgIT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJibG9jaztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIm5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcIj48c3BhbiBjbGFzcz1cInNhbGUtdGV4dFwiPk9uIFNhbGU8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3ByW1wiY3VzdG9tX3VybFwiXVtcInVybFwiXX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLWZpZ3VyZV9fbGlua1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiJHtwcltcIm5hbWVcIl19LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiBjYXJkLWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7aW1nW1widXJsX3RodW1ibmFpbFwiXX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJpbWdbXCJkZXNjcmlwdGlvblwiXVwiIHRpdGxlPVwiJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiZmFrZS1oZWFkaW5nXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc2l6ZXM9XCJhdXRvXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc2V0PVwiJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAzMjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gNjQwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDk2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxMjgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE5MjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMjU2MHdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXNyY3NldD1cIiR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA4MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxNjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMzIwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDY0MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA5NjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTI4MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxOTIwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDI1NjB3XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLWltYWdlIGxhenlhdXRvc2l6ZXMgbGF6eWxvYWRlZFwiIHNpemVzPVwiMjQ4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24gY2xhc3M9XCJjYXJkLWZpZ2NhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZpZ2NhcHRpb24tYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdFZpZXctdHlwZS10aXRsZSBoNFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LW5hbWU9XCJcIj4ke3ByW1wiZmFrZS1oZWFkaW5nXCJdfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiY2FyZC10aXRsZSBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGFyaWEtbGFiZWw9XCIke3ByW1wibmFtZVwiXX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbGN1bGF0ZWRfcHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiR7cHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtwcltcIm5hbWVcIl19PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dCBjYXJkLXRleHQtLXNrdVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+IFNLVSM6ICR7cHJbXCJza3VcIl19IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tcHJpY2VcIiBkYXRhLXRlc3QtaW5mby10eXBlPVwicHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggcnJwLXByaWNlLS13aXRob3V0VGF4IGg0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPiBNU1JQOiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXJycC1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXJycCBoNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXVswXS5zYWxlX3ByaWNlICE9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiRcIiArIHByW1widmFyaWFudHNcIl1bMF0ucmV0YWlsX3ByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4IG5vbi1zYWxlLXByaWNlLS13aXRob3V0VGF4IGg1XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPiBXYXM6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggaDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZS1sYWJlbCBpcy1zck9ubHlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2Utbm93LWxhYmVsIGlzLXNyT25seVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5Ob3c6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS13aXRob3V0VGF4XCI+JCR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWxjdWxhdGVkX3ByaWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHByW1wiY2FsY3VsYXRlZF9wcmljZVwiXS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tZXh0cmFcIiBzdHlsZT1cImRpc3BsYXk6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fZmllbGRzXCJdLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGQpID0+IGZpZWxkW1wibmFtZVwiXSA9PT0gXCJfX2NhcmQtZXh0cmEtaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmVsYXRpdmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiY3VzdG9tX2ZpZWxkc1wiXS5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFtcIm5hbWVcIl0gPT09IFwiX19jYXJkLWV4dHJhLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcltcImN1c3RvbV9maWVsZHNcIl0uZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFtcIm5hbWVcIl0gPT09IFwiX19jYXJkLWV4dHJhLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hY3Rpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHthY3Rpb25TZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5sb2NhdGlvbi5ocmVmPSR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiY3VzdG9tX3VybFwiXVtcInVybFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tcXVpY2t2aWV3XCIgPlZpZXcgRGV0YWlsczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgICAgZ3JpZEFsbFByb2R1Y3RzLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJvZHkuY29uZmlndXJlSXNvdG9wZUZvckFsbCgpO1xuICAgICAgICBib2R5LnN0YXJ0R2xvYmFsKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0QWxsQ2F0ZWdvcnkoY2F0X2xpc3QsIHByX2NhdCkge1xuICAgICAgbGV0IGNhdCA9IFwiXCI7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByX2NhdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2F0X2xpc3RbcHJfY2F0W2ldXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2F0ID0gY2F0ICsgY2F0X2xpc3RbcHJfY2F0W2ldXVtcImNhdF9pZFwiXS5qb2luKFwiIFwiKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2F0O1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0R2xvYmFsKCkge1xuICAgIGN1c3RvbUdsb2JhbCh0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgY29uZmlndXJlSXNvdG9wZUZvckFsbCgpIHtcbiAgICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XG4gICAgJChcIi5sZHMtYmxvY2tcIikuaGlkZSgpO1xuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkLWFsbC1wcm9kdWN0XCIpO1xuICAgIGxldCBpc287XG5cbiAgICBsZXQgaW1nTG9hZGVkID0gdHJ1ZTtcblxuICAgIGxldCB0ZXN0SW1nSW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdmFyIGNhcmRJbWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNncmlkLWFsbC1wcm9kdWN0IC5jYXJkLWltYWdlXCIpO1xuICAgICAgaWYgKGNhcmRJbWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkSW1ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBub25aZXJvID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoY2FyZEltZ3NbaV0ub2Zmc2V0SGVpZ2h0IDwgMTAwKSB7XG4gICAgICAgICAgICBpbWdMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vblplcm8gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9uWmVybykge1xuICAgICAgICAgICAgaW1nTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZ0xvYWRlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW1nTG9hZGVkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGVzdEltZ0ludCk7XG4gICAgICAgIC8vIGJvZHkuY29uZmlndXJlSXNvdG9wZUZvckFsbCgpO1xuICAgICAgICAvLyBib2R5LnN0YXJ0R2xvYmFsKCk7XG4gICAgICAgICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge30sIDApO1xuXG4gICAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgaXNvID0gbmV3IElzb3RvcGUoZ3JpZCwge1xuICAgICAgICAvLyBvcHRpb25zLi4uXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogXCIucHJvZHVjdFwiLFxuICAgICAgICBsYXlvdXRNb2RlOiBcImZpdFJvd3NcIixcbiAgICAgICAgZ2V0U29ydERhdGE6IHtcbiAgICAgICAgICBuYW1lOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGEtbmFtZVwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByaWNlOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRhLXByaWNlXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJldmlldzogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRhLXJldmlld1wiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhdGVnb3J5OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGEtY2F0ZWdvcnlcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBiZXN0X3NlbGxpbmc6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWJlc3Qtc2VsbGluZ1wiKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdlc3Q6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0ZS1jcmVhdGVkXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VzdG9tX3NvcnRfb3JkZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWN1c3RvbS1zb3J0LW9yZGVyXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKFwiI2FsbC1zb3J0LXNlbGVjdCwgI2FsbC1zb3J0LXNlbGVjdC1tb2JpbGVcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHZhbCA9ICQodGhpcykudmFsKCkuc3BsaXQoXCItXCIpO1xuXG4gICAgICBpZiAodmFsWzBdID09PSBcInJldmlld1wiKSB7XG4gICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICBzb3J0Qnk6IFt2YWxbMF0sIFwicmF0aW5nX2NvdW50XCJdLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IHtcbiAgICAgICAgICAgIHJldmlldzogZmFsc2UsXG4gICAgICAgICAgICByYXRpbmdfY291bnQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgIHNvcnRCeTogdmFsWzBdLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IHZhbFsxXSA9PT0gXCJhc2NcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWx0ZXJfYXJyID0gW107XG5cbiAgICAkKFwiW2NoZWNrYm94LWZpbHRlci1hbGxdXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBpc2ZlYXR1cmVkID0gJChcIiNmZWF0dXJlZC1jaGVja2JveDpjaGVja2VkXCIpLmxlbmd0aCA+IDA7XG4gICAgICBpZiAoJCh0aGlzKS5hdHRyKFwiaWRcIikgIT09IFwiZmVhdHVyZWQtY2hlY2tib3hcIikge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgZmlsdGVyX2Fyci5wdXNoKCQodGhpcykuYXR0cihcImZpbHRlci12YWx1ZVwiKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJfYXJyLmluZGV4T2YoJCh0aGlzKS5hdHRyKFwiZmlsdGVyLXZhbHVlXCIpKTtcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gb25seSBzcGxpY2UgYXJyYXkgd2hlbiBpdGVtIGlzIGZvdW5kXG4gICAgICAgICAgICBmaWx0ZXJfYXJyLnNwbGljZShpbmRleCwgMSk7IC8vIDJuZCBwYXJhbWV0ZXIgbWVhbnMgcmVtb3ZlIG9uZSBpdGVtIG9ubHlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcl9hcnIubGVuZ3RoID4gMCkge1xuICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgLy8gaXRlbSBlbGVtZW50IHByb3ZpZGVkIGFzIGFyZ3VtZW50XG4gICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1jYXRlZ29yeVwiKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyX2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAodmFsLmluY2x1ZGVzKGZpbHRlcl9hcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzZmVhdHVyZWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtaXMtZmVhdHVyZWRcIikgPT09IFwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc2ZlYXR1cmVkKSB7XG4gICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtaXMtZmVhdHVyZWRcIikgPT09IFwidHJ1ZVwiO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNvLmFycmFuZ2UoeyBmaWx0ZXI6IFwiKlwiIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29udGV4dC5zdWJjYXRlZ29yaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICBzb3J0Qnk6IFwiY3VzdG9tX3NvcnRfb3JkZXJcIixcbiAgICAgICAgc29ydEFzY2VuZGluZzogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgIHNvcnRCeTogXCJiZXN0X3NlbGxpbmdcIixcbiAgICAgICAgc29ydEFzY2VuZGluZzogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU0NhdGVnb3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgYWZ0ZXJGYWNldFVwZGF0ZSgpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3VHlwZSA9IHRoaXMuY29udGV4dC5kZWZhdWx0Vmlld1R5cGU7XG4gICAgICAgIHRoaXMub3Bwb3NpdGVWaWV3VHlwZSA9IHRoaXMuZGVmYXVsdFZpZXdUeXBlICE9PSAnZ3JpZCcgPyAnZ3JpZCcgOiAnbGlzdCc7XG4gICAgICAgIHRoaXMucHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5ID0gJCgnLmxvYWRpbmdPdmVybGF5LmxvYWRpbmdPdmVybGF5LS1wcm9kdWN0LWxpc3RpbmcnKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2ZhY2V0ZWRTZWFyY2hSZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmVkVmlld1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldFJlcXVlc3RUZW1wbGF0ZVR5cGUodHlwZSkge1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcbiAgICAgICAgcmV0dXJuICFwYWdlVHlwZSA/IGAke3R5cGV9L3Byb2R1Y3QtbGlzdGluZ2AgOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgO1xuICAgIH1cblxuICAgIHN0b3JlVmlld1R5cGUodHlwZSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnLCB0eXBlKTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeVBhZ2UocGFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLnByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCBjb25maWcsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKS5odG1sKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZVZpZXdUeXBlKHBhZ2VUeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdwcm9kdWN0Vmlld01vZGVDaGFuZ2VkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFRvZ2dsZUV2ZW50cygpIHtcbiAgICAgICAgJCgnLmpzLWNhdGVnb3J5X190b2dnbGUtdmlldycpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ZpZXctdHlwZScpO1xuXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdhY3RpdmUtY2F0ZWdvcnktdmlldycpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlQYWdlKHR5cGUsIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkVmlld1R5cGUgPSB0aGlzLmdldFN0b3JlZFZpZXdUeXBlKCk7XG5cbiAgICAgICAgaWYgKHN0b3JlZFZpZXdUeXBlID09PSB0aGlzLmRlZmF1bHRWaWV3VHlwZSB8fCAhc3RvcmVkVmlld1R5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodGhpcy5vcHBvc2l0ZVZpZXdUeXBlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9