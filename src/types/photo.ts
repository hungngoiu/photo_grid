import type { Topics } from "@/constants/topic";

export interface Photo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  width: number;
  height: number;
  color: string;
  blurHash: string;
  description: string;
  likes: number;
  user?: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      self: string;
      html: string;
    };
  };
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
}

export interface PhotoDetails extends Photo {
  downloads: number;
  tags: { title: string }[]
}

export type Topic = typeof Topics[keyof typeof Topics]
