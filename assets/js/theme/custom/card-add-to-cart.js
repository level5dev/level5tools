import utils from '@bigcommerce/stencil-utils';
import Swal from '../global/sweet-alert';
import modalFactory, { alertModal, showAlertModal } from '../global/modal';


export default class CardAddToCart {
    constructor(context) {
        if (!context.itsConfig.card_atc_button || (context.itsConfig.card_atc_button_pos !== 'bottom')) return;

        this.hasQtyInput = context.itsConfig.card_atc_input;
        this.defaultQty = (typeof context.itsConfig.card_atc_input_default) === 'string' ? 0 : context.itsConfig.card_atc_input_default;

        $('body').on('facetedSearchRefresh productViewModeChanged', this.bindEvents.bind(this));
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');


        this.bindEvents();
    }

    /**
     * Add/Remove classes from the target element that is passed
     * @param {HTMLElement} $target - Element to add/remove classes on
     * @param {string} type - Type of update that is occurring
     */
    updateCard($target, type = null) {
        const $scope = $target.hasClass('js-card-atc') ? $target : $target.parents('.js-card-atc');
        switch (type) {
        case 'loading':
            $target.text($target.data('wait-message'));
            $scope.addClass('card-atc--adding');
            break;
        case 'complete':
            $target.text($target.data('added-message'));
            $scope.removeClass('card-atc--adding');
            // $scope.addClass('card-atc--added');
            break;
        default:
            $scope.removeClass('card-atc--added');
            $scope.removeClass('card-atc--adding');
            $('.js-card-atc__button', $scope).text($('.js-card-atc__button', $scope).data('default-message'));
            break;
        }
    }

    /**
     * Add product to the cart
     * @param {string} url - Product add url
     * @param {HTMLElement} $target - HTML element (card) that is being added
    */
    addItemToCart(url, $target) {
        this.previewModal = modalFactory('#previewModal')[0];

        this.updateCard($target, 'loading');
        const $cardAtcModal = $('[data-card-atc-modal]');

        $.post(url, (reponse) => {
            const cartResponse = reponse;

            this.updateCard($target, 'complete');
            utils.api.cart.getCartQuantity({}, (error, response) => {
                if (error) return;

                const quantity = parseInt(response, 10);
                const $cartCounter = $('.navUser-action .cart-count');
                const $cardAddedHeading = $('[data-cart-added-heading]');
                $cartCounter.addClass('cart-count--positive');
                $('body').trigger('cart-quantity-update', quantity);

                // Open preview modal and update content
                if (this.previewModal) {
                    this.previewModal.open();
                    $cardAtcModal.show();

                    this.previewModal.updateContent($cardAtcModal);
                    // if cart.items > 1 use plural text
                    quantity > 1 ? $cardAddedHeading.text(`Ok, ${quantity} items were added to your cart. What's next?`) : $cardAddedHeading.text('Ok, 1 item was added to your cart. What\'s next?');


                    if (window.ApplePaySession) {
                        this.previewModal.$modal.addClass('apple-pay-supported');
                    }

                    // if (!this.checkIsQuickViewChild($target)) {
                    //     this.previewModal.$preModalFocusedEl = $target;
                    // }

                    // this.updateCartContent(this.previewModal, response.data.cart_item.id);
                }
            });
        });
    }

    /**
     * Add event listeners to quantity buttons
     * @param {HTMLElement[]} $cards - array of card elements
     */
    wireQtyButtons($cards) {
        $('.js-card-atc-increment button', $cards).on('click', (event) => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const $scope = $target.parents('.js-card-atc');
            const $input = $('.js-card-atc__input--total', $scope);

            let qty = parseInt($input.val(), 10) || this.defaultQty;

            this.updateCard($target);

            // If action is incrementing
            if ($target.data('action') === 'inc') {
                qty++;
            } else if (qty > 0) {
                qty--;
            }

            // update hidden input
            $input.val(qty);
        });
    }

    /**
     * Add event listener to add to cart buttons
     * @param {HTMLElement[]} $cards - array of card elements
     */
    wireAddToCartButton($cards) {
        $('.js-card-atc__button', $cards).on('click', (event) => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const $scope = $target.parents('.js-card-atc');
            const qty = this.hasQtyInput ? parseInt($('.js-card-atc__input--total', $scope).val(), 10) : 1;
            const targetUrl = $target.data('card-add-to-cart');

            // eslint-disable-next-line no-restricted-globals
            if (isNaN(qty) || qty === 0) {
                const errormessage = qty === 0 ? 'You must enter a quantity!' : 'Quantity must be a number!';
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errormessage,
                });
            }

            const newUrl = encodeURI(`${targetUrl}&qty[]=${qty}`);

            this.addItemToCart(newUrl, $target);
        });
    }


    /**
     * Add event listener to quantity input
     * @param {*} $cards - array of card elements
     */
    wireQtyInput($cards) {
        $cards.on('keypress', '.js-card-atc__input--total', (event) => {
            // If the browser supports event.which, then use event.which, otherwise use event.keyCode
            const x = event.which || event.keyCode;
            // Prevent triggering quantity change when pressing enter
            if (x === 13) {
                event.preventDefault();
            }
        });
    }

    // requestAdditionalProductInfo() {
    //     // TODO: add graphQL onload to pull extra product data? Min qty, Max qty, etc...?
    // }

    // triggerCardAddToCartModal() {
    //     // TODO: add setting to trigger add to cart modal after product is added to the cart?
    // }

    /**
     * Bind all Card Add to Cart events
     */
    bindEvents() {
        const $cards = $('.js-card-atc');

        this.wireQtyInput($cards);
        this.wireQtyButtons($cards);
        this.wireAddToCartButton($cards);
    }
}
