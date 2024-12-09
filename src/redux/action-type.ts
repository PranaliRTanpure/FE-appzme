export interface Action {
  type: string;
  payload: unknown;
}

export interface ActionType<T> {
  type: string;
  payload: T;
}
