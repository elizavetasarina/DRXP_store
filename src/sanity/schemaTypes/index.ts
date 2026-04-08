import { productSchema } from "./product";
import { categorySchema } from "./category";
import { lookbookSchema } from "./lookbook";
import { journalSchema } from "./journal";
import { homePageSchema } from "./homePage";

export const schemaTypes = [
  homePageSchema,
  productSchema,
  categorySchema,
  lookbookSchema,
  journalSchema,
];
