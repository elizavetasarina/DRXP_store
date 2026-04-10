import { defineField, defineType } from "sanity";

export const journalSchema = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  groups: [
    { name: "ru", title: "Русский", default: true },
    { name: "en", title: "English" },
    { name: "meta", title: "Meta" },
  ],
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
      name: "excerpt",
      title: "Excerpt",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        { name: "asset", title: "Image", type: "image", options: { hotspot: true } },
        { name: "alt", title: "Alt text", type: "internationalizedArrayString" },
      ],
    }),
    defineField({
      name: "bodyRu",
      title: "Body (Русский)",
      type: "array",
      group: "ru",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "journalImageRu",
          title: "Image",
          fields: [
            { name: "asset", title: "Image", type: "image", options: { hotspot: true } },
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "bodyEn",
      title: "Body (English)",
      type: "array",
      group: "en",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "journalImageEn",
          title: "Image",
          fields: [
            { name: "asset", title: "Image", type: "image", options: { hotspot: true } },
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: {
      title: "title.0.value",
      media: "coverImage.asset",
      subtitle: "publishedAt",
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title ?? "Untitled",
        media,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "No date",
      };
    },
  },
});
