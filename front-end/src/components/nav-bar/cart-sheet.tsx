import { useBaseStore } from "@/stores/base-store";
import { ReactNode } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { toast } from "sonner";

export function CartSheet({ children }: { children: ReactNode }) {
  const { cartItems, removeItem } = useBaseStore((state) => ({
    cartItems: state.cartItems,
    removeItem: state.removeItemFromCart,
  }));
  let totalAmount = 0;

  function renderCartItems() {
    const compArr: Array<ReactNode> = [];
    Object.keys(cartItems).forEach((item, index) => {
      const rewardItem = cartItems[item];
      compArr.push(
        <HoverCard>
          <HoverCardTrigger>
            <div
              key={index}
              className="flex group/item justify-between items-center hover:bg-secondary p-2 rounded-lg"
            >
              <span className="flex gap-x-2">
                <Image
                  src={rewardItem.image}
                  alt={rewardItem.title}
                  height={50}
                  width={75}
                  className="overflow-clip rounded-md"
                />
                <span>
                  <p className="text-base font-semibold">{rewardItem.title}</p>
                  <p className="text-base font-light">
                    Quantity: {rewardItem.quantity}
                  </p>
                </span>
              </span>
              <Trash2
                className="w-5 h-5 hover:stroke-destructive cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(rewardItem.id);
                }}
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit p-2">
            <p>{`Worth(${rewardItem.quantity} * ${rewardItem.price}): ${
              rewardItem.price * rewardItem.quantity
            }`}</p>
          </HoverCardContent>
        </HoverCard>
      );
      totalAmount += rewardItem.price * rewardItem.quantity;
    });
    return compArr;
  }

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="right" className="px-4">
        <SheetTitle>Cart</SheetTitle>
        {renderCartItems()}
        <div className="flex justify-between items-center bg-slate-200 px-2 py-2 rounded-md mt-4">
          <p className="text-lg font-semibold">Total</p>
          <p>{totalAmount}</p>
        </div>
        <SheetFooter className="pt-4">
          <Button
            onClick={(e) => {
              toast("Implementation pending!");
            }}
          >
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
