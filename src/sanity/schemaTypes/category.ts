import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
