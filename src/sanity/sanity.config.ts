import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "drxp-store",
  title: "DRXP Store",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "homePage"
            ),
          ]),
    }),
    visionTool(),
    internationalizedArray({
      languages: [
        { id: "ru", title: "Русский" },
        { id: "en", title: "English" },
      ],
      defaultLanguages: ["ru"],
      fieldTypes: ["string", "text"],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
