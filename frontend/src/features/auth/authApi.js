import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API_BASE_URL, credentials: 'include' }),
  endpoints: (build) => ({
    getMe: build.query({
      query: () => '/auth/me'
    }),
    
  }),
});

export const { useGetMeQuery } = authApi;