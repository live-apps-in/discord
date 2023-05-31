/**
 * Discord Embed Object
 *
 * @interface DiscordEmbeds
 * @description Built with Discord API v10
 */
export interface DiscordEmbeds {
  title?: string;
  type?: string; // always "rich" for webhook embeds
  description?: string;
  url?: string;
  timestamp?: string; // ISO8601 timestamp
  color?: number;
  footer?: DiscordEmbedFooter;
  image?: DiscordEmbedImage;
  thumbnail?: DiscordEmbedThumbnail;
  video?: DiscordEmbedVideo;
  provider?: DiscordEmbedProvider;
  author?: DiscordEmbedAuthor;
  fields?: DiscordEmbedField[];
}

interface DiscordEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface DiscordEmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface DiscordEmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface DiscordEmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface DiscordEmbedProvider {
  name?: string;
  url?: string;
}

interface DiscordEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}
