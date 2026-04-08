import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => {
          const name = (doc as { name?: { _key: string; value: string }[] }).name;
          return name?.find((n) => n._key === "ru")?.value ?? name?.[0]?.value ?? "";
        },
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "price",
      title: "Price (kopecks)",
      type: "number",
      description: "Price in kopecks. 10000 = 100 ₽",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "comparePrice",
      title: "Compare Price (kopecks)",
      type: "number",
      description: "Original price for sale items",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
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
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "size", title: "Size", type: "string" },
            { name: "color", title: "Color", type: "string" },
            { name: "stock", title: "Stock", type: "number" },
            { name: "sku", title: "SKU", type: "string" },
          ],
          preview: {
            select: { title: "size", subtitle: "color" },
          },
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name.0.value",
      media: "images.0.asset",
      subtitle: "isPublished",
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title ?? "Untitled",
        media,
        subtitle: subtitle ? "Published" : "Draft",
      };
    },
  },
});
