class Inventory{

    constructor(page){
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.sortDropdown = page.locator('.product_sort_container');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    }   

    async isCartBadgeVisible(){
        return await this.cartLink.isVisible();
    }

    getProductCard(productName){
        return this.inventoryItems.filter({ hasText: productName });
    }
    async addProductToCart(productName){
        const productCard = this.getProductCard(productName);
        console.log(productName);
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartBadgeCount(){
        const hasBadge = await this.cartBadge.isVisible();
        if (!hasBadge) {
            return 0; // If the badge is not visible, return 0
        }
        const badgeText = await this.cartBadge.textContent();
        return parseInt(badgeText, 10); // Convert the badge text to an integer
    }

    async sortProductsBy(option){
        await this.sortDropdown.selectOption(option);// Select the sorting option from the dropdown
    }

    async getProductPrices(){
        const prices = await this.itemPrices.allTextContents(); // Get all the price texts
        return prices.map(price => parseFloat(price.replace('$', ''))); // Convert price strings to numbers
    }

}

module.exports = {Inventory};