import axios from "axios";

export default (app) => {
  async function fetchNik(nik) {
    try {
      const response = await axios.get(
        "https://api.siputzx.my.id/api/tools/nik-checker",
        { params: { nik } }
      );

      // Cek status API sebelum mengembalikan data
      if (!response.data || response.data.status !== true) {
        return { status: false, error: response.data?.message || "Invalid NIK or API error" };
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching NIK:", error.message);
      return { status: false, error: error.message };
    }
  }

  app.get("/api/nik", async (req, res) => {
    const { nik } = req.query;

    if (!nik || !/^\d{16}$/.test(nik)) {
      return res.status(400).json({ status: false, error: "NIK must be 16 digits" });
    }

    const result = await fetchNik(nik);

    if (!result.status) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  });
};
