import { z } from "zod";

const RewardSchema = z.object({
  id: z.string(),
  created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),
  title: z.string(),
  subtitle: z.string(),
  price: z.number(),
  short_description: z.string(),
  long_description: z.string(),
  image: z.string().url(),
  redeem_steps: z.array(z.string()),
});

const RewardListSchema = z.array(RewardSchema);

export type RewardType = z.infer<typeof RewardSchema>;

export function validateRewards(data: any) {
  try {
    return RewardListSchema.parse(data);
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}
