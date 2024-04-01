export const getMessages = async (userEmail, date) => {
  try {
    const response = await fetch(
      `/api/conversation?userEmail=${userEmail}&date=${date}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postMessage = async (userEmail, lastMessageAt, message) => {
  try {
    const response = await fetch("/api/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, lastMessageAt, message }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendMessageToAI = async (message, history) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const generateHistory = (history) => {
  let generatedHistory = [];
  if(history && history.length) {
     history
       .filter(item => item.input && item.response)
       .forEach(item => {
         const { input, response } = item;
         generatedHistory.push({ role: "user", parts: [{ text: input }] },
                                { role: "model", parts: [{ text: response }] });
       });
  }
  return generatedHistory;
 }