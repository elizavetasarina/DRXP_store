import { defineField, defineType } from "sanity";

export const lookbookSchema = defineType({
  name: "lookbook",
  title: "Lookbook",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => {
          const t = (doc as { title?: { _key: string; value: string }[] }).title;
          return t?.find((n) => n._key === "ru")?.value ?? t?.[0]?.value ?? "";
        },
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "asset", title: "Image", type: "image", options: { hotspot: true } },
            { name: "alt", title: "Alt text", type: "internationalizedArrayString" },
          ],
          preview: {
            select: { media: "asset", title: "alt.0.value" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.0.value",
      media: "images.0.asset",
    },
    prepare: ({ title, media }) => ({ title: title ?? "Untitled", media }),
  },
});
