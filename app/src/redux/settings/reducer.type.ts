export type SetLoadingActionType = {
  isLoading: boolean;
  content: string | undefined;
};

export type SetErrorActionType = {
  isError?: boolean | undefined;
  isSuccess?: boolean | undefined;
  content: string | undefined;
};
