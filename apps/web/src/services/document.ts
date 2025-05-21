import { useAsyncLoading } from "~/hooks/useAsyncLoading";
import { HttpClient } from "./http-client";

export interface ICreateDocumentParams {
  organizationId: string;
  wikiId: string;
  title: string;
}

export const useCreateDocument = () => {
  const [apiWithLoading, loading] = useAsyncLoading((params: ICreateDocumentParams) =>
    HttpClient.request({
      method: 'POST',
      url: '/document/create',
      data: params,
    })
  );

  return {
    create: apiWithLoading,
    loading,
  };
};

/**
 * 搜索组织内文档
 * @returns
 */
export const useSearchDocuments = () => {
  const [apiWithLoading, loading] = useAsyncLoading(({keyword, organizationId}) =>
    HttpClient.request({
      method: 'GET',
      url: `/document`,
      params: { keyword, organizationId },
    })
  );

  return {
    search: apiWithLoading,
    loading,
  };
};