import createImageUrlBuilder from "@sanity/image-url";
import { client } from "../client";

const builder = createImageUrlBuilder(client);

const noopBuilder = {
  width() {
    return this;
  },
  height() {
    return this;
  },
  fit() {
    return this;
  },
  auto() {
    return this;
  },
  quality() {
    return this;
  },
  format() {
    return this;
  },
  url() {
    return "";
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  const ref = source?.asset?._ref ?? source?._ref;
  if (typeof ref !== "string" || ref.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return noopBuilder as any;
  }
  return builder.image(source);
}
