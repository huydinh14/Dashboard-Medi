import privateClient from "../client/private.client";

const userEndpoints = {
  getMediaRecord: "mediaRecord/get_media_record",
  addMediaRecord: "mediaRecord/add_media_record",
  predictor: "mediaRecord/predictor",
  endMediaRecord: "mediaRecord/end_media_record",
  updateMediaRecord: "mediaRecord/update_media_record",
  deleteMediaRecord: "mediaRecord/delete_media_record"
};

const mediaRecordApi = {
  getMediaRecord: async (date_start, date_end) => {
    try {
      const response = await privateClient.post(userEndpoints.getMediaRecord, {
        date_start,
        date_end,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  addMediaRecord: async (mediaRecordFN) => {
    try {
      const response = await privateClient.post(userEndpoints.addMediaRecord, {
        mediaRecordFN,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  predictor: async (idMed) => {
    try {
      const response = await privateClient.post(userEndpoints.predictor, {
        idMed,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  endMediaRecord: async (idMed) => {
    try {
      const response = await privateClient.post(userEndpoints.endMediaRecord, {
        idMed,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  updateMediaRecord: async (id, data) => {
    try {
      const response = await privateClient.post(userEndpoints.updateMediaRecord, {
       id,
       data
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  deleteMediaRecord: async (id) => {
    try {
      const response = await privateClient.post(userEndpoints.deleteMediaRecord, {
       id
      });
      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default mediaRecordApi;
