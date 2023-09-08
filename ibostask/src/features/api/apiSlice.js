/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://jobtask-ff7k-4eec97nl7-remonroy34-gmailcom.vercel.app/api/v1",
    credentials: "include",
  }),
  tagTypes: ["profileImage", "team", "task"],
  endpoints: (builder) => ({}),
});
