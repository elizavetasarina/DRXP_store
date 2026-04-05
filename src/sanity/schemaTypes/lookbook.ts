import { defineField, defineType } from "sanity";

export const lookbookSchema = defineType({
  name: "lookbook",
  title: "Lookbook",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
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
            { name: "alt", title: "Alt text", type: "string" },
          ],
          preview: {
            select: { media: "asset", title: "alt" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0.asset",
    },
  },
});
