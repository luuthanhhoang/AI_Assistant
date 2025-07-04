export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ResponseState {
  [key: string]: {
    status: Status;
    error: string | null;
  };
}
