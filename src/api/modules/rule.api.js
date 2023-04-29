import privateClient from "../client/private.client";

const ruleEndpoints = {
  updateRule: "rule/update_rule",
  getRule: "rule/getRule",
};

const ruleApi = {
  updateRule: async (name, from, to) => {
    try {
      const response = await privateClient.post(ruleEndpoints.updateRule, {
        name,
        from,
        to,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getRule: async () => {
    try {
      const response = await privateClient.get(ruleEndpoints.getRule);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default ruleApi;
