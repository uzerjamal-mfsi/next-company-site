export type ContentfulErrorCode =
  'network' | 'timeout' | 'abort' | 'http' | 'invalid_json' | 'invalid_response';

export class ContentfulError extends Error {
  readonly code: ContentfulErrorCode;

  constructor(message: string, code: ContentfulErrorCode, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ContentfulError';
    this.code = code;
  }
}

export class ContentfulApiError extends ContentfulError {
  readonly status: number;
  readonly statusText?: string;
  readonly requestPath: string;

  constructor(
    status: number,
    statusText: string | undefined,
    requestPath: string,
    message: string,
  ) {
    super(message, 'http');
    this.name = 'ContentfulApiError';
    this.status = status;
    this.statusText = statusText;
    this.requestPath = requestPath;
  }
}

export function isContentfulError(error: unknown): error is ContentfulError {
  return error instanceof ContentfulError;
}

export function isContentfulApiError(error: unknown): error is ContentfulApiError {
  return error instanceof ContentfulApiError;
}
