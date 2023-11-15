// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { text, target_lang } = req.body;

//   if (!text || !target_lang) {
//     return res.status(400).json({ error: 'Text and target language are required' });
//   }

//   try {
//     const response = await axios.post(
//       'https://api-free.deepl.com/v2/translate',
//       {
//         text: [text],
//         target_lang: target_lang,
//       },
//       {
//         headers: {
//           'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.status(200).json({ translation: response.data.translations[0].text });
//   } catch (error) {
//     console.error('[TRANSLATION_ERROR]', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };