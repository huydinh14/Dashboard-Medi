import privateClient from "../client/private.client";

const statisticEndpoints = {
  statistic: "statictis/getStatistic",
};

const statisticApi = {
  getStatisticChart: async (ip_mac, year) => {
    try {
      const response = await privateClient.post(statisticEndpoints.statistic, {
        ip_mac,
        year
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default statisticApi;
