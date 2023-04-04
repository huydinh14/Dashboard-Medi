import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getinfo: "user/getinfo",
  passwordUpdate: "user/password-update",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getinfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
