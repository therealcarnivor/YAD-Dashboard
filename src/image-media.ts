import type { HomeAssistant } from "./types";

export const IMAGE_MEDIA_SELECTOR = { media: { accept: ["image/*"], image_upload: true } };

export const resolveImageMedia = async (hass: HomeAssistant, source: string): Promise<string> => {
  const media = await hass.callWS<{ url: string; mime_type: string }>({
    type: "media_source/resolve_media",
    media_content_id: source,
  });
  if (!media.url || !media.mime_type?.startsWith("image/")) throw new Error("Select an image for the background");
  return media.url;
};
