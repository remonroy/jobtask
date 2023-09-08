/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://jobtask-43jm-at82c9bmt-remonroy34-gmailcom.vercel.app/api/v1",
    credentials: "include",
  }),
  tagTypes: ["profileImage", "team", "task"],
  endpoints: (builder) => ({}),
});
