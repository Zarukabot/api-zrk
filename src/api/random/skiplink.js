import axios from "axios";

export default (app) => {
  async function fetchContent(url) {
    try {
      const response = await axios.get(
        `https://api.siputzx.my.id/api/tools/skiplink?url=${encodeURIComponent(url)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching skiplink:", error);
      throw error;
    }
  }

  app.get("/api/skiplink", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ status: false, error: "URL is required" });
      }

      const result = await fetchContent(url);

      res.status(200).json({
        status: true,
        result,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
