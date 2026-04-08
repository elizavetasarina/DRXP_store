import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "image", title: "Background image", type: "image", options: { hotspot: true } },
        { name: "tagline", title: "Tagline (optional, overrides i18n)", type: "internationalizedArrayString" },
        { name: "ctaLabel", title: "CTA label (optional)", type: "internationalizedArrayString" },
      ],
    }),
    defineField({
      name: "editorial",
      title: "Editorial blocks",
      type: "array",
      validation: (R) => R.length(2),
      of: [
        {
          type: "object",
          name: "editorialBlock",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "quote", title: "Quote", type: "internationalizedArrayText" },
            { name: "label", title: "Label", type: "internationalizedArrayString" },
            { name: "ctaLabel", title: "CTA label", type: "internationalizedArrayString" },
            { name: "ctaHref", title: "CTA href", type: "string" },
          ],
          preview: {
            select: { media: "image", title: "label.0.value" },
          },
        },
      ],
    }),
    defineField({
      name: "parallax",
      title: "Parallax images (3)",
      type: "array",
      validation: (R) => R.length(3),
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "teaserCards",
      title: "Teaser cards (Lookbook / Journal)",
      type: "array",
      validation: (R) => R.length(2),
      of: [
        {
          type: "object",
          name: "teaserCard",
          fields: [
            { name: "title", title: "Title", type: "internationalizedArrayString" },
            { name: "subtitle", title: "Subtitle", type: "internationalizedArrayString" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "href", title: "Href", type: "string" },
          ],
          preview: {
            select: { media: "image", title: "title.0.value" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
