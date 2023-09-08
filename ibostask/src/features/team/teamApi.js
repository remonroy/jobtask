import { taskApi } from "../api/apiSlice";
export const teamApi = taskApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/newTeam",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["team"],
    }),
    allTeam: builder.query({
      query: () => "/getTeam",

      providesTags: ["team"],
    }),
  }),
});
export const { useCreateTeamMutation, useAllTeamQuery } = teamApi;
