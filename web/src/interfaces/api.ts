export type ApiResponse<T> = {
  success: boolean;
  error: boolean;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  count: number;
  rows: T[];
};
