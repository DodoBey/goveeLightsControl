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

export type CommandType = {
  name: string;
  value: string | number | { r: number; g: number; b: number };
};

export interface BodyType {
  deviceMac: string;
  model: string;
  cmd: CommandType;
}

export const updateDeviceState = async (apiKey: string, body: BodyType) => {
  try {
    const { deviceMac, model, cmd } = body;
    const response = await fetch(`${url}/control`, {
      method: 'PUT',
      headers: {
        'Govee-API-Key': `${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device: deviceMac, model, cmd }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
