/**Built with Discord API v10
 * Author - Jaga
 */
export interface DiscordEmbeds {
  title?: string;
  type?: string; // always "rich" for webhook embeds
  description?: string;
  url?: string;
  timestamp?: string; // ISO8601 timestamp
  color?: number; // color code of the embed
  footer?: DiscordEmbedFooter;
  image?: DiscordEmbedImage;
  thumbnail?: DiscordEmbedThumbnail;
  video?: DiscordEmbedVideo;
  provider?: DiscordEmbedProvider;
  author?: DiscordEmbedAuthor;
  fields?: DiscordEmbedField[];
}

interface DiscordEmbedFooter {
  text: string; // footer text
  icon_url?: string; // url of footer icon (only supports http(s) and attachments)
  proxy_icon_url?: string; // a proxied url of footer icon
}

interface DiscordEmbedThumbnail {
  url: string; // source url of thumbnail (only supports http(s) and attachments)
  proxy_url?: string; // a proxied url of the thumbnail
  height?: number; // height of thumbnail
  width?: number; // width of thumbnail
}

interface DiscordEmbedVideo {
  url?: string; // source url of video
  proxy_url?: string; // a proxied url of the video
  height?: number; // height of video
  width?: number; // width of video
}

interface DiscordEmbedImage {
  url: string; // source url of image (only supports http(s) and attachments)
  proxy_url?: string; // a proxied url of the image
  height?: number; // height of image
  width?: number; // width of image
}

interface DiscordEmbedProvider {
  name?: string; // name of provider
  url?: string; // url of provider
}

interface DiscordEmbedAuthor {
  name: string; // name of author
  url?: string; // url of author (only supports http(s))
  icon_url?: string; // url of author icon (only supports http(s) and attachments)
  proxy_icon_url?: string; // a proxied url of author icon
}

interface DiscordEmbedField {
  name: string; // name of the field
  value: string; // value of the field
  inline?: boolean; // whether or not this field should display inline
}
