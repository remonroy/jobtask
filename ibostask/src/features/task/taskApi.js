import { taskApi } from "../api/apiSlice";
export const tasksApi = taskApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: "/createTask",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    allTask: builder.query({
      query: () => "/getTask",

      providesTags: ["task"],
    }),
    taskUpdate: builder.mutation({
      query: (data) => ({
        url: "/updateOption",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
  }),
});
export const { useCreateTaskMutation, useAllTaskQuery, useTaskUpdateMutation } =
  tasksApi;
