import privateClient from "../client/private.client";

const userEndpoints = {
  total: "dashboard/get_db_card",
  heartRateChart: "dashboard/get_heart_rate_chart_week",
};

const dashboardApi = {
  getDBCard: async () => {
    try {
      const response = await privateClient.get(userEndpoints.total);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getHeartRateChartWeek: async (ip_mac) => {
    try {
      const response = await privateClient.post(userEndpoints.heartRateChart, {
        ip_mac,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default dashboardApi;
