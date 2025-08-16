import axios from 'axios';

export default (app) => {
  async function convertTextToBase64(text) {
    try {
      const response = await axios.get(
        'https://api.siputzx.my.id/api/tools/text2base64',
        { params: { text } }
      );
      return response.data;
    } catch (error) {
      console.error('Error converting text to Base64:', error.message);
      throw error;
    }
  }

  app.get('/api/base64', async (req, res) => {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ status: false, error: 'Text required' });
    }

    try {
      const result = await convertTextToBase64(text);

      res.status(200).json({
        status: result.status,
        data: result.data,
        timestamp: result.timestamp,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
