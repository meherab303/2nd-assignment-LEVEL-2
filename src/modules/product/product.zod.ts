import { z } from "zod";

const TVariantsSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const TInventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const TProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(TVariantsSchema),
  inventory: TInventorySchema,
});
export default TProductSchema;
