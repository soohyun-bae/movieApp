import backendAPI from './backendAPI';

const baseQuery = async ({ url, method, data, params }) => {
  try {
    const result = await backendAPI({
      url,
      method,
      data,
      params,
    });
    return { data: result.data };
  } catch (error) {
    return {
      error: {
        status: error.response?.status || 500,
        data: error.response?.data || error.message,
      },
    };
  }
};

export default baseQuery;