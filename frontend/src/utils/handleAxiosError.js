import axios from 'axios';

const handleAxiosError = (error) => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 400:
      case 401:
        return message;
      case 500:
        alert('잠시 후 다시 시도해주세요.');
        break;
      default:
        alert(`오류가 발생했습니다. (status: ${status})`);
        break;
    }
  }
};

export default handleAxiosError;