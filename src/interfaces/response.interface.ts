export interface ResponseInterface {
  status: StatusInterface;
  data: dataInterface;
  pagination: PaginationInterface;
}

export interface StatusInterface {
  result: "Success" | "Failure" | "Error";
  message: string;
  tokenExpired: boolean;
}

export interface dataInterface {
  user?: object;
  authToken?: object;
}

export interface PaginationInterface {
  paginationEnabled?: boolean;
}
