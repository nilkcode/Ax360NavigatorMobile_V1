import CryptoJS from "crypto-js";

 

// Constants (You can also move these to .env for better security)




// Function to encrypt a string

export const encryptPayloadsUsingAES256 = (body) => {

  // Convert the body object to JSON string
  let bodyJsonString = JSON.stringify(body);

  // Encrypt the data using AES with the key and IV
  let encryptedData = CryptoJS.AES.encrypt(bodyJsonString, key, { iv: iv });

  // Return the encrypted data as a string
  return encryptedData.toString();

}

export function encryptData(text) {

  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return encrypted.toString();
}



export function decryptAPIResponseUsingAES256(response) {
  const decryptedText = CryptoJS.AES.decrypt(response, key, { iv:iv }).toString(CryptoJS.enc.Utf8);

  try {
      const parsedResponse = JSON.parse(decryptedText);

      if (typeof parsedResponse === 'string') {
          try {
              const innerParsed = JSON.parse(parsedResponse);
              return innerParsed.access_token ? parsedResponse : convertKeysToCamelCase(innerParsed);
          } catch {
              return parsedResponse;
          }
      }
      return Array.isArray(parsedResponse) && parsedResponse.every(item => typeof item === 'string') ? parsedResponse : convertKeysToCamelCase(parsedResponse);

  } catch {
      return decryptedText; // Return as is if it's not valid JSON
  }
}



const  convertKeysToCamelCase = (dataArray)  => {

  if (Array.isArray(dataArray)) {
    // Handle array of objects (existing logic)
    return dataArray.map(obj => {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = key.toUpperCase() === key ? key.toLowerCase() : key.charAt(0).toLowerCase() + key.slice(1);
        acc[newKey] = obj[key];
        return acc;
      }, {});
    });
  }
  else if (typeof dataArray === 'object' && dataArray !== null) {
    // Handle single object
    const obj = dataArray;
    const result = {};
    for (const key in obj) {
      const newKey = key.toUpperCase() === key ? key.toLowerCase() : key.charAt(0).toLowerCase() + key.slice(1);
      result[newKey] = obj[key];
    }
    return result;
  }

  else {
    // If it's neither an object nor an array, return as is

    return dataArray;

  }
}
