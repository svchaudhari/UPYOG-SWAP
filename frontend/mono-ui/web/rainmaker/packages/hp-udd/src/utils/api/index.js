import { showAlert } from "../Alerts";
export const APICall = async (url, method = 'POST', body = null, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json(); // Parse JSON response
    return jsonData;
  } catch (error) {
    if (error.response) {
      console.error('API error response:', error.response);
      showAlert(
        "Server Validations failed",
        `${error.message}`,
        'error'
      );
      // throw new Error(`API error: ${error.response.statusText}`);
    } else if (error.request) {
      console.error('API no response:', error.request);
      showAlert(
        "Server Validations failed",
        `${error.message}`,
        'error'
      );
      // throw new Error('API error: No response from server');
    } else {
      console.error('API request error:', error.message);
      showAlert(
        "Server Validations failed",
        `${error.message}`,
        'error'
      );
      // throw new Error(`API error: ${error.message}`);
    }
  }
};
