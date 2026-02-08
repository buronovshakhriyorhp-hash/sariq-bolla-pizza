import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const translations = {
    uz: {
        cart: "Savatcha",
        search: "Qidirish",
        menu: "Menyu",
        pizzas: "Pitsalar",
        drinks: "Ichimliklar",
        snacks: "Gazaklar",
        desserts: "Shirinliklar",
        profile: "Profil",
        addToCart: "Savatga qo'shish",
        back: "Ortga qaytish"
    },
    en: {
        cart: "Cart",
        search: "Search",
        menu: "Menu",
        pizzas: "Pizzas",
        drinks: "Drinks",
        snacks: "Snacks",
        desserts: "Desserts",
        profile: "Profile",
        addToCart: "Add to cart",
        back: "Go back"
    },
    ru: {
        cart: "Корзина",
        search: "Поиск",
        menu: "Меню",
        pizzas: "Пиццы",
        drinks: "Напитки",
        snacks: "Закуски",
        desserts: "Десерты",
        profile: "Профиль",
        addToCart: "В корзину",
        back: "Назад"
    }
};

const useLanguageStore = create(
    persist(
        (set) => ({
            language: 'uz', // 'uz', 'en', 'ru'
            setLanguage: (lang) => set({ language: lang }),
        }),
        {
            name: 'sariq-bolla-language',
        }
    )
);

export default useLanguageStore;
