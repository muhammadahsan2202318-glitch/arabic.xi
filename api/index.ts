import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '5mb' }));

// Initialize GoogleGenAI server-side with telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Common router for both `/api/*` and direct `/` (for local dev & Vercel rewrites)
const router = express.Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    institution: 'MA Darul Faqih Indonesia',
    grade: 'Kelas 11 Madrasah Aliyah',
    curriculum: 'KMA 183 / Kurikulum Merdeka Bahasa Arab',
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

/**
 * AI Tutor & Percakapan Bahasa Arab
 */
router.post('/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage, topic } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Pesan santri tidak boleh kosong.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: {
          arabic: 'أَهْلًا وَسَهْلًا بِكَ يَا طَالِبَ دَارِ الفَقِيْهِ! كَيْفَ حَالُكَ اليَوْمَ؟',
          latin: "Ahlan wa sahlan bika ya thaliba Daril Faqih! Kaifa haluka al-yaum?",
          indonesian: 'Selamat datang santri Darul Faqih! Bagaimana kabarmu hari ini?',
          notes: 'Kunci GEMINI_API_KEY dapat dikonfigurasi pada Settings > Secrets. Mode demonstrasi aktif.',
        },
      });
    }

    const conversationContext = Array.isArray(messages)
      ? messages
          .slice(-6)
          .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Santri' : 'Ustadz'}: ${m.content}`)
          .join('\n')
      : '';

    const prompt = `Anda adalah "Ustadz Bayan", tutor dan pengajar Bahasa Arab ramah, berwibawa, dan penyemangat bagi santri kelas 11 MA (Madrasah Aliyah) Darul Faqih Indonesia.
Materi pelajaran mencakup silabus kelas 11 MA: At-Tasawwuq (Berbelanja), As-Shihhah (Kesehatan), As-Safar was-Siyahah (Wisata), Hifzhul Bi'ah (Lingkungan Hidup), Tiknulujiya wal Ittishalat (Teknologi), Al-Adyan (Toleransi Agama).

Konteks percakapan sebelumnya:
${conversationContext}

Pesan santri saat ini: "${userMessage || ''}"
Topik saat ini: "${topic || 'Percakapan Bahasa Arab Sehari-hari'}"

Tugas Anda:
1. Tanggapi percakapan santri dalam Bahasa Arab fushah yang mudah dipahami, berharakat lengkap (tashkeel).
2. Sediakan transliterasi Latin dan terjemahan Bahasa Indonesia.
3. Berikan catatan kosakata penting / koreksi tata bahasa nahwu/sharaf santri jika ada kekeliruan secara mendidik dan menyemangati (gunakan frasa khas pesantren seperti "Mumtaz", "Barakallahu fiik", "Ahsanta").
4. Kembalikan response STRICTLY dalam format JSON dengan struktur:
{
  "arabic": "teks arab berharakat lengkap",
  "latin": "transliterasi latin",
  "indonesian": "terjemahan bahasa indonesia",
  "notes": "catatan nahwu / kosakata baru / apresiasi untuk santri"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text?.trim() || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        arabic: text,
        latin: '',
        indonesian: 'Jawaban dari Ustadz AI Darul Faqih',
        notes: 'Teruslah berlatih berbicara bahasa Arab!',
      };
    }

    res.json({ reply: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({
      error: 'Gagal memproses percakapan AI',
      details: error?.message || 'Unknown error',
    });
  }
});

/**
 * AI Analisis I'rab & Nahwu Sharaf
 */
router.post('/api/ai/irab', async (req: Request, res: Response) => {
  try {
    const { sentence } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Kalimat bahasa Arab harus diisi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        result: {
          original: sentence,
          vocalized: sentence,
          translation: 'Analisis I\'rab memerlukan konfigurasi GEMINI_API_KEY.',
          sentenceType: 'Jumlah Fi\'liyyah / Ismiyyah',
          breakdown: [
            {
              word: sentence.split(' ')[0] || 'الكلمة',
              position: 'Kedudukan kata dalam kalimat',
              irab: 'Hukum I\'rab (Marfu\' / Manshub / Majrur / Majzum)',
              sign: 'Tanda I\'rab (Dhammah / Fathah / Kasrah / Sukun)',
              explanation: 'Penjelasan kaidah nahwu sesuai silabus kelas 11 MA',
            },
          ],
          summaryRule: 'Gunakan panel Settings > Secrets untuk menyambungkan AI Studio Gemini API.',
        },
      });
    }

    const prompt = `Anda adalah pakar ilmu Nahwu & Sharaf untuk santri Madrasah Aliyah kelas 11 MA Darul Faqih Indonesia.
Tolong analisis kalimat bahasa Arab berikut ini:
"${sentence}"

Silabus Nahwu Kelas 11 MA mencakup: Adad Ma'dud, Jumlah Fi'liyyah & Ismiyyah, Fa'il, Na'ibul Fa'il, Maf'ul bih, Huruf Athaf, Fi'il Mabni Ma'lum/Majhul, Inna wa akhwatuha, Kaana wa akhwatuha, Huruf Jar, Isim Maushul.

Kembalikan jawaban STRICTLY dalam format JSON dengan struktur:
{
  "original": "kalimat asli santri",
  "vocalized": "kalimat dengan harakat/tashkeel lengkap dan benar",
  "translation": "arti terjemahan lengkap dalam bahasa Indonesia",
  "sentenceType": "Tipe kalimat (Jumlah Fi'liyyah atau Jumlah Ismiyyah)",
  "breakdown": [
    {
      "word": "kata dengan harakat",
      "position": "kedudukan (contoh: Fi'il Madhi, Fa'il, Maf'ul Bih, Mudhaf Ilaih, Jar Majrur)",
      "irab": "status (contoh: Marfu', Manshub, Majrur)",
      "sign": "tanda I'rab (contoh: Bi adh-dhommah azh-zhahirah, bil-fathah)",
      "explanation": "penjelasan singkat dan mudah dipahami santri kelas 11"
    }
  ],
  "summaryRule": "Kaidah nahwu utama yang dapat dipetik santri dari kalimat ini"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({ result: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/irab:', error);
    res.status(500).json({
      error: 'Gagal menganalisis I\'rab',
      details: error?.message || 'Unknown error',
    });
  }
});

/**
 * AI Koreksi Insya' / Kalimat Santri
 */
router.post('/api/ai/grammar-check', async (req: Request, res: Response) => {
  try {
    const { sentence, intendedMeaning } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Teks bahasa Arab harus diisi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        correction: {
          original: sentence,
          corrected: sentence,
          isCorrect: true,
          correctionsList: ['Mode demo: Konfigurasikan GEMINI_API_KEY di Secrets.'],
          advice: 'Perhatikan kesesuaian mufrad/tasniyah/jama\' serta mudzakkar/muannats.',
        },
      });
    }

    const prompt = `Anda adalah guru pengoreksi karangan bahasa Arab (Insya') di MA Darul Faqih Indonesia.
Santri menulis kalimat: "${sentence}"
Maksud kalimat santri: "${intendedMeaning || 'Sesuai konteks kalimat'}"

Tolong periksa ketepatan:
1. Harakat / Tashkeel
2. Kaidah Nahwu (I'rab, Fa'il, Isim Kaana, Khabar Inna, Na'at Man'ut)
3. Kaidah Sharaf (Tashrif fi'il, wazan, dhomir)
4. Pemilihan kosa kata (Uslub fushah vs 'ammiyah)

Kembalikan STRICTLY format JSON:
{
  "original": "kalimat asli",
  "corrected": "kalimat yang sudah diperbaiki dengan harakat sempurna",
  "isCorrect": boolean (apakah kalimat aslinya sudah 100% tepat?),
  "correctionsList": ["poin koreksi 1", "poin koreksi 2"],
  "improvedAlternative": "pilihan uslub alternatif yang lebih indah/balaghah",
  "advice": "nasihat motivasi ramah santri untuk perbaikan ke depan"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({ correction: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/grammar-check:', error);
    res.status(500).json({
      error: 'Gagal memeriksa kalimat',
      details: error?.message || 'Unknown error',
    });
  }
});

/**
 * AI Generator Kuis Latihan Dinamis
 */
router.post('/api/ai/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { chapterTitle, topic, questionCount = 4 } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        quiz: [
          {
            id: 'q1',
            questionArabic: 'مَا مَعْنَى كَلِمَةِ "السُّوْقُ المَرْكَزِيُّ"؟',
            questionIndo: 'Apa arti kata "السُّوْقُ المَرْكَزِيُّ"?',
            options: ['Pasar Tradisional', 'Supermarket / Pasar Swalayan', 'Toko Buku', 'Apotek'],
            correctIndex: 1,
            explanation: 'السُّوْقُ المَرْكَزِيُّ bermakna supermarket / pasar swalayan.',
          },
        ],
      });
    }

    const prompt = `Buatlah ${questionCount} soal kuis pilihan ganda bahasa Arab untuk santri Kelas 11 MA Darul Faqih Indonesia.
Bab/Topik: ${chapterTitle || topic || 'Bahasa Arab Kelas 11 MA'}

Format setiap soal:
- Pertanyaan dalam bahasa Arab berharakat + terjemahan petunjuk
- 4 pilihan jawaban (A, B, C, D)
- Indeks jawaban benar (0-3)
- Pembahasan ringkas dalam bahasa Indonesia (kaidah nahwu / arti kata)

Kembalikan STRICTLY format JSON array:
[
  {
    "id": "q1",
    "questionArabic": "teks pertanyaan Arab berharakat",
    "questionIndo": "petunjuk pertanyaan dalam bahasa Indonesia",
    "options": ["pilihan A", "pilihan B", "pilihan C", "pilihan D"],
    "correctIndex": 0,
    "explanation": "penjelasan mengapa jawaban ini tepat sesuai kaidah kelas 11 MA"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '[]');
    res.json({ quiz: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-quiz:', error);
    res.status(500).json({
      error: 'Gagal membuat kuis dinamis',
      details: error?.message || 'Unknown error',
    });
  }
});

// Support both `/api/*` and direct mounting
app.use('/api', router);
app.use('/', router);

// Export default app WITHOUT app.listen() as requested!
export default app;
