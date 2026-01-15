export const startHLS = async (videoUrl) => {
  const response = await fetch("http://localhost:3000/api/hls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: videoUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to start streaming");
  }

  return response.json();
};
