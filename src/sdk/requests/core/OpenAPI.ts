/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { BASE_API_URL } from "../../../constants/config";
import storageService from "../../../services/core/storage-service";
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
	BASE: string;
	VERSION: string;
	WITH_CREDENTIALS: boolean;
	CREDENTIALS: "include" | "omit" | "same-origin";
	TOKEN?: string | Resolver<string>;
	USERNAME?: string | Resolver<string>;
	PASSWORD?: string | Resolver<string>;
	HEADERS?: Headers | Resolver<Headers>;
	ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
	BASE: BASE_API_URL,
	VERSION: "1.0.0",
	WITH_CREDENTIALS: false,
	CREDENTIALS: "include",
	TOKEN: storageService.getToken() || "",
	USERNAME: undefined,
	PASSWORD: undefined,
	HEADERS: undefined,
	ENCODE_PATH: undefined,
};
