import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function Loading({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-5 container pt-nav",
        className
      )}
      {...props}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
