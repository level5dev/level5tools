(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* harmony import */ var _custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom/custom-cart */ "./assets/js/theme/custom/custom-cart.js");
/* harmony import */ var _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom/cart-page-upsell */ "./assets/js/theme/custom/cart-page-upsell.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.customCart = this.context.itsConfig.custom_cart;
    if (this.customCart) {
      Object(_custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__["floatingCheckoutButton"])();
    }
    this.cartPageUpsell = new _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__["default"](this.context);
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry),
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: this.customCart ? 'custom/cart/content' : 'cart/content',
        totals: this.customCart ? 'custom/cart/totals' : 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: _this6.context.cancelButtonText
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(_this8.context);
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: validationDictionary.invalid_gift_certificate,
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    var _this10 = this;
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);

    // reload cart content when a Cart Page Upsell item is added to the cart
    $(document).on('cpu-refresh-cart-content', function () {
      return _this10.refreshContent(false);
    });
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
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

/***/ "./assets/js/theme/custom/cart-page-upsell-product-details.js":
/*!********************************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell-product-details.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsellProduct; });
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




var CartPageUpsellProduct = /*#__PURE__*/function () {
  function CartPageUpsellProduct($scope) {
    this.$scope = $scope;
    this.$scope.addClass('hasOptions--wired');
    this.initRadioAttributes();
    this.$form = $('form', this.$scope);
    this.$productId = $('[name="product_id"]', this.$form).val();
    this.key = 'cpu'; // unique indentifier for this customization

    this.$productOptionsElement = $("[data-" + this.key + "-option-change]", this.$form); // ie <div class="options" data-cpu-option-change>

    this.updateOptionView();
    // utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
    //     const attributesData = response.data || {};
    //     const attributesContent = response.content || {};
    //     this.updateProductAttributes(attributesData);
    //     // if (hasDefaultOptions) {
    //         this.updateView(attributesData, attributesContent);
    //     // } else {
    //     //     this.updateDefaultAttributesForOOS(attributesData);
    //     // }
    // });

    this.bindEvents();
  }

  /**
   * add "isRequired" to options that are required
   */
  var _proto = CartPageUpsellProduct.prototype;
  _proto.addRequiredClasstoOptions = function addRequiredClasstoOptions() {
    $('.form-field', this.$productOptionsElement).toArray().forEach(function (option) {
      if ($(option).find('small:contains("Required")').length) {
        $(option).addClass('isRequired');
      }
    });
  }

  /**
   * Handle product options changes
   */;
  _proto.productOptionsChanged = function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var optionRow = $(event.target).parents('.form-field');

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      // do nothing
    } else {
      this.updateOptionView();
    }

    // was an option with a value selected?
    if ($changedOption.val() !== '') {
      if ($changedOption.is('input')) {
        var type = $changedOption.attr('type');
        switch (type) {
          case 'radio':
            $changedOption.attr('checked', true);
            $changedOption.siblings('input').attr('checked', false);
            optionRow.addClass('isSelected');
            break;
          case 'checkbox':
            if ($changedOption.prop('checked')) {
              optionRow.addClass('isSelected');
              $changedOption.attr('checked', true);
            } else {
              optionRow.removeClass('isSelected');
              $changedOption.attr('checked', false);
            }
            break;
          case 'text':
          case 'number':
            $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
            $changedOption.attr('value', $changedOption.val());
            break;
        }
      } else if ($changedOption.is('select')) {
        var $selectedOption = $changedOption.find("option[value=\"" + $changedOption.val() + "\"]");
        $selectedOption.attr('selected', true);
        $selectedOption.siblings('option').attr('selected', false);
        // if it's a date select, make sure all 3 selects are filled in before saying it's filled in
        if ($changedOption.attr('name').indexOf('month') !== -1 || $changedOption.attr('name').indexOf('day') !== -1 || $changedOption.attr('name').indexOf('year') !== -1) {
          // count the other date fields (if changed month, see if day and year are filled out)
          var otherSelectedDateFields = $changedOption.siblings('select').toArray().reduce(function (count, select) {
            return $(select).val() === '' ? count : count + 1;
          }, 0);
          // if all fields are filled in
          if (otherSelectedDateFields === 2) {
            optionRow.addClass('isSelected');
          }
        } else {
          optionRow.addClass('isSelected'); // it's not a date select, just mark the option as selected
        }
      } else if ($changedOption.is('textarea')) {
        $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
        $changedOption.text($changedOption.val());
      }
    } else {
      // else remove class (there was no value for this option)
      optionRow.removeClass('isSelected');
    }
    this.checkOptionsSelected();
  }

  /**
   *  Make API call on option change to update availability
   */;
  _proto.updateOptionView = function updateOptionView() {
    var _this = this;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      _this.updateProductAttributes(productAttributesData);
      _this.updateView(productAttributesData);
      // stock stuff (should wire up image change as well later)
      // if (productAttributesData.stock !== undefined) {
      //     $('.currentStock', $scope).text(productAttributesData.stock);
      // } else {
      //     $('.currentStock', $scope).text('');
      // }
    });
  }

  /**
   *  Check whether all required options are selected
   */;
  _proto.checkOptionsSelected = function checkOptionsSelected() {
    /*
    ## see if all options are selected
    */
    var numberRequiredOptions = this.$scope.find('.form-field.isRequired').length;
    var numberSelectedOptions = this.$scope.find('.form-field.isRequired.isSelected').length;
    // const $addToCartButton = $form.find('.card-actions .button');
    // $addToCartButton.removeClass('button--success');
    if (numberRequiredOptions === 0 || numberRequiredOptions <= numberSelectedOptions) {
      this.$scope.addClass('hasOptions--selected'); // add class to product for easy adding to cart
      $('.cpu__modal').addClass('hasOptions--selected'); // update text for user as well
    } else {
      this.$scope.removeClass('hasOptions--selected'); // remove class since not all options filled in
      $('.cpu__modal').removeClass('hasOptions--selected'); // update text for user as well
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   *
   */;
  _proto.updatePriceView = function updatePriceView(price) {
    if (price.without_tax) {
      $("[data-product-price-without-tax]", this.$scope).html(price.without_tax.formatted);
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data) {
    // update price
    // const viewModel = this.getViewModel(this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.price)) {
      this.updatePriceView(data.price);
    }
    // update image
    var imageEl = $(".cpu__item-img", this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.image)) {
      var imageSrc = data.image.data.replace('{:size}', '300x300');
      imageEl.attr('src', imageSrc);
    } else {
      imageEl.attr('src', imageEl.data('src'));
    }
    // update message if there is one
    var optionMessage = data.stock_message || data.purchasing_message;
    if (optionMessage !== null) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
        text: optionMessage,
        icon: 'error'
      });
      this.$scope.addClass('hasOptions--error');
    } else {
      this.$scope.removeClass('hasOptions--error');
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this2 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    $('[data-product-attribute-value]', this.$scope.add('.cpu__modal')).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('product-attribute-value'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this2.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this2.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable').prev('input').attr('disabled', true);
    }
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($attribute.parent().val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable').prev('input').attr('disabled', false);
    }
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this3 = this;
    $('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = $(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.click(function () {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);
            $radio.change();
          } else {
            $radio.data('state', true);
          }
          _this3.initRadioAttributes();
        });
      }
      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    var _this4 = this;
    Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_2__["default"])(this.$scope, this.$productId, this.key); // make options unique so there aer no conflicts when selecting options

    this.addRequiredClasstoOptions(); // add "isRequired" to required options
    this.checkOptionsSelected();

    // listen for option changes
    this.$productOptionsElement.change(function (event) {
      _this4.productOptionsChanged(event, event.target);
    });
    this.$productOptionsElement.show();

    // update options selected on load
    this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
    this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
    this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
    this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
    this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
    this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
  };
  return CartPageUpsellProduct;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsell; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart-page-upsell-product-details */ "./assets/js/theme/custom/cart-page-upsell-product-details.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var _common_carousel_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/carousel/index */ "./assets/js/theme/common/carousel/index.js");
/* harmony import */ var _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./upsell-array-cart-page */ "./assets/js/theme/custom/upsell-array-cart-page.js");
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








//  Apr 2019: updated version includes ITS Upsell Suite
var VERSION = '2.0';
var CartPageUpsell = /*#__PURE__*/function () {
  function CartPageUpsell(context) {
    console.log('IntuitSolutions.net - Cart Page Upsell', VERSION);
    this.context = context;

    /**
     * options = 'related', 'similar', 'custom fields'
     * errorDefault = backup mode; only necessary with Upsell Suite
     * -- related = automatically loads related products from a random item in the cart
     * -- similar = automatically loads similar by view products from a random item in the cart
     * -- custom fields = will load the products specified by the cart item's custom fields
     * -- upsell suite = will load products specified by Upsell Suite CSVs
     */
    this.mode = 'upsell suite';
    this.errorDefault = 'related';
    this.showMobileInCarousel = true;
    this.productLimit = 3;
    this.loading = $('#cpu .loadingOverlay');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product); // required to keep scope of utils to the utils
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api); // required to keep scope of utils to the utils

    this.bindEvents();
  }

  /**
   * remove duplicate items from array
   *
   * pulled from stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
   * @param {array} upsellTargets - array of items we want to strip out any duplicate items from
   */
  var _proto = CartPageUpsell.prototype;
  _proto.removeDuplicateTargets = function removeDuplicateTargets(upsellTargets) {
    return Array.from(new Set(upsellTargets));
  }

  /**
   * get cart items URLs and Product Ids so we don't try to upsell an item that's already in the cart
   * @param {array} upsellTargets - array of items we want to strip out any cart item matches from
   */;
  _proto.removeCartItemTargets = function removeCartItemTargets(upsellTargets) {
    // get all data from the cart items
    var cartItemData = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var producturl = $(cartItem).data('product-url').replace(window.location.origin, '') || '';
      var productId = $(cartItem).data('product-id').toString() || '';
      cartItemData.push(producturl, productId);
    });
    // only keep upsell items that aren't within our cartItemData array
    var result = upsellTargets.reduce(function (upsellItems, upsellitem) {
      if (cartItemData.indexOf(upsellitem) === -1) {
        upsellItems.push(upsellitem);
      }
      return upsellItems;
    }, []);
    // return result
    return result;
  }

  /**
   * get random int given a max
   */;
  _proto.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * automatically load products from the cart item's either related products or similar by view items
   * @param {string} type - "related" or "similar"
   */;
  _proto.loadAutoTargets = function loadAutoTargets(type) {
    var _this = this;
    var itemIndex = this.getRandomInt($('.cart-item').length); // get random item index (pick random item)
    var itemId = $('.cart-item').eq(itemIndex || 0).data('product-id'); // get product id of that random item
    if (itemId == undefined) {
      return $('#cpu').hide();
    }
    // see if we already ajax'd for these upsell items
    var storedData = JSON.parse(localStorage.getItem("cpu__items" + itemId)) || [];
    if (storedData.length) {
      // if already ajaxed and stored upsell items
      storedData = this.removeDuplicateTargets(storedData); // remove duplicate upsell targets
      storedData = this.removeCartItemTargets(storedData); // remove any upsell targets that match an item already in the cart
      this.loadUpsellTargets(storedData); // load those stored upsell items
    } else {
      // otherwise
      var opts = {
        template: "custom/cart-page-upsell-targets--" + type,
        config: {
          product: {
            related_products: {
              limit: 70
            },
            similar_by_views: {
              limit: 70
            }
          }
        }
      };
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(itemId, opts, function (err, res) {
        // ajax for the first item's upsell items (suggested products)
        if (err) {
          return $('#cpu').hide();
        }
        var targets = JSON.parse(res) || [];
        targets = _this.removeDuplicateTargets(targets); // remove duplicate upsell targets
        targets = _this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
        localStorage.setItem("cpu__items" + itemId, JSON.stringify(targets));
        _this.loadUpsellTargets(targets);
      });
    }
  }

  /**
   * returns array of upsell product URLs and/or IDs
   */;
  _proto.loadCustomFieldTargets = function loadCustomFieldTargets() {
    var targets = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var upsellItems = $(cartItem).data('upsell');
      if (upsellItems.length) {
        upsellItems.split(',').forEach(function (upsellItem) {
          if (upsellItem.length) {
            targets.push(upsellItem);
          }
        });
      }
    });
    // if mode is set to custom fields but no items have custom fields applied, default to using related products
    if (targets.length === 0) {
      return this.loadAutoTargets('related');
    }
    targets = this.removeDuplicateTargets(targets); // remove duplicate upsell targets
    targets = this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
    return this.loadUpsellTargets(targets);
  };
  _proto.loadCSVTargets = /*#__PURE__*/function () {
    var _loadCSVTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var cpuHTMLtext, cpuHTML, remainingSlots, targets;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //  get the previously AJAXed products from sessionStorage
            cpuHTMLtext = sessionStorage.getItem("cpuCards");
            cpuHTML = _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].parseArrayFromString(cpuHTMLtext); //  if nothing has been downloaded,
            //  revert to backup mode
            if (cpuHTML.length) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", this.loadAutoTargets(this.errorDefault));
          case 4:
            //  display the previouly downloaded products
            cpuHTML.forEach(function (card) {
              return $('#cpu .cpu__list--customfields').append(card.html);
            });

            //  if there is room for more products,
            //  fill the rest of the add-on by
            //  adding products from the CSVs
            //  of products already in the CPU
            remainingSlots = this.productLimit - cpuHTML.length;
            if (!remainingSlots) {
              _context.next = 17;
              break;
            }
            _context.prev = 7;
            _context.next = 10;
            return _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].getAdditionalProducts(cpuHTML.map(function (product) {
              return product.product_id;
            }), remainingSlots);
          case 10:
            targets = _context.sent;
            return _context.abrupt("return", this.loadUpsellTargets(targets));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);
            console.error("CPU parse error: ", _context.t0);
          case 17:
            this.applyUpsellHandlers();
            return _context.abrupt("return", this.loading.hide());
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[7, 14]]);
    }));
    function loadCSVTargets() {
      return _loadCSVTargets.apply(this, arguments);
    }
    return loadCSVTargets;
  }()
  /**
   * handle adding items to cart
   */
  ;
  _proto.addToCart = function addToCart(event) {
    var _this2 = this;
    var product = $(event.currentTarget).parents('.cpu__item');
    product.removeClass('hasError'); // remove any error highlighting
    // make sure all options are selected
    if (product.hasClass('hasOptions') && !product.hasClass('hasOptions--selected')) {
      product.hasClass('hasOptions--wired') ? $('.qaatx__options', product).slideDown() // if options loaded, just show them
      : this.toggleOptions(event); // options aren't loaded, load them + show them
      product.addClass('hasError');
      $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        type: 'error'
      });
    }
    // actually add to cart
    this.loading.show();
    var form = $('.cpu__item-form', product);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(new FormData(form[0]), function (err, response) {
      var errorMessage = err || response.data.error; // take note of errors
      if (errorMessage) {
        // Guard statement
        // Strip the HTML from the error message
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        _this2.loading.hide();
        product.addClass('hasError'); // highlgihht error item
        var errorOffset = product.offset().top;
        $('html, body').animate({
          scrollTop: errorOffset - 20
        }, 700); // scroll user to the error product
        // remove class from our 'qued" items
        $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
        // alert user of error
        return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
          text: tmp.textContent || tmp.innerText,
          icon: 'error'
        });
      }
      _this2.loading.hide();
      // product.addClass('wasAdded');
      // $('.cpu__item-button', product).text('Added to Cart');
      $(document).trigger('cpu-refresh-cart-content');
      // if (product.hasClass('isBeingAdded')) {
      //     product.removeClass('isBeingAdded');
      //     ($('.cpu__item.isBeingAdded') && $('.cpu__item.isBeingAdded').length)
      //         ? $('.cpu__item.isBeingAdded').eq(0).find('.qaatc__addtocart').trigger('click') // trigger submitting next product to the cart
      //         : window.location = '/cart.php';
      // }
    });
  }

  /**
   * when modal option changed we need to sync the "real" form. Sync options selected in scope1 with scope2
   * @param {object} event
   * @param {string} productId
   */;
  _proto.syncFormOption = function syncFormOption(event, productId) {
    var opt = $(event.target).parents('.form-field');
    var type = $(opt).data('product-attribute');
    var target = null;
    var targetId = null;
    var value = null;
    switch (type) {
      case 'input-checkbox':
      case 'set-rectangle':
      case 'set-radio':
      case 'product-list':
      case 'swatch':
        target = $('input:checked', opt);
        if (target && target.length) {
          targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
          $("#" + targetId).prop('checked', true);
          $("#" + targetId).siblings('input').prop('checked', false);
        } else {
          targetId = $(event.target).prop('id').replace("_" + productId, '').replace('modal_', '');
        }
        break;
      case 'set-select':
        target = $('.form-select', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
      case 'input-text':
      case 'textarea':
        target = $('.form-input', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
    }
    // force update on the "real" form
    $("#" + targetId).trigger('change');
  }

  /**
   * Add to cart from modal
   */;
  _proto.addToCartFromModal = function addToCartFromModal(modalContent, product) {
    var modal = modalContent.parents('.cpu__modal');
    if (!modal.hasClass('hasOptions--selected')) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        icon: 'error',
        onClose: function onClose() {
          $('.cpu__item-button--options', product).trigger('click'); // show options again if tried adding to cart before selecting all options
        }
      });
    }

    $('.cpu__item-button--addtocart', product).trigger('click'); // trigger add to cart button click on main product
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.close(); // close modal
  }

  /**
   * show and load if needed this product's options
   */;
  _proto.showOptions = function showOptions(e) {
    var _this3 = this;
    var product = $(e.currentTarget).parents('.cpu__item');
    var name = $('.cpu__item-name', product).text();
    var optionMarkup = $('.cpu__item-options', product).html();
    var productId = $('[name="product_id"]', product).val();
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
      title: "Options for " + name,
      html: optionMarkup,
      customClass: 'cpu__modal',
      showCloseButton: true,
      showConfirmButton: false,
      onOpen: function onOpen() {
        // since the moda lHTML is cloned it doesn't have any handlers applied to it. This handles the "fake" cloned options to update the "real" options
        var modalContent = $(sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.getContent());
        Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_3__["default"])(modalContent, productId, 'modal');
        $('[data-cpu-option-change]', modalContent).change(function (event) {
          _this3.syncFormOption(event, productId);
        });
        // trigger default selected options unless there's an error.. then we'll get stuck in a loop
        if (!product.hasClass('hasOptions--error')) {
          $('[data-cpu-option-change]', modalContent).find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
          $('[data-cpu-option-change]', modalContent).find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
          $('[data-cpu-option-change]', modalContent).find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
          $('[data-cpu-option-change]', modalContent).find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
          $('[data-cpu-option-change]', modalContent).find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
          $('[data-cpu-option-change]', modalContent).find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
        }

        // this.optionHandlers[productId].updateOptionView();
        _this3.optionHandlers[productId].checkOptionsSelected(modalContent);

        // handle adding to cart from modal
        $('.cpu__item-button--modaladdtocart', modalContent).on('click', function () {
          return _this3.addToCartFromModal(modalContent, product);
        });
      }
    });
  }

  /**
   * apply upsell handlers
   */;
  _proto.applyUpsellHandlers = function applyUpsellHandlers() {
    var _this4 = this;
    this.optionHandlers = {};
    $('.cpu__item.hasOptions').toArray().forEach(function (product) {
      var thisID = $(product).find('input[name="product_id"]').val();
      _this4.optionHandlers[thisID] = new _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__["default"]($(product));
    }); // handle options for all products w/ options
    console.log(this.optionHandlers);
    $('.cpu__item-button--addtocart').on('click', function (e) {
      return _this4.addToCart(e);
    }); // manage adding to cart

    $('.cpu__item-button--options').on('click', function (e) {
      return _this4.showOptions(e);
    }); // manage adding to cart

    this.displayInCarousel();
  }

  /**
   * AJAX the upsell URLs and/or IDs and append where needed
   * @param {array} targets - targets to upsell
   */;
  _proto.loadUpsellTargets = function loadUpsellTargets(targets) {
    var _this5 = this;
    if (targets.length) {
      targets = targets.slice(0, this.productLimit || targets.length);
      var runQueueInOrder = function runQueueInOrder() {
        if (targets.length === 0) {
          // when done all products
          _this5.applyUpsellHandlers();
          return _this5.loading.hide();
        }
        var target = targets.shift();
        var requestMethod = target.toString().match(/^[0-9]+$/) ? _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById : _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage;
        requestMethod(target, {
          template: 'custom/cart-page-upsell-item'
        }, function (err, response) {
          if (err) {
            return;
          } // if error
          $('#cpu .cpu__list--customfields').append(response); // no error, append markup
          runQueueInOrder(); // run next item
        });
      };

      runQueueInOrder(); // start the loop
    } else {
      $('#cpu').hide();
    }
  }

  /**
   * Add Slick options to product display after loading products,
   * then fire Slick
   */;
  _proto.displayInCarousel = function displayInCarousel() {
    if (!this.showMobileInCarousel) return;

    //  Add CSS to product cards before firing Slick
    $('.cpu__list').addClass('cpu__list-slick');
    $('.cpu__item').addClass('cpu__item-slick');
    $('.cpu__list').attr('data-slick', "{\n            \"infinite\": true,\n            \"dots\": false,\n            \"arrows\": true,\n            \"mobileFirst\": true,\n            \"rows\": 1,\n            \"slidesToShow\": 1,\n            \"slidesToScroll\": 1,\n            \"responsive\": [\n                {\n                    \"breakpoint\": 1025,\n                    \"settings\": \"unslick\"\n                }\n            ]\n        }");
    Object(_common_carousel_index__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    var mediaMatch = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_6__["default"])('medium');
    $(mediaMatch).on('change', function (e) {
      var bindToWindow = !e.target.matches;
      if (bindToWindow) {
        $('.cpu__list').slick('reinit');
      }
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    this.loading.show();
    switch (this.mode) {
      case 'related':
        return this.loadAutoTargets('related');
      case 'similar':
        return this.loadAutoTargets('similar');
      case 'custom fields':
        return this.loadCustomFieldTargets();
      case 'upsell suite':
        return this.loadCSVTargets();
    }
  };
  return CartPageUpsell;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/custom-cart.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/custom-cart.js ***!
  \***********************************************/
/*! exports provided: floatingCheckoutButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floatingCheckoutButton", function() { return floatingCheckoutButton; });
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");

var floatingCheckoutButton = function floatingCheckoutButton() {
  var $summaryContainer = $('.js-cart__totals');
  var $floatingButton = $('.floating-checkout-button');
  var mq = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_0__["default"])('medium');
  function WidthChange(mq) {
    var fadeTiming = 400;
    if (!mq.matches) {
      var initWindowPosition = window.scrollY + window.innerHeight;
      if (initWindowPosition < $summaryContainer.offset().top) {
        $floatingButton.show();
      } else {
        $floatingButton.hide();
      }
      $(window).on('scroll', function () {
        var bottomWindowPosition = window.scrollY + window.innerHeight;
        if (bottomWindowPosition < $summaryContainer.offset().top) {
          $floatingButton.fadeIn(fadeTiming);
        } else {
          $floatingButton.fadeOut(fadeTiming);
        }
      });
    } else {
      $floatingButton.hide();
    }
  }
  mq.addListener(WidthChange);
  WidthChange(mq);
  $floatingButton.on('click', function () {
    var goToCheckout = false; // Set to true if the button should go to checkout instead of scrolling the user down the page
    var totalsOffset = $summaryContainer.offset().top;
    if (goToCheckout) {
      window.location.href = '/checkout.php';
    } else {
      $('html, body').animate({
        scrollTop: totalsOffset - 100
      }, 700); // scroll user to the real checkout button product
    }
  });
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/make-options-unique.js":
/*!*******************************************************!*\
  !*** ./assets/js/theme/custom/make-options-unique.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/*
 * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
 */
var makeOptionIdsUnique = function makeOptionIdsUnique(scope, productId, key) {
  $('input[type="radio"], input[type="checkbox"]', scope).each(function (index, el) {
    var optionId = $(el).attr('id'); // update ID to include product ID
    $(el).attr('id', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('for', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
  // add input fields label class and put in here. These options we need to select their sibling label
  var optionsWithLabelAttrs = ['input[type="text"]', 'input[type="number"]', 'input[type="file"]', 'select', 'textarea'];
  var optionsWithLabelAttrsSelectors = optionsWithLabelAttrs.join(',');
  $(optionsWithLabelAttrsSelectors, scope).parents('.form-field').find('label').each(function (index, el) {
    var optionId = $(el).attr('for'); // update ID to include product ID
    $(el).attr('for', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('id', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
};

/* harmony default export */ __webpack_exports__["default"] = (makeOptionIdsUnique);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vY2FydC1wYWdlLXVwc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2N1c3RvbS1jYXJ0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vbWFrZS1vcHRpb25zLXVuaXF1ZS5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJjdXN0b21DYXJ0IiwiY29udGV4dCIsIml0c0NvbmZpZyIsImN1c3RvbV9jYXJ0IiwiZmxvYXRpbmdDaGVja291dEJ1dHRvbiIsImNhcnRQYWdlVXBzZWxsIiwiQ2FydFBhZ2VVcHNlbGwiLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiQXBwbGVQYXlTZXNzaW9uIiwiYWRkQ2xhc3MiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwiY2FuY2VsQnV0dG9uVGV4dCIsInRoZW4iLCJiaW5kUHJvbW9Db2RlRXZlbnRzIiwiJGNvdXBvbkNvbnRhaW5lciIsIiRjb3Vwb25Gb3JtIiwiJGNvZGVJbnB1dCIsImNvZGUiLCJhcHBseUNvZGUiLCJiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzIiwiJGNlcnRDb250YWluZXIiLCIkY2VydEZvcm0iLCIkY2VydElucHV0IiwidG9nZ2xlIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiY2FsbCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwiY29udmVydEludG9BcnJheSIsIm1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQiLCJpbnB0IiwiZGF0YXNldCIsInByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSIsImxhYmVsIiwiaXNCcm93c2VySUUiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsIlByb2R1Y3REZXRhaWxzQmFzZSIsImNlcnQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiaXRlbSIsInJldCIsIm5hbWUiLCJyZXBsYWNlbWVudEF0dHJpYnV0ZXMiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInByZXYiLCJhcHBlbmQiLCJtYWtlU3RhdGVPcHRpb25hbCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJhZGRPcHRpb25zIiwic3RhdGVzQXJyYXkiLCIkc2VsZWN0RWxlbWVudCIsImNvbnRhaW5lciIsInByZWZpeCIsInN0YXRlcyIsInN0YXRlT2JqIiwiY2FsbGJhY2siLCJjb3VudHJ5TmFtZSIsImdldEJ5TmFtZSIsInNob3dBbGVydE1vZGFsIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJDYXJ0UGFnZVVwc2VsbFByb2R1Y3QiLCJpbml0UmFkaW9BdHRyaWJ1dGVzIiwiJHByb2R1Y3RJZCIsInVwZGF0ZU9wdGlvblZpZXciLCJhZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zIiwidG9BcnJheSIsImZvckVhY2giLCJvcHRpb24iLCJwcm9kdWN0T3B0aW9uc0NoYW5nZWQiLCIkY2hhbmdlZE9wdGlvbiIsInRhcmdldCIsIm9wdGlvblJvdyIsInBhcmVudHMiLCJGb3JtRGF0YSIsInVuZGVmaW5lZCIsInNpYmxpbmdzIiwiJHNlbGVjdGVkT3B0aW9uIiwiaW5kZXhPZiIsIm90aGVyU2VsZWN0ZWREYXRlRmllbGRzIiwiY291bnQiLCJjaGVja09wdGlvbnNTZWxlY3RlZCIsInVwZGF0ZVZpZXciLCJudW1iZXJSZXF1aXJlZE9wdGlvbnMiLCJudW1iZXJTZWxlY3RlZE9wdGlvbnMiLCJ1cGRhdGVQcmljZVZpZXciLCJwcmljZSIsIndpdGhvdXRfdGF4IiwiZm9ybWF0dGVkIiwiaW1hZ2VFbCIsImltYWdlIiwiaW1hZ2VTcmMiLCJvcHRpb25NZXNzYWdlIiwic3RvY2tfbWVzc2FnZSIsImJlaGF2aW9yIiwib3V0X29mX3N0b2NrX2JlaGF2aW9yIiwiaW5TdG9ja0lkcyIsImluX3N0b2NrX2F0dHJpYnV0ZXMiLCJvdXRPZlN0b2NrTWVzc2FnZSIsIm91dF9vZl9zdG9ja19tZXNzYWdlIiwiYXR0cmlidXRlIiwiJGF0dHJpYnV0ZSIsImF0dHJJZCIsImVuYWJsZUF0dHJpYnV0ZSIsImRpc2FibGVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsInBhcmVudCIsInRvZ2dsZU9wdGlvbiIsImVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRwYXJlbnQiLCJjbG9zZXN0IiwicmFkaW8iLCIkcmFkaW8iLCJjbGljayIsIm1ha2VPcHRpb25JZHNVbmlxdWUiLCJWRVJTSU9OIiwiY29uc29sZSIsImxvZyIsIm1vZGUiLCJlcnJvckRlZmF1bHQiLCJzaG93TW9iaWxlSW5DYXJvdXNlbCIsInByb2R1Y3RMaW1pdCIsImxvYWRpbmciLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImJpbmQiLCJnZXRQYWdlIiwicmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsInVwc2VsbFRhcmdldHMiLCJTZXQiLCJyZW1vdmVDYXJ0SXRlbVRhcmdldHMiLCJjYXJ0SXRlbURhdGEiLCJjYXJ0SXRlbSIsInByb2R1Y3R1cmwiLCJvcmlnaW4iLCJ0b1N0cmluZyIsInVwc2VsbEl0ZW1zIiwidXBzZWxsaXRlbSIsImdldFJhbmRvbUludCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRBdXRvVGFyZ2V0cyIsIml0ZW1JbmRleCIsImVxIiwic3RvcmVkRGF0YSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkVXBzZWxsVGFyZ2V0cyIsIm9wdHMiLCJjb25maWciLCJyZWxhdGVkX3Byb2R1Y3RzIiwibGltaXQiLCJzaW1pbGFyX2J5X3ZpZXdzIiwicmVzIiwidGFyZ2V0cyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJsb2FkQ3VzdG9tRmllbGRUYXJnZXRzIiwidXBzZWxsSXRlbSIsImxvYWRDU1ZUYXJnZXRzIiwiY3B1SFRNTHRleHQiLCJzZXNzaW9uU3RvcmFnZSIsImNwdUhUTUwiLCJ1cHNlbGxTdWl0ZUNQVSIsInBhcnNlQXJyYXlGcm9tU3RyaW5nIiwicmVtYWluaW5nU2xvdHMiLCJnZXRBZGRpdGlvbmFsUHJvZHVjdHMiLCJwcm9kdWN0X2lkIiwiZXJyb3IiLCJhcHBseVVwc2VsbEhhbmRsZXJzIiwiYWRkVG9DYXJ0Iiwic2xpZGVEb3duIiwidG9nZ2xlT3B0aW9ucyIsImZvcm0iLCJpdGVtQWRkIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImVycm9yT2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInRleHRDb250ZW50Iiwic3luY0Zvcm1PcHRpb24iLCJvcHQiLCJ0YXJnZXRJZCIsImFkZFRvQ2FydEZyb21Nb2RhbCIsIm1vZGFsQ29udGVudCIsIm9uQ2xvc2UiLCJjbG9zZSIsInNob3dPcHRpb25zIiwiZSIsIm9wdGlvbk1hcmt1cCIsImN1c3RvbUNsYXNzIiwic2hvd0Nsb3NlQnV0dG9uIiwic2hvd0NvbmZpcm1CdXR0b24iLCJvbk9wZW4iLCJvcHRpb25IYW5kbGVycyIsInRoaXNJRCIsImRpc3BsYXlJbkNhcm91c2VsIiwic2xpY2UiLCJydW5RdWV1ZUluT3JkZXIiLCJzaGlmdCIsInJlcXVlc3RNZXRob2QiLCJmb3JtYXRDYXJvdXNlbCIsIm1lZGlhTWF0Y2giLCJtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkiLCJiaW5kVG9XaW5kb3ciLCJtYXRjaGVzIiwic2xpY2siLCIkc3VtbWFyeUNvbnRhaW5lciIsIiRmbG9hdGluZ0J1dHRvbiIsIm1xIiwiV2lkdGhDaGFuZ2UiLCJmYWRlVGltaW5nIiwiaW5pdFdpbmRvd1Bvc2l0aW9uIiwic2Nyb2xsWSIsImlubmVySGVpZ2h0IiwiYm90dG9tV2luZG93UG9zaXRpb24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiYWRkTGlzdGVuZXIiLCJnb1RvQ2hlY2tvdXQiLCJ0b3RhbHNPZmZzZXQiLCJocmVmIiwic2NvcGUiLCJlbCIsIm9wdGlvbklkIiwibmV4dCIsIm9wdGlvbnNXaXRoTGFiZWxBdHRycyIsIm9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNDO0FBQ25CO0FBQ2lCO0FBRUs7QUFDUDtBQUFBLElBRWxDQSxJQUFJO0VBQUE7RUFBQTtJQUFBO0VBQUE7RUFBQTtFQUFBLE9BQ3JCQyxPQUFPLEdBQVAsbUJBQVU7SUFDTixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJO0lBQ2xCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsSUFBSSxDQUFDQyxZQUFZLEdBQUdELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1QyxJQUFJLENBQUNFLGFBQWEsR0FBR0YsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzVDLElBQUksQ0FBQ0csV0FBVyxHQUFHSCxDQUFDLENBQUMsb0JBQW9CLENBQUM7SUFDMUMsSUFBSSxDQUFDSSwyQkFBMkIsR0FBR0osQ0FBQyxDQUFDLHlDQUF5QyxDQUFDO0lBQy9FLElBQUksQ0FBQ0ssUUFBUSxHQUFHTCxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FDM0NNLElBQUksRUFBRSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0MsVUFBVSxHQUFHLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVc7SUFFcEQsSUFBSSxJQUFJLENBQUNILFVBQVUsRUFBRTtNQUNqQkksbUZBQXNCLEVBQUU7SUFDNUI7SUFFQSxJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJQyxpRUFBYyxDQUFDLElBQUksQ0FBQ0wsT0FBTyxDQUFDO0lBRXRELElBQUksQ0FBQ00sa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDQyxVQUFVLEVBQUU7RUFDckIsQ0FBQztFQUFBLE9BRURELGtCQUFrQixHQUFsQiw4QkFBcUI7SUFDakIsSUFBSUUsTUFBTSxDQUFDQyxlQUFlLEVBQUU7TUFDeEIsSUFBSSxDQUFDcEIsZ0JBQWdCLENBQUNxQixRQUFRLENBQUMscUJBQXFCLENBQUM7SUFDekQ7RUFDSixDQUFDO0VBQUEsT0FFREMsVUFBVSxHQUFWLG9CQUFXQyxPQUFPLEVBQUU7SUFBQTtJQUNoQixJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN6QyxJQUFJLENBQUNqQixpQkFBaUIsR0FBR2dCLE1BQU07SUFDL0IsSUFBSSxDQUFDZix3QkFBd0IsR0FBR2MsT0FBTyxDQUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRXRELElBQU1DLEdBQUcsR0FBR3pCLENBQUMsV0FBU3VCLE1BQU0sQ0FBRztJQUMvQixJQUFNRyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDRyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDdEMsSUFBTUMsTUFBTSxHQUFHRixRQUFRLENBQUNGLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFNTSxNQUFNLEdBQUdILFFBQVEsQ0FBQ0YsR0FBRyxDQUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQU1PLFFBQVEsR0FBR04sR0FBRyxDQUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDN0MsSUFBTVEsUUFBUSxHQUFHUCxHQUFHLENBQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUM3QyxJQUFNUyxNQUFNLEdBQUdYLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssR0FBR0UsTUFBTSxHQUFHLENBQUMsR0FBR0EsTUFBTSxHQUFHLENBQUM7SUFDekU7SUFDQSxJQUFJTyxNQUFNLEdBQUdILE1BQU0sRUFBRTtNQUNqQixPQUFPSSwyREFBSSxDQUFDQyxJQUFJLENBQUM7UUFDYkMsSUFBSSxFQUFFTCxRQUFRO1FBQ2RNLElBQUksRUFBRTtNQUNWLENBQUMsQ0FBQztJQUNOLENBQUMsTUFBTSxJQUFJUixNQUFNLEdBQUcsQ0FBQyxJQUFJSSxNQUFNLEdBQUdKLE1BQU0sRUFBRTtNQUN0QyxPQUFPSywyREFBSSxDQUFDQyxJQUFJLENBQUM7UUFDYkMsSUFBSSxFQUFFSixRQUFRO1FBQ2RLLElBQUksRUFBRTtNQUNWLENBQUMsQ0FBQztJQUNOO0lBRUEsSUFBSSxDQUFDaEMsUUFBUSxDQUFDaUMsSUFBSSxFQUFFO0lBRXBCQyxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQ0MsVUFBVSxDQUFDbkIsTUFBTSxFQUFFVSxNQUFNLEVBQUUsVUFBQ1UsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDekQsS0FBSSxDQUFDdkMsUUFBUSxDQUFDQyxJQUFJLEVBQUU7TUFFcEIsSUFBSXNDLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3FCLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDcEM7UUFDQSxJQUFNQyxNQUFNLEdBQUliLE1BQU0sS0FBSyxDQUFFO1FBRTdCLEtBQUksQ0FBQ2MsY0FBYyxDQUFDRCxNQUFNLENBQUM7TUFDL0IsQ0FBQyxNQUFNO1FBQ0hyQixHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO1FBQ2ZRLDJEQUFJLENBQUNDLElBQUksQ0FBQztVQUNOQyxJQUFJLEVBQUVRLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNyQ1osSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRGEsdUJBQXVCLEdBQXZCLGlDQUF3QjVCLE9BQU8sRUFBRTZCLE1BQU0sRUFBUztJQUFBO0lBQUEsSUFBZkEsTUFBTTtNQUFOQSxNQUFNLEdBQUcsSUFBSTtJQUFBO0lBQzFDLElBQU01QixNQUFNLEdBQUdELE9BQU8sQ0FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN6QyxJQUFNQyxHQUFHLEdBQUd6QixDQUFDLFdBQVN1QixNQUFNLENBQUc7SUFDL0IsSUFBTU0sTUFBTSxHQUFHRixRQUFRLENBQUNGLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFNTSxNQUFNLEdBQUdILFFBQVEsQ0FBQ0YsR0FBRyxDQUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQU1FLE1BQU0sR0FBR3lCLE1BQU0sS0FBSyxJQUFJLEdBQUdBLE1BQU0sR0FBR3JCLE1BQU07SUFDaEQsSUFBTUMsUUFBUSxHQUFHTixHQUFHLENBQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUM3QyxJQUFNUSxRQUFRLEdBQUdQLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQzdDLElBQU1TLE1BQU0sR0FBR04sUUFBUSxDQUFDeUIsTUFBTSxDQUFDM0IsR0FBRyxDQUFDRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM5QyxJQUFJeUIsWUFBWTs7SUFFaEI7SUFDQSxJQUFJLENBQUNwQixNQUFNLEVBQUU7TUFDVG9CLFlBQVksR0FBRzVCLEdBQUcsQ0FBQ0csR0FBRyxFQUFFO01BQ3hCSCxHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO01BQ2YsT0FBT1EsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ2JDLElBQUksRUFBRSxJQUFJLENBQUMxQixPQUFPLENBQUM0QyxtQkFBbUIsQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsRUFBRUYsWUFBWSxDQUFDO1FBQ3ZFaEIsSUFBSSxFQUFFO01BQ1YsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFNLElBQUlKLE1BQU0sR0FBR0gsTUFBTSxFQUFFO01BQ3hCTCxHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO01BQ2YsT0FBT1EsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ2JDLElBQUksRUFBRUwsUUFBUTtRQUNkTSxJQUFJLEVBQUU7TUFDVixDQUFDLENBQUM7SUFDTixDQUFDLE1BQU0sSUFBSVIsTUFBTSxHQUFHLENBQUMsSUFBSUksTUFBTSxHQUFHSixNQUFNLEVBQUU7TUFDdENKLEdBQUcsQ0FBQ0csR0FBRyxDQUFDRixNQUFNLENBQUM7TUFDZixPQUFPUSwyREFBSSxDQUFDQyxJQUFJLENBQUM7UUFDYkMsSUFBSSxFQUFFSixRQUFRO1FBQ2RLLElBQUksRUFBRTtNQUNWLENBQUMsQ0FBQztJQUNOO0lBRUEsSUFBSSxDQUFDaEMsUUFBUSxDQUFDaUMsSUFBSSxFQUFFO0lBQ3BCQyxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQ0MsVUFBVSxDQUFDbkIsTUFBTSxFQUFFVSxNQUFNLEVBQUUsVUFBQ1UsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDekQsTUFBSSxDQUFDdkMsUUFBUSxDQUFDQyxJQUFJLEVBQUU7TUFFcEIsSUFBSXNDLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3FCLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDcEM7UUFDQSxJQUFNQyxNQUFNLEdBQUliLE1BQU0sS0FBSyxDQUFFO1FBRTdCLE1BQUksQ0FBQ2MsY0FBYyxDQUFDRCxNQUFNLENBQUM7TUFDL0IsQ0FBQyxNQUFNO1FBQ0hyQixHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO1FBQ2ZRLDJEQUFJLENBQUNDLElBQUksQ0FBQztVQUNOQyxJQUFJLEVBQUVRLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNyQ1osSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRG1CLGNBQWMsR0FBZCx3QkFBZWpDLE1BQU0sRUFBRTtJQUFBO0lBQ25CLElBQUksQ0FBQ2xCLFFBQVEsQ0FBQ2lDLElBQUksRUFBRTtJQUNwQkMsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNnQixVQUFVLENBQUNsQyxNQUFNLEVBQUUsVUFBQ29CLEdBQUcsRUFBRUMsUUFBUSxFQUFLO01BQ2pELElBQUlBLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3FCLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDcEMsTUFBSSxDQUFDRSxjQUFjLENBQUMsSUFBSSxDQUFDO01BQzdCLENBQUMsTUFBTTtRQUNIYiwyREFBSSxDQUFDQyxJQUFJLENBQUM7VUFDTkMsSUFBSSxFQUFFUSxRQUFRLENBQUNwQixJQUFJLENBQUN3QixNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7VUFDckNaLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRURxQixlQUFlLEdBQWYseUJBQWdCbkMsTUFBTSxFQUFFb0MsU0FBUyxFQUFFO0lBQUE7SUFDL0IsSUFBTWpELE9BQU87TUFBS2tELGtCQUFrQixFQUFFRDtJQUFTLEdBQUssSUFBSSxDQUFDakQsT0FBTyxDQUFFO0lBQ2xFLElBQU1tRCxLQUFLLEdBQUdDLGtFQUFZLEVBQUU7SUFFNUIsSUFBSSxJQUFJLENBQUNoRSxNQUFNLEtBQUssSUFBSSxFQUFFO01BQ3RCLElBQUksQ0FBQ0EsTUFBTSxHQUFHRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzdCO0lBRUEsSUFBTStELE9BQU8sR0FBRztNQUNaQyxRQUFRLEVBQUU7SUFDZCxDQUFDO0lBRURILEtBQUssQ0FBQ0ksSUFBSSxFQUFFO0lBQ1osSUFBSSxDQUFDbkUsTUFBTSxDQUFDb0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM5QyxRQUFRLENBQUMsY0FBYyxDQUFDO0lBRTNEbUIsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDMkIsaUJBQWlCLENBQUNDLGVBQWUsQ0FBQzdDLE1BQU0sRUFBRXdDLE9BQU8sRUFBRSxVQUFDcEIsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDNUVpQixLQUFLLENBQUNRLGFBQWEsQ0FBQ3pCLFFBQVEsQ0FBQzBCLE9BQU8sQ0FBQztNQUNyQyxJQUFNQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQW1CLEdBQVM7UUFDOUIsSUFBTUMsd0JBQXdCLEdBQUd4RSxDQUFDLENBQUMsbUNBQW1DLEVBQUUsTUFBSSxDQUFDRixNQUFNLENBQUM7UUFDcEYsSUFBTTJFLHVCQUF1QixHQUFHRCx3QkFBd0IsQ0FBQ0UsV0FBVyxFQUFFO1FBRXRFLElBQUlGLHdCQUF3QixDQUFDRyxNQUFNLElBQUlGLHVCQUF1QixFQUFFO1VBQzVERCx3QkFBd0IsQ0FBQ0ksR0FBRyxDQUFDLFFBQVEsRUFBRUgsdUJBQXVCLENBQUM7UUFDbkU7TUFDSixDQUFDO01BRUQsSUFBSSxNQUFJLENBQUMzRSxNQUFNLENBQUMrRSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDOUJOLG1CQUFtQixFQUFFO01BQ3pCLENBQUMsTUFBTTtRQUNILE1BQUksQ0FBQ3pFLE1BQU0sQ0FBQ2dGLEdBQUcsQ0FBQ0MseURBQVcsQ0FBQ0MsTUFBTSxFQUFFVCxtQkFBbUIsQ0FBQztNQUM1RDtNQUVBLE1BQUksQ0FBQ1UsY0FBYyxHQUFHLElBQUlDLGlFQUFlLENBQUMsTUFBSSxDQUFDcEYsTUFBTSxFQUFFWSxPQUFPLENBQUM7TUFFL0QsTUFBSSxDQUFDeUUsb0JBQW9CLEVBQUU7SUFDL0IsQ0FBQyxDQUFDO0lBRUY1QyxrRUFBSyxDQUFDNkMsS0FBSyxDQUFDQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsVUFBQ0MsS0FBSyxFQUFFQyxhQUFhLEVBQUs7TUFDOUQsSUFBTUMsS0FBSyxHQUFHeEYsQ0FBQyxDQUFDdUYsYUFBYSxDQUFDLENBQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDO01BQzNDLElBQU11QixPQUFPLEdBQUd6RixDQUFDLENBQUMsY0FBYyxFQUFFd0YsS0FBSyxDQUFDO01BQ3hDLElBQU1FLFdBQVcsR0FBRzFGLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztNQUV6Q3VDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQzJCLGlCQUFpQixDQUFDd0IsWUFBWSxDQUFDaEMsU0FBUyxFQUFFNkIsS0FBSyxDQUFDSSxTQUFTLEVBQUUsRUFBRSxVQUFDakQsR0FBRyxFQUFFa0QsTUFBTSxFQUFLO1FBQ3BGLElBQU1yRSxJQUFJLEdBQUdxRSxNQUFNLENBQUNyRSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRTlCLElBQUltQixHQUFHLEVBQUU7VUFDTFQsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1lBQ05DLElBQUksRUFBRU8sR0FBRztZQUNUTixJQUFJLEVBQUU7VUFDVixDQUFDLENBQUM7VUFDRixPQUFPLEtBQUs7UUFDaEI7UUFFQSxJQUFJYixJQUFJLENBQUNzRSxrQkFBa0IsRUFBRTtVQUN6QjlGLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTBGLFdBQVcsQ0FBQyxDQUFDdEQsSUFBSSxDQUFDWixJQUFJLENBQUNzRSxrQkFBa0IsQ0FBQztVQUNsRUwsT0FBTyxDQUFDTSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztVQUM5QkwsV0FBVyxDQUFDcEQsSUFBSSxFQUFFO1FBQ3RCLENBQUMsTUFBTTtVQUNIbUQsT0FBTyxDQUFDTSxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztVQUMvQkwsV0FBVyxDQUFDcEYsSUFBSSxFQUFFO1FBQ3RCO1FBRUEsSUFBSSxDQUFDa0IsSUFBSSxDQUFDd0UsV0FBVyxJQUFJLENBQUN4RSxJQUFJLENBQUN5RSxPQUFPLEVBQUU7VUFDcENSLE9BQU8sQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDbEMsQ0FBQyxNQUFNO1VBQ0hOLE9BQU8sQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDbkM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRGhELGNBQWMsR0FBZCx3QkFBZUQsTUFBTSxFQUFFO0lBQUE7SUFDbkIsSUFBTW9ELGNBQWMsR0FBR2xHLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQztJQUM5RCxJQUFNa0csY0FBYyxHQUFHbkcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO0lBRWxELElBQU0rRCxPQUFPLEdBQUc7TUFDWkMsUUFBUSxFQUFFO1FBQ05NLE9BQU8sRUFBRSxJQUFJLENBQUM3RCxVQUFVLEdBQUcscUJBQXFCLEdBQUcsY0FBYztRQUNqRTJGLE1BQU0sRUFBRSxJQUFJLENBQUMzRixVQUFVLEdBQUcsb0JBQW9CLEdBQUcsYUFBYTtRQUM5RDRGLFNBQVMsRUFBRSxpQkFBaUI7UUFDNUJDLGNBQWMsRUFBRSxzQkFBc0I7UUFDdENDLHlCQUF5QixFQUFFO01BQy9CO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBQ2xHLFFBQVEsQ0FBQ2lDLElBQUksRUFBRTs7SUFFcEI7SUFDQSxJQUFJUSxNQUFNLElBQUlvRCxjQUFjLENBQUN2QixNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ3ZDLE9BQU96RCxNQUFNLENBQUNzRixRQUFRLENBQUNDLE1BQU0sRUFBRTtJQUNuQztJQUVBbEUsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNpRSxVQUFVLENBQUMzQyxPQUFPLEVBQUUsVUFBQ3BCLEdBQUcsRUFBRUMsUUFBUSxFQUFLO01BQ2xELE1BQUksQ0FBQzNDLFlBQVksQ0FBQzBHLElBQUksQ0FBQy9ELFFBQVEsQ0FBQzBCLE9BQU8sQ0FBQztNQUN4QyxNQUFJLENBQUNuRSxXQUFXLENBQUN3RyxJQUFJLENBQUMvRCxRQUFRLENBQUN3RCxNQUFNLENBQUM7TUFDdEMsTUFBSSxDQUFDbEcsYUFBYSxDQUFDeUcsSUFBSSxDQUFDL0QsUUFBUSxDQUFDMEQsY0FBYyxDQUFDO01BQ2hELE1BQUksQ0FBQ2xHLDJCQUEyQixDQUFDdUcsSUFBSSxDQUFDL0QsUUFBUSxDQUFDMkQseUJBQXlCLENBQUM7TUFFekVKLGNBQWMsQ0FBQ1MsV0FBVyxDQUFDaEUsUUFBUSxDQUFDeUQsU0FBUyxDQUFDO01BQzlDLE1BQUksQ0FBQ3BGLFVBQVUsRUFBRTtNQUNqQixNQUFJLENBQUNaLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFO01BRXBCLElBQU11RyxRQUFRLEdBQUc3RyxDQUFDLENBQUMsc0JBQXNCLEVBQUUsTUFBSSxDQUFDQyxZQUFZLENBQUMsQ0FBQ3VCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO01BRXZGeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOEcsT0FBTyxDQUFDLHNCQUFzQixFQUFFRCxRQUFRLENBQUM7TUFFbkQ3RyxDQUFDLHlCQUF1QixNQUFJLENBQUNPLGlCQUFpQixTQUFNLE1BQUksQ0FBQ04sWUFBWSxDQUFDLENBQ2pFOEcsTUFBTSxvQkFBa0IsTUFBSSxDQUFDdkcsd0JBQXdCLFFBQUssQ0FDMURzRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVERSxjQUFjLEdBQWQsMEJBQWlCO0lBQUE7SUFDYixJQUFNQyxlQUFlLEdBQUcsR0FBRztJQUMzQixJQUFNNUYsVUFBVSxHQUFHLG1EQUFLLHVEQUFTLElBQUksQ0FBQ0EsVUFBVSxFQUFFNEYsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ3pFLElBQU0vRCx1QkFBdUIsR0FBRyxtREFBSyx1REFBUyxJQUFJLENBQUNBLHVCQUF1QixFQUFFK0QsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ25HLElBQU16RCxjQUFjLEdBQUcsbURBQUssdURBQVMsSUFBSSxDQUFDQSxjQUFjLEVBQUV5RCxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDakYsSUFBSTlELE1BQU07O0lBRVY7SUFDQW5ELENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDb0YsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDNUQsSUFBTWhFLE9BQU8sR0FBR3RCLENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDO01BRXRDRCxLQUFLLENBQUM0QixjQUFjLEVBQUU7O01BRXRCO01BQ0E3RixVQUFVLENBQUNDLE9BQU8sQ0FBQztJQUN2QixDQUFDLENBQUM7O0lBRUY7SUFDQXRCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDb0YsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTOEIsVUFBVSxHQUFHO01BQzNFaEUsTUFBTSxHQUFHLElBQUksQ0FBQ2lFLEtBQUs7SUFDdkIsQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFBL0IsS0FBSyxFQUFJO01BQ2YsSUFBTWhFLE9BQU8sR0FBR3RCLENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDO01BQ3RDRCxLQUFLLENBQUM0QixjQUFjLEVBQUU7O01BRXRCO01BQ0FoRSx1QkFBdUIsQ0FBQzVCLE9BQU8sRUFBRTZCLE1BQU0sQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRm5ELENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDQyxZQUFZLENBQUMsQ0FBQ29GLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3RELElBQU0vRCxNQUFNLEdBQUd2QixDQUFDLENBQUNzRixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQztNQUN4RCxJQUFNOEYsTUFBTSxHQUFHdEgsQ0FBQyxDQUFDc0YsS0FBSyxDQUFDQyxhQUFhLENBQUMsQ0FBQy9ELElBQUksQ0FBQyxlQUFlLENBQUM7TUFDM0RVLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNOQyxJQUFJLEVBQUVrRixNQUFNO1FBQ1pqRixJQUFJLEVBQUUsU0FBUztRQUNma0YsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QkMsZ0JBQWdCLEVBQUUsTUFBSSxDQUFDOUcsT0FBTyxDQUFDOEc7TUFDbkMsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFDNUIsTUFBTSxFQUFLO1FBQ2hCLElBQUlBLE1BQU0sQ0FBQ3VCLEtBQUssRUFBRTtVQUNkO1VBQ0E1RCxjQUFjLENBQUNqQyxNQUFNLENBQUM7UUFDMUI7TUFDSixDQUFDLENBQUM7TUFDRitELEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtJQUMxQixDQUFDLENBQUM7SUFFRmxILENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDb0YsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDMUQsSUFBTS9ELE1BQU0sR0FBR3ZCLENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDLENBQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDO01BQ3RELElBQU1tQyxTQUFTLEdBQUczRCxDQUFDLENBQUNzRixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQztNQUMxRDhELEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtNQUN0QjtNQUNBLE1BQUksQ0FBQ3hELGVBQWUsQ0FBQ25DLE1BQU0sRUFBRW9DLFNBQVMsQ0FBQztJQUMzQyxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRCtELG1CQUFtQixHQUFuQiwrQkFBc0I7SUFBQTtJQUNsQixJQUFNQyxnQkFBZ0IsR0FBRzNILENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDMUMsSUFBTTRILFdBQVcsR0FBRzVILENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDckMsSUFBTTZILFVBQVUsR0FBRzdILENBQUMsQ0FBQyxxQkFBcUIsRUFBRTRILFdBQVcsQ0FBQztJQUV4RDVILENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDcUYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDdkNBLEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtNQUV0QmxILENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDLENBQUNqRixJQUFJLEVBQUU7TUFDN0JxSCxnQkFBZ0IsQ0FBQ3JGLElBQUksRUFBRTtNQUN2QnRDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDc0MsSUFBSSxFQUFFO01BQy9CdUYsVUFBVSxDQUFDZixPQUFPLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGOUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUNxRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMxQ0EsS0FBSyxDQUFDNEIsY0FBYyxFQUFFO01BRXRCUyxnQkFBZ0IsQ0FBQ3JILElBQUksRUFBRTtNQUN2Qk4sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUNNLElBQUksRUFBRTtNQUMvQk4sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNzQyxJQUFJLEVBQUU7SUFDaEMsQ0FBQyxDQUFDO0lBRUZzRixXQUFXLENBQUN2QyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUM5QixJQUFNd0MsSUFBSSxHQUFHRCxVQUFVLENBQUNqRyxHQUFHLEVBQUU7TUFFN0IwRCxLQUFLLENBQUM0QixjQUFjLEVBQUU7O01BRXRCO01BQ0EsSUFBSSxDQUFDWSxJQUFJLEVBQUU7UUFDUCxPQUFPNUYsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1VBQ2JDLElBQUksRUFBRXlGLFVBQVUsQ0FBQ3JHLElBQUksQ0FBQyxPQUFPLENBQUM7VUFDOUJhLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOO01BRUFFLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDc0YsU0FBUyxDQUFDRCxJQUFJLEVBQUUsVUFBQ25GLEdBQUcsRUFBRUMsUUFBUSxFQUFLO1FBQzlDLElBQUlBLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3FCLE1BQU0sS0FBSyxTQUFTLEVBQUU7VUFDcEMsTUFBSSxDQUFDRSxjQUFjLEVBQUU7UUFDekIsQ0FBQyxNQUFNO1VBQ0hiLDJEQUFJLENBQUNDLElBQUksQ0FBQztZQUNOd0UsSUFBSSxFQUFFL0QsUUFBUSxDQUFDcEIsSUFBSSxDQUFDd0IsTUFBTSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JDWixJQUFJLEVBQUU7VUFDVixDQUFDLENBQUM7UUFDTjtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEMkYseUJBQXlCLEdBQXpCLHFDQUE0QjtJQUFBO0lBQ3hCLElBQU1DLGNBQWMsR0FBR2pJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztJQUNsRCxJQUFNa0ksU0FBUyxHQUFHbEksQ0FBQyxDQUFDLDZCQUE2QixDQUFDO0lBQ2xELElBQU1tSSxVQUFVLEdBQUduSSxDQUFDLENBQUMsbUJBQW1CLEVBQUVrSSxTQUFTLENBQUM7SUFFcERsSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQ3FGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzVDQSxLQUFLLENBQUM0QixjQUFjLEVBQUU7TUFDdEJsSCxDQUFDLENBQUNzRixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDNkMsTUFBTSxFQUFFO01BQy9CSCxjQUFjLENBQUNHLE1BQU0sRUFBRTtNQUN2QnBJLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDb0ksTUFBTSxFQUFFO0lBQzFDLENBQUMsQ0FBQztJQUVGcEksQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUNxRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMvQ0EsS0FBSyxDQUFDNEIsY0FBYyxFQUFFO01BQ3RCZSxjQUFjLENBQUNHLE1BQU0sRUFBRTtNQUN2QnBJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDb0ksTUFBTSxFQUFFO01BQ25DcEksQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUNvSSxNQUFNLEVBQUU7SUFDMUMsQ0FBQyxDQUFDO0lBRUZGLFNBQVMsQ0FBQzdDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzVCLElBQU13QyxJQUFJLEdBQUdLLFVBQVUsQ0FBQ3ZHLEdBQUcsRUFBRTtNQUU3QjBELEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtNQUV0QixJQUFJLENBQUNtQixrRkFBb0IsQ0FBQ1AsSUFBSSxDQUFDLEVBQUU7UUFDN0IsSUFBTVEsb0JBQW9CLEdBQUdDLG9HQUEyQixDQUFDLE1BQUksQ0FBQzdILE9BQU8sQ0FBQztRQUN0RSxPQUFPd0IsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1VBQ2JDLElBQUksRUFBRWtHLG9CQUFvQixDQUFDRSx3QkFBd0I7VUFDbkRuRyxJQUFJLEVBQUU7UUFDVixDQUFDLENBQUM7TUFDTjtNQUVBRSxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQ2dHLG9CQUFvQixDQUFDWCxJQUFJLEVBQUUsVUFBQ25GLEdBQUcsRUFBRStGLElBQUksRUFBSztRQUNyRCxJQUFJQSxJQUFJLENBQUNsSCxJQUFJLENBQUNxQixNQUFNLEtBQUssU0FBUyxFQUFFO1VBQ2hDLE1BQUksQ0FBQ0UsY0FBYyxFQUFFO1FBQ3pCLENBQUMsTUFBTTtVQUNIYiwyREFBSSxDQUFDQyxJQUFJLENBQUM7WUFDTndFLElBQUksRUFBRStCLElBQUksQ0FBQ2xILElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQ1osSUFBSSxFQUFFO1VBQ1YsQ0FBQyxDQUFDO1FBQ047TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRHNHLHNCQUFzQixHQUF0QixrQ0FBeUI7SUFBQTtJQUNyQixJQUFNOUUsS0FBSyxHQUFHQyxrRUFBWSxFQUFFO0lBRTVCOUQsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNxRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMzQyxJQUFNL0QsTUFBTSxHQUFHdkIsQ0FBQyxDQUFDc0YsS0FBSyxDQUFDQyxhQUFhLENBQUMsQ0FBQy9ELElBQUksQ0FBQyxjQUFjLENBQUM7TUFDMUQsSUFBTXVDLE9BQU8sR0FBRztRQUNaQyxRQUFRLEVBQUU7TUFDZCxDQUFDO01BRURzQixLQUFLLENBQUM0QixjQUFjLEVBQUU7TUFFdEJyRCxLQUFLLENBQUNJLElBQUksRUFBRTtNQUVaMUIsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNtRywwQkFBMEIsQ0FBQ3JILE1BQU0sRUFBRXdDLE9BQU8sRUFBRSxVQUFDcEIsR0FBRyxFQUFFQyxRQUFRLEVBQUs7UUFDMUVpQixLQUFLLENBQUNRLGFBQWEsQ0FBQ3pCLFFBQVEsQ0FBQzBCLE9BQU8sQ0FBQztRQUVyQyxNQUFJLENBQUNhLG9CQUFvQixFQUFFO01BQy9CLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEQSxvQkFBb0IsR0FBcEIsZ0NBQXVCO0lBQ25CbkYsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNxRixFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUM1QyxJQUFNdUQsT0FBTyxHQUFHN0ksQ0FBQyxDQUFDc0YsS0FBSyxDQUFDQyxhQUFhLENBQUM7TUFDdEMsSUFBTXVELEVBQUUsR0FBR0QsT0FBTyxDQUFDakgsR0FBRyxFQUFFO01BQ3hCLElBQU1tSCxLQUFLLEdBQUdGLE9BQU8sQ0FBQ3JILElBQUksQ0FBQyxPQUFPLENBQUM7TUFFbkMsSUFBSSxDQUFDc0gsRUFBRSxFQUFFO1FBQ0w7TUFDSjtNQUVBLElBQU1FLFlBQVksR0FBR0gsT0FBTyxDQUFDM0UsSUFBSSxtQkFBaUI0RSxFQUFFLE9BQUksQ0FBQ3RILElBQUksQ0FBQyxjQUFjLENBQUM7TUFFN0V4QixDQUFDLDBCQUF3QitJLEtBQUssQ0FBRyxDQUFDekksSUFBSSxFQUFFO01BQ3hDTixDQUFDLDBCQUF3QitJLEtBQUssU0FBSUQsRUFBRSxDQUFHLENBQUN4RyxJQUFJLEVBQUU7TUFFOUMsSUFBSTBHLFlBQVksRUFBRTtRQUNkaEosQ0FBQyw0QkFBMEIrSSxLQUFLLENBQUcsQ0FBQ3pHLElBQUksRUFBRTtNQUM5QyxDQUFDLE1BQU07UUFDSHRDLENBQUMsNEJBQTBCK0ksS0FBSyxDQUFHLENBQUN6SSxJQUFJLEVBQUU7TUFDOUM7SUFDSixDQUFDLENBQUM7SUFFRk4sQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM4RyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBRTNDLFNBQVNtQyxXQUFXLEdBQUc7TUFDbkIsSUFBTTdCLEtBQUssR0FBR3BILENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDNEIsR0FBRyxFQUFFO01BQ2xFLElBQU1zSCxXQUFXLEdBQUdsSixDQUFDLENBQUMsc0JBQXNCLENBQUM7TUFDN0MsSUFBTW1KLFVBQVUsR0FBR25KLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztNQUU5QyxJQUFJb0gsS0FBSyxLQUFLLE1BQU0sRUFBRTtRQUNsQjhCLFdBQVcsQ0FBQzVHLElBQUksRUFBRTtRQUNsQjZHLFVBQVUsQ0FBQzdJLElBQUksRUFBRTtNQUNyQixDQUFDLE1BQU07UUFDSDRJLFdBQVcsQ0FBQzVJLElBQUksRUFBRTtRQUNsQjZJLFVBQVUsQ0FBQzdHLElBQUksRUFBRTtNQUNyQjtJQUNKO0lBRUF0QyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQ3FGLEVBQUUsQ0FBQyxPQUFPLEVBQUU0RCxXQUFXLENBQUM7SUFFbkRBLFdBQVcsRUFBRTtFQUNqQixDQUFDO0VBQUEsT0FFRGhJLFVBQVUsR0FBVixzQkFBYTtJQUFBO0lBQ1QsSUFBSSxDQUFDK0YsY0FBYyxFQUFFO0lBQ3JCLElBQUksQ0FBQ1UsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxDQUFDaUIsc0JBQXNCLEVBQUU7SUFDN0IsSUFBSSxDQUFDWCx5QkFBeUIsRUFBRTs7SUFFaEM7SUFDQSxJQUFNb0IscUJBQXFCLEdBQUc7TUFDMUJDLE9BQU8sRUFBRSxJQUFJLENBQUMzSSxPQUFPLENBQUM0SSwyQkFBMkI7TUFDakRDLFFBQVEsRUFBRSxJQUFJLENBQUM3SSxPQUFPLENBQUM4STtJQUMzQixDQUFDO0lBQ0QsSUFBSSxDQUFDQyxpQkFBaUIsR0FBRyxJQUFJQyxnRUFBaUIsQ0FBQzFKLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFb0oscUJBQXFCLENBQUM7O0lBRXJHO0lBQ0FwSixDQUFDLENBQUMySixRQUFRLENBQUMsQ0FBQ3RFLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtNQUFBLE9BQU0sT0FBSSxDQUFDdEMsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUFBLEVBQUM7RUFFaEYsQ0FBQztFQUFBO0FBQUEsRUFqZTZCNkcscURBQVc7Ozs7Ozs7Ozs7Ozs7O0FDYjdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUQ7QUFDbkI7QUFDZTtBQUNvQztBQUM1QjtBQUNkO0FBQUEsSUFFcEJGLGlCQUFpQjtFQUNsQywyQkFBWUcsUUFBUSxFQUFFVCxxQkFBcUIsRUFBRTtJQUN6QyxJQUFJLENBQUNTLFFBQVEsR0FBR0EsUUFBUTtJQUV4QixJQUFJLENBQUNDLE1BQU0sR0FBRzlKLENBQUMsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUM2SixRQUFRLENBQUM7SUFDM0QsSUFBSSxDQUFDRSxxQkFBcUIsR0FBRyxLQUFLO0lBQ2xDLElBQUksQ0FBQ1gscUJBQXFCLEdBQUdBLHFCQUFxQjtJQUNsRCxJQUFJLENBQUNZLGtCQUFrQixFQUFFO0lBQ3pCLElBQUksQ0FBQ0Msc0JBQXNCLEVBQUU7SUFDN0IsSUFBSSxDQUFDQyxtQkFBbUIsRUFBRTtFQUM5QjtFQUFDO0VBQUEsT0FFREYsa0JBQWtCLEdBQWxCLDhCQUFxQjtJQUFBO0lBQ2pCLElBQU1HLHNCQUFzQixHQUFHbkssQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBRXBELElBQUksQ0FBQ3lKLGlCQUFpQixHQUFHLCtCQUErQjtJQUN4RCxJQUFJLENBQUNXLGlCQUFpQixHQUFHQywyREFBRyxDQUFDO01BQ3pCQyxNQUFNLEVBQUssSUFBSSxDQUFDYixpQkFBaUIsK0JBQTRCO01BQzdEYyxHQUFHLEVBQUVDLGtGQUF5QkE7SUFDbEMsQ0FBQyxDQUFDO0lBRUZ4SyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDNkosUUFBUSxDQUFDLENBQUN4RSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMvRDtNQUNBO01BQ0E7TUFDQSxJQUFJNkUsc0JBQXNCLENBQUNNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQ04sc0JBQXNCLENBQUNPLFVBQVUsQ0FBQyxNQUFNLENBQUM7TUFDN0M7TUFFQVAsc0JBQXNCLENBQUNNLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO01BQzVDO01BQ0E7TUFDQTtNQUNBLElBQUl6SyxDQUFDLENBQUksS0FBSSxDQUFDeUosaUJBQWlCLHdDQUFtQyxDQUFDN0gsR0FBRyxFQUFFLEVBQUU7UUFDdEUsS0FBSSxDQUFDd0ksaUJBQWlCLENBQUNPLFlBQVksRUFBRTtNQUN6QztNQUVBLElBQUksS0FBSSxDQUFDUCxpQkFBaUIsQ0FBQ1EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDO01BQ0o7TUFFQXRGLEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtJQUMxQixDQUFDLENBQUM7SUFFRixJQUFJLENBQUMyRCxjQUFjLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxtQkFBbUIsRUFBRTtJQUMxQixJQUFJLENBQUNDLFlBQVksRUFBRTtFQUN2QixDQUFDO0VBQUEsT0FFREYsY0FBYyxHQUFkLDBCQUFpQjtJQUNiLElBQUksQ0FBQ1QsaUJBQWlCLENBQUNZLEdBQUcsQ0FBQyxDQUN2QjtNQUNJQyxRQUFRLEVBQUssSUFBSSxDQUFDeEIsaUJBQWlCLHVDQUFrQztNQUNyRXlCLFFBQVEsRUFBRSxrQkFBQ0MsRUFBRSxFQUFFdkosR0FBRyxFQUFLO1FBQ25CLElBQU13SixTQUFTLEdBQUdoSSxNQUFNLENBQUN4QixHQUFHLENBQUM7UUFDN0IsSUFBTWlFLE1BQU0sR0FBR3VGLFNBQVMsS0FBSyxDQUFDLElBQUksQ0FBQ2hJLE1BQU0sQ0FBQ2lJLEtBQUssQ0FBQ0QsU0FBUyxDQUFDO1FBRTFERCxFQUFFLENBQUN0RixNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0R5RixZQUFZLEVBQUUsSUFBSSxDQUFDbEMscUJBQXFCLENBQUNDO0lBQzdDLENBQUMsQ0FDSixDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRUR5QixtQkFBbUIsR0FBbkIsK0JBQXNCO0lBQUE7SUFDbEIsSUFBSSxDQUFDVixpQkFBaUIsQ0FBQ1ksR0FBRyxDQUFDLENBQ3ZCO01BQ0lDLFFBQVEsRUFBRWpMLENBQUMsQ0FBSSxJQUFJLENBQUN5SixpQkFBaUIsc0NBQWlDO01BQ3RFeUIsUUFBUSxFQUFFLGtCQUFDQyxFQUFFLEVBQUs7UUFDZCxJQUFJdEYsTUFBTTtRQUVWLElBQU0wRixJQUFJLEdBQUd2TCxDQUFDLENBQUksTUFBSSxDQUFDeUosaUJBQWlCLHNDQUFpQztRQUV6RSxJQUFJOEIsSUFBSSxDQUFDNUcsTUFBTSxFQUFFO1VBQ2IsSUFBTTZHLE1BQU0sR0FBR0QsSUFBSSxDQUFDM0osR0FBRyxFQUFFO1VBRXpCaUUsTUFBTSxHQUFHMkYsTUFBTSxJQUFJQSxNQUFNLENBQUM3RyxNQUFNLElBQUk2RyxNQUFNLEtBQUssZ0JBQWdCO1FBQ25FO1FBRUFMLEVBQUUsQ0FBQ3RGLE1BQU0sQ0FBQztNQUNkLENBQUM7TUFDRHlGLFlBQVksRUFBRSxJQUFJLENBQUNsQyxxQkFBcUIsQ0FBQ0c7SUFDN0MsQ0FBQyxDQUNKLENBQUM7RUFDTjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0F3QixZQUFZLEdBQVosd0JBQWU7SUFDWCxJQUFNVSxhQUFhLEdBQUcsK0JBQStCO0lBRXJEekwsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDcUYsRUFBRSxDQUFDLE9BQU8sRUFBRW9HLGFBQWEsRUFBRSxVQUFDbkcsS0FBSyxFQUFLO01BQzVDLElBQU1vRyxpQkFBaUIsR0FBRzFMLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztNQUNuRCxJQUFNMkwscUJBQXFCLEdBQUczTCxDQUFDLENBQUMsMEJBQTBCLENBQUM7TUFFM0RzRixLQUFLLENBQUM0QixjQUFjLEVBQUU7TUFFdEJ3RSxpQkFBaUIsQ0FBQ0UsV0FBVyxDQUFDLGtCQUFrQixDQUFDO01BQ2pERCxxQkFBcUIsQ0FBQ0MsV0FBVyxDQUFDLGtCQUFrQixDQUFDO0lBQ3pELENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEM0Isc0JBQXNCLEdBQXRCLGtDQUF5QjtJQUFBO0lBQ3JCLElBQUk0QixLQUFLOztJQUVUO0lBQ0FDLHFFQUFZLENBQUMsSUFBSSxDQUFDaEMsTUFBTSxFQUFFLElBQUksQ0FBQ3BKLE9BQU8sRUFBRTtNQUFFcUwsY0FBYyxFQUFFO0lBQUssQ0FBQyxFQUFFLFVBQUNwSixHQUFHLEVBQUVxSixLQUFLLEVBQUs7TUFDOUUsSUFBSXJKLEdBQUcsRUFBRTtRQUNMVCwyREFBSSxDQUFDQyxJQUFJLENBQUM7VUFDTkMsSUFBSSxFQUFFTyxHQUFHO1VBQ1ROLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztRQUVGLE1BQU0sSUFBSTRKLEtBQUssQ0FBQ3RKLEdBQUcsQ0FBQztNQUN4QjtNQUVBLElBQU11SixNQUFNLEdBQUdsTSxDQUFDLENBQUNnTSxLQUFLLENBQUM7TUFFdkIsSUFBSSxNQUFJLENBQUM1QixpQkFBaUIsQ0FBQytCLFNBQVMsQ0FBQyxNQUFJLENBQUNyQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7UUFDL0QsTUFBSSxDQUFDTSxpQkFBaUIsQ0FBQ3RILE1BQU0sQ0FBQyxNQUFJLENBQUNnSCxNQUFNLENBQUM7TUFDOUM7TUFFQSxJQUFJK0IsS0FBSyxFQUFFO1FBQ1AsTUFBSSxDQUFDekIsaUJBQWlCLENBQUN0SCxNQUFNLENBQUMrSSxLQUFLLENBQUM7TUFDeEM7TUFFQSxJQUFJSyxNQUFNLENBQUNFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNyQlAsS0FBSyxHQUFHRyxLQUFLO1FBQ2IsTUFBSSxDQUFDbEIsbUJBQW1CLEVBQUU7TUFDOUIsQ0FBQyxNQUFNO1FBQ0hvQixNQUFNLENBQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDO1FBQzVDNEIsbUVBQVUsQ0FBQ0Msc0JBQXNCLENBQUNOLEtBQUssQ0FBQztNQUM1Qzs7TUFFQTtNQUNBO01BQ0E7TUFDQWhNLENBQUMsQ0FBQyxNQUFJLENBQUN5SixpQkFBaUIsQ0FBQyxDQUFDdkYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUNxSSxXQUFXLENBQUMscUJBQXFCLENBQUM7SUFDN0YsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRURDLHdCQUF3QixHQUF4QixrQ0FBeUJDLFlBQVksRUFBRUMsY0FBYyxFQUFFQyxnQkFBZ0IsRUFBRTtJQUNyRSxJQUFNQyx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCLENBQUlDLGtCQUFrQixFQUFLO01BQ3JEN00sQ0FBQyxDQUFDeU0sWUFBWSxDQUFDLENBQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUVvQyxrQkFBa0IsQ0FBQztNQUMzRDdNLENBQUMsQ0FBQzBNLGNBQWMsQ0FBQyxDQUFDdEssSUFBSSxDQUFDcEMsQ0FBQyxPQUFLNk0sa0JBQWtCLENBQUcsQ0FBQ3pLLElBQUksRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDMkgscUJBQXFCLEVBQUU7TUFDN0I2Qyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQztNQUMzQ0QsZ0JBQWdCLENBQUNKLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDNUMsQ0FBQyxNQUFNO01BQ0hLLHdCQUF3QixDQUFDLGVBQWUsQ0FBQztNQUN6Q0QsZ0JBQWdCLENBQUN2TCxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3pDO0lBQ0EsSUFBSSxDQUFDMkkscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUNBLHFCQUFxQjtFQUM1RCxDQUFDO0VBQUEsT0FFREcsbUJBQW1CLEdBQW5CLCtCQUFzQjtJQUFBO0lBQ2xCLElBQU00QyxtQkFBbUIsR0FBRzlNLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxJQUFNK00sY0FBYyxHQUFHL00sQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQzNDZ04sbUVBQWtCLEVBQUU7SUFDcEJELGNBQWMsQ0FBQzFILEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ2pDLElBQU0ySCxNQUFNLEdBQUc7UUFDWEMsVUFBVSxFQUFFbE4sQ0FBQyxDQUFDLDJCQUEyQixFQUFFK00sY0FBYyxDQUFDLENBQUNuTCxHQUFHLEVBQUU7UUFDaEV1TCxRQUFRLEVBQUVuTixDQUFDLENBQUMseUJBQXlCLEVBQUUrTSxjQUFjLENBQUMsQ0FBQ25MLEdBQUcsRUFBRTtRQUM1RHdMLElBQUksRUFBRXBOLENBQUMsQ0FBQyx3QkFBd0IsRUFBRStNLGNBQWMsQ0FBQyxDQUFDbkwsR0FBRyxFQUFFO1FBQ3ZEeUwsUUFBUSxFQUFFck4sQ0FBQyxDQUFDLHVCQUF1QixFQUFFK00sY0FBYyxDQUFDLENBQUNuTCxHQUFHO01BQzVELENBQUM7TUFFRDBELEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtNQUV0QjNFLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDNkssaUJBQWlCLENBQUNMLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxVQUFDdEssR0FBRyxFQUFFQyxRQUFRLEVBQUs7UUFDaEY1QyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzJHLElBQUksQ0FBQy9ELFFBQVEsQ0FBQzBCLE9BQU8sQ0FBQzs7UUFFNUM7UUFDQXRFLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDcUYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBa0ksVUFBVSxFQUFJO1VBQ2xELElBQU1DLE9BQU8sR0FBR3hOLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDNEIsR0FBRyxFQUFFO1VBRWxEMkwsVUFBVSxDQUFDckcsY0FBYyxFQUFFO1VBRTNCM0Usa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNnTCxtQkFBbUIsQ0FBQ0QsT0FBTyxFQUFFLFlBQU07WUFDOUN0TSxNQUFNLENBQUNzRixRQUFRLENBQUNDLE1BQU0sRUFBRTtVQUM1QixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7TUFDTixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7SUFFRnpHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDcUYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDOUNBLEtBQUssQ0FBQzRCLGNBQWMsRUFBRTtNQUN0QixNQUFJLENBQUNzRix3QkFBd0IsQ0FBQ2xILEtBQUssQ0FBQ0MsYUFBYSxFQUFFLG1DQUFtQyxFQUFFdUgsbUJBQW1CLENBQUM7SUFDaEgsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TTBDO0FBQ29DO0FBRWhCO0FBQUEsSUFFOUM1SCxlQUFlO0VBQUE7RUFDaEMseUJBQVl3SSxNQUFNLEVBQUVoTixPQUFPLEVBQUVpTixxQkFBcUIsRUFBTztJQUFBO0lBQUEsSUFBNUJBLHFCQUFxQjtNQUFyQkEscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQUE7SUFDbkQsdUNBQU1ELE1BQU0sRUFBRWhOLE9BQU8sQ0FBQztJQUV0QixJQUFNOEUsS0FBSyxHQUFHeEYsQ0FBQyxDQUFDLDRCQUE0QixFQUFFLE1BQUswTixNQUFNLENBQUM7SUFDMUQsSUFBTUUsc0JBQXNCLEdBQUc1TixDQUFDLENBQUMsbUNBQW1DLEVBQUV3RixLQUFLLENBQUM7SUFDNUUsSUFBTXFJLFVBQVUsR0FBR0Qsc0JBQXNCLENBQUNqSCxJQUFJLEVBQUUsQ0FBQ21ILElBQUksRUFBRSxDQUFDbkosTUFBTTtJQUM5RCxJQUFNb0osaUJBQWlCLEdBQUdILHNCQUFzQixDQUFDMUosSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUNTLE1BQU07SUFFOUVpSixzQkFBc0IsQ0FBQ3ZJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBTTtNQUN0QyxNQUFLMkksaUJBQWlCLEVBQUU7SUFDNUIsQ0FBQyxDQUFDO0lBRUYsSUFBTUMsb0JBQW9CLEdBQUdDLDJFQUFxQixDQUFDQyxJQUFJLGdDQUFPSixpQkFBaUIsQ0FBQzs7SUFFaEY7SUFDQTtJQUNBLElBQUksQ0FBQyxzREFBUUoscUJBQXFCLENBQUMsSUFBSUksaUJBQWlCLEtBQUtGLFVBQVUsRUFBRTtNQUNyRSxJQUFNbEssU0FBUyxHQUFHLE1BQUtqRCxPQUFPLENBQUNrRCxrQkFBa0I7TUFFakRyQixrRUFBSyxDQUFDQyxHQUFHLENBQUMyQixpQkFBaUIsQ0FBQ3dCLFlBQVksQ0FBQ2hDLFNBQVMsRUFBRTZCLEtBQUssQ0FBQ0ksU0FBUyxFQUFFLEVBQUUsOEJBQThCLEVBQUVxSSxvQkFBb0IsQ0FBQztJQUNoSSxDQUFDLE1BQU07TUFDSCxNQUFLRyx1QkFBdUIsQ0FBQ1QscUJBQXFCLENBQUM7SUFDdkQ7SUFBQztFQUNMO0VBQUM7RUFBQSxPQUVESyxpQkFBaUIsR0FBakIsNkJBQW9CO0lBQ2hCLElBQU1LLHlCQUF5QixHQUFHLEVBQUU7SUFDcEMsSUFBTXRLLE9BQU8sR0FBRyxFQUFFO0lBRWxCL0QsQ0FBQyxDQUFDc08sSUFBSSxDQUFDdE8sQ0FBQyxDQUFDLDBCQUEwQixDQUFDLEVBQUUsVUFBQytJLEtBQUssRUFBRTNCLEtBQUssRUFBSztNQUNwRCxJQUFNbUgsV0FBVyxHQUFHbkgsS0FBSyxDQUFDb0gsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxTQUFTO01BQy9DLElBQU1DLFdBQVcsR0FBR0gsV0FBVyxDQUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNiLElBQUksRUFBRTtNQUNwRCxJQUFNYyxRQUFRLEdBQUdMLFdBQVcsQ0FBQ00sV0FBVyxFQUFFLENBQUNDLFFBQVEsQ0FBQyxVQUFVLENBQUM7TUFDL0QsSUFBTUMsSUFBSSxHQUFHM0gsS0FBSyxDQUFDNEgsWUFBWSxDQUFDLHdCQUF3QixDQUFDO01BRXpELElBQUksQ0FBQ0QsSUFBSSxLQUFLLFlBQVksSUFBSUEsSUFBSSxLQUFLLFlBQVksSUFBSUEsSUFBSSxLQUFLLGNBQWMsS0FBSzNILEtBQUssQ0FBQzZILGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzdILEtBQUssS0FBSyxFQUFFLElBQUl3SCxRQUFRLEVBQUU7UUFDdElQLHlCQUF5QixDQUFDYSxJQUFJLENBQUM5SCxLQUFLLENBQUM7TUFDekM7TUFFQSxJQUFJMkgsSUFBSSxLQUFLLFVBQVUsSUFBSTNILEtBQUssQ0FBQzZILGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzdILEtBQUssS0FBSyxFQUFFLElBQUl3SCxRQUFRLEVBQUU7UUFDakZQLHlCQUF5QixDQUFDYSxJQUFJLENBQUM5SCxLQUFLLENBQUM7TUFDekM7TUFFQSxJQUFJMkgsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQixJQUFNSSxXQUFXLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDakksS0FBSyxDQUFDa0ksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFVBQUNDLE1BQU07VUFBQSxPQUFLQSxNQUFNLENBQUNDLGFBQWEsS0FBSyxDQUFDO1FBQUEsRUFBQztRQUU5RyxJQUFJTixXQUFXLEVBQUU7VUFDYixJQUFNTyxVQUFVLEdBQUdOLEtBQUssQ0FBQ0MsSUFBSSxDQUFDakksS0FBSyxDQUFDa0ksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQ0ssR0FBRyxDQUFDLFVBQUNDLENBQUM7WUFBQSxPQUFLQSxDQUFDLENBQUN4SSxLQUFLO1VBQUEsRUFBQyxDQUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQztVQUM3RmMsT0FBTyxDQUFDbUwsSUFBSSxDQUFJUixXQUFXLFNBQUlnQixVQUFVLENBQUc7VUFFNUM7UUFDSjtRQUVBLElBQUlkLFFBQVEsRUFBRTtVQUNWUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDOUgsS0FBSyxDQUFDO1FBQ3pDO01BQ0o7TUFFQSxJQUFJMkgsSUFBSSxLQUFLLFlBQVksRUFBRTtRQUN2QixJQUFNUyxNQUFNLEdBQUdwSSxLQUFLLENBQUM2SCxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQU1RLGFBQWEsR0FBR0QsTUFBTSxDQUFDQyxhQUFhO1FBRTFDLElBQUlBLGFBQWEsS0FBSyxDQUFDLEVBQUU7VUFDckIxTCxPQUFPLENBQUNtTCxJQUFJLENBQUlSLFdBQVcsU0FBSWMsTUFBTSxDQUFDekwsT0FBTyxDQUFDMEwsYUFBYSxDQUFDLENBQUNoQixTQUFTLENBQUc7VUFFekU7UUFDSjtRQUVBLElBQUlHLFFBQVEsRUFBRTtVQUNWUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDOUgsS0FBSyxDQUFDO1FBQ3pDO01BQ0o7TUFFQSxJQUFJMkgsSUFBSSxLQUFLLGVBQWUsSUFBSUEsSUFBSSxLQUFLLFdBQVcsSUFBSUEsSUFBSSxLQUFLLFFBQVEsSUFBSUEsSUFBSSxLQUFLLGdCQUFnQixJQUFJQSxJQUFJLEtBQUssY0FBYyxFQUFFO1FBQy9ILElBQU1jLE9BQU8sR0FBR3pJLEtBQUssQ0FBQzZILGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDL0MsSUFBSVksT0FBTyxFQUFFO1VBQ1QsSUFBTUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQixHQUFTO1lBQ2pDLElBQU1DLG1CQUFtQixHQUFHQywwRUFBZ0IsQ0FBQzVJLEtBQUssQ0FBQ29ILFFBQVEsQ0FBQztZQUM1RCxJQUFNeUIseUJBQXlCLEdBQUcsU0FBNUJBLHlCQUF5QixDQUFHQyxJQUFJO2NBQUEsT0FBSUEsSUFBSSxDQUFDQyxPQUFPLENBQUNDLHFCQUFxQixLQUFLUCxPQUFPLENBQUN6SSxLQUFLO1lBQUE7WUFDOUYsT0FBTzJJLG1CQUFtQixDQUFDaEosTUFBTSxDQUFDa0oseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDbkUsQ0FBQztVQUNELElBQUlsQixJQUFJLEtBQUssZUFBZSxJQUFJQSxJQUFJLEtBQUssV0FBVyxJQUFJQSxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQzdFLElBQU1zQixLQUFLLEdBQUdDLDZEQUFXLEdBQUdSLHNCQUFzQixFQUFFLENBQUNyQixTQUFTLENBQUNYLElBQUksRUFBRSxHQUFHK0IsT0FBTyxDQUFDVSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM5QixTQUFTO1lBQ25HLElBQUk0QixLQUFLLEVBQUU7Y0FDUHRNLE9BQU8sQ0FBQ21MLElBQUksQ0FBSVIsV0FBVyxTQUFJMkIsS0FBSyxDQUFHO1lBQzNDO1VBQ0o7VUFFQSxJQUFJdEIsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNuQixJQUFNc0IsTUFBSyxHQUFHQyw2REFBVyxHQUFHUixzQkFBc0IsRUFBRSxDQUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHcUIsT0FBTyxDQUFDVSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMvQixRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLElBQUk2QixNQUFLLEVBQUU7Y0FDUHRNLE9BQU8sQ0FBQ21MLElBQUksQ0FBSVIsV0FBVyxTQUFJMkIsTUFBSyxDQUFDRyxLQUFLLENBQUc7WUFDakQ7VUFDSjtVQUVBLElBQUl6QixJQUFJLEtBQUssZ0JBQWdCLEVBQUU7WUFDM0JoTCxPQUFPLENBQUNtTCxJQUFJLENBQUlSLFdBQVcsVUFBTztVQUN0QztVQUVBO1FBQ0o7UUFFQSxJQUFJSyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7VUFDM0JoTCxPQUFPLENBQUNtTCxJQUFJLENBQUlSLFdBQVcsU0FBTTtRQUNyQztRQUVBLElBQUlFLFFBQVEsRUFBRTtVQUNWUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDOUgsS0FBSyxDQUFDO1FBQ3pDO01BQ0o7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJcUosY0FBYyxHQUFHcEMseUJBQXlCLENBQUMxSixNQUFNLEtBQUssQ0FBQyxHQUFHWixPQUFPLENBQUMyTSxJQUFJLEVBQUUsQ0FBQ3pOLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhO0lBQ3ZHLElBQU0wTixJQUFJLEdBQUczUSxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFFckMsSUFBSXlRLGNBQWMsRUFBRTtNQUNoQkEsY0FBYyxHQUFHQSxjQUFjLEtBQUssYUFBYSxHQUFHLEVBQUUsR0FBR0EsY0FBYztNQUN2RSxJQUFJRSxJQUFJLENBQUNsRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUM5QmtHLElBQUksQ0FBQ2xHLElBQUksQ0FBQyxzQkFBc0IsRUFBRWdHLGNBQWMsQ0FBQztNQUNyRCxDQUFDLE1BQU07UUFDSCxJQUFNRyxXQUFXLEdBQUdELElBQUksQ0FBQ2hLLElBQUksRUFBRSxDQUFDa0ssS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNQyxJQUFJLEdBQUc5USxDQUFDLG1CQUFnQjRRLFdBQVcsU0FBSztRQUM5Q0UsSUFBSSxDQUFDckcsSUFBSSxDQUFDLHNCQUFzQixFQUFFZ0csY0FBYyxDQUFDO01BQ3JEO0lBQ0o7RUFDSjs7RUFFQTtBQUNKO0FBQ0E7QUFDQSxLQUhJO0VBQUEsT0FJQXJDLHVCQUF1QixHQUF2QixpQ0FBd0I1TSxJQUFJLEVBQUU7SUFDMUIsOEJBQU00TSx1QkFBdUIsWUFBQzVNLElBQUk7SUFFbEMsSUFBSSxDQUFDa00sTUFBTSxDQUFDeEosSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUNxSSxXQUFXLENBQUMsY0FBYyxDQUFDO0VBQ2xFLENBQUM7RUFBQTtBQUFBLEVBeEl3Q3dFLDZEQUFrQjs7Ozs7Ozs7Ozs7Ozs7QUNML0Q7QUFBZSx5RUFBVUMsSUFBSSxFQUFFO0VBQzNCLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsSUFBSUEsSUFBSSxDQUFDck0sTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMvQyxPQUFPLEtBQUs7RUFDaEI7O0VBRUE7RUFDQSxPQUFPLElBQUk7QUFDZixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUCtDO0FBRWE7QUFDWDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTc00saUJBQWlCLENBQUNDLFlBQVksRUFBRXhRLE9BQU8sRUFBRTtFQUM5QyxJQUFNeVEsS0FBSyxHQUFHLHdEQUFZRCxZQUFZLENBQUNuTCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBQ0YsTUFBTSxFQUFFdUwsSUFBSSxFQUFLO0lBQ3pFLElBQU1DLEdBQUcsR0FBR3hMLE1BQU07SUFDbEJ3TCxHQUFHLENBQUNELElBQUksQ0FBQ0UsSUFBSSxDQUFDLEdBQUdGLElBQUksQ0FBQ2hLLEtBQUs7SUFDM0IsT0FBT2lLLEdBQUc7RUFDZCxDQUFDLENBQUM7RUFFRixJQUFNRSxxQkFBcUIsR0FBRztJQUMxQnpJLEVBQUUsRUFBRXFJLEtBQUssQ0FBQ3JJLEVBQUU7SUFDWixZQUFZLEVBQUVxSSxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ2pDLFNBQU8sYUFBYTtJQUNwQkcsSUFBSSxFQUFFSCxLQUFLLENBQUNHLElBQUk7SUFDaEIsaUJBQWlCLEVBQUVILEtBQUssQ0FBQyxpQkFBaUI7RUFDOUMsQ0FBQztFQUVERCxZQUFZLENBQUN0SyxXQUFXLENBQUM1RyxDQUFDLENBQUMsbUJBQW1CLEVBQUV1UixxQkFBcUIsQ0FBQyxDQUFDO0VBRXZFLElBQU1DLFdBQVcsR0FBR3hSLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztFQUNsRCxJQUFNeVIsWUFBWSxHQUFHelIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0VBRW5ELElBQUl5UixZQUFZLENBQUM5TSxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQzNCOE0sWUFBWSxDQUFDM08sTUFBTSxFQUFFO0VBQ3pCO0VBRUEsSUFBSTBPLFdBQVcsQ0FBQ0UsSUFBSSxFQUFFLENBQUN4TixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNTLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDL0M7SUFDQTZNLFdBQVcsQ0FBQ0UsSUFBSSxFQUFFLENBQUNDLE1BQU0sYUFBV2pSLE9BQU8sQ0FBQ2tPLFFBQVEsY0FBVztFQUNuRSxDQUFDLE1BQU07SUFDSDRDLFdBQVcsQ0FBQ0UsSUFBSSxFQUFFLENBQUN4TixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM1QixJQUFJLEVBQUU7RUFDM0M7RUFFQSxPQUFPa1AsV0FBVztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNJLGlCQUFpQixDQUFDVixZQUFZLEVBQUU7RUFDckMsSUFBTUMsS0FBSyxHQUFHLHdEQUFZRCxZQUFZLENBQUNuTCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBQ0YsTUFBTSxFQUFFdUwsSUFBSSxFQUFLO0lBQ3pFLElBQU1DLEdBQUcsR0FBR3hMLE1BQU07SUFDbEJ3TCxHQUFHLENBQUNELElBQUksQ0FBQ0UsSUFBSSxDQUFDLEdBQUdGLElBQUksQ0FBQ2hLLEtBQUs7SUFFM0IsT0FBT2lLLEdBQUc7RUFDZCxDQUFDLENBQUM7RUFFRixJQUFNRSxxQkFBcUIsR0FBRztJQUMxQnhDLElBQUksRUFBRSxNQUFNO0lBQ1pqRyxFQUFFLEVBQUVxSSxLQUFLLENBQUNySSxFQUFFO0lBQ1osWUFBWSxFQUFFcUksS0FBSyxDQUFDLFlBQVksQ0FBQztJQUNqQyxTQUFPLFlBQVk7SUFDbkJHLElBQUksRUFBRUgsS0FBSyxDQUFDRyxJQUFJO0lBQ2hCLGlCQUFpQixFQUFFSCxLQUFLLENBQUMsaUJBQWlCO0VBQzlDLENBQUM7RUFFREQsWUFBWSxDQUFDdEssV0FBVyxDQUFDNUcsQ0FBQyxDQUFDLFdBQVcsRUFBRXVSLHFCQUFxQixDQUFDLENBQUM7RUFFL0QsSUFBTUMsV0FBVyxHQUFHeFIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0VBRWxELElBQUl3UixXQUFXLENBQUM3TSxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQzFCa04sZ0ZBQXNCLENBQUNMLFdBQVcsQ0FBQztJQUNuQ0EsV0FBVyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ3hOLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzVELElBQUksRUFBRTtFQUMzQztFQUVBLE9BQU9rUixXQUFXO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNNLFVBQVUsQ0FBQ0MsV0FBVyxFQUFFQyxjQUFjLEVBQUVqTyxPQUFPLEVBQUU7RUFDdEQsSUFBTWtPLFNBQVMsR0FBRyxFQUFFO0VBRXBCQSxTQUFTLENBQUMvQyxJQUFJLHlCQUFxQjZDLFdBQVcsQ0FBQ0csTUFBTSxlQUFZO0VBRWpFLElBQUksQ0FBQyxzREFBVUYsY0FBYyxDQUFDLEVBQUU7SUFDNUIsbURBQU9ELFdBQVcsQ0FBQ0ksTUFBTSxFQUFFLFVBQUNDLFFBQVEsRUFBSztNQUNyQyxJQUFJck8sT0FBTyxDQUFDZ0ksY0FBYyxFQUFFO1FBQ3hCa0csU0FBUyxDQUFDL0MsSUFBSSxzQkFBbUJrRCxRQUFRLENBQUN0SixFQUFFLFdBQUtzSixRQUFRLENBQUNkLElBQUksZUFBWTtNQUM5RSxDQUFDLE1BQU07UUFDSFcsU0FBUyxDQUFDL0MsSUFBSSxzQkFBbUJrRCxRQUFRLENBQUNkLElBQUksWUFBS2MsUUFBUSxDQUFDL0IsS0FBSyxHQUFHK0IsUUFBUSxDQUFDL0IsS0FBSyxHQUFHK0IsUUFBUSxDQUFDZCxJQUFJLGdCQUFZO01BQ2xIO0lBQ0osQ0FBQyxDQUFDO0lBRUZVLGNBQWMsQ0FBQ3JMLElBQUksQ0FBQ3NMLFNBQVMsQ0FBQ2hQLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1QztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UseUVBQVVpTyxZQUFZLEVBQUV4USxPQUFPLEVBQU9xRCxPQUFPLEVBQUVzTyxRQUFRLEVBQUU7RUFBQSxJQUFqQzNSLE9BQU87SUFBUEEsT0FBTyxHQUFHLENBQUMsQ0FBQztFQUFBO0VBQy9DO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSSxPQUFPcUQsT0FBTyxLQUFLLFVBQVUsRUFBRTtJQUMvQjtJQUNBc08sUUFBUSxHQUFHdE8sT0FBTztJQUNsQkEsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNaO0VBQ0o7O0VBRUEvRCxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ3FGLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO0lBQ3pELElBQU1nTixXQUFXLEdBQUd0UyxDQUFDLENBQUNzRixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDM0QsR0FBRyxFQUFFO0lBRWhELElBQUkwUSxXQUFXLEtBQUssRUFBRSxFQUFFO01BQ3BCO0lBQ0o7SUFFQS9QLGtFQUFLLENBQUNDLEdBQUcsQ0FBQzZHLE9BQU8sQ0FBQ2tKLFNBQVMsQ0FBQ0QsV0FBVyxFQUFFLFVBQUMzUCxHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUN4RCxJQUFJRCxHQUFHLEVBQUU7UUFDTDZQLG9FQUFjLENBQUM5UixPQUFPLENBQUMrUixXQUFXLENBQUM7UUFDbkMsT0FBT0osUUFBUSxDQUFDMVAsR0FBRyxDQUFDO01BQ3hCO01BRUEsSUFBTStQLGFBQWEsR0FBRzFTLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztNQUVwRCxJQUFJLENBQUMsc0RBQVU0QyxRQUFRLENBQUNwQixJQUFJLENBQUMyUSxNQUFNLENBQUMsRUFBRTtRQUNsQztRQUNBLElBQU1ILGNBQWMsR0FBR2YsaUJBQWlCLENBQUN5QixhQUFhLEVBQUVoUyxPQUFPLENBQUM7UUFFaEVvUixVQUFVLENBQUNsUCxRQUFRLENBQUNwQixJQUFJLEVBQUV3USxjQUFjLEVBQUVqTyxPQUFPLENBQUM7UUFDbERzTyxRQUFRLENBQUMsSUFBSSxFQUFFTCxjQUFjLENBQUM7TUFDbEMsQ0FBQyxNQUFNO1FBQ0gsSUFBTVcsVUFBVSxHQUFHZixpQkFBaUIsQ0FBQ2MsYUFBYSxFQUFFaFMsT0FBTyxDQUFDO1FBRTVEMlIsUUFBUSxDQUFDLElBQUksRUFBRU0sVUFBVSxDQUFDO01BQzlCO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ04sQzs7Ozs7Ozs7Ozs7OztBQ3RKQTtBQUFBO0FBQUEsSUFBTUMsWUFBWSxHQUFHLGNBQWM7QUFDbkMsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUErQixDQUFJQyxVQUFVO0VBQUEsT0FBSyxDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDRixVQUFVLENBQUNGLFlBQVksQ0FBQyxDQUFDLENBQUNqTyxNQUFNO0FBQUE7QUFDdEcsSUFBTXNPLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0IsR0FBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsVUFBbUJ2TyxNQUFNLEVBQUV1TyxDQUFDLEVBQUUsRUFBRTtJQUNoRCxJQUFNSixVQUFVLEdBQUdLLElBQUksQ0FBQ0MsS0FBSyxDQUFvQkYsQ0FBQyw0QkFBREEsQ0FBQyx5QkFBREEsQ0FBQyxFQUFFO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU12SywyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQTJCLENBQUk3SCxPQUFPLEVBQUs7RUFDcEQsSUFBUTJTLHdCQUF3QixHQUF3RTNTLE9BQU8sQ0FBdkcyUyx3QkFBd0I7SUFBRUMsZ0NBQWdDLEdBQXNDNVMsT0FBTyxDQUE3RTRTLGdDQUFnQztJQUFFQywrQkFBK0IsR0FBSzdTLE9BQU8sQ0FBM0M2UywrQkFBK0I7RUFDbkcsSUFBTUMsZ0JBQWdCLEdBQUdQLHNCQUFzQixDQUFDSSx3QkFBd0IsRUFBRUMsZ0NBQWdDLEVBQUVDLCtCQUErQixDQUFDO0VBQzVJLElBQU1FLGFBQWEsR0FBR1YsTUFBTSxDQUFDVyxNQUFNLENBQUNGLGdCQUFnQixDQUFDWixZQUFZLENBQUMsQ0FBQztFQUNuRSxJQUFNZSxlQUFlLEdBQUdaLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDUSxnQkFBZ0IsQ0FBQ1osWUFBWSxDQUFDLENBQUMsQ0FBQ2pELEdBQUcsQ0FBQyxVQUFBaUUsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQ2pGLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ2tGLEdBQUcsRUFBRTtFQUFBLEVBQUM7RUFFcEcsT0FBT0YsZUFBZSxDQUFDRyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFSCxHQUFHLEVBQUVWLENBQUMsRUFBSztJQUMzQ2EsR0FBRyxDQUFDSCxHQUFHLENBQUMsR0FBR0gsYUFBYSxDQUFDUCxDQUFDLENBQUM7SUFDM0IsT0FBT2EsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0I4QztBQUNTO0FBRXpCO0FBQUEsSUFFVkMscUJBQXFCO0VBQ3RDLCtCQUFZdEcsTUFBTSxFQUFFO0lBQ2hCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO0lBRXBCLElBQUksQ0FBQ0EsTUFBTSxDQUFDdE0sUUFBUSxDQUFDLG1CQUFtQixDQUFDO0lBRXpDLElBQUksQ0FBQzZTLG1CQUFtQixFQUFFO0lBRTFCLElBQUksQ0FBQ3pPLEtBQUssR0FBR3hGLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDME4sTUFBTSxDQUFDO0lBQ25DLElBQUksQ0FBQ3dHLFVBQVUsR0FBR2xVLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUN3RixLQUFLLENBQUMsQ0FBQzVELEdBQUcsRUFBRTtJQUU1RCxJQUFJLENBQUNnUyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7O0lBRWxCLElBQUksQ0FBQ2hHLHNCQUFzQixHQUFHNU4sQ0FBQyxZQUFVLElBQUksQ0FBQzRULEdBQUcsc0JBQW1CLElBQUksQ0FBQ3BPLEtBQUssQ0FBQyxDQUFDLENBQUM7O0lBRWpGLElBQUksQ0FBQzJPLGdCQUFnQixFQUFFO0lBQ3ZCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUdBLElBQUksQ0FBQ2xULFVBQVUsRUFBRTtFQUNyQjs7RUFFQTtBQUNKO0FBQ0E7RUFGSTtFQUFBLE9BR0FtVCx5QkFBeUIsR0FBekIscUNBQTRCO0lBQ3hCcFUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM0TixzQkFBc0IsQ0FBQyxDQUFDeUcsT0FBTyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxVQUFBQyxNQUFNLEVBQUk7TUFDdEUsSUFBSXZVLENBQUMsQ0FBQ3VVLE1BQU0sQ0FBQyxDQUFDclEsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUNTLE1BQU0sRUFBRTtRQUNyRDNFLENBQUMsQ0FBQ3VVLE1BQU0sQ0FBQyxDQUFDblQsUUFBUSxDQUFDLFlBQVksQ0FBQztNQUNwQztJQUNKLENBQUMsQ0FBQztFQUNOOztFQUVBO0FBQ0o7QUFDQSxLQUZJO0VBQUEsT0FHQW9ULHFCQUFxQixHQUFyQiwrQkFBc0JsUCxLQUFLLEVBQUU7SUFDekIsSUFBTW1QLGNBQWMsR0FBR3pVLENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ29QLE1BQU0sQ0FBQztJQUN0QyxJQUFNQyxTQUFTLEdBQUczVSxDQUFDLENBQUNzRixLQUFLLENBQUNvUCxNQUFNLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7SUFFeEQ7SUFDQSxJQUFJSCxjQUFjLENBQUNoSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxJQUFJdkosTUFBTSxDQUFDMlQsUUFBUSxLQUFLQyxTQUFTLEVBQUU7TUFDekU7SUFBQSxDQUNILE1BQU07TUFDSCxJQUFJLENBQUNYLGdCQUFnQixFQUFFO0lBQzNCOztJQUVBO0lBQ0EsSUFBSU0sY0FBYyxDQUFDN1MsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO01BQzdCLElBQUk2UyxjQUFjLENBQUNySSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsSUFBTTJDLElBQUksR0FBRzBGLGNBQWMsQ0FBQ2hLLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEMsUUFBUXNFLElBQUk7VUFDUixLQUFLLE9BQU87WUFDUjBGLGNBQWMsQ0FBQ2hLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1lBQ3BDZ0ssY0FBYyxDQUFDTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUN0SyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztZQUN2RGtLLFNBQVMsQ0FBQ3ZULFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDaEM7VUFDSixLQUFLLFVBQVU7WUFDWCxJQUFJcVQsY0FBYyxDQUFDMU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2NBQ2hDNE8sU0FBUyxDQUFDdlQsUUFBUSxDQUFDLFlBQVksQ0FBQztjQUNoQ3FULGNBQWMsQ0FBQ2hLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1lBQ3hDLENBQUMsTUFBTTtjQUNIa0ssU0FBUyxDQUFDcEksV0FBVyxDQUFDLFlBQVksQ0FBQztjQUNuQ2tJLGNBQWMsQ0FBQ2hLLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1lBQ3pDO1lBQ0E7VUFDSixLQUFLLE1BQU07VUFDWCxLQUFLLFFBQVE7WUFDVGdLLGNBQWMsQ0FBQzdTLEdBQUcsRUFBRSxDQUFDK0MsTUFBTSxLQUFLLENBQUMsR0FDM0JnUSxTQUFTLENBQUN2VCxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQ2hDdVQsU0FBUyxDQUFDcEksV0FBVyxDQUFDLFlBQVksQ0FBQztZQUN6Q2tJLGNBQWMsQ0FBQ2hLLElBQUksQ0FBQyxPQUFPLEVBQUVnSyxjQUFjLENBQUM3UyxHQUFHLEVBQUUsQ0FBQztZQUNsRDtRQUFNO01BRWxCLENBQUMsTUFBTSxJQUFJNlMsY0FBYyxDQUFDckksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLElBQU00SSxlQUFlLEdBQUdQLGNBQWMsQ0FBQ3ZRLElBQUkscUJBQWtCdVEsY0FBYyxDQUFDN1MsR0FBRyxFQUFFLFNBQUs7UUFDdEZvVCxlQUFlLENBQUN2SyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUN0Q3VLLGVBQWUsQ0FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDdEssSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDMUQ7UUFDQSxJQUNJZ0ssY0FBYyxDQUFDaEssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDd0ssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUNuRFIsY0FBYyxDQUFDaEssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDd0ssT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUNqRFIsY0FBYyxDQUFDaEssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDd0ssT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNwRDtVQUNFO1VBQ0EsSUFBTUMsdUJBQXVCLEdBQUdULGNBQWMsQ0FBQ00sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDVixPQUFPLEVBQUUsQ0FBQ1AsTUFBTSxDQUFDLFVBQUNxQixLQUFLLEVBQUUzRixNQUFNLEVBQUs7WUFDbEcsT0FBT3hQLENBQUMsQ0FBQ3dQLE1BQU0sQ0FBQyxDQUFDNU4sR0FBRyxFQUFFLEtBQUssRUFBRSxHQUN2QnVULEtBQUssR0FDTEEsS0FBSyxHQUFHLENBQUM7VUFDbkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUNMO1VBQ0EsSUFBSUQsdUJBQXVCLEtBQUssQ0FBQyxFQUFFO1lBQy9CUCxTQUFTLENBQUN2VCxRQUFRLENBQUMsWUFBWSxDQUFDO1VBQ3BDO1FBQ0osQ0FBQyxNQUFNO1VBQ0h1VCxTQUFTLENBQUN2VCxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN0QztNQUNKLENBQUMsTUFBTSxJQUFJcVQsY0FBYyxDQUFDckksRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3RDcUksY0FBYyxDQUFDN1MsR0FBRyxFQUFFLENBQUMrQyxNQUFNLEtBQUssQ0FBQyxHQUMzQmdRLFNBQVMsQ0FBQ3ZULFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FDaEN1VCxTQUFTLENBQUNwSSxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3pDa0ksY0FBYyxDQUFDclMsSUFBSSxDQUFDcVMsY0FBYyxDQUFDN1MsR0FBRyxFQUFFLENBQUM7TUFDN0M7SUFDSixDQUFDLE1BQU07TUFDSDtNQUNBK1MsU0FBUyxDQUFDcEksV0FBVyxDQUFDLFlBQVksQ0FBQztJQUN2QztJQUVBLElBQUksQ0FBQzZJLG9CQUFvQixFQUFFO0VBQy9COztFQUVBO0FBQ0o7QUFDQSxLQUZJO0VBQUEsT0FHQWpCLGdCQUFnQixHQUFoQiw0QkFBb0I7SUFBQTtJQUNoQjVSLGtFQUFLLENBQUNDLEdBQUcsQ0FBQzJCLGlCQUFpQixDQUFDd0IsWUFBWSxDQUFDLElBQUksQ0FBQ3VPLFVBQVUsRUFBRSxJQUFJLENBQUMxTyxLQUFLLENBQUNJLFNBQVMsRUFBRSxFQUFFLDhCQUE4QixFQUFFLFVBQUNqRCxHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUNqSSxJQUFNK0sscUJBQXFCLEdBQUcvSyxRQUFRLENBQUNwQixJQUFJLElBQUksQ0FBQyxDQUFDO01BQ2pELEtBQUksQ0FBQzRNLHVCQUF1QixDQUFDVCxxQkFBcUIsQ0FBQztNQUNuRCxLQUFJLENBQUMwSCxVQUFVLENBQUMxSCxxQkFBcUIsQ0FBQztNQUN0QztNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7SUFDSixDQUFDLENBQUM7RUFDTjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0F5SCxvQkFBb0IsR0FBcEIsZ0NBQXdCO0lBQ3BCO0FBQ1I7QUFDQTtJQUNRLElBQU1FLHFCQUFxQixHQUFHLElBQUksQ0FBQzVILE1BQU0sQ0FBQ3hKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDUyxNQUFNO0lBQy9FLElBQU00USxxQkFBcUIsR0FBRyxJQUFJLENBQUM3SCxNQUFNLENBQUN4SixJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQ1MsTUFBTTtJQUMxRjtJQUNBO0lBQ0EsSUFBSTJRLHFCQUFxQixLQUFLLENBQUMsSUFBSUEscUJBQXFCLElBQUlDLHFCQUFxQixFQUFFO01BQy9FLElBQUksQ0FBQzdILE1BQU0sQ0FBQ3RNLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7TUFDOUNwQixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNvQixRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsTUFBTTtNQUNILElBQUksQ0FBQ3NNLE1BQU0sQ0FBQ25CLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7TUFDakR2TSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUN1TSxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQzFEO0VBRUo7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUpJO0VBQUEsT0FLQWlKLGVBQWUsR0FBZix5QkFBZ0JDLEtBQUssRUFBRTtJQUNuQixJQUFJQSxLQUFLLENBQUNDLFdBQVcsRUFBRTtNQUNuQjFWLENBQUMscUNBQXFDLElBQUksQ0FBQzBOLE1BQU0sQ0FBQyxDQUFDL0csSUFBSSxDQUFDOE8sS0FBSyxDQUFDQyxXQUFXLENBQUNDLFNBQVMsQ0FBQztJQUN4RjtFQUNKOztFQUVBO0FBQ0o7QUFDQTtBQUNBLEtBSEk7RUFBQSxPQUlBTixVQUFVLEdBQVYsb0JBQVc3VCxJQUFJLEVBQUU7SUFDYjtJQUNBO0lBQ0EsSUFBSSx1REFBV0EsSUFBSSxDQUFDaVUsS0FBSyxDQUFDLEVBQUU7TUFDeEIsSUFBSSxDQUFDRCxlQUFlLENBQUNoVSxJQUFJLENBQUNpVSxLQUFLLENBQUM7SUFDcEM7SUFDQTtJQUNBLElBQU1HLE9BQU8sR0FBRzVWLENBQUMsbUJBQW1CLElBQUksQ0FBQzBOLE1BQU0sQ0FBQztJQUNoRCxJQUFJLHVEQUFXbE0sSUFBSSxDQUFDcVUsS0FBSyxDQUFDLEVBQUU7TUFDeEIsSUFBTUMsUUFBUSxHQUFHdFUsSUFBSSxDQUFDcVUsS0FBSyxDQUFDclUsSUFBSSxDQUFDK0IsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7TUFDOURxUyxPQUFPLENBQUNuTCxJQUFJLENBQUMsS0FBSyxFQUFFcUwsUUFBUSxDQUFDO0lBQ2pDLENBQUMsTUFBTTtNQUNIRixPQUFPLENBQUNuTCxJQUFJLENBQUMsS0FBSyxFQUFFbUwsT0FBTyxDQUFDcFUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDO0lBQ0E7SUFDQSxJQUFNdVUsYUFBYSxHQUFHdlUsSUFBSSxDQUFDd1UsYUFBYSxJQUFJeFUsSUFBSSxDQUFDc0Usa0JBQWtCO0lBQ25FLElBQUlpUSxhQUFhLEtBQUssSUFBSSxFQUFFO01BQ3hCN1Qsa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ05DLElBQUksRUFBRTJULGFBQWE7UUFDbkIxVCxJQUFJLEVBQUU7TUFDVixDQUFDLENBQUM7TUFDRixJQUFJLENBQUNxTCxNQUFNLENBQUN0TSxRQUFRLENBQUMsbUJBQW1CLENBQUM7SUFDN0MsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDc00sTUFBTSxDQUFDbkIsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0lBQ2hEO0VBQ0o7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBLE9BSUE2Qix1QkFBdUIsR0FBdkIsaUNBQXdCNU0sSUFBSSxFQUFFO0lBQUE7SUFDMUIsSUFBTXlVLFFBQVEsR0FBR3pVLElBQUksQ0FBQzBVLHFCQUFxQjtJQUMzQyxJQUFNQyxVQUFVLEdBQUczVSxJQUFJLENBQUM0VSxtQkFBbUI7SUFDM0MsSUFBTUMsaUJBQWlCLFVBQVE3VSxJQUFJLENBQUM4VSxvQkFBb0IsTUFBRztJQUUzRCxJQUFJTCxRQUFRLEtBQUssYUFBYSxJQUFJQSxRQUFRLEtBQUssY0FBYyxFQUFFO01BQzNEO0lBQ0o7SUFFQWpXLENBQUMsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMwTixNQUFNLENBQUMxQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQ3NELElBQUksQ0FBQyxVQUFDNEUsQ0FBQyxFQUFFcUQsU0FBUyxFQUFLO01BQ3ZGLElBQU1DLFVBQVUsR0FBR3hXLENBQUMsQ0FBQ3VXLFNBQVMsQ0FBQztNQUMvQixJQUFNRSxNQUFNLEdBQUc5VSxRQUFRLENBQUM2VSxVQUFVLENBQUNoVixJQUFJLENBQUMseUJBQXlCLENBQUMsRUFBRSxFQUFFLENBQUM7TUFFdkUsSUFBSTJVLFVBQVUsQ0FBQ2xCLE9BQU8sQ0FBQ3dCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ25DLE1BQUksQ0FBQ0MsZUFBZSxDQUFDRixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLENBQUM7TUFDakUsQ0FBQyxNQUFNO1FBQ0gsTUFBSSxDQUFDTSxnQkFBZ0IsQ0FBQ0gsVUFBVSxFQUFFUCxRQUFRLEVBQUVJLGlCQUFpQixDQUFDO01BQ2xFO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRURNLGdCQUFnQixHQUFoQiwwQkFBaUJILFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsRUFBRTtJQUN0RCxJQUFJLElBQUksQ0FBQ08sZ0JBQWdCLENBQUNKLFVBQVUsQ0FBQyxLQUFLLFlBQVksRUFBRTtNQUNwRCxPQUFPLElBQUksQ0FBQ0ssNEJBQTRCLENBQUNMLFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsQ0FBQztJQUNyRjtJQUNBLElBQUlKLFFBQVEsS0FBSyxhQUFhLEVBQUU7TUFDNUJPLFVBQVUsQ0FBQ2xXLElBQUksRUFBRTtJQUNyQixDQUFDLE1BQU07TUFDSGtXLFVBQVUsQ0FDTHBWLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDdkJzUSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQ2JqSCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztJQUMvQjtFQUNKLENBQUM7RUFBQSxPQUVEb00sNEJBQTRCLEdBQTVCLHNDQUE2QkwsVUFBVSxFQUFFUCxRQUFRLEVBQUVJLGlCQUFpQixFQUFFO0lBQ2xFLElBQU14TixPQUFPLEdBQUcyTixVQUFVLENBQUNNLE1BQU0sRUFBRTtJQUVuQyxJQUFJYixRQUFRLEtBQUssYUFBYSxFQUFFO01BQzVCTyxVQUFVLENBQUNPLFlBQVksQ0FBQyxLQUFLLENBQUM7TUFDOUI7TUFDQSxJQUFJUCxVQUFVLENBQUNNLE1BQU0sRUFBRSxDQUFDbFYsR0FBRyxFQUFFLEtBQUs0VSxVQUFVLENBQUMvTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDeEQ1QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM0RyxhQUFhLEdBQUcsQ0FBQztNQUNoQztJQUNKLENBQUMsTUFBTTtNQUNIK0csVUFBVSxDQUFDL0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7TUFDdkMrTCxVQUFVLENBQUM3UCxJQUFJLENBQUM2UCxVQUFVLENBQUM3UCxJQUFJLEVBQUUsQ0FBQ3BELE9BQU8sQ0FBQzhTLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHQSxpQkFBaUIsQ0FBQztJQUN6RjtFQUNKLENBQUM7RUFBQSxPQUVESyxlQUFlLEdBQWYseUJBQWdCRixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLEVBQUU7SUFDckQsSUFBSSxJQUFJLENBQUNPLGdCQUFnQixDQUFDSixVQUFVLENBQUMsS0FBSyxZQUFZLEVBQUU7TUFDcEQsT0FBTyxJQUFJLENBQUNRLDJCQUEyQixDQUFDUixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLENBQUM7SUFDcEY7SUFFQSxJQUFJSixRQUFRLEtBQUssYUFBYSxFQUFFO01BQzVCTyxVQUFVLENBQUNsVSxJQUFJLEVBQUU7SUFDckIsQ0FBQyxNQUFNO01BQ0hrVSxVQUFVLENBQ0xqSyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQzFCbUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUNiakgsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDaEM7RUFDSixDQUFDO0VBQUEsT0FFRHVNLDJCQUEyQixHQUEzQixxQ0FBNEJSLFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsRUFBRTtJQUNqRSxJQUFJSixRQUFRLEtBQUssYUFBYSxFQUFFO01BQzVCTyxVQUFVLENBQUNPLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDakMsQ0FBQyxNQUFNO01BQ0hQLFVBQVUsQ0FBQzlMLFVBQVUsQ0FBQyxVQUFVLENBQUM7TUFDakM4TCxVQUFVLENBQUM3UCxJQUFJLENBQUM2UCxVQUFVLENBQUM3UCxJQUFJLEVBQUUsQ0FBQ3BELE9BQU8sQ0FBQzhTLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFO0VBQ0osQ0FBQztFQUFBLE9BRURPLGdCQUFnQixHQUFoQiwwQkFBaUJKLFVBQVUsRUFBRTtJQUN6QixJQUFNUyxPQUFPLEdBQUdULFVBQVUsQ0FBQ1UsT0FBTyxDQUFDLDBCQUEwQixDQUFDO0lBQzlELE9BQU9ELE9BQU8sR0FBR0EsT0FBTyxDQUFDelYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSTtFQUM3RDs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0F5UyxtQkFBbUIsR0FBbkIsK0JBQXNCO0lBQUE7SUFDbEJqVSxDQUFDLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDME4sTUFBTSxDQUFDLENBQUNZLElBQUksQ0FBQyxVQUFDNEUsQ0FBQyxFQUFFaUUsS0FBSyxFQUFLO01BQzlFLElBQU1DLE1BQU0sR0FBR3BYLENBQUMsQ0FBQ21YLEtBQUssQ0FBQzs7TUFFdkI7TUFDQSxJQUFJQyxNQUFNLENBQUMzTSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUtxSyxTQUFTLEVBQUU7UUFDekNzQyxNQUFNLENBQUNDLEtBQUssQ0FBQyxZQUFNO1VBQ2YsSUFBSUQsTUFBTSxDQUFDNVYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMvQjRWLE1BQU0sQ0FBQ3JSLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1lBQzdCcVIsTUFBTSxDQUFDNVYsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7WUFFM0I0VixNQUFNLENBQUMvUCxNQUFNLEVBQUU7VUFDbkIsQ0FBQyxNQUFNO1lBQ0grUCxNQUFNLENBQUM1VixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztVQUM5QjtVQUVBLE1BQUksQ0FBQ3lTLG1CQUFtQixFQUFFO1FBQzlCLENBQUMsQ0FBQztNQUNOO01BRUFtRCxNQUFNLENBQUMzTSxJQUFJLENBQUMsWUFBWSxFQUFFMk0sTUFBTSxDQUFDclIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztFQUNOOztFQUVBO0FBQ0o7QUFDQSxLQUZJO0VBQUEsT0FHQTlFLFVBQVUsR0FBVixzQkFBYTtJQUFBO0lBQ1RxVyxvRUFBbUIsQ0FBQyxJQUFJLENBQUM1SixNQUFNLEVBQUUsSUFBSSxDQUFDd0csVUFBVSxFQUFFLElBQUksQ0FBQ04sR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUFFN0QsSUFBSSxDQUFDUSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDZ0Isb0JBQW9CLEVBQUU7O0lBRTNCO0lBQ0EsSUFBSSxDQUFDeEgsc0JBQXNCLENBQUN2RyxNQUFNLENBQUMsVUFBQS9CLEtBQUssRUFBSTtNQUN4QyxNQUFJLENBQUNrUCxxQkFBcUIsQ0FBQ2xQLEtBQUssRUFBRUEsS0FBSyxDQUFDb1AsTUFBTSxDQUFDO0lBQ25ELENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQzlHLHNCQUFzQixDQUFDdEwsSUFBSSxFQUFFOztJQUVsQztJQUNBLElBQUksQ0FBQ3NMLHNCQUFzQixDQUFDMUosSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5RSxJQUFJLENBQUM4RyxzQkFBc0IsQ0FBQzFKLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDNEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkYsSUFBSSxDQUFDOEcsc0JBQXNCLENBQUMxSixJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFFLElBQUksQ0FBQzhHLHNCQUFzQixDQUFDMUosSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM1RSxJQUFJLENBQUM4RyxzQkFBc0IsQ0FBQzFKLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLElBQUksQ0FBQzhHLHNCQUFzQixDQUFDMUosSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM0UyxNQUFNLEVBQUUsQ0FBQ2hRLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQ3BGLENBQUM7RUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NDaFZMO0FBQUE7QUFBQTtBQUQrQztBQUNoQjtBQUN3QztBQUNmO0FBQ0Y7QUFDQTtBQUVTOztBQUUvRDtBQUNBLElBQU15USxPQUFPLEdBQUcsS0FBSztBQUFDLElBRUR4VyxjQUFjO0VBQy9CLHdCQUFZTCxPQUFPLEVBQUU7SUFDakI4VyxPQUFPLENBQUNDLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRUYsT0FBTyxDQUFDO0lBQzlELElBQUksQ0FBQzdXLE9BQU8sR0FBR0EsT0FBTzs7SUFFdEI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNRLElBQUksQ0FBQ2dYLElBQUksR0FBRyxjQUFjO0lBQzFCLElBQUksQ0FBQ0MsWUFBWSxHQUFHLFNBQVM7SUFDN0IsSUFBSSxDQUFDQyxvQkFBb0IsR0FBRyxJQUFJO0lBQ2hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHLENBQUM7SUFFckIsSUFBSSxDQUFDQyxPQUFPLEdBQUc5WCxDQUFDLENBQUMsc0JBQXNCLENBQUM7SUFFeEN1QyxrRUFBSyxDQUFDQyxHQUFHLENBQUN1VixPQUFPLENBQUNDLE9BQU8sR0FBR3pWLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ3VWLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUMxVixrRUFBSyxDQUFDQyxHQUFHLENBQUN1VixPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FeFYsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDMFYsT0FBTyxHQUFHM1Ysa0VBQUssQ0FBQ0MsR0FBRyxDQUFDMFYsT0FBTyxDQUFDRCxJQUFJLENBQUMxVixrRUFBSyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQUV2RCxJQUFJLENBQUN2QixVQUFVLEVBQUU7RUFDckI7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEk7RUFBQSxPQU1Ba1gsc0JBQXNCLEdBQXRCLGdDQUF1QkMsYUFBYSxFQUFFO0lBQ2xDLE9BQU9oSixLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJZ0osR0FBRyxDQUFDRCxhQUFhLENBQUMsQ0FBQztFQUM3Qzs7RUFFQTtBQUNKO0FBQ0E7QUFDQSxLQUhJO0VBQUEsT0FJQUUscUJBQXFCLEdBQXJCLCtCQUFzQkYsYUFBYSxFQUFFO0lBQ2pDO0lBQ0EsSUFBTUcsWUFBWSxHQUFHLEVBQUU7SUFDdkJ2WSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUNxVSxPQUFPLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLFVBQUFrRSxRQUFRLEVBQUk7TUFDN0MsSUFBTUMsVUFBVSxHQUFHelksQ0FBQyxDQUFDd1ksUUFBUSxDQUFDLENBQUNoWCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMrQixPQUFPLENBQUNyQyxNQUFNLENBQUNzRixRQUFRLENBQUNrUyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRTtNQUM1RixJQUFNL1UsU0FBUyxHQUFHM0QsQ0FBQyxDQUFDd1ksUUFBUSxDQUFDLENBQUNoWCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUNtWCxRQUFRLEVBQUUsSUFBSSxFQUFFO01BQ2pFSixZQUFZLENBQUNySixJQUFJLENBQUN1SixVQUFVLEVBQUU5VSxTQUFTLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBQ0Y7SUFDQSxJQUFNa0MsTUFBTSxHQUFHdVMsYUFBYSxDQUFDdEUsTUFBTSxDQUFDLFVBQUM4RSxXQUFXLEVBQUVDLFVBQVUsRUFBSztNQUM3RCxJQUFJTixZQUFZLENBQUN0RCxPQUFPLENBQUM0RCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6Q0QsV0FBVyxDQUFDMUosSUFBSSxDQUFDMkosVUFBVSxDQUFDO01BQ2hDO01BQ0EsT0FBT0QsV0FBVztJQUN0QixDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ047SUFDQSxPQUFPL1MsTUFBTTtFQUNqQjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0FpVCxZQUFZLEdBQVosc0JBQWFDLEdBQUcsRUFBRTtJQUNkLE9BQU9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHRixJQUFJLENBQUNDLEtBQUssQ0FBQ0YsR0FBRyxDQUFDLENBQUM7RUFDdEQ7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBLE9BSUFJLGVBQWUsR0FBZix5QkFBZ0JwSyxJQUFJLEVBQUU7SUFBQTtJQUNsQixJQUFNcUssU0FBUyxHQUFHLElBQUksQ0FBQ04sWUFBWSxDQUFDOVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDMkUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3RCxJQUFNcEQsTUFBTSxHQUFHdkIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDcVosRUFBRSxDQUFDRCxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM1WCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN0RSxJQUFJRCxNQUFNLElBQUl1VCxTQUFTLEVBQUU7TUFDckIsT0FBTzlVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ00sSUFBSSxFQUFFO0lBQzNCO0lBQ0E7SUFDQSxJQUFJZ1osVUFBVSxHQUFHbkcsSUFBSSxDQUFDQyxLQUFLLENBQUNtRyxZQUFZLENBQUNDLE9BQU8sZ0JBQWNqWSxNQUFNLENBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDOUUsSUFBSStYLFVBQVUsQ0FBQzNVLE1BQU0sRUFBRTtNQUFFO01BQ3JCMlUsVUFBVSxHQUFHLElBQUksQ0FBQ25CLHNCQUFzQixDQUFDbUIsVUFBVSxDQUFDLENBQUMsQ0FBQztNQUN0REEsVUFBVSxHQUFHLElBQUksQ0FBQ2hCLHFCQUFxQixDQUFDZ0IsVUFBVSxDQUFDLENBQUMsQ0FBQztNQUNyRCxJQUFJLENBQUNHLGlCQUFpQixDQUFDSCxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsTUFBTTtNQUFFO01BQ0wsSUFBTUksSUFBSSxHQUFHO1FBQ1QxVixRQUFRLHdDQUFzQytLLElBQU07UUFDcEQ0SyxNQUFNLEVBQUU7VUFDSjVCLE9BQU8sRUFBRTtZQUNMNkIsZ0JBQWdCLEVBQUU7Y0FBRUMsS0FBSyxFQUFFO1lBQUksQ0FBQztZQUNoQ0MsZ0JBQWdCLEVBQUU7Y0FBRUQsS0FBSyxFQUFFO1lBQUk7VUFDbkM7UUFDSjtNQUNKLENBQUM7TUFDRHRYLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ3VWLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDelcsTUFBTSxFQUFFbVksSUFBSSxFQUFFLFVBQUMvVyxHQUFHLEVBQUVvWCxHQUFHLEVBQUs7UUFBRTtRQUNwRCxJQUFJcFgsR0FBRyxFQUFFO1VBQ0wsT0FBTzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ00sSUFBSSxFQUFFO1FBQzNCO1FBQ0EsSUFBSTBaLE9BQU8sR0FBRzdHLElBQUksQ0FBQ0MsS0FBSyxDQUFDMkcsR0FBRyxDQUFDLElBQUksRUFBRTtRQUNuQ0MsT0FBTyxHQUFHLEtBQUksQ0FBQzdCLHNCQUFzQixDQUFDNkIsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoREEsT0FBTyxHQUFHLEtBQUksQ0FBQzFCLHFCQUFxQixDQUFDMEIsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvQ1QsWUFBWSxDQUFDVSxPQUFPLGdCQUFjMVksTUFBTSxFQUFJNFIsSUFBSSxDQUFDK0csU0FBUyxDQUFDRixPQUFPLENBQUMsQ0FBQztRQUNwRSxLQUFJLENBQUNQLGlCQUFpQixDQUFDTyxPQUFPLENBQUM7TUFDbkMsQ0FBQyxDQUFDO0lBQ047RUFDSjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0FHLHNCQUFzQixHQUF0QixrQ0FBeUI7SUFDckIsSUFBSUgsT0FBTyxHQUFHLEVBQUU7SUFDaEJoYSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUNxVSxPQUFPLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLFVBQUFrRSxRQUFRLEVBQUk7TUFDN0MsSUFBTUksV0FBVyxHQUFHNVksQ0FBQyxDQUFDd1ksUUFBUSxDQUFDLENBQUNoWCxJQUFJLENBQUMsUUFBUSxDQUFDO01BQzlDLElBQUlvWCxXQUFXLENBQUNqVSxNQUFNLEVBQUU7UUFDcEJpVSxXQUFXLENBQ05qSyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1YyRixPQUFPLENBQUMsVUFBQThGLFVBQVUsRUFBSTtVQUNuQixJQUFJQSxVQUFVLENBQUN6VixNQUFNLEVBQUU7WUFDbkJxVixPQUFPLENBQUM5SyxJQUFJLENBQUNrTCxVQUFVLENBQUM7VUFDNUI7UUFDSixDQUFDLENBQUM7TUFDVjtJQUNKLENBQUMsQ0FBQztJQUNGO0lBQ0EsSUFBSUosT0FBTyxDQUFDclYsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUN0QixPQUFPLElBQUksQ0FBQ3dVLGVBQWUsQ0FBQyxTQUFTLENBQUM7SUFDMUM7SUFDQWEsT0FBTyxHQUFHLElBQUksQ0FBQzdCLHNCQUFzQixDQUFDNkIsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoREEsT0FBTyxHQUFHLElBQUksQ0FBQzFCLHFCQUFxQixDQUFDMEIsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPLElBQUksQ0FBQ1AsaUJBQWlCLENBQUNPLE9BQU8sQ0FBQztFQUMxQyxDQUFDO0VBQUEsT0FFS0ssY0FBYztJQUFBLGlGQUFwQjtNQUFBO01BQUE7UUFBQTtVQUFBO1lBQ0k7WUFDTUMsV0FBVyxHQUFHQyxjQUFjLENBQUNmLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDaERnQixPQUFPLEdBQUdDLCtEQUFjLENBQUNDLG9CQUFvQixDQUFDSixXQUFXLENBQUMsRUFFaEU7WUFDQTtZQUFBLElBQ0tFLE9BQU8sQ0FBQzdWLE1BQU07Y0FBQTtjQUFBO1lBQUE7WUFBQSxpQ0FBUyxJQUFJLENBQUN3VSxlQUFlLENBQUMsSUFBSSxDQUFDeEIsWUFBWSxDQUFDO1VBQUE7WUFFbkU7WUFDQTZDLE9BQU8sQ0FBQ2xHLE9BQU8sQ0FBQyxVQUFBeEQsSUFBSTtjQUFBLE9BQUk5USxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQzJSLE1BQU0sQ0FBQ2IsSUFBSSxDQUFDbkssSUFBSSxDQUFDO1lBQUEsRUFBQzs7WUFFN0U7WUFDQTtZQUNBO1lBQ0E7WUFDSWdVLGNBQWMsR0FBRyxJQUFJLENBQUM5QyxZQUFZLEdBQUcyQyxPQUFPLENBQUM3VixNQUFNO1lBQUEsS0FDbkRnVyxjQUFjO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQTtZQUFBLE9BRVVGLCtEQUFjLENBQUNHLHFCQUFxQixDQUFDSixPQUFPLENBQUM3SyxHQUFHLENBQUMsVUFBQW9JLE9BQU87Y0FBQSxPQUFJQSxPQUFPLENBQUM4QyxVQUFVO1lBQUEsRUFBQyxFQUFFRixjQUFjLENBQUM7VUFBQTtZQUFoSFgsT0FBTztZQUFBLGlDQUNKLElBQUksQ0FBQ1AsaUJBQWlCLENBQUNPLE9BQU8sQ0FBQztVQUFBO1lBQUE7WUFBQTtZQUV0Q3hDLE9BQU8sQ0FBQ3NELEtBQUssQ0FBQyxtQkFBbUIsY0FBTTtVQUFDO1lBSWhELElBQUksQ0FBQ0MsbUJBQW1CLEVBQUU7WUFBQyxpQ0FDcEIsSUFBSSxDQUFDakQsT0FBTyxDQUFDeFgsSUFBSSxFQUFFO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBLENBQzdCO0lBQUE7TUFBQTtJQUFBO0lBQUE7RUFBQTtFQUVEO0FBQ0o7QUFDQTtFQUZJO0VBQUEsT0FHQTBhLFNBQVMsR0FBVCxtQkFBVTFWLEtBQUssRUFBRTtJQUFBO0lBQ2IsSUFBTXlTLE9BQU8sR0FBRy9YLENBQUMsQ0FBQ3NGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDLENBQUNxUCxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzVEbUQsT0FBTyxDQUFDeEwsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakM7SUFDQSxJQUFJd0wsT0FBTyxDQUFDbFQsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUNrVCxPQUFPLENBQUNsVCxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtNQUM3RWtULE9BQU8sQ0FBQ2xULFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUMvQjdFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRStYLE9BQU8sQ0FBQyxDQUFDa0QsU0FBUyxFQUFFLENBQUM7TUFBQSxFQUMxQyxJQUFJLENBQUNDLGFBQWEsQ0FBQzVWLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDakN5UyxPQUFPLENBQUMzVyxRQUFRLENBQUMsVUFBVSxDQUFDO01BQzVCcEIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUN1TSxXQUFXLENBQUMsY0FBYyxDQUFDO01BQ3hELE9BQU9ySyxrREFBSSxDQUFDQyxJQUFJLENBQUM7UUFDYkMsSUFBSSxFQUFFLDBEQUEwRDtRQUNoRTJNLElBQUksRUFBRTtNQUNWLENBQUMsQ0FBQztJQUNOO0lBQ0E7SUFDQSxJQUFJLENBQUMrSSxPQUFPLENBQUN4VixJQUFJLEVBQUU7SUFDbkIsSUFBTTZZLElBQUksR0FBR25iLENBQUMsQ0FBQyxpQkFBaUIsRUFBRStYLE9BQU8sQ0FBQztJQUMxQ3hWLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDMlksT0FBTyxDQUFDLElBQUl2RyxRQUFRLENBQUNzRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDeFksR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDN0QsSUFBTTBJLFlBQVksR0FBRzNJLEdBQUcsSUFBSUMsUUFBUSxDQUFDcEIsSUFBSSxDQUFDc1osS0FBSyxDQUFDLENBQUM7TUFDakQsSUFBSXhQLFlBQVksRUFBRTtRQUFFO1FBQ2hCO1FBQ0EsSUFBTStQLEdBQUcsR0FBRzFSLFFBQVEsQ0FBQzJSLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekNELEdBQUcsQ0FBQ0UsU0FBUyxHQUFHalEsWUFBWTtRQUM1QixNQUFJLENBQUN3TSxPQUFPLENBQUN4WCxJQUFJLEVBQUU7UUFDbkJ5WCxPQUFPLENBQUMzVyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFNb2EsV0FBVyxHQUFHekQsT0FBTyxDQUFDMEQsTUFBTSxFQUFFLENBQUNDLEdBQUc7UUFDeEMxYixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMyYixPQUFPLENBQUM7VUFBRUMsU0FBUyxFQUFHSixXQUFXLEdBQUc7UUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRTtRQUNBeGIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUN1TSxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ3hEO1FBQ0EsT0FBT3JLLGtEQUFJLENBQUNDLElBQUksQ0FBQztVQUNiQyxJQUFJLEVBQUVpWixHQUFHLENBQUNRLFdBQVcsSUFBSVIsR0FBRyxDQUFDNU0sU0FBUztVQUN0Q3BNLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOO01BQ0EsTUFBSSxDQUFDeVYsT0FBTyxDQUFDeFgsSUFBSSxFQUFFO01BQ25CO01BQ0E7TUFDQU4sQ0FBQyxDQUFDMkosUUFBUSxDQUFDLENBQUM3QyxPQUFPLENBQUMsMEJBQTBCLENBQUM7TUFDL0M7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUpJO0VBQUEsT0FLQWdWLGNBQWMsR0FBZCx3QkFBZXhXLEtBQUssRUFBRTNCLFNBQVMsRUFBRTtJQUM3QixJQUFNb1ksR0FBRyxHQUFHL2IsQ0FBQyxDQUFDc0YsS0FBSyxDQUFDb1AsTUFBTSxDQUFDLENBQUNFLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDbEQsSUFBTTdGLElBQUksR0FBRy9PLENBQUMsQ0FBQytiLEdBQUcsQ0FBQyxDQUFDdmEsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQzdDLElBQUlrVCxNQUFNLEdBQUcsSUFBSTtJQUNqQixJQUFJc0gsUUFBUSxHQUFHLElBQUk7SUFDbkIsSUFBSTVVLEtBQUssR0FBRyxJQUFJO0lBQ2hCLFFBQVEySCxJQUFJO01BQ1IsS0FBSyxnQkFBZ0I7TUFDckIsS0FBSyxlQUFlO01BQ3BCLEtBQUssV0FBVztNQUNoQixLQUFLLGNBQWM7TUFDbkIsS0FBSyxRQUFRO1FBQ1QyRixNQUFNLEdBQUcxVSxDQUFDLENBQUMsZUFBZSxFQUFFK2IsR0FBRyxDQUFDO1FBQ2hDLElBQUlySCxNQUFNLElBQUlBLE1BQU0sQ0FBQy9QLE1BQU0sRUFBRTtVQUN6QnFYLFFBQVEsR0FBR3RILE1BQU0sQ0FBQzNPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQ3hDLE9BQU8sT0FBS0ksU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDSixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztVQUMvRXZELENBQUMsT0FBS2djLFFBQVEsQ0FBRyxDQUFDalcsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7VUFDdkMvRixDQUFDLE9BQUtnYyxRQUFRLENBQUcsQ0FBQ2pILFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQ2hQLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1FBQzlELENBQUMsTUFBTTtVQUNIaVcsUUFBUSxHQUFHaGMsQ0FBQyxDQUFDc0YsS0FBSyxDQUFDb1AsTUFBTSxDQUFDLENBQUMzTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUN4QyxPQUFPLE9BQUtJLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQ0osT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDNUY7UUFDQTtNQUNKLEtBQUssWUFBWTtRQUNibVIsTUFBTSxHQUFHMVUsQ0FBQyxDQUFDLGNBQWMsRUFBRStiLEdBQUcsQ0FBQztRQUMvQkMsUUFBUSxHQUFHdEgsTUFBTSxDQUFDM08sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDeEMsT0FBTyxPQUFLSSxTQUFTLEVBQUksRUFBRSxDQUFDLENBQUNKLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQy9FNkQsS0FBSyxHQUFHc04sTUFBTSxDQUFDOVMsR0FBRyxFQUFFO1FBQ3BCNUIsQ0FBQyxPQUFLZ2MsUUFBUSxDQUFHLENBQUNwYSxHQUFHLENBQUN3RixLQUFLLENBQUM7UUFDNUI7TUFDSixLQUFLLFlBQVk7TUFDakIsS0FBSyxVQUFVO1FBQ1hzTixNQUFNLEdBQUcxVSxDQUFDLENBQUMsYUFBYSxFQUFFK2IsR0FBRyxDQUFDO1FBQzlCQyxRQUFRLEdBQUd0SCxNQUFNLENBQUMzTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUN4QyxPQUFPLE9BQUtJLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQ0osT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDL0U2RCxLQUFLLEdBQUdzTixNQUFNLENBQUM5UyxHQUFHLEVBQUU7UUFDcEI1QixDQUFDLE9BQUtnYyxRQUFRLENBQUcsQ0FBQ3BhLEdBQUcsQ0FBQ3dGLEtBQUssQ0FBQztRQUM1QjtJQUFNO0lBRWQ7SUFDQXBILENBQUMsT0FBS2djLFFBQVEsQ0FBRyxDQUFDbFYsT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUN2Qzs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0FtVixrQkFBa0IsR0FBbEIsNEJBQW1CQyxZQUFZLEVBQUVuRSxPQUFPLEVBQUU7SUFDdEMsSUFBTWxVLEtBQUssR0FBR3FZLFlBQVksQ0FBQ3RILE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDakQsSUFBSSxDQUFDL1EsS0FBSyxDQUFDZ0IsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7TUFDekMsT0FBTzNDLGtEQUFJLENBQUNDLElBQUksQ0FBQztRQUNiQyxJQUFJLEVBQUUsMERBQTBEO1FBQ2hFQyxJQUFJLEVBQUUsT0FBTztRQUNiOFosT0FBTyxFQUFFLG1CQUFNO1VBQ1huYyxDQUFDLENBQUMsNEJBQTRCLEVBQUUrWCxPQUFPLENBQUMsQ0FBQ2pSLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9EO01BQ0osQ0FBQyxDQUFDO0lBQ047O0lBQ0E5RyxDQUFDLENBQUMsOEJBQThCLEVBQUUrWCxPQUFPLENBQUMsQ0FBQ2pSLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdENUUsa0RBQUksQ0FBQ2thLEtBQUssRUFBRSxDQUFDLENBQUM7RUFDbEI7O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQSxPQUdBQyxXQUFXLEdBQVgscUJBQVlDLENBQUMsRUFBRTtJQUFBO0lBQ1gsSUFBTXZFLE9BQU8sR0FBRy9YLENBQUMsQ0FBQ3NjLENBQUMsQ0FBQy9XLGFBQWEsQ0FBQyxDQUFDcVAsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUN4RCxJQUFNdEQsSUFBSSxHQUFHdFIsQ0FBQyxDQUFDLGlCQUFpQixFQUFFK1gsT0FBTyxDQUFDLENBQUMzVixJQUFJLEVBQUU7SUFDakQsSUFBTW1hLFlBQVksR0FBR3ZjLENBQUMsQ0FBQyxvQkFBb0IsRUFBRStYLE9BQU8sQ0FBQyxDQUFDcFIsSUFBSSxFQUFFO0lBQzVELElBQU1oRCxTQUFTLEdBQUczRCxDQUFDLENBQUMscUJBQXFCLEVBQUUrWCxPQUFPLENBQUMsQ0FBQ25XLEdBQUcsRUFBRTtJQUV6RE0sa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO01BQ05xTyxLQUFLLG1CQUFpQmMsSUFBTTtNQUM1QjNLLElBQUksRUFBRTRWLFlBQVk7TUFDbEJDLFdBQVcsRUFBRSxZQUFZO01BQ3pCQyxlQUFlLEVBQUUsSUFBSTtNQUNyQkMsaUJBQWlCLEVBQUUsS0FBSztNQUN4QkMsTUFBTSxFQUFFLGtCQUFNO1FBQ1Y7UUFDQSxJQUFNVCxZQUFZLEdBQUdsYyxDQUFDLENBQUNrQyxrREFBSSxDQUFDd0UsVUFBVSxFQUFFLENBQUM7UUFDekM0USxvRUFBbUIsQ0FBQzRFLFlBQVksRUFBRXZZLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDckQzRCxDQUFDLENBQUMsMEJBQTBCLEVBQUVrYyxZQUFZLENBQUMsQ0FBQzdVLE1BQU0sQ0FBQyxVQUFBL0IsS0FBSyxFQUFJO1VBQ3hELE1BQUksQ0FBQ3dXLGNBQWMsQ0FBQ3hXLEtBQUssRUFBRTNCLFNBQVMsQ0FBQztRQUN6QyxDQUFDLENBQUM7UUFDRjtRQUNBLElBQUksQ0FBQ29VLE9BQU8sQ0FBQ2xULFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1VBQ3hDN0UsQ0FBQyxDQUFDLDBCQUEwQixFQUFFa2MsWUFBWSxDQUFDLENBQUNoWSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQzlGOUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFa2MsWUFBWSxDQUFDLENBQUNoWSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQ25HOUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFa2MsWUFBWSxDQUFDLENBQUNoWSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQzFGOUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFa2MsWUFBWSxDQUFDLENBQUNoWSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzRDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQzVGOUcsQ0FBQyxDQUFDLDBCQUEwQixFQUFFa2MsWUFBWSxDQUFDLENBQUNoWSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztVQUNoRjlHLENBQUMsQ0FBQywwQkFBMEIsRUFBRWtjLFlBQVksQ0FBQyxDQUFDaFksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM0UyxNQUFNLEVBQUUsQ0FBQ2hRLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BHOztRQUVBO1FBQ0EsTUFBSSxDQUFDOFYsY0FBYyxDQUFDalosU0FBUyxDQUFDLENBQUN5UixvQkFBb0IsQ0FBQzhHLFlBQVksQ0FBQzs7UUFFN0Q7UUFDSmxjLENBQUMsQ0FBQyxtQ0FBbUMsRUFBRWtjLFlBQVksQ0FBQyxDQUFDN1csRUFBRSxDQUFDLE9BQU8sRUFBRTtVQUFBLE9BQU0sTUFBSSxDQUFDNFcsa0JBQWtCLENBQUNDLFlBQVksRUFBRW5FLE9BQU8sQ0FBQztRQUFBLEVBQUM7TUFDMUg7SUFDSixDQUFDLENBQUM7RUFDTjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBLE9BR0FnRCxtQkFBbUIsR0FBbkIsK0JBQXNCO0lBQUE7SUFDbEIsSUFBSSxDQUFDNkIsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUN4QjVjLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDcVUsT0FBTyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxVQUFBeUQsT0FBTyxFQUFJO01BQ3BELElBQUk4RSxNQUFNLEdBQUc3YyxDQUFDLENBQUMrWCxPQUFPLENBQUMsQ0FBQzdULElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDdEMsR0FBRyxFQUFFO01BQzlELE1BQUksQ0FBQ2diLGNBQWMsQ0FBQ0MsTUFBTSxDQUFDLEdBQUcsSUFBSTdJLHlFQUFxQixDQUFDaFUsQ0FBQyxDQUFDK1gsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKUCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUNtRixjQUFjLENBQUM7SUFDaEM1YyxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQ3FGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQWlYLENBQUM7TUFBQSxPQUFJLE1BQUksQ0FBQ3RCLFNBQVMsQ0FBQ3NCLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQyxDQUFDOztJQUV2RXRjLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDcUYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBaVgsQ0FBQztNQUFBLE9BQUksTUFBSSxDQUFDRCxXQUFXLENBQUNDLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQyxDQUFDOztJQUV2RSxJQUFJLENBQUNRLGlCQUFpQixFQUFFO0VBQzVCOztFQUVBO0FBQ0o7QUFDQTtBQUNBLEtBSEk7RUFBQSxPQUlBckQsaUJBQWlCLEdBQWpCLDJCQUFrQk8sT0FBTyxFQUFFO0lBQUE7SUFDdkIsSUFBSUEsT0FBTyxDQUFDclYsTUFBTSxFQUFFO01BQ2hCcVYsT0FBTyxHQUFHQSxPQUFPLENBQUMrQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2xGLFlBQVksSUFBSW1DLE9BQU8sQ0FBQ3JWLE1BQU0sQ0FBQztNQUMvRCxJQUFNcVksZUFBZSxHQUFHLFNBQWxCQSxlQUFlLEdBQVM7UUFDMUIsSUFBSWhELE9BQU8sQ0FBQ3JWLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFBRTtVQUN4QixNQUFJLENBQUNvVyxtQkFBbUIsRUFBRTtVQUMxQixPQUFPLE1BQUksQ0FBQ2pELE9BQU8sQ0FBQ3hYLElBQUksRUFBRTtRQUM5QjtRQUNBLElBQU1vVSxNQUFNLEdBQUdzRixPQUFPLENBQUNpRCxLQUFLLEVBQUU7UUFDOUIsSUFBTUMsYUFBYSxHQUFHeEksTUFBTSxDQUFDaUUsUUFBUSxFQUFFLENBQUM5SCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUd0TyxrRUFBSyxDQUFDQyxHQUFHLENBQUN1VixPQUFPLENBQUNDLE9BQU8sR0FBR3pWLGtFQUFLLENBQUNDLEdBQUcsQ0FBQzBWLE9BQU87UUFDekdnRixhQUFhLENBQUN4SSxNQUFNLEVBQUU7VUFBRTFRLFFBQVEsRUFBRTtRQUErQixDQUFDLEVBQUUsVUFBQ3JCLEdBQUcsRUFBRUMsUUFBUSxFQUFLO1VBQ25GLElBQUlELEdBQUcsRUFBRTtZQUFFO1VBQVEsQ0FBQyxDQUFDO1VBQ3JCM0MsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMyUixNQUFNLENBQUMvTyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQ3JEb2EsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUM7TUFDTixDQUFDOztNQUNEQSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsTUFBTTtNQUNIaGQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDTSxJQUFJLEVBQUU7SUFDcEI7RUFDSjs7RUFFQTtBQUNKO0FBQ0E7QUFDQSxLQUhJO0VBQUEsT0FJQXdjLGlCQUFpQixHQUFqQiw2QkFBb0I7SUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQ2xGLG9CQUFvQixFQUFFOztJQUVoQztJQUNBNVgsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDb0IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBQzNDcEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDb0IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBRTNDcEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDeUssSUFBSSxDQUFDLFlBQVksaWFBYzlCO0lBRUgwUyxzRUFBYyxDQUFDLElBQUksQ0FBQ3pjLE9BQU8sQ0FBQztJQUU1QixJQUFNMGMsVUFBVSxHQUFHQyx3RUFBcUIsQ0FBQyxRQUFRLENBQUM7SUFFbERyZCxDQUFDLENBQUNvZCxVQUFVLENBQUMsQ0FBQy9YLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQWlYLENBQUMsRUFBSTtNQUM1QixJQUFJZ0IsWUFBWSxHQUFHLENBQUNoQixDQUFDLENBQUM1SCxNQUFNLENBQUM2SSxPQUFPO01BRXBDLElBQUlELFlBQVksRUFBRTtRQUNkdGQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDd2QsS0FBSyxDQUFDLFFBQVEsQ0FBQztNQUNuQztJQUNKLENBQUMsQ0FBQztFQUNOOztFQUVBO0FBQ0o7QUFDQSxLQUZJO0VBQUEsT0FHQXZjLFVBQVUsR0FBVixzQkFBYTtJQUNULElBQUksQ0FBQzZXLE9BQU8sQ0FBQ3hWLElBQUksRUFBRTtJQUVuQixRQUFRLElBQUksQ0FBQ29WLElBQUk7TUFDYixLQUFLLFNBQVM7UUFDVixPQUFPLElBQUksQ0FBQ3lCLGVBQWUsQ0FBQyxTQUFTLENBQUM7TUFDMUMsS0FBSyxTQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUNBLGVBQWUsQ0FBQyxTQUFTLENBQUM7TUFDMUMsS0FBSyxlQUFlO1FBQ2hCLE9BQU8sSUFBSSxDQUFDZ0Isc0JBQXNCLEVBQUU7TUFDeEMsS0FBSyxjQUFjO1FBQ2YsT0FBTyxJQUFJLENBQUNFLGNBQWMsRUFBRTtJQUFDO0VBRXpDLENBQUM7RUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQzNhTDtBQUFBO0FBQUE7QUFBK0Q7QUFFL0QsSUFBTXhaLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0IsR0FBUztFQUNqQyxJQUFNNGMsaUJBQWlCLEdBQUd6ZCxDQUFDLENBQUMsa0JBQWtCLENBQUM7RUFDL0MsSUFBTTBkLGVBQWUsR0FBRzFkLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztFQUN0RCxJQUFNMmQsRUFBRSxHQUFHTix3RUFBcUIsQ0FBQyxRQUFRLENBQUM7RUFFMUMsU0FBU08sV0FBVyxDQUFDRCxFQUFFLEVBQUU7SUFDckIsSUFBTUUsVUFBVSxHQUFHLEdBQUc7SUFFdEIsSUFBSSxDQUFDRixFQUFFLENBQUNKLE9BQU8sRUFBRTtNQUNiLElBQU1PLGtCQUFrQixHQUFHNWMsTUFBTSxDQUFDNmMsT0FBTyxHQUFHN2MsTUFBTSxDQUFDOGMsV0FBVztNQUU5RCxJQUFJRixrQkFBa0IsR0FBR0wsaUJBQWlCLENBQUNoQyxNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxFQUFFO1FBQ3JEZ0MsZUFBZSxDQUFDcGIsSUFBSSxFQUFFO01BQzFCLENBQUMsTUFBTTtRQUNIb2IsZUFBZSxDQUFDcGQsSUFBSSxFQUFFO01BQzFCO01BRUFOLENBQUMsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFDbUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO1FBQ3pCLElBQU00WSxvQkFBb0IsR0FBRy9jLE1BQU0sQ0FBQzZjLE9BQU8sR0FBRzdjLE1BQU0sQ0FBQzhjLFdBQVc7UUFFaEUsSUFBSUMsb0JBQW9CLEdBQUdSLGlCQUFpQixDQUFDaEMsTUFBTSxFQUFFLENBQUNDLEdBQUcsRUFBRTtVQUN2RGdDLGVBQWUsQ0FBQ1EsTUFBTSxDQUFDTCxVQUFVLENBQUM7UUFDdEMsQ0FBQyxNQUFNO1VBQ0hILGVBQWUsQ0FBQ1MsT0FBTyxDQUFDTixVQUFVLENBQUM7UUFDdkM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLE1BQU07TUFDSEgsZUFBZSxDQUFDcGQsSUFBSSxFQUFFO0lBQzFCO0VBQ0o7RUFFQXFkLEVBQUUsQ0FBQ1MsV0FBVyxDQUFDUixXQUFXLENBQUM7RUFDM0JBLFdBQVcsQ0FBQ0QsRUFBRSxDQUFDO0VBRWZELGVBQWUsQ0FBQ3JZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUM5QixJQUFNZ1osWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzVCLElBQU1DLFlBQVksR0FBR2IsaUJBQWlCLENBQUNoQyxNQUFNLEVBQUUsQ0FBQ0MsR0FBRztJQUVuRCxJQUFJMkMsWUFBWSxFQUFFO01BQ2RuZCxNQUFNLENBQUNzRixRQUFRLENBQUMrWCxJQUFJLEdBQUcsZUFBZTtJQUMxQyxDQUFDLE1BQU07TUFDSHZlLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzJiLE9BQU8sQ0FBQztRQUFFQyxTQUFTLEVBQUUwQyxZQUFZLEdBQUc7TUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRTtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlDRDtBQUFBO0FBQ0E7QUFDQTtBQUNBLElBQU1oSCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQW1CLENBQUlrSCxLQUFLLEVBQUU3YSxTQUFTLEVBQUVpUSxHQUFHLEVBQUs7RUFDbkQ1VCxDQUFDLENBQUMsNkNBQTZDLEVBQUV3ZSxLQUFLLENBQUMsQ0FBQ2xRLElBQUksQ0FBQyxVQUFDdkYsS0FBSyxFQUFFMFYsRUFBRSxFQUFLO0lBQ3hFLElBQU1DLFFBQVEsR0FBRzFlLENBQUMsQ0FBQ3llLEVBQUUsQ0FBQyxDQUFDaFUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkN6SyxDQUFDLENBQUN5ZSxFQUFFLENBQUMsQ0FBQ2hVLElBQUksQ0FBQyxJQUFJLEVBQUttSixHQUFHLFNBQUk4SyxRQUFRLFNBQUkvYSxTQUFTLENBQUcsQ0FBQyxDQUFDO0lBQ3JEM0QsQ0FBQyxDQUFDeWUsRUFBRSxDQUFDLENBQUNFLElBQUksRUFBRSxDQUFDbFUsSUFBSSxDQUFDLEtBQUssRUFBS21KLEdBQUcsU0FBSThLLFFBQVEsU0FBSS9hLFNBQVMsQ0FBRyxDQUFDLENBQUM7RUFDakUsQ0FBQyxDQUFDO0VBQ0Y7RUFDQSxJQUFNaWIscUJBQXFCLEdBQUcsQ0FDMUIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsUUFBUSxFQUNSLFVBQVUsQ0FDYjtFQUNELElBQU1DLDhCQUE4QixHQUFHRCxxQkFBcUIsQ0FBQzNiLElBQUksQ0FBQyxHQUFHLENBQUM7RUFDdEVqRCxDQUFDLENBQUM2ZSw4QkFBOEIsRUFBRUwsS0FBSyxDQUFDLENBQUM1SixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMxUSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNvSyxJQUFJLENBQUMsVUFBQ3ZGLEtBQUssRUFBRTBWLEVBQUUsRUFBSztJQUM5RixJQUFNQyxRQUFRLEdBQUcxZSxDQUFDLENBQUN5ZSxFQUFFLENBQUMsQ0FBQ2hVLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BDekssQ0FBQyxDQUFDeWUsRUFBRSxDQUFDLENBQUNoVSxJQUFJLENBQUMsS0FBSyxFQUFLbUosR0FBRyxTQUFJOEssUUFBUSxTQUFJL2EsU0FBUyxDQUFHLENBQUMsQ0FBQztJQUN0RDNELENBQUMsQ0FBQ3llLEVBQUUsQ0FBQyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ2xVLElBQUksQ0FBQyxJQUFJLEVBQUttSixHQUFHLFNBQUk4SyxRQUFRLFNBQUkvYSxTQUFTLENBQUcsQ0FBQyxDQUFDO0VBQ2hFLENBQUMsQ0FBQztBQUNOLENBQUM7O0FBRWMyVCxrRkFBbUIsRSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2hlY2tJc0dpZnRDZXJ0VmFsaWQgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgU2hpcHBpbmdFc3RpbWF0b3IgZnJvbSAnLi9jYXJ0L3NoaXBwaW5nLWVzdGltYXRvcic7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuaW1wb3J0IENhcnRJdGVtRGV0YWlscyBmcm9tICcuL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscyc7XG5cbmltcG9ydCB7IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gfSBmcm9tICcuL2N1c3RvbS9jdXN0b20tY2FydCc7XG5pbXBvcnQgQ2FydFBhZ2VVcHNlbGwgZnJvbSAnLi9jdXN0b20vY2FydC1wYWdlLXVwc2VsbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0XScpO1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMgPSAkKCdbZGF0YS1jYXJ0LWFkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9uc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tQ2FydCA9IHRoaXMuY29udGV4dC5pdHNDb25maWcuY3VzdG9tX2NhcnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQ2FydCkge1xuICAgICAgICAgICAgZmxvYXRpbmdDaGVja291dEJ1dHRvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYXJ0UGFnZVVwc2VsbCA9IG5ldyBDYXJ0UGFnZVVwc2VsbCh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuc2V0QXBwbGVQYXlTdXBwb3J0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghbmV3UXR5KSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJCgnI21vZGFsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5sZW5ndGggJiYgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRtb2RhbC5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5vbmUoTW9kYWxFdmVudHMub3BlbmVkLCBvcHRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5jdXN0b21DYXJ0ID8gJ2N1c3RvbS9jYXJ0L2NvbnRlbnQnIDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiB0aGlzLmN1c3RvbUNhcnQgPyAnY3VzdG9tL2NhcnQvdG90YWxzJyA6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb250ZXh0LmNhbmNlbEJ1dHRvblRleHQsXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICBjb25zdCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICAvLyByZWxvYWQgY2FydCBjb250ZW50IHdoZW4gYSBDYXJ0IFBhZ2UgVXBzZWxsIGl0ZW0gaXMgYWRkZWQgdG8gdGhlIGNhcnRcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcsICgpID0+IHRoaXMucmVmcmVzaENvbnRlbnQoZmFsc2UpKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50LCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICBjb25zdCBzaGlwcGluZ0VzdGltYXRvckFsZXJ0ID0gJCgnLnNoaXBwaW5nLXF1b3RlcycpO1xuXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdGAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBlc3RpbWF0b3IgZXJyb3IgbWVzc2FnZXMgYXJlIGJlaW5nIGluamVjdGVkIGluIGh0bWwgYXMgYSByZXN1bHRcbiAgICAgICAgICAgIC8vIG9mIHVzZXIgc3VibWl0OyBjbGVhcmluZyBhbmQgYWRkaW5nIHJvbGUgb24gc3VibWl0IHByb3ZpZGVzXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICAgICAgaWYgKHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScpKSB7XG4gICAgICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScsICdhbGVydCcpO1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLmNvdW50cnksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogSWYgYSBjb3VudHJ5IHdpdGggc3RhdGVzIGlzIHRoZSBkZWZhdWx0LCBhIHNlbGVjdCB3aWxsIGJlIHNlbnQsXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlT3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBfLmVhY2goc3RhdGVzQXJyYXkuc3RhdGVzLCAoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IG1ha2VPcHRpb25JZHNVbmlxdWUgZnJvbSAnLi9tYWtlLW9wdGlvbnMtdW5pcXVlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgc3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsUHJvZHVjdCB7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdoYXNPcHRpb25zLS13aXJlZCcpO1xuXG4gICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCdmb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICB0aGlzLiRwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCB0aGlzLiRmb3JtKS52YWwoKTtcblxuICAgICAgICB0aGlzLmtleSA9ICdjcHUnOyAvLyB1bmlxdWUgaW5kZW50aWZpZXIgZm9yIHRoaXMgY3VzdG9taXphdGlvblxuXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoYFtkYXRhLSR7dGhpcy5rZXl9LW9wdGlvbi1jaGFuZ2VdYCwgdGhpcy4kZm9ybSk7IC8vIGllIDxkaXYgY2xhc3M9XCJvcHRpb25zXCIgZGF0YS1jcHUtb3B0aW9uLWNoYW5nZT5cblxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgLy8gdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZSh0aGlzLiRwcm9kdWN0SWQsIHRoaXMuJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcbiAgICAgICAgLy8gICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAvLyAgICAgLy8gaWYgKGhhc0RlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVWaWV3KGF0dHJpYnV0ZXNEYXRhLCBhdHRyaWJ1dGVzQ29udGVudCk7XG4gICAgICAgIC8vICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMudXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAvLyAgICAgLy8gfVxuICAgICAgICAvLyB9KTtcblxuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBcImlzUmVxdWlyZWRcIiB0byBvcHRpb25zIHRoYXQgYXJlIHJlcXVpcmVkXG4gICAgICovXG4gICAgYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucygpIHtcbiAgICAgICAgJCgnLmZvcm0tZmllbGQnLCB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQpLnRvQXJyYXkoKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb24pLmZpbmQoJ3NtYWxsOmNvbnRhaW5zKFwiUmVxdWlyZWRcIiknKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbikuYWRkQ2xhc3MoJ2lzUmVxdWlyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHByb2R1Y3Qgb3B0aW9ucyBjaGFuZ2VzXG4gICAgICovXG4gICAgcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zdCBvcHRpb25Sb3cgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQnKTtcblxuICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbiBhamF4IHJlcXVlc3QgaWYgaXQncyBhIGZpbGUgb3IgaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEZvcm1EYXRhXG4gICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJykgPT09ICdmaWxlJyB8fCB3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25WaWV3KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3YXMgYW4gb3B0aW9uIHdpdGggYSB2YWx1ZSBzZWxlY3RlZD9cbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9ICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3R5cGUnKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnZhbCgpLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cigndmFsdWUnLCAkY2hhbmdlZE9wdGlvbi52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RlZE9wdGlvbiA9ICRjaGFuZ2VkT3B0aW9uLmZpbmQoYG9wdGlvblt2YWx1ZT1cIiR7JGNoYW5nZWRPcHRpb24udmFsKCl9XCJdYCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkT3B0aW9uLmF0dHIoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkT3B0aW9uLnNpYmxpbmdzKCdvcHRpb24nKS5hdHRyKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIGEgZGF0ZSBzZWxlY3QsIG1ha2Ugc3VyZSBhbGwgMyBzZWxlY3RzIGFyZSBmaWxsZWQgaW4gYmVmb3JlIHNheWluZyBpdCdzIGZpbGxlZCBpblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ21vbnRoJykgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCdkYXknKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ3llYXInKSAhPT0gLTFcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgdGhlIG90aGVyIGRhdGUgZmllbGRzIChpZiBjaGFuZ2VkIG1vbnRoLCBzZWUgaWYgZGF5IGFuZCB5ZWFyIGFyZSBmaWxsZWQgb3V0KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyA9ICRjaGFuZ2VkT3B0aW9uLnNpYmxpbmdzKCdzZWxlY3QnKS50b0FycmF5KCkucmVkdWNlKChjb3VudCwgc2VsZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChzZWxlY3QpLnZhbCgpID09PSAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvdW50ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpblxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJTZWxlY3RlZERhdGVGaWVsZHMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7IC8vIGl0J3Mgbm90IGEgZGF0ZSBzZWxlY3QsIGp1c3QgbWFyayB0aGUgb3B0aW9uIGFzIHNlbGVjdGVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgkY2hhbmdlZE9wdGlvbi5pcygndGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnZhbCgpLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udGV4dCgkY2hhbmdlZE9wdGlvbi52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbHNlIHJlbW92ZSBjbGFzcyAodGhlcmUgd2FzIG5vIHZhbHVlIGZvciB0aGlzIG9wdGlvbilcbiAgICAgICAgICAgIG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGVja09wdGlvbnNTZWxlY3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNYWtlIEFQSSBjYWxsIG9uIG9wdGlvbiBjaGFuZ2UgdG8gdXBkYXRlIGF2YWlsYWJpbGl0eVxuICAgICAqL1xuICAgIHVwZGF0ZU9wdGlvblZpZXcoKSAge1xuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHRoaXMuJHByb2R1Y3RJZCwgdGhpcy4kZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgLy8gc3RvY2sgc3R1ZmYgKHNob3VsZCB3aXJlIHVwIGltYWdlIGNoYW5nZSBhcyB3ZWxsIGxhdGVyKVxuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLmN1cnJlbnRTdG9jaycsICRzY29wZSkudGV4dChwcm9kdWN0QXR0cmlidXRlc0RhdGEuc3RvY2spO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KCcnKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENoZWNrIHdoZXRoZXIgYWxsIHJlcXVpcmVkIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICovXG4gICAgY2hlY2tPcHRpb25zU2VsZWN0ZWQoKSAge1xuICAgICAgICAvKlxuICAgICAgICAjIyBzZWUgaWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IG51bWJlclJlcXVpcmVkT3B0aW9ucyA9IHRoaXMuJHNjb3BlLmZpbmQoJy5mb3JtLWZpZWxkLmlzUmVxdWlyZWQnKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG51bWJlclNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuJHNjb3BlLmZpbmQoJy5mb3JtLWZpZWxkLmlzUmVxdWlyZWQuaXNTZWxlY3RlZCcpLmxlbmd0aDtcbiAgICAgICAgLy8gY29uc3QgJGFkZFRvQ2FydEJ1dHRvbiA9ICRmb3JtLmZpbmQoJy5jYXJkLWFjdGlvbnMgLmJ1dHRvbicpO1xuICAgICAgICAvLyAkYWRkVG9DYXJ0QnV0dG9uLnJlbW92ZUNsYXNzKCdidXR0b24tLXN1Y2Nlc3MnKTtcbiAgICAgICAgaWYgKG51bWJlclJlcXVpcmVkT3B0aW9ucyA9PT0gMCB8fCBudW1iZXJSZXF1aXJlZE9wdGlvbnMgPD0gbnVtYmVyU2VsZWN0ZWRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gYWRkIGNsYXNzIHRvIHByb2R1Y3QgZm9yIGVhc3kgYWRkaW5nIHRvIGNhcnRcbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpOyAvLyByZW1vdmUgY2xhc3Mgc2luY2Ugbm90IGFsbCBvcHRpb25zIGZpbGxlZCBpblxuICAgICAgICAgICAgJCgnLmNwdV9fbW9kYWwnKS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gdXBkYXRlIHRleHQgZm9yIHVzZXIgYXMgd2VsbFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZpZXcgb2YgcHJpY2UsIG1lc3NhZ2VzLCBTS1UgYW5kIHN0b2NrIG9wdGlvbnMgd2hlbiBhIHByb2R1Y3Qgb3B0aW9uIGNoYW5nZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlUHJpY2VWaWV3KHByaWNlKSB7XG4gICAgICAgIGlmIChwcmljZS53aXRob3V0X3RheCkge1xuICAgICAgICAgICAgJChgW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF1gLCB0aGlzLiRzY29wZSkuaHRtbChwcmljZS53aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVWaWV3KGRhdGEpIHtcbiAgICAgICAgLy8gdXBkYXRlIHByaWNlXG4gICAgICAgIC8vIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcbiAgICAgICAgaWYgKF8uaXNPYmplY3QoZGF0YS5wcmljZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJpY2VWaWV3KGRhdGEucHJpY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBpbWFnZVxuICAgICAgICBjb25zdCBpbWFnZUVsID0gJChgLmNwdV9faXRlbS1pbWdgLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEuaW1hZ2UpKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVNyYyA9IGRhdGEuaW1hZ2UuZGF0YS5yZXBsYWNlKCd7OnNpemV9JywgJzMwMHgzMDAnKTtcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VTcmMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1hZ2VFbC5hdHRyKCdzcmMnLCBpbWFnZUVsLmRhdGEoJ3NyYycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgbWVzc2FnZSBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgY29uc3Qgb3B0aW9uTWVzc2FnZSA9IGRhdGEuc3RvY2tfbWVzc2FnZSB8fCBkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZTtcbiAgICAgICAgaWYgKG9wdGlvbk1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogb3B0aW9uTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0tZXJyb3InKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgYmVoYXZpb3IgPSBkYXRhLm91dF9vZl9zdG9ja19iZWhhdmlvcjtcbiAgICAgICAgY29uc3QgaW5TdG9ja0lkcyA9IGRhdGEuaW5fc3RvY2tfYXR0cmlidXRlcztcbiAgICAgICAgY29uc3Qgb3V0T2ZTdG9ja01lc3NhZ2UgPSBgICgke2RhdGEub3V0X29mX3N0b2NrX21lc3NhZ2V9KWA7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yICE9PSAnaGlkZV9vcHRpb24nICYmIGJlaGF2aW9yICE9PSAnbGFiZWxfb3B0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVdJywgdGhpcy4kc2NvcGUuYWRkKCcuY3B1X19tb2RhbCcpKS5lYWNoKChpLCBhdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhdHRyaWJ1dGUgPSAkKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBjb25zdCBhdHRySWQgPSBwYXJzZUludCgkYXR0cmlidXRlLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlLXZhbHVlJyksIDEwKTtcblxuICAgICAgICAgICAgaWYgKGluU3RvY2tJZHMuaW5kZXhPZihhdHRySWQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndW5hdmFpbGFibGUnKVxuICAgICAgICAgICAgICAgIC5wcmV2KCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBjb25zdCAkc2VsZWN0ID0gJGF0dHJpYnV0ZS5wYXJlbnQoKTtcblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgaXMgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiBhIHNlbGVjdCBkcm9wZG93biwgc2VsZWN0IHRoZSBmaXJzdCBvcHRpb24gKE1FUkMtNjM5KVxuICAgICAgICAgICAgaWYgKCRhdHRyaWJ1dGUucGFyZW50KCkudmFsKCkgPT09ICRhdHRyaWJ1dGUuYXR0cigndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICRzZWxlY3RbMF0uc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpICsgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3VuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSB7XG4gICAgICAgIGNvbnN0ICRwYXJlbnQgPSAkYXR0cmlidXRlLmNsb3Nlc3QoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpO1xuICAgICAgICByZXR1cm4gJHBhcmVudCA/ICRwYXJlbnQuZGF0YSgncHJvZHVjdC1hdHRyaWJ1dGUnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgcmFkaW8gYnV0dG9ucyB0byBnZXQgZGVzZWxlY3RlZFxuICAgICAqL1xuICAgIGluaXRSYWRpb0F0dHJpYnV0ZXMoKSB7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCB0aGlzLiRzY29wZSkuZWFjaCgoaSwgcmFkaW8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRyYWRpbyA9ICQocmFkaW8pO1xuXG4gICAgICAgICAgICAvLyBPbmx5IGJpbmQgdG8gY2xpY2sgb25jZVxuICAgICAgICAgICAgaWYgKCRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICRyYWRpby5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcmFkaW8uZGF0YSgnc3RhdGUnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5kYXRhKCdzdGF0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UmFkaW9BdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJywgJHJhZGlvLnByb3AoJ2NoZWNrZWQnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRzXG4gICAgICovXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgbWFrZU9wdGlvbklkc1VuaXF1ZSh0aGlzLiRzY29wZSwgdGhpcy4kcHJvZHVjdElkLCB0aGlzLmtleSk7IC8vIG1ha2Ugb3B0aW9ucyB1bmlxdWUgc28gdGhlcmUgYWVyIG5vIGNvbmZsaWN0cyB3aGVuIHNlbGVjdGluZyBvcHRpb25zXG5cbiAgICAgICAgdGhpcy5hZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zKCk7IC8vIGFkZCBcImlzUmVxdWlyZWRcIiB0byByZXF1aXJlZCBvcHRpb25zXG4gICAgICAgIHRoaXMuY2hlY2tPcHRpb25zU2VsZWN0ZWQoKTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIG9wdGlvbiBjaGFuZ2VzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuc2hvdygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBvcHRpb25zIHNlbGVjdGVkIG9uIGxvYWRcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIGNoZWNrYm94IG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIGNoZWNrYm94IHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgdGV4dCB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgbnVtYmVycyB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykucGFyZW50KCkudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgc2VsZWN0IGJveCB2YWx1ZXNcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuaW1wb3J0IENhcnRQYWdlVXBzZWxsUHJvZHVjdCBmcm9tICcuL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzJztcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XG5pbXBvcnQgZm9ybWF0Q2Fyb3VzZWwgZnJvbSAnLi4vY29tbW9uL2Nhcm91c2VsL2luZGV4JztcbmltcG9ydCB1cHNlbGxTdWl0ZUNQVSBmcm9tICcuL3Vwc2VsbC1hcnJheS1jYXJ0LXBhZ2UnO1xuXG5pbXBvcnQgbWVkaWFRdWVyeUxpc3RGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9tZWRpYS1xdWVyeS1saXN0JztcblxuLy8gIEFwciAyMDE5OiB1cGRhdGVkIHZlcnNpb24gaW5jbHVkZXMgSVRTIFVwc2VsbCBTdWl0ZVxuY29uc3QgVkVSU0lPTiA9ICcyLjAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0UGFnZVVwc2VsbCB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW50dWl0U29sdXRpb25zLm5ldCAtIENhcnQgUGFnZSBVcHNlbGwnLCBWRVJTSU9OKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb3B0aW9ucyA9ICdyZWxhdGVkJywgJ3NpbWlsYXInLCAnY3VzdG9tIGZpZWxkcydcbiAgICAgICAgICogZXJyb3JEZWZhdWx0ID0gYmFja3VwIG1vZGU7IG9ubHkgbmVjZXNzYXJ5IHdpdGggVXBzZWxsIFN1aXRlXG4gICAgICAgICAqIC0tIHJlbGF0ZWQgPSBhdXRvbWF0aWNhbGx5IGxvYWRzIHJlbGF0ZWQgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XG4gICAgICAgICAqIC0tIHNpbWlsYXIgPSBhdXRvbWF0aWNhbGx5IGxvYWRzIHNpbWlsYXIgYnkgdmlldyBwcm9kdWN0cyBmcm9tIGEgcmFuZG9tIGl0ZW0gaW4gdGhlIGNhcnRcbiAgICAgICAgICogLS0gY3VzdG9tIGZpZWxkcyA9IHdpbGwgbG9hZCB0aGUgcHJvZHVjdHMgc3BlY2lmaWVkIGJ5IHRoZSBjYXJ0IGl0ZW0ncyBjdXN0b20gZmllbGRzXG4gICAgICAgICAqIC0tIHVwc2VsbCBzdWl0ZSA9IHdpbGwgbG9hZCBwcm9kdWN0cyBzcGVjaWZpZWQgYnkgVXBzZWxsIFN1aXRlIENTVnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW9kZSA9ICd1cHNlbGwgc3VpdGUnO1xuICAgICAgICB0aGlzLmVycm9yRGVmYXVsdCA9ICdyZWxhdGVkJztcbiAgICAgICAgdGhpcy5zaG93TW9iaWxlSW5DYXJvdXNlbCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJvZHVjdExpbWl0ID0gMztcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSAkKCcjY3B1IC5sb2FkaW5nT3ZlcmxheScpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQgPSB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkLmJpbmQodXRpbHMuYXBpLnByb2R1Y3QpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSA9IHV0aWxzLmFwaS5nZXRQYWdlLmJpbmQodXRpbHMuYXBpKTsgLy8gcmVxdWlyZWQgdG8ga2VlcCBzY29wZSBvZiB1dGlscyB0byB0aGUgdXRpbHNcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgZHVwbGljYXRlIGl0ZW1zIGZyb20gYXJyYXlcbiAgICAgKlxuICAgICAqIHB1bGxlZCBmcm9tIHN0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MjI5NjQ1L3JlbW92ZS1kdXBsaWNhdGUtdmFsdWVzLWZyb20tanMtYXJyYXlcbiAgICAgKiBAcGFyYW0ge2FycmF5fSB1cHNlbGxUYXJnZXRzIC0gYXJyYXkgb2YgaXRlbXMgd2Ugd2FudCB0byBzdHJpcCBvdXQgYW55IGR1cGxpY2F0ZSBpdGVtcyBmcm9tXG4gICAgICovXG4gICAgcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh1cHNlbGxUYXJnZXRzKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodXBzZWxsVGFyZ2V0cykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCBjYXJ0IGl0ZW1zIFVSTHMgYW5kIFByb2R1Y3QgSWRzIHNvIHdlIGRvbid0IHRyeSB0byB1cHNlbGwgYW4gaXRlbSB0aGF0J3MgYWxyZWFkeSBpbiB0aGUgY2FydFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgY2FydCBpdGVtIG1hdGNoZXMgZnJvbVxuICAgICAqL1xuICAgIHJlbW92ZUNhcnRJdGVtVGFyZ2V0cyh1cHNlbGxUYXJnZXRzKSB7XG4gICAgICAgIC8vIGdldCBhbGwgZGF0YSBmcm9tIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgIGNvbnN0IGNhcnRJdGVtRGF0YSA9IFtdO1xuICAgICAgICAkKCdbZGF0YS11cHNlbGxdJykudG9BcnJheSgpLmZvckVhY2goY2FydEl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdHVybCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtdXJsJykucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCAnJykgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGNhcnRJdGVtKS5kYXRhKCdwcm9kdWN0LWlkJykudG9TdHJpbmcoKSB8fCAnJztcbiAgICAgICAgICAgIGNhcnRJdGVtRGF0YS5wdXNoKHByb2R1Y3R1cmwsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBvbmx5IGtlZXAgdXBzZWxsIGl0ZW1zIHRoYXQgYXJlbid0IHdpdGhpbiBvdXIgY2FydEl0ZW1EYXRhIGFycmF5XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHVwc2VsbFRhcmdldHMucmVkdWNlKCh1cHNlbGxJdGVtcywgdXBzZWxsaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcnRJdGVtRGF0YS5pbmRleE9mKHVwc2VsbGl0ZW0pID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwc2VsbEl0ZW1zLnB1c2godXBzZWxsaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXBzZWxsSXRlbXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByYW5kb20gaW50IGdpdmVuIGEgbWF4XG4gICAgICovXG4gICAgZ2V0UmFuZG9tSW50KG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhdXRvbWF0aWNhbGx5IGxvYWQgcHJvZHVjdHMgZnJvbSB0aGUgY2FydCBpdGVtJ3MgZWl0aGVyIHJlbGF0ZWQgcHJvZHVjdHMgb3Igc2ltaWxhciBieSB2aWV3IGl0ZW1zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBcInJlbGF0ZWRcIiBvciBcInNpbWlsYXJcIlxuICAgICAqL1xuICAgIGxvYWRBdXRvVGFyZ2V0cyh0eXBlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZ2V0UmFuZG9tSW50KCQoJy5jYXJ0LWl0ZW0nKS5sZW5ndGgpOyAvLyBnZXQgcmFuZG9tIGl0ZW0gaW5kZXggKHBpY2sgcmFuZG9tIGl0ZW0pXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoJy5jYXJ0LWl0ZW0nKS5lcShpdGVtSW5kZXggfHwgMCkuZGF0YSgncHJvZHVjdC1pZCcpOyAvLyBnZXQgcHJvZHVjdCBpZCBvZiB0aGF0IHJhbmRvbSBpdGVtXG4gICAgICAgIGlmIChpdGVtSWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gJCgnI2NwdScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZWUgaWYgd2UgYWxyZWFkeSBhamF4J2QgZm9yIHRoZXNlIHVwc2VsbCBpdGVtc1xuICAgICAgICBsZXQgc3RvcmVkRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGNwdV9faXRlbXMke2l0ZW1JZH1gKSkgfHwgW107XG4gICAgICAgIGlmIChzdG9yZWREYXRhLmxlbmd0aCkgeyAvLyBpZiBhbHJlYWR5IGFqYXhlZCBhbmQgc3RvcmVkIHVwc2VsbCBpdGVtc1xuICAgICAgICAgICAgc3RvcmVkRGF0YSA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyhzdG9yZWREYXRhKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xuICAgICAgICAgICAgc3RvcmVkRGF0YSA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHN0b3JlZERhdGEpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgICAgICB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHN0b3JlZERhdGEpOyAvLyBsb2FkIHRob3NlIHN0b3JlZCB1cHNlbGwgaXRlbXNcbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlXG4gICAgICAgICAgICBjb25zdCBvcHRzID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtdGFyZ2V0cy0tJHt0eXBlfWAsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRfcHJvZHVjdHM6IHsgbGltaXQ6IDcwLCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltaWxhcl9ieV92aWV3czogeyBsaW1pdDogNzAsIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQoaXRlbUlkLCBvcHRzLCAoZXJyLCByZXMpID0+IHsgLy8gYWpheCBmb3IgdGhlIGZpcnN0IGl0ZW0ncyB1cHNlbGwgaXRlbXMgKHN1Z2dlc3RlZCBwcm9kdWN0cylcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IEpTT04ucGFyc2UocmVzKSB8fCBbXTtcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgZHVwbGljYXRlIHVwc2VsbCB0YXJnZXRzXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNwdV9faXRlbXMke2l0ZW1JZH1gLCBKU09OLnN0cmluZ2lmeSh0YXJnZXRzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhcnJheSBvZiB1cHNlbGwgcHJvZHVjdCBVUkxzIGFuZC9vciBJRHNcbiAgICAgKi9cbiAgICBsb2FkQ3VzdG9tRmllbGRUYXJnZXRzKCkge1xuICAgICAgICBsZXQgdGFyZ2V0cyA9IFtdO1xuICAgICAgICAkKCdbZGF0YS11cHNlbGxdJykudG9BcnJheSgpLmZvckVhY2goY2FydEl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBzZWxsSXRlbXMgPSAkKGNhcnRJdGVtKS5kYXRhKCd1cHNlbGwnKTtcbiAgICAgICAgICAgIGlmICh1cHNlbGxJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB1cHNlbGxJdGVtc1xuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCh1cHNlbGxJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHNlbGxJdGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHMucHVzaCh1cHNlbGxJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiBtb2RlIGlzIHNldCB0byBjdXN0b20gZmllbGRzIGJ1dCBubyBpdGVtcyBoYXZlIGN1c3RvbSBmaWVsZHMgYXBwbGllZCwgZGVmYXVsdCB0byB1c2luZyByZWxhdGVkIHByb2R1Y3RzXG4gICAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKCdyZWxhdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh0YXJnZXRzKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xuICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZENTVlRhcmdldHMgKCkgICAge1xuICAgICAgICAvLyAgZ2V0IHRoZSBwcmV2aW91c2x5IEFKQVhlZCBwcm9kdWN0cyBmcm9tIHNlc3Npb25TdG9yYWdlXG4gICAgICAgIGNvbnN0IGNwdUhUTUx0ZXh0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNwdUNhcmRzXCIpO1xuICAgICAgICBjb25zdCBjcHVIVE1MID0gdXBzZWxsU3VpdGVDUFUucGFyc2VBcnJheUZyb21TdHJpbmcoY3B1SFRNTHRleHQpO1xuXG4gICAgICAgIC8vICBpZiBub3RoaW5nIGhhcyBiZWVuIGRvd25sb2FkZWQsXG4gICAgICAgIC8vICByZXZlcnQgdG8gYmFja3VwIG1vZGVcbiAgICAgICAgaWYgKCFjcHVIVE1MLmxlbmd0aCkgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKHRoaXMuZXJyb3JEZWZhdWx0KTtcblxuICAgICAgICAvLyAgZGlzcGxheSB0aGUgcHJldmlvdWx5IGRvd25sb2FkZWQgcHJvZHVjdHNcbiAgICAgICAgY3B1SFRNTC5mb3JFYWNoKGNhcmQgPT4gJCgnI2NwdSAuY3B1X19saXN0LS1jdXN0b21maWVsZHMnKS5hcHBlbmQoY2FyZC5odG1sKSlcblxuICAgICAgICAvLyAgaWYgdGhlcmUgaXMgcm9vbSBmb3IgbW9yZSBwcm9kdWN0cyxcbiAgICAgICAgLy8gIGZpbGwgdGhlIHJlc3Qgb2YgdGhlIGFkZC1vbiBieVxuICAgICAgICAvLyAgYWRkaW5nIHByb2R1Y3RzIGZyb20gdGhlIENTVnNcbiAgICAgICAgLy8gIG9mIHByb2R1Y3RzIGFscmVhZHkgaW4gdGhlIENQVVxuICAgICAgICBsZXQgcmVtYWluaW5nU2xvdHMgPSB0aGlzLnByb2R1Y3RMaW1pdCAtIGNwdUhUTUwubGVuZ3RoO1xuICAgICAgICBpZiAocmVtYWluaW5nU2xvdHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBhd2FpdCB1cHNlbGxTdWl0ZUNQVS5nZXRBZGRpdGlvbmFsUHJvZHVjdHMoY3B1SFRNTC5tYXAocHJvZHVjdCA9PiBwcm9kdWN0LnByb2R1Y3RfaWQpLCByZW1haW5pbmdTbG90cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XG4gICAgICAgICAgICB9ICAgY2F0Y2goZXJyKSAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDUFUgcGFyc2UgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSBhZGRpbmcgaXRlbXMgdG8gY2FydFxuICAgICAqL1xuICAgIGFkZFRvQ2FydChldmVudCkge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuY3B1X19pdGVtJyk7XG4gICAgICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2hhc0Vycm9yJyk7IC8vIHJlbW92ZSBhbnkgZXJyb3IgaGlnaGxpZ2h0aW5nXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWRcbiAgICAgICAgaWYgKHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMnKSAmJiAhcHJvZHVjdC5oYXNDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgcHJvZHVjdC5oYXNDbGFzcygnaGFzT3B0aW9ucy0td2lyZWQnKVxuICAgICAgICAgICAgICAgID8gJCgnLnFhYXR4X19vcHRpb25zJywgcHJvZHVjdCkuc2xpZGVEb3duKCkgLy8gaWYgb3B0aW9ucyBsb2FkZWQsIGp1c3Qgc2hvdyB0aGVtXG4gICAgICAgICAgICAgICAgOiB0aGlzLnRvZ2dsZU9wdGlvbnMoZXZlbnQpOyAvLyBvcHRpb25zIGFyZW4ndCBsb2FkZWQsIGxvYWQgdGhlbSArIHNob3cgdGhlbVxuICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzRXJyb3InKTtcbiAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1BsZWFzZSBtYWtlIHN1cmUgYWxsIHJlcXVpcmVkIG9wdGlvbnMgaGF2ZSBiZWVuIHNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWN0dWFsbHkgYWRkIHRvIGNhcnRcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcbiAgICAgICAgY29uc3QgZm9ybSA9ICQoJy5jcHVfX2l0ZW0tZm9ybScsIHByb2R1Y3QpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtQWRkKG5ldyBGb3JtRGF0YShmb3JtWzBdKSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVyciB8fCByZXNwb25zZS5kYXRhLmVycm9yOyAvLyB0YWtlIG5vdGUgb2YgZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7IC8vIEd1YXJkIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBIVE1MIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzRXJyb3InKTsgLy8gaGlnaGxnaWhodCBlcnJvciBpdGVtXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JPZmZzZXQgPSBwcm9kdWN0Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogKGVycm9yT2Zmc2V0IC0gMjApIH0sIDcwMCk7IC8vIHNjcm9sbCB1c2VyIHRvIHRoZSBlcnJvciBwcm9kdWN0XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzIGZyb20gb3VyICdxdWVkXCIgaXRlbXNcbiAgICAgICAgICAgICAgICAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLnJlbW92ZUNsYXNzKCdpc0JlaW5nQWRkZWQnKTtcbiAgICAgICAgICAgICAgICAvLyBhbGVydCB1c2VyIG9mIGVycm9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgICAgIC8vIHByb2R1Y3QuYWRkQ2xhc3MoJ3dhc0FkZGVkJyk7XG4gICAgICAgICAgICAvLyAkKCcuY3B1X19pdGVtLWJ1dHRvbicsIHByb2R1Y3QpLnRleHQoJ0FkZGVkIHRvIENhcnQnKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcpO1xuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3QuaGFzQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpKSB7XG4gICAgICAgICAgICAvLyAgICAgcHJvZHVjdC5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XG4gICAgICAgICAgICAvLyAgICAgKCQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykgJiYgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5sZW5ndGgpXG4gICAgICAgICAgICAvLyAgICAgICAgID8gJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5lcSgwKS5maW5kKCcucWFhdGNfX2FkZHRvY2FydCcpLnRyaWdnZXIoJ2NsaWNrJykgLy8gdHJpZ2dlciBzdWJtaXR0aW5nIG5leHQgcHJvZHVjdCB0byB0aGUgY2FydFxuICAgICAgICAgICAgLy8gICAgICAgICA6IHdpbmRvdy5sb2NhdGlvbiA9ICcvY2FydC5waHAnO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3aGVuIG1vZGFsIG9wdGlvbiBjaGFuZ2VkIHdlIG5lZWQgdG8gc3luYyB0aGUgXCJyZWFsXCIgZm9ybS4gU3luYyBvcHRpb25zIHNlbGVjdGVkIGluIHNjb3BlMSB3aXRoIHNjb3BlMlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9kdWN0SWRcbiAgICAgKi9cbiAgICBzeW5jRm9ybU9wdGlvbihldmVudCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpO1xuICAgICAgICBjb25zdCB0eXBlID0gJChvcHQpLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSBudWxsO1xuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBudWxsO1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2lucHV0LWNoZWNrYm94JzpcbiAgICAgICAgICAgIGNhc2UgJ3NldC1yZWN0YW5nbGUnOlxuICAgICAgICAgICAgY2FzZSAnc2V0LXJhZGlvJzpcbiAgICAgICAgICAgIGNhc2UgJ3Byb2R1Y3QtbGlzdCc6XG4gICAgICAgICAgICBjYXNlICdzd2F0Y2gnOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJ2lucHV0OmNoZWNrZWQnLCBvcHQpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnNpYmxpbmdzKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSAkKGV2ZW50LnRhcmdldCkucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZXQtc2VsZWN0JzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1zZWxlY3QnLCBvcHQpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0LnByb3AoJ2lkJykucmVwbGFjZShgXyR7cHJvZHVjdElkfWAsICcnKS5yZXBsYWNlKCdtb2RhbF8nLCAnJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQudmFsKCk7XG4gICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lucHV0LXRleHQnOlxuICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJy5mb3JtLWlucHV0Jywgb3B0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yY2UgdXBkYXRlIG9uIHRoZSBcInJlYWxcIiBmb3JtXG4gICAgICAgICQoYCMke3RhcmdldElkfWApLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0byBjYXJ0IGZyb20gbW9kYWxcbiAgICAgKi9cbiAgICBhZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gbW9kYWxDb250ZW50LnBhcmVudHMoJy5jcHVfX21vZGFsJyk7XG4gICAgICAgIGlmICghbW9kYWwuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1vcHRpb25zJywgcHJvZHVjdCkudHJpZ2dlcignY2xpY2snKTsgLy8gc2hvdyBvcHRpb25zIGFnYWluIGlmIHRyaWVkIGFkZGluZyB0byBjYXJ0IGJlZm9yZSBzZWxlY3RpbmcgYWxsIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLWFkZHRvY2FydCcsIHByb2R1Y3QpLnRyaWdnZXIoJ2NsaWNrJyk7IC8vIHRyaWdnZXIgYWRkIHRvIGNhcnQgYnV0dG9uIGNsaWNrIG9uIG1haW4gcHJvZHVjdFxuICAgICAgICBzd2FsLmNsb3NlKCk7IC8vIGNsb3NlIG1vZGFsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2hvdyBhbmQgbG9hZCBpZiBuZWVkZWQgdGhpcyBwcm9kdWN0J3Mgb3B0aW9uc1xuICAgICAqL1xuICAgIHNob3dPcHRpb25zKGUpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuY3B1X19pdGVtJyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAkKCcuY3B1X19pdGVtLW5hbWUnLCBwcm9kdWN0KS50ZXh0KCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbk1hcmt1cCA9ICQoJy5jcHVfX2l0ZW0tb3B0aW9ucycsIHByb2R1Y3QpLmh0bWwoKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgcHJvZHVjdCkudmFsKCk7XG5cbiAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBgT3B0aW9ucyBmb3IgJHtuYW1lfWAsXG4gICAgICAgICAgICBodG1sOiBvcHRpb25NYXJrdXAsXG4gICAgICAgICAgICBjdXN0b21DbGFzczogJ2NwdV9fbW9kYWwnLFxuICAgICAgICAgICAgc2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgb25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gc2luY2UgdGhlIG1vZGEgbEhUTUwgaXMgY2xvbmVkIGl0IGRvZXNuJ3QgaGF2ZSBhbnkgaGFuZGxlcnMgYXBwbGllZCB0byBpdC4gVGhpcyBoYW5kbGVzIHRoZSBcImZha2VcIiBjbG9uZWQgb3B0aW9ucyB0byB1cGRhdGUgdGhlIFwicmVhbFwiIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbENvbnRlbnQgPSAkKHN3YWwuZ2V0Q29udGVudCgpKTtcbiAgICAgICAgICAgICAgICBtYWtlT3B0aW9uSWRzVW5pcXVlKG1vZGFsQ29udGVudCwgcHJvZHVjdElkLCAnbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Zvcm1PcHRpb24oZXZlbnQsIHByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBkZWZhdWx0IHNlbGVjdGVkIG9wdGlvbnMgdW5sZXNzIHRoZXJlJ3MgYW4gZXJyb3IuLiB0aGVuIHdlJ2xsIGdldCBzdHVjayBpbiBhIGxvb3BcbiAgICAgICAgICAgICAgICBpZiAoIXByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIHJhZGlvIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHJhZGlvIGJ1dHRvbnMgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgdGV4dCB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgndGV4dGFyZWEnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gdGV4dGFyZWEgdHAgY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykucGFyZW50KCkudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgc2VsZWN0IGJveCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9wdGlvbkhhbmRsZXJzW3Byb2R1Y3RJZF0udXBkYXRlT3B0aW9uVmlldygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnNbcHJvZHVjdElkXS5jaGVja09wdGlvbnNTZWxlY3RlZChtb2RhbENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBhZGRpbmcgdG8gY2FydCBmcm9tIG1vZGFsXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW1vZGFsYWRkdG9jYXJ0JywgbW9kYWxDb250ZW50KS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmFkZFRvQ2FydEZyb21Nb2RhbChtb2RhbENvbnRlbnQsIHByb2R1Y3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYXBwbHkgdXBzZWxsIGhhbmRsZXJzXG4gICAgICovXG4gICAgYXBwbHlVcHNlbGxIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5vcHRpb25IYW5kbGVycyA9IHt9O1xuICAgICAgICAkKCcuY3B1X19pdGVtLmhhc09wdGlvbnMnKS50b0FycmF5KCkuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGxldCB0aGlzSUQgPSAkKHByb2R1Y3QpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3RoaXNJRF0gPSBuZXcgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0KCQocHJvZHVjdCkpXG4gICAgICAgIH0pOyAvLyBoYW5kbGUgb3B0aW9ucyBmb3IgYWxsIHByb2R1Y3RzIHcvIG9wdGlvbnNcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25IYW5kbGVycyk7XG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnKS5vbignY2xpY2snLCBlID0+IHRoaXMuYWRkVG9DYXJ0KGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XG5cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW9wdGlvbnMnKS5vbignY2xpY2snLCBlID0+IHRoaXMuc2hvd09wdGlvbnMoZSkpOyAvLyBtYW5hZ2UgYWRkaW5nIHRvIGNhcnRcblxuICAgICAgICB0aGlzLmRpc3BsYXlJbkNhcm91c2VsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUpBWCB0aGUgdXBzZWxsIFVSTHMgYW5kL29yIElEcyBhbmQgYXBwZW5kIHdoZXJlIG5lZWRlZFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHRhcmdldHMgLSB0YXJnZXRzIHRvIHVwc2VsbFxuICAgICAqL1xuICAgIGxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpIHtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5zbGljZSgwLCB0aGlzLnByb2R1Y3RMaW1pdCB8fCB0YXJnZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBydW5RdWV1ZUluT3JkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7IC8vIHdoZW4gZG9uZSBhbGwgcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IHRhcmdldC50b1N0cmluZygpLm1hdGNoKC9eWzAtOV0rJC8pID8gdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCA6IHV0aWxzLmFwaS5nZXRQYWdlO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RNZXRob2QodGFyZ2V0LCB7IHRlbXBsYXRlOiAnY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtaXRlbScgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgeyByZXR1cm47IH0gLy8gaWYgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NwdSAuY3B1X19saXN0LS1jdXN0b21maWVsZHMnKS5hcHBlbmQocmVzcG9uc2UpOyAvLyBubyBlcnJvciwgYXBwZW5kIG1hcmt1cFxuICAgICAgICAgICAgICAgICAgICBydW5RdWV1ZUluT3JkZXIoKTsgLy8gcnVuIG5leHQgaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJ1blF1ZXVlSW5PcmRlcigpOyAvLyBzdGFydCB0aGUgbG9vcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI2NwdScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBTbGljayBvcHRpb25zIHRvIHByb2R1Y3QgZGlzcGxheSBhZnRlciBsb2FkaW5nIHByb2R1Y3RzLFxuICAgICAqIHRoZW4gZmlyZSBTbGlja1xuICAgICAqL1xuICAgIGRpc3BsYXlJbkNhcm91c2VsKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hvd01vYmlsZUluQ2Fyb3VzZWwpIHJldHVybjtcblxuICAgICAgICAvLyAgQWRkIENTUyB0byBwcm9kdWN0IGNhcmRzIGJlZm9yZSBmaXJpbmcgU2xpY2tcbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLmFkZENsYXNzKCdjcHVfX2xpc3Qtc2xpY2snKVxuICAgICAgICAkKCcuY3B1X19pdGVtJykuYWRkQ2xhc3MoJ2NwdV9faXRlbS1zbGljaycpXG5cbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLmF0dHIoJ2RhdGEtc2xpY2snLCBge1xuICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibW9iaWxlRmlyc3RcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicm93c1wiOiAxLFxuICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcbiAgICAgICAgICAgIFwicmVzcG9uc2l2ZVwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImJyZWFrcG9pbnRcIjogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgXCJzZXR0aW5nc1wiOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfWApO1xuXG4gICAgICAgIGZvcm1hdENhcm91c2VsKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgbWVkaWFNYXRjaCA9IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSgnbWVkaXVtJyk7XG5cbiAgICAgICAgJChtZWRpYU1hdGNoKS5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICBsZXQgYmluZFRvV2luZG93ID0gIWUudGFyZ2V0Lm1hdGNoZXNcblxuICAgICAgICAgICAgaWYgKGJpbmRUb1dpbmRvdykge1xuICAgICAgICAgICAgICAgICQoJy5jcHVfX2xpc3QnKS5zbGljaygncmVpbml0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudHNcbiAgICAgKi9cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdyZWxhdGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3JlbGF0ZWQnKTtcbiAgICAgICAgICAgIGNhc2UgJ3NpbWlsYXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygnc2ltaWxhcicpO1xuICAgICAgICAgICAgY2FzZSAnY3VzdG9tIGZpZWxkcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEN1c3RvbUZpZWxkVGFyZ2V0cygpO1xuICAgICAgICAgICAgY2FzZSAndXBzZWxsIHN1aXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQ1NWVGFyZ2V0cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSBmcm9tICcuLi9jb21tb24vbWVkaWEtcXVlcnktbGlzdCc7XG5cbmNvbnN0IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgJHN1bW1hcnlDb250YWluZXIgPSAkKCcuanMtY2FydF9fdG90YWxzJyk7XG4gICAgY29uc3QgJGZsb2F0aW5nQnV0dG9uID0gJCgnLmZsb2F0aW5nLWNoZWNrb3V0LWJ1dHRvbicpO1xuICAgIGNvbnN0IG1xID0gbWVkaWFRdWVyeUxpc3RGYWN0b3J5KCdtZWRpdW0nKTtcblxuICAgIGZ1bmN0aW9uIFdpZHRoQ2hhbmdlKG1xKSB7XG4gICAgICAgIGNvbnN0IGZhZGVUaW1pbmcgPSA0MDA7XG5cbiAgICAgICAgaWYgKCFtcS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpbml0V2luZG93UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgaWYgKGluaXRXaW5kb3dQb3NpdGlvbiA8ICRzdW1tYXJ5Q29udGFpbmVyLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5oaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVdpbmRvd1Bvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoYm90dG9tV2luZG93UG9zaXRpb24gPCAkc3VtbWFyeUNvbnRhaW5lci5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgJGZsb2F0aW5nQnV0dG9uLmZhZGVJbihmYWRlVGltaW5nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uZmFkZU91dChmYWRlVGltaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtcS5hZGRMaXN0ZW5lcihXaWR0aENoYW5nZSk7XG4gICAgV2lkdGhDaGFuZ2UobXEpO1xuXG4gICAgJGZsb2F0aW5nQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ29Ub0NoZWNrb3V0ID0gZmFsc2U7IC8vIFNldCB0byB0cnVlIGlmIHRoZSBidXR0b24gc2hvdWxkIGdvIHRvIGNoZWNrb3V0IGluc3RlYWQgb2Ygc2Nyb2xsaW5nIHRoZSB1c2VyIGRvd24gdGhlIHBhZ2VcbiAgICAgICAgY29uc3QgdG90YWxzT2Zmc2V0ID0gJHN1bW1hcnlDb250YWluZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgIGlmIChnb1RvQ2hlY2tvdXQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jaGVja291dC5waHAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRvdGFsc09mZnNldCAtIDEwMCB9LCA3MDApOyAvLyBzY3JvbGwgdXNlciB0byB0aGUgcmVhbCBjaGVja291dCBidXR0b24gcHJvZHVjdFxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBmbG9hdGluZ0NoZWNrb3V0QnV0dG9uIH07XG4iLCIvKlxuICogcHV0IHByb2R1Y3RJRCBvbiB0aGUgZWxlbWVudCdzIFwiZm9yXCIgYW5kIFwiaWRcIiBhdHRycyBzbyBtdWx0aXBsZSBjYXNlcyBvZiBzYW1lIG9wdGlvbiBzZXQgd29uJ3QgY29uZmxpY3RcbiAqL1xuY29uc3QgbWFrZU9wdGlvbklkc1VuaXF1ZSA9IChzY29wZSwgcHJvZHVjdElkLCBrZXkpID0+IHtcbiAgICAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNjb3BlKS5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSAkKGVsKS5hdHRyKCdpZCcpOyAvLyB1cGRhdGUgSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLmF0dHIoJ2lkJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkubmV4dCgpLmF0dHIoJ2ZvcicsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gbGFiZWwgdG8gdGFyZ2V0IHVwZGF0ZWQgSURcbiAgICB9KTtcbiAgICAvLyBhZGQgaW5wdXQgZmllbGRzIGxhYmVsIGNsYXNzIGFuZCBwdXQgaW4gaGVyZS4gVGhlc2Ugb3B0aW9ucyB3ZSBuZWVkIHRvIHNlbGVjdCB0aGVpciBzaWJsaW5nIGxhYmVsXG4gICAgY29uc3Qgb3B0aW9uc1dpdGhMYWJlbEF0dHJzID0gW1xuICAgICAgICAnaW5wdXRbdHlwZT1cInRleHRcIl0nLFxuICAgICAgICAnaW5wdXRbdHlwZT1cIm51bWJlclwiXScsXG4gICAgICAgICdpbnB1dFt0eXBlPVwiZmlsZVwiXScsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAndGV4dGFyZWEnLFxuICAgIF1cbiAgICBjb25zdCBvcHRpb25zV2l0aExhYmVsQXR0cnNTZWxlY3RvcnMgPSBvcHRpb25zV2l0aExhYmVsQXR0cnMuam9pbignLCcpO1xuICAgICQob3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzLCBzY29wZSkucGFyZW50cygnLmZvcm0tZmllbGQnKS5maW5kKCdsYWJlbCcpLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2ZvcicpOyAvLyB1cGRhdGUgSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLmF0dHIoJ2ZvcicsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLm5leHQoKS5hdHRyKCdpZCcsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gbGFiZWwgdG8gdGFyZ2V0IHVwZGF0ZWQgSURcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZU9wdGlvbklkc1VuaXF1ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=