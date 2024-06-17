import { RewardType } from "@/schema/rewards";
import { create } from "zustand";

type CartRewardType = {
  id: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
};

type FilterOptionsType = {
  sortBy?: "title" | "price" | "created_at";
  ascending?: boolean;
};

type States = {
  cartItems: Record<string, CartRewardType>;
  rewards: RewardType[];
  filterOptions: FilterOptionsType;
};

type Actions = {
  setRewards: (rewards: RewardType[]) => void;
  addItemToCart: (id: CartRewardType) => void;
  removeItemFromCart: (id: string) => void;
  setFilterOptions: (options: FilterOptionsType) => void;
  reset: () => void;
};

const initialState: States = {
  cartItems: {},
  rewards: [],
  filterOptions: {},
};

export const useBaseStore = create<States & Actions>((set) => {
  return {
    ...initialState,
    addItemToCart({ id, image, quantity, title, price }) {
      set((state) => {
        const oldCartItems = state.cartItems;
        if (!Object.keys(oldCartItems).includes(id)) {
          oldCartItems[id] = { id, image, quantity, title, price };
          state.cartItems = oldCartItems;
          return { ...state };
        }
        return state;
      });
    },
    removeItemFromCart(id) {
      set((state) => {
        const oldCartItems = state.cartItems;
        delete oldCartItems[id];
        state.cartItems = oldCartItems;
        return { ...state };
      });
    },
    setFilterOptions(options) {
      set((state) => {
        const oldFilterOptions = state.filterOptions;
        if (typeof options.ascending === "boolean") {
          oldFilterOptions.ascending = options.ascending;
        }

        if (typeof options.sortBy === "string") {
          oldFilterOptions.sortBy = options.sortBy;
        }
        state.filterOptions = { ...oldFilterOptions };
        return { ...state };
      });
    },
    setRewards(rewards) {
      set({ rewards });
    },
    reset() {},
  };
});
