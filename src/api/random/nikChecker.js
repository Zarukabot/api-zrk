import axios from "axios";

export default (app) => {

  async function fetchNik(nik) {
    try {
      const response = await axios.get(
        "https://api.siputzx.my.id/api/tools/nik-checker",
        { params: { nik } }
      );
      return response.data; // Response lengkap dari API
    } catch (error) {
      console.error("Error fetching NIK:", error.message);
      throw error;
    }
  }

  app.get("/api/nik", async (req, res) => {
    const { nik } = req.query;

    if (!nik) {
      return res.status(400).json({ status: false, error: "NIK required" });
    }

    try {
      const result = await fetchNik(nik);

      res.status(200).json({
        status: result.status,
        data: result.data,
        timestamp: result.timestamp
      });

    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });

};
