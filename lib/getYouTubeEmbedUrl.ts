export const getYouTubeEmbedUrl = (url: string | null | undefined) => {
  if (!url) return "";

  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regExp);
  const videoId = match ? match[1] : null;

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};
