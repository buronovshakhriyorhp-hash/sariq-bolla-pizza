import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],

            toggleWishlist: (product) => {
                const { wishlist } = get();
                const exists = wishlist.find(item => item.id === product.id);

                if (exists) {
                    set({ wishlist: wishlist.filter(item => item.id !== product.id) });
                    toast.error(`${product.name} sevimlilardan olib tashlandi 💔`);
                } else {
                    set({ wishlist: [...wishlist, product] });
                    toast.success(`${product.name} sevimlilarga qo'shildi ❤️`);
                }
            },

            isInWishlist: (productId) => {
                return get().wishlist.some(item => item.id === productId);
            }
        }),
        {
            name: 'sariq-bolla-wishlist',
        }
    )
);

export default useWishlistStore;
