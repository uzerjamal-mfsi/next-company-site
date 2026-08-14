export interface ContentfulLink {
  sys: {
    type: 'Link';
    linkType: 'Space' | 'Environment' | 'ContentType' | 'Entry' | 'Asset' | string;
    id: string;
  };
}

export interface ContentfulSys {
  type: string;
  id: string;
  locale?: string;
  revision?: number;
  createdAt?: string;
  updatedAt?: string;
  space?: ContentfulLink;
  environment?: ContentfulLink;
  contentType?: ContentfulLink;
}

export interface ContentfulEntry<Fields = unknown> {
  sys: ContentfulSys;
  fields: Fields;
}

export interface ContentfulAssetFile {
  url?: string;
  fileName?: string;
  contentType?: string;
  details?: {
    size?: number;
    image?: { width?: number; height?: number };
    [key: string]: unknown;
  };
}

export interface ContentfulAssetFields {
  title?: string;
  description?: string;
  file?: ContentfulAssetFile;
  [key: string]: unknown;
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: ContentfulAssetFields;
}

export interface ContentfulIncludes {
  Entry?: ContentfulEntry<unknown>[];
  Asset?: ContentfulAsset[];
}

export interface ContentfulCollectionResponse<ItemType = ContentfulEntry<unknown>> {
  sys: { type: 'Array' };
  total: number;
  skip: number;
  limit: number;
  items: ItemType[];
  includes?: ContentfulIncludes;
}

export type ContentfulQueryValue = string | number | boolean;

export type ContentfulQueryParams = Record<string, ContentfulQueryValue | undefined>;
