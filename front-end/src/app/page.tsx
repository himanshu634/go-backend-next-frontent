"use client";
import { getRewards } from "@/api/api";
import { RewardType } from "@/schema/rewards";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RewardDialog } from "@/components/reward-dialog";
import Image from "next/image";
import Loading from "./loading";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useBaseStore } from "@/stores/base-store";
import { CardContainer, CardItem } from "@/components/3d-card";
import { SelectGroup } from "@radix-ui/react-select";

export default function Home() {
  const { rewards, setRewards, filterOptions, setFilterOptions } = useBaseStore(
    (states) => ({
      rewards: states.rewards,
      setRewards: states.setRewards,
      filterOptions: states.filterOptions,
      setFilterOptions: states.setFilterOptions,
    })
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRewards(filterOptions?.sortBy, filterOptions?.ascending)
      .then((res) => {
        setRewards(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  return (
    <main className="h-full absolute inset-0 pt-nav pb-5 container w-full">
      <div className="my-4 flex gap-4">
        <Select
          onValueChange={(value) => {
            setFilterOptions({ sortBy: value as any });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="title">By title</SelectItem>
              <SelectItem value="price">By price</SelectItem>
              <SelectItem value="created_at">By date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setFilterOptions({ ascending: value === "ascending" });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Order</SelectLabel>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="descending">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Loading className="pt-0" />
      ) : !rewards || rewards.length === 0 ? (
        <div>No Rewards right now.</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1, type: "spring" },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {rewards.map((item, index) => {
            return (
              <RewardDialog key={index} rewardDetails={item}>
                <RewardItem rewardDetails={item} />
              </RewardDialog>
            );
          })}
        </motion.div>
      )}
    </main>
  );
}

function RewardItem({ rewardDetails }: { rewardDetails: RewardType }) {
  const { addItemToCart, cartItems } = useBaseStore((state) => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
  }));
  const [quantity, setQuantity] = useState(1);
  const isAlreadyInCart = Object.keys(cartItems).includes(rewardDetails.id);

  return (
    <CardContainer className="bg-secondary relative rounded-md p-4 w-full h-full cursor-pointer">
      <p className="text-lg font-bold">{rewardDetails.title}</p>
      <CardItem translateZ="50" className="w-full">
        <Image
          src={rewardDetails.image}
          height="1000"
          width="1000"
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl my-2"
          alt="thumbnail"
        />
      </CardItem>
      <p className="line-clamp-2 text-base text-start px-1">
        {rewardDetails.short_description}
      </p>
      <span className="flex justify-between py-2 px-1">
        <p className="shrink-0 text-primary text-lg font-semibold">
          ${rewardDetails.price}
        </p>
        <span className="flex gap-2">
          {!isAlreadyInCart && (
            <Select
              defaultValue="1"
              onValueChange={(value) => {
                setQuantity(Number(value));
              }}
            >
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="Quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button
            disabled={isAlreadyInCart}
            onClick={(e) => {
              e.stopPropagation();
              addItemToCart({
                id: rewardDetails.id,
                image: rewardDetails.image,
                quantity: quantity,
                title: rewardDetails.title,
                price: rewardDetails.price,
              });
              toast("Item added to cart!");
            }}
          >
            {isAlreadyInCart ? "Already in cart" : "Add to cart"}
          </Button>
        </span>
      </span>
    </CardContainer>
  );
}
