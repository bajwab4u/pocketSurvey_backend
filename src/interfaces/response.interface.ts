export interface ResponseInterface {
  status: StatusInterface;
  data: object;
  pagination: PaginationInterface;
}

export interface StatusInterface {
  result: "Success" | "Failure" | "Error";
  message: string;
  tokenExpired: boolean;
}

export interface PaginationInterface {
  paginationEnabled?: boolean;
}
