class  Cart {
    constructor(page){
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.itemNames = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
    }

    async gotoCartPage(){
        await this.cartLink.click();
    }

    async getAllCartNames(){
        const cartItems = await this.itemNames.allTextContents();
        return cartItems;
    }

    async removeProductFromCart(productName){
        const cartItem = this.getCartItem(productName);
        const removeButton = cartItem.getbyRole('button', {name: 'Remove'});
        await removeButton.click();
    }

    getCartItem(productName){
        return this.page.locator(`.cart_item:has-text("${productName}")`);
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }
}

module.exports = {Cart};