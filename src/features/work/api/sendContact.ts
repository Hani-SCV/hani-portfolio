type ContactRequest = {
  email: string;
  message: string;
};

export async function sendContact(data: ContactRequest) {
  const response = await fetch("/.netlify/functions/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
