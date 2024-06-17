import { ReactNode } from "react";
import { RewardType } from "@/schema/rewards";
import Image from "next/image";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";

export function RewardDialog({
  children,
  rewardDetails,
}: {
  children: ReactNode;
  rewardDetails: RewardType;
}) {
  return (
    <Dialog modal>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-full h-auto p-2">
        <div className=" p-6 h-full w-full relative">
          <Image
            src={rewardDetails.image}
            height="1000"
            width="100"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl mb-4"
            alt="thumbnail"
          />
          <p className="text-lg font-bold pb-2">Details :</p>
          <p className="text-sm px-1">{rewardDetails.long_description}</p>
          <p className="text-lg font-bold pt-4 pb-2">Steps to Redeem :</p>
          <ul className="list-disc pl-5">
            {rewardDetails.redeem_steps.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
