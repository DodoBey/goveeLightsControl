const url = 'https://developer-api.govee.com/v1/devices';

export const fetchUserLights = async (apiKey: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Govee-API-Key': `${apiKey}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getDeviceState = async (
  apiKey: string,
  deviceMac: string,
  model: string
) => {
  try {
    const response = await fetch(
      `${url}/state?device=${deviceMac}&model=${model}`,
      {
        headers: {
          'Govee-API-Key': `${apiKey}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
