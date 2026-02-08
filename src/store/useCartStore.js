import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, options = { size: 'Standard', dough: 'Qalin' }) => {
                const { items } = get();
                // Create unique ID based on product ID + options
                const cartItemId = `${product.id}-${options.size}-${options.dough}`;

                const existingItem = items.find(item => item.cartItemId === cartItemId);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.cartItemId === cartItemId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                    toast.success("Mahsulot soni oshirildi! 🛒");
                } else {
                    set({
                        items: [...items, { ...product, ...options, cartItemId, quantity: 1 }]
                    });
                    toast.success(`${product.name} savatga qo'shildi! 🍕`);
                }
            },

            removeItem: (cartItemId) => {
                set({ items: get().items.filter(item => item.cartItemId !== cartItemId) });
            },

            updateQuantity: (cartItemId, change) => {
                const { items } = get();
                set({
                    items: items.map(item => {
                        if (item.cartItemId === cartItemId) {
                            const newQuantity = Math.max(0, item.quantity + change);
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    }).filter(item => item.quantity > 0)
                });
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                const items = get().items || [];
                return items.reduce((total, item) => total + (parseInt(item.price.replace(/,/g, '')) * item.quantity), 0);
            },

            getItemCount: () => {
                const items = get().items || [];
                return items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'sariq-bolla-cart',
        }
    )
);

export default useCartStore;
