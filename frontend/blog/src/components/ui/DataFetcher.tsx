import http from "@/services/httpService";
import { getCookieString } from "@/utils/cookieHelper";

interface DataFetcherProps {
  url: string;
  children: (data: any, error: string | null) => React.ReactNode;
}

export async function DataFetcher({ url, children }: DataFetcherProps) {
  let data = null;
  let error = null;

  try {
    const cookieString = await getCookieString();
    const response = await http.get(url, {
      headers: { Cookie: cookieString }
    });
    data = response.data.data;
  } catch (err: any) {
    error = err?.response?.status === 401 ? "خطا در احراز هویت" : "خطا در دریافت اطلاعات";
  }

  return <>{children(data, error)}</>;
}