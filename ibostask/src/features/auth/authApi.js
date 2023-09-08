import { taskApi } from "../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = taskApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data.user,
            })
          );
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("this is error = ", error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data.user,
            })
          );
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("this is error = ", error);
        }
      },
    }),

    userUpdate: builder.mutation({
      query: (data) => ({
        url: "/me/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cachout"],
    }),
    userPhotoUpdate: builder.mutation({
      query: (data) => ({
        url: "/me/photo",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["profileImage"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data.user,
            })
          );
          dispatch(
            userLogin({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("this is error = ", error);
        }
      },
    }),
    singleUser: builder.mutation({
      query: (data) => ({
        url: "/singleUser",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useUserUpdateMutation,
  useUserPhotoUpdateMutation,
  useSingleUserMutation,
} = authApi;
