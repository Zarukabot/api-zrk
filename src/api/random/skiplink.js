import axios from "axios";

const BASE_URL = "https://api.siputzx.my.id/api/tools";

export default (app) => {

  /**
   * Generic fetch function untuk berbagai endpoint tanpa API key
   * @param {string} endpoint - nama endpoint, misal "skiplink"
   * @param {object} query - object query params, misal { url: "..." }
   */
  async function fetchApi(endpoint, query = {}) {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`, { params: query });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Route Skiplink
  app.get("/api/skiplink", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, error: "URL required" });

    try {
      const result = await fetchApi("skiplink", { url });
      res.status(200).json({ status: true, result });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });

  // Route contoh lain: BRAT Generator
  app.get("/api/brat", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, error: "Text required" });

    try {
      const result = await fetchApi("brat", { text });
      res.status(200).json({ status: true, result });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
