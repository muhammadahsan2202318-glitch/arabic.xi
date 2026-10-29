export interface MufradatItem {
  id: string;
  arabic: string;
  latin: string;
  meaning: string;
  category: string;
  exampleSentenceArabic: string;
  exampleSentenceIndo: string;
}

export interface HiwarLine {
  speakerArabic: string;
  speakerIndo: string;
  avatar: string;
  textArabic: string;
  textLatin: string;
  textIndo: string;
}

export interface QawaidContent {
  title: string;
  subtitle: string;
  summary: string;
  formula: string;
  examples: {
    sentenceArabic: string;
    analysis: string;
    meaning: string;
  }[];
  explanationPoints: string[];
}

export interface QuizQuestion {
  id: string;
  questionArabic: string;
  questionIndo: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  number: number;
  semester: 1 | 2;
  titleArabic: string;
  titleIndo: string;
  subtitle: string;
  theme: string;
  summary: string;
  estimatedTime: string;
  badgeColor: string;
  mufradat: MufradatItem[];
  hiwar: {
    titleArabic: string;
    titleIndo: string;
    setting: string;
    dialogue: HiwarLine[];
  };
  qiraah: {
    titleArabic: string;
    titleIndo: string;
    paragraphs: {
      arabic: string;
      indo: string;
    }[];
    vocabularySpotlight: {
      word: string;
      meaning: string;
    }[];
  };
  qawaid: QawaidContent;
  quiz: QuizQuestion[];
}

export const chaptersData: Chapter[] = [
  {
    id: 'bab-1',
    number: 1,
    semester: 1,
    titleArabic: 'التَّسَوُّقُ فِي السُّوْقِ',
    titleIndo: 'Berbelanja di Pasar & Swalayan',
    subtitle: 'At-Tasawwuq fis-Suq at-Taqlidiy wal-Markaziy',
    theme: 'Kehidupan Sehari-hari & Transaksi Syar\'i',
    summary: 'Mempelajari kosakata jual-beli, ungkapan tawar-menawar harga santri, serta kaidah bilangan Adad Ma\'dud 100-1000 dan huruf athaf.',
    estimatedTime: '45 Menit',
    badgeColor: 'emerald',
    mufradat: [
      {
        id: 'm1_1',
        arabic: 'السُّوْقُ التَّقْلِيْدِيُّ',
        latin: "As-Suuqut Taqliidiyyu",
        meaning: 'Pasar Tradisional',
        category: 'Tempat',
        exampleSentenceArabic: 'يَذْهَبُ أَحْمَدُ إِلَى السُّوْقِ التَّقْلِيْدِيِّ صَبَاحًا.',
        exampleSentenceIndo: 'Ahmad pergi ke pasar tradisional di pagi hari.',
      },
      {
        id: 'm1_2',
        arabic: 'السُّوْقُ المَرْكَزِيُّ',
        latin: "As-Suuqul Markaziyyu",
        meaning: 'Pasar Swalayan / Supermarket',
        category: 'Tempat',
        exampleSentenceArabic: 'الأَسْعَارُ فِي السُّوْقِ المَرْكَزِيِّ ثَابِتَةٌ.',
        exampleSentenceIndo: 'Harga-harga di supermarket bersifat tetap.',
      },
      {
        id: 'm1_3',
        arabic: 'البَائِعُ وَالمُشْتَرِي',
        latin: "Al-Baa'i'u wal Musytarii",
        meaning: 'Penjual dan Pembeli',
        category: 'Pelaku',
        exampleSentenceArabic: 'يَتَفَاوَضُ المُشْتَرِي مَعَ البَائِعِ فِي السِّعْرِ.',
        exampleSentenceIndo: 'Pembeli bernegosiasi harga dengan penjual.',
      },
      {
        id: 'm1_4',
        arabic: 'السِّعْرُ / الثَّمَنُ',
        latin: "As-Si'ru / Ats-Tsamanu",
        meaning: 'Harga',
        category: 'Transaksi',
        exampleSentenceArabic: 'كَمْ سِعْرُ هَذَا القَمِيْصِ يَا أَخِي؟',
        exampleSentenceIndo: 'Berapa harga kemeja ini wahai saudaraku?',
      },
      {
        id: 'm1_5',
        arabic: 'تَخْفِيْضُ السِّعْرِ (الخَصْمُ)',
        latin: "Takhfiidhus Si'ri (Al-Khashmu)",
        meaning: 'Diskon / Potongan Harga',
        category: 'Transaksi',
        exampleSentenceArabic: 'هَلْ هُنَاكَ خَصْمٌ لِطُلَّابِ المَعْهَدِ؟',
        exampleSentenceIndo: 'Apakah ada diskon untuk santri pesantren?',
      },
      {
        id: 'm1_6',
        arabic: 'المِيْزَانُ / الكِيْلُوغْرَام',
        latin: "Al-Miizaanu / Al-Kiiluughraam",
        meaning: 'Timbangan / Kilogram',
        category: 'Ukuran',
        exampleSentenceArabic: 'أُرِيْدُ كِيْلُوغْرَامًا وَاحِدًا مِنَ التُّفَّاحِ.',
        exampleSentenceIndo: 'Saya ingin satu kilogram buah apel.',
      },
    ],
    hiwar: {
      titleArabic: 'حِوَارٌ بَيْنَ البَائِعِ وَالطَّالِبِ',
      titleIndo: 'Percakapan antara Penjual dan Santri MA Darul Faqih',
      setting: 'Di toko perlengkapan santri pasar pesantren',
      dialogue: [
        {
          speakerArabic: 'البَائِعُ',
          speakerIndo: 'Penjual',
          avatar: '👨‍💼',
          textArabic: 'أَهْلًا وَسَهْلًا! أَيَّ خِدْمَةٍ يَا بُنَيَّ؟',
          textLatin: "Ahlan wa sahlan! Ayya khidmatin ya bunayya?",
          textIndo: 'Selamat datang! Ada yang bisa dibantu wahai ananda?',
        },
        {
          speakerArabic: 'الطَّالِبُ (عُمَر)',
          speakerIndo: 'Santri (Umar)',
          avatar: '👳‍♂️',
          textArabic: 'أَهْلًا بِكَ. أُرِيْدُ ثَوْبًا أَبْيَضَ وَمُعْجَمًا عَرَبِيًّا لِدِرَاسَتِي.',
          textLatin: "Ahlan bika. Uriidu tsauban abyadha wa mu'jaman 'arabiyyan lidiraasatii.",
          textIndo: 'Sama-sama. Saya ingin jubah putih dan kamus bahasa Arab untuk belajar saya.',
        },
        {
          speakerArabic: 'البَائِعُ',
          speakerIndo: 'Penjual',
          avatar: '👨‍💼',
          textArabic: 'تَفَضَّلْ، هَذَا الثَّوْبُ قُمَاشُهُ مُمْتَازٌ، وَهَذَا مُعْجَمُ الطُّلَّابِ.',
          textLatin: "Tafadhdhal, haadzats tsaubu qumaasyuhu mumtaaz, wa haadza mu'jamuth thullaab.",
          textIndo: 'Silakan, jubah ini bahannya istimewa, dan ini kamus saku santri.',
        },
        {
          speakerArabic: 'الطَّالِبُ (عُمَر)',
          speakerIndo: 'Santri (Umar)',
          avatar: '👳‍♂️',
          textArabic: 'كَمِ الحِسَابُ كُلُّهُ يَا عَمُّ؟',
          textLatin: "Kamil hisaabu kulluhu ya 'ammu?",
          textIndo: 'Berapa total biayanya paman?',
        },
        {
          speakerArabic: 'البَائِعُ',
          speakerIndo: 'Penjual',
          avatar: '👨‍💼',
          textArabic: 'مِئَةُ أَلْفِ رُوْبِيَّةٍ لِلثَّوْبِ، وَخَمْسُوْنَ أَلْفًا لِلْمُعْجَمِ. المَجْمُوْعُ مِئَةٌ وَخَمْسُوْنَ أَلْفًا.',
          textLatin: "Mi'atu alfi ruubiyyatin lits-tsaub, wa khamsuuna alfan lil-mu'jam. Al-majmuu'u mi'atun wa khamsuuna alfan.",
          textIndo: 'Seratus ribu rupiah untuk jubah, dan lima puluh ribu untuk kamus. Totalnya seratus lima puluh ribu rupiah.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'التَّسَوُّقُ بَيْنَ المَاضِي وَالحَاضِرِ',
      titleIndo: 'Berbelanja: Antara Masa Lalu dan Masa Kini',
      paragraphs: [
        {
          arabic: 'كَانَ النَّاسُ فِي المَاضِي يَشْتَرُوْنَ حَاجَاتِهِمْ مِنَ الأَسْوَاقِ التَّقْلِيْدِيَّةِ فَقَطْ، حَيْثُ يَلْتَقِي البَائِعُ بِالمُشْتَرِي وَجْهًا لِوَجْهٍ، وَيَتَفَاوَضَانِ فِي الأَسْعَارِ بِرُوْحٍ مِنَ المَوَدَّةِ وَالسَّمَاحَةِ.',
          indo: 'Masyarakat pada masa lampau membeli kebutuhan mereka hanya dari pasar-pasar tradisional, di mana penjual dan pembeli bertemu bertatap muka, saling tawar menawar harga dengan penuh keramahan dan toleransi.',
        },
        {
          arabic: 'أَمَّا فِي هَذَا العَصْرِ، فَقَدْ ظَهَرَتِ الأَسْوَاقُ المَرْكَزِيَّةُ الكَبِيْرَةُ، وَانْتَشَرَ التَّسَوُّقُ الإِلِكْتُرُوْنِيُّ عَبْرَ شَبَكَةِ الإِنْتَرْنِت، مِمَّا جَعَلَ شِرَاءَ السِّلَعِ أَسْرَعَ وَأَسْهَلَ دُوْنَ الحَاجَةِ إِلَى الخُرُوْجِ مِنَ البَيْتِ.',
          indo: 'Adapun di zaman ini, telah muncul pasar-pasar swalayan besar dan merebak belanja daring melalui jaringan internet, yang menjadikan pembelian aneka barang lebih cepat dan mudah tanpa perlu keluar rumah.',
        },
      ],
      vocabularySpotlight: [
        { word: 'حَاجَاتٌ', meaning: 'Kebutuhan-kebutuhan' },
        { word: 'السَّمَاحَةُ', meaning: 'Kelapangan hati / toleransi' },
        { word: 'السِّلَعُ', meaning: 'Barang-barang dagangan' },
      ],
    },
    qawaid: {
      title: 'عَدَدُ المِئَةِ وَالأَلْفِ وَحُرُوْفُ العَطْفِ',
      subtitle: 'Kaidah Bilangan (100 & 1000) dan Huruf Athaf',
      summary: 'Aturan penyusunan angka 100 (مِائَةٌ) dan 1000 (أَلْفٌ) selalu berstatus Mudhaf, sehingga ma\'dud (kata benda setelahnya) wajib berharakat KASRAH (Mufrad Majrur).',
      formula: 'مِائَةُ / أَلْفُ + اسْمٌ مُفْرَدٌ مَجْرُوْرٌ بِالكَسْرَةِ',
      explanationPoints: [
        'Kata مِائَةٌ (seratus) dan أَلْفٌ (seribu) bentuknya tetap sama baik untuk ma\'dud mudzakkar maupun muannats.',
        'Ma\'dud (benda yang dihitung) setelah مِائَةٌ atau أَلْفٌ SELALU berkedudukan sebagai mudhaf ilaih (mufrad majrur dengan kasrah).',
        'Huruf Athaf yang sering digunakan: الواو (dan), الفاء (lalu/seketika), ثُمَّ (kemudian dengan jeda), أَوْ (atau).',
        'Kata yang jatuh setelah huruf athaf disebut Ma\'thuf dan mengikuti i\'rab kata sebelumnya (Ma\'thuf \'alaih).',
      ],
      examples: [
        {
          sentenceArabic: 'اشْتَرَيْتُ مِائَةَ كِتَابٍ وَأَلْفَ قَلَمٍ.',
          analysis: 'كِتَابٍ dan قَلَمٍ keduanya mufrad majrur (mudhaf ilaih). Huruf "وَ" adalah huruf athaf.',
          meaning: 'Saya membeli 100 buku dan 1000 pena.',
        },
        {
          sentenceArabic: 'فِي مَعْهَدِ دَارِ الفَقِيْهِ مِائَةُ طَالِبٍ وَثَلَاثُمِائَةِ طَالِبَةٍ.',
          analysis: 'مِائَةُ dan ثَلَاثُمِائَةِ tetap digunakan sama baik untuk thalib (mudzakkar) maupun thalibah (muannats).',
          meaning: 'Di Pondok Pesantren Darul Faqih ada 100 santri putra dan 300 santri putri.',
        },
      ],
    },
    quiz: [
      {
        id: 'q1_1',
        questionArabic: 'مَا إِعْرَابُ كَلِمَةِ "كِتَابٍ" فِي جُمْلَةِ: (قَرَأْتُ مِائَةَ كِتَابٍ)؟',
        questionIndo: 'Apa kedudukan i\'rab kata "كِتَابٍ" setelah angka seratus?',
        options: ['مَفْعُوْلٌ بِهِ مَنْصُوْبٌ', 'مُضَافٌ إِلَيْهِ مَجْرُوْرٌ بِالكَسْرَةِ', 'فَاعِلٌ مَرْفُوْعٌ', 'نَعْتٌ مَجْرُوْرٌ'],
        correctIndex: 1,
        explanation: 'Ma\'dud setelah kata bilangan mi\'ah (100) dan alf (1000) selalu mufrad majrur berstatus mudhaf ilaih.',
      },
      {
        id: 'q1_2',
        questionArabic: 'اخْتَرْ حَرْفَ العَطْفِ المُنَاسِبَ: (دَخَلَ المُعَلِّمُ ... الطُّلَّابُ بَعْدَهُ مُبَاشَرَةً)',
        questionIndo: 'Pilih huruf athaf yang menunjukkan urutan tanpa jeda waktu lama (langsung):',
        options: ['ثُمَّ', 'الفَاءُ (فَـ)', 'أَوْ', 'بَلْ'],
        correctIndex: 1,
        explanation: 'Huruf Fa\' (الفاء) berfaedah li at-tartib ma\'at ta\'qib (berurutan seketika tanpa jeda).',
      },
      {
        id: 'q1_3',
        questionArabic: 'كَمْ سِعْرُ القَمِيْصِ إِذَا كَانَ: (خَمْسُوْنَ أَلْفَ رُوْبِيَّةٍ)؟',
        questionIndo: 'Berapakah nilai nominal "خَمْسُوْنَ أَلْفَ رُوْبِيَّةٍ"?',
        options: ['Rp 5.000', 'Rp 15.000', 'Rp 50.000', 'Rp 500.000'],
        correctIndex: 2,
        explanation: 'Khamsuuna alfan artinya 50 x 1.000 = Rp 50.000 (lima puluh ribu rupiah).',
      },
    ],
  },
  {
    id: 'bab-2',
    number: 2,
    semester: 1,
    titleArabic: 'الصِّحَّةُ وَالرِّعَايَةُ الطِّبِّيَّةُ',
    titleIndo: 'Kesehatan & Pelayanan Medis',
    subtitle: 'As-Shihhah war-Ri\'ayah ath-Thibbiyyah',
    theme: 'Kesehatan Jasmani Santri & Kedokteran Islam',
    summary: 'Mengenal istilah anatomi, keluhan penyakit, rumah sakit dan resep dokter, serta menguasai kaidah Jumlah Fi\'liyyah, Fa\'il, dan Na\'ibul Fa\'il.',
    estimatedTime: '50 Menit',
    badgeColor: 'blue',
    mufradat: [
      {
        id: 'm2_1',
        arabic: 'المُسْتَشْفَى / العِيَادَةُ',
        latin: "Al-Mustasyfaa / Al-'Iyaadah",
        meaning: 'Rumah Sakit / Poliklinik',
        category: 'Tempat',
        exampleSentenceArabic: 'ذَهَبَ الطَّالِبُ المَرِيْضُ إِلَى عِيَادَةِ المَعْهَدِ.',
        exampleSentenceIndo: 'Santri yang sakit pergi ke klinik pondok.',
      },
      {
        id: 'm2_2',
        arabic: 'الطَّبِيْبُ وَالمُمَرِّضُ',
        latin: "Ath-Thabiibu wal Mumarridhu",
        meaning: 'Dokter dan Perawat',
        category: 'Profesi',
        exampleSentenceArabic: 'فَحَصَ الطَّبِيْبُ صَدْرَ المَرِيْضِ بِالسَّمَّاعَةِ.',
        exampleSentenceIndo: 'Dokter memeriksa dada pasien dengan stetoskop.',
      },
      {
        id: 'm2_3',
        arabic: 'الصُّدَاعُ / الحُمَّى',
        latin: "Ash-Shudaa'u / Al-Hummaa",
        meaning: 'Pusing Kepala / Demam',
        category: 'Penyakit',
        exampleSentenceArabic: 'أَشْعُرُ بِصُدَاعٍ شَدِيْدٍ فِي رَأْسِي مُنْذُ أَمْسِ.',
        exampleSentenceIndo: 'Saya merasakan pusing hebat di kepala sejak kemarin.',
      },
      {
        id: 'm2_4',
        arabic: 'الدَّوَاءُ / الوَصْفَةُ الطِّبِّيَّةُ',
        latin: "Ad-Dawaa'u / Al-Washfathuth Thibbiyyah",
        meaning: 'Obat / Resep Dokter',
        category: 'Pengobatan',
        exampleSentenceArabic: 'اشْتَرَى أَخِي الدَّوَاءَ مِنَ الصَّيْدَلِيَّةِ حَسَبَ الوَصْفَةِ.',
        exampleSentenceIndo: 'Saudaraku membeli obat dari apotek sesuai resep dokter.',
      },
      {
        id: 'm2_5',
        arabic: 'العَقْلُ السَّلِيْمُ فِي الجِسْمِ السَّلِيْمِ',
        latin: "Al-'Aqlus Saliim fil Jismis Saliim",
        meaning: 'Akal yang sehat terdapat pada raga yang sehat (Mahfuzhat)',
        category: 'Pepatah',
        exampleSentenceArabic: 'يُمَارِسُ طُلَّابُ دَارِ الفَقِيْهِ الرِّيَاضَةَ صَبَاحًا لِلصِّحَّةِ.',
        exampleSentenceIndo: 'Santri Darul Faqih berolahraga pagi hari demi kesehatan.',
      },
    ],
    hiwar: {
      titleArabic: 'فِي عِيَادَةِ الطَّبِيْبِ',
      titleIndo: 'Di Ruang Pemeriksaan Dokter',
      setting: 'Santri berkonsultasi kesehatan dengan dokter klinik',
      dialogue: [
        {
          speakerArabic: 'الطَّبِيْبُ',
          speakerIndo: 'Dokter',
          avatar: '👨‍⚕️',
          textArabic: 'شَفَاكَ اللهُ يَا بُنَيَّ. مِمَّا تَشْتَكِي؟',
          textLatin: "Syafaakallaahu ya bunayya. Mimmaa tasytakii?",
          textIndo: 'Semoga Allah menyembuhkanmu ananda. Apa yang kamu keluhkan?',
        },
        {
          speakerArabic: 'المَرِيْضُ',
          speakerIndo: 'Pasien (Santri)',
          avatar: '🤒',
          textArabic: 'أَشْعُرُ بِأَلَمٍ فِي بَطْنِي، وَارْتِفَاعٍ فِي دَرَجَةِ حَرَارَتِي.',
          textLatin: "Asy'uru bi-alamin fii bathnii, wartifaa'in fii darajati haraaratii.",
          textIndo: 'Saya merasakan sakit di perut saya dan demam tinggi.',
        },
        {
          speakerArabic: 'الطَّبِيْبُ',
          speakerIndo: 'Dokter',
          avatar: '👨‍⚕️',
          textArabic: 'اسْتَلْقِ عَلَى السَّرِيْرِ لِلْفَحْصِ... عِنْدَكَ التِهَابٌ بَسِيْطٌ فِي المَعِدَةِ.',
          textLatin: "Istalqi 'alas sariiri lil-fahshi... 'indaka iltihaabun basiithun fil ma'idah.",
          textIndo: 'Berbaringlah di ranjang periksa... Kamu mengalami radang lambung ringan.',
        },
        {
          speakerArabic: 'المَرِيْضُ',
          speakerIndo: 'Pasien (Santri)',
          avatar: '🤒',
          textArabic: 'مَاذَا تَنْصَحُنِي يَا دُكْتُوْر؟',
          textLatin: "Maadzaa tansyahunii ya duktuur?",
          textIndo: 'Apa nasihat dokter untuk saya?',
        },
        {
          speakerArabic: 'الطَّبِيْبُ',
          speakerIndo: 'Dokter',
          avatar: '👨‍⚕️',
          textArabic: 'تَنَاوَلْ هَذَا الدَّوَاءَ ثَلَاثَ مَرَّاتٍ بَعْدَ الأَكْلِ، وَعَلَيْكَ بِالرَّاحَةِ التَّامَّةِ وَشُرْبِ المَاءِ.',
          textLatin: "Tanaawal haadzad dawaa'a tsalaatsa marraatin ba'dal akli, wa 'alaika bir-raahatit taammati wa syurbil maa'.",
          textIndo: 'Minumlah obat ini tiga kali sehari setelah makan, istirahatlah yang cukup dan banyak minum air putih.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'النَّظَافَةُ وَالصِّحَّةُ فِي الإِسْلَامِ',
      titleIndo: 'Kebersihan dan Kesehatan dalam Pandangan Islam',
      paragraphs: [
        {
          arabic: 'حَثَّ الإِسْلَامُ حَثًّا شَدِيْدًا عَلَى النَّظَافَةِ وَالعِنَايَةِ بِالصِّحَّةِ، فَقَالَ النَّبِيُّ ﷺ: «الطَّهُوْرُ شَطْرُ الإِيْمَانِ». وَفَرَضَ الوُضُوْءَ خَمْسَ مَرَّاتٍ فِي اليَوْمِ وَاللَّيْلَةِ لِيَكُوْنَ المُسْلِمُ طَاهِرَ البَدَنِ وَالثِّيَابِ.',
          indo: 'Islam sangat menganjurkan kebersihan dan pemeliharaan kesehatan. Nabi ﷺ bersabda: "Bersuci adalah separuh dari keimanan". Dan diwajibkan wudhu lima kali sehari semalam agar seorang muslim suci badan serta pakaiannya.',
        },
        {
          arabic: 'وَكَانَ عُلَمَاءُ المُسْلِمِيْنَ فِي القُرُوْنِ الأُوْلَى رُوَّادًا فِي عِلْمِ الطِّبِّ، مِثْلَ ابْنِ سِيْنَا وَالرَّازِي، الَّذِيْنَ أَلَّفُوْا المَوْسُوْعَاتِ الطِّبِّيَّةَ الَّتِي اسْتَفَادَ مِنْهَا العَالَمُ أَجْمَعُ.',
          indo: 'Para cendekiawan muslim di abad-abad permulaan merupakan pelopor dalam ilmu kedokteran, seperti Ibnu Sina dan Ar-Razi, yang menulis ensiklopedia medis yang diambil manfaatnya oleh seluruh dunia.',
        },
      ],
      vocabularySpotlight: [
        { word: 'الطَّهُوْرُ', meaning: 'Bersuci' },
        { word: 'شَطْرٌ', meaning: 'Separuh / Sebagian' },
        { word: 'رُوَّادٌ', meaning: 'Pelopor / Perintis' },
      ],
    },
    qawaid: {
      title: 'الجُمْلَةُ الفِعْلِيَّةُ (الفَاعِلُ وَنَائِبُ الفَاعِلِ)',
      subtitle: 'Kaidah Fa\'il & Na\'ibul Fa\'il dalam Kalimat Verba',
      summary: 'Jumlah Fi\'liyyah diawali dengan Fi\'il. Jika fi\'il-nya Mabni Ma\'lum (aktif), pelaku disebut FA\'IL (Marfu\'). Jika fi\'il-nya diubah ke Mabni Majhul (pasif), maf\'ul bih maju menggantikan fa\'il dan disebut NA\'IBUL FA\'IL (Marfu\').',
      formula: 'فِعْلٌ مَعْلُوْمٌ + فَاعِلٌ (مَرْفُوْعٌ) | فِعْلٌ مَجْهُوْلٌ + نَائِبُ الفَاعِلِ (مَرْفُوْعٌ)',
      explanationPoints: [
        'Fa\'il adalah isim marfu\' yang terletak setelah fi\'il ma\'lum untuk menunjukkan pelaku perbuatan.',
        'Cara mengubah Fi\'il Madhi ke Majhul: Didhammahkan huruf pertamanya dan dikasrahkan huruf sebelum terakhir (contoh: كَتَبَ -> كُتِبَ, فَحَصَ -> فُحِصَ).',
        'Cara mengubah Fi\'il Mudhari\' ke Majhul: Didhammahkan huruf pertamanya dan difathahkan huruf sebelum terakhir (contoh: يَفْحَصُ -> يُفْحَصُ, يَشْرَبُ -> يُشْرَبُ).',
        'Na\'ibul Fa\'il hukum I\'rabnya SELALU MARFU\' (tanda asalnya Dhammah).',
      ],
      examples: [
        {
          sentenceArabic: 'فَحَصَ الطَّبِيْبُ المَرِيْضَ -> فُحِصَ المَرِيْضُ.',
          analysis: 'Pada kalimat pertama "الطَّبِيْبُ" adalah fa\'il marfu\'. Pada kalimat pasif "المَرِيْضُ" menjadi na\'ibul fa\'il marfu\' bid-dhammah.',
          meaning: 'Dokter memeriksa pasien -> Pasien diperiksa.',
        },
        {
          sentenceArabic: 'يَشْرَبُ الطَّالِبُ الدَّوَاءَ -> يُشْرَبُ الدَّوَاءُ.',
          analysis: 'Fi\'il mudhari\' pasif "يُشْرَبُ" didhammahkan ya-nya dan difathahkan ra-nya. "الدَّوَاءُ" menjadi na\'ibul fa\'il.',
          meaning: 'Santri meminum obat -> Obat diminum.',
        },
      ],
    },
    quiz: [
      {
        id: 'q2_1',
        questionArabic: 'مَا نَائِبُ الفَاعِلِ فِي جُمْلَةِ: (كُتِبَتِ الوَصْفَةُ الطِّبِّيَّةُ)؟',
        questionIndo: 'Manakah Na\'ibul Fa\'il pada kalimat pasif tersebut?',
        options: ['كُتِبَتْ', 'الوَصْفَةُ', 'الطِّبِّيَّةُ', 'ضمير مستتر'],
        correctIndex: 1,
        explanation: 'الوَصْفَةُ adalah isim marfu\' yang menggantikan fa\'il setelah fi\'il majhul (كُتِبَتْ).',
      },
      {
        id: 'q2_2',
        questionArabic: 'كَيْفَ صِيْغَةُ الفِعْلِ المَجْهُوْلِ مِنَ الفِعْلِ المُضَارِعِ (يَعْرِفُ)؟',
        questionIndo: 'Bagaimana perubahan fi\'il mudhari\' (يَعْرِفُ) ke bentuk pasif (mabni majhul)?',
        options: ['عُرِفَ', 'يُعْرَفُ', 'عَارَفَ', 'يُعْرِفُ'],
        correctIndex: 1,
        explanation: 'Fi\'il mudhari\' majhul dibentuk dengan mendhammahkan huruf awal dan memfathahkan huruf sebelum akhir: يُعْرَفُ.',
      },
    ],
  },
  {
    id: 'bab-3',
    number: 3,
    semester: 1,
    titleArabic: 'السَّفَرُ وَالسِّيَاحَةُ الدِّيْنِيَّةُ',
    titleIndo: 'Perjalanan & Wisata Religi',
    subtitle: 'As-Safar was-Siyahah ad-Diniyyah',
    theme: 'Eksplorasi Peradaban Islam & Rihlah Ilmiah',
    summary: 'Mempelajari kosakata bepergian, transportasi kereta, pesawat, dan kapal, serta menelaah kaidah huruf jar dan zharaf makan/zaman.',
    estimatedTime: '45 Menit',
    badgeColor: 'amber',
    mufradat: [
      {
        id: 'm3_1',
        arabic: 'المَطَارُ / المَحَطَّةُ / المِيْنَاءُ',
        latin: "Al-Mathaaru / Al-Mahath-thahu / Al-Miinaa'u",
        meaning: 'Bandara / Stasiun Kereta / Pelabuhan',
        category: 'Tempat',
        exampleSentenceArabic: 'وَصَلَ الطُّلَّابُ إِلَى المَحَطَّةِ لِرُكُوْبِ القِطَارِ.',
        exampleSentenceIndo: 'Para santri tiba di stasiun untuk naik kereta.',
      },
      {
        id: 'm3_2',
        arabic: 'التَّذْكِرَةُ / جَوَازُ السَّفَرِ',
        latin: "At-Tadzkiratu / Jawaazus Safari",
        meaning: 'Tiket Perjalanan / Paspor',
        category: 'Dokumen',
        exampleSentenceArabic: 'حَجَزَ الأُسْتَاذُ تَذَاكِرَ السَّفَرِ إِلَى مَكَّةَ المُكَرَّمَةِ.',
        exampleSentenceIndo: 'Ustadz memesan tiket-tiket perjalanan ke Makkah Al-Mukarramah.',
      },
      {
        id: 'm3_3',
        arabic: 'السِّيَاحَةُ الثَّقَافِيَّةُ وَالتَّارِيْخِيَّةُ',
        latin: "As-Siyaahatuts Tsaqaafiyyatu wat Taariikhiyyah",
        meaning: 'Wisata Budaya dan Sejarah',
        category: 'Tema',
        exampleSentenceArabic: 'زَارَ طُلَّابُ دَارِ الفَقِيْهِ المَسْجِدَ الأَثَرِيَّ فِي المَدِيْنَةِ.',
        exampleSentenceIndo: 'Santri Darul Faqih mengunjungi masjid bersejarah di kota.',
      },
      {
        id: 'm3_4',
        arabic: 'حَقِيْبَةُ السَّفَرِ / الأَمْتِعَةُ',
        latin: "Haqiibatus Safari / Al-Amti'atu",
        meaning: 'Koper / Barang Bawaan',
        category: 'Perlengkapan',
        exampleSentenceArabic: 'حَمَلَ زَيْدٌ حَقِيْبَتَهُ وَتَوَجَّهَ نَحْوَ الحَافِلَةِ.',
        exampleSentenceIndo: 'Zaid mengangkat kopernya dan menuju ke bus rombongan.',
      },
    ],
    hiwar: {
      titleArabic: 'الاسْتِعْدَادُ لِلرِّحْلَةِ العِلْمِيَّةِ',
      titleIndo: 'Persiapan Rihlah Ilmiah Santri',
      setting: 'Santri berbincang di asrama menjelang studi tur sejarah Islam',
      dialogue: [
        {
          speakerArabic: 'حَسَن',
          speakerIndo: 'Hasan',
          avatar: '🧳',
          textArabic: 'مَتَى سَنَنْطَلِقُ إِلَى زِيَارَةِ مَعَالِمِ تَارِيْخِ الإِسْلَامِ؟',
          textLatin: "Mataa sananthaliqu ilaa ziyaarati ma'aalimi taariikhil Islaam?",
          textIndo: 'Kapan kita akan berangkat untuk ziarah peninggalan sejarah Islam?',
        },
        {
          speakerArabic: 'إِبْرَاهِيْم',
          speakerIndo: 'Ibrahim',
          avatar: '🕌',
          textArabic: 'سَنَرْكَبُ الحَافِلَةَ بَعْدَ صَلَاةِ الفَجْرِ إِنْ شَاءَ اللهُ.',
          textLatin: "Sanarkabul haafilata ba'da shalaatil fajri in syaa Allah.",
          textIndo: 'Kita akan naik bus setelah salat Subuh insya Allah.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'فَوَائِدُ السَّفَرِ فِي التُّرَاثِ الإِسْلَامِيِّ',
      titleIndo: 'Manfaat Perjalanan dalam Warisan Tradisi Islam',
      paragraphs: [
        {
          arabic: 'قَالَ الإِمَامُ الشَّافِعِيُّ رَحِمَهُ اللهُ: «تَغَرَّبْ عَنِ الأَوْطَانِ فِي طَلَبِ العُلَى، وَسَافِرْ فَفِي الأَسْفَارِ خَمْسُ فَوَائِدَ: تَفَرُّجُ هَمٍّ، وَاكْتِسَابُ مَعِيْشَةٍ، وَعِلْمٌ، وَآدَابٌ، وَصُحْبَةُ مَاجِدِ».',
          indo: 'Imam Syafi\'i rahimahullah berkata: "Merantaulah dari kampung halaman demi mencari kemuliaan, dan bepergianlah karena dalam bepergian ada lima faedah: mengusir kegundahan, menjemput rezeki, menambah ilmu, adab kesopanan, dan berteman dengan orang-orang mulia."',
        },
      ],
      vocabularySpotlight: [
        { word: 'تَغَرَّبْ', meaning: 'Merantaulah' },
        { word: 'تَفَرُّجُ هَمٍّ', meaning: 'Hilangnya kesedihan / kegundahan' },
        { word: 'صُحْبَةُ مَاجِدٍ', meaning: 'Berteman dengan orang mulia/bijak' },
      ],
    },
    qawaid: {
      title: 'حُرُوْفُ الجَرِّ وَالظُّرُوْفُ',
      subtitle: 'Kaidah Preposisi Huruf Jar dan Zharaf',
      summary: 'Huruf jar (مِنْ، إِلَى، عَنْ، عَلَى، فِي، البَاء، الكَاف، اللَّام) menjadikan isim sesudahnya Majrur (berharakat kasrah). Zharaf makan (tempat) dan zharaf zaman (waktu) menunjukkan tempat dan waktu peristiwa.',
      formula: 'حَرْفُ جَرٍّ + اسْمٌ مَجْرُوْرٌ بِالكَسْرَةِ',
      explanationPoints: [
        'Isim setelah huruf jar dinamakan Isim Majrur.',
        'Tanda asli i\'rab jar adalah Kasrah pada isim mufrad dan jama\' taksir.',
        'Zharaf Zaman: صَبَاحًا (pagi), مَسَاءً (sore), غَدًا (besok), أَمْسِ (kemarin).',
        'Zharaf Makan: أَمَامَ (depan), وَرَاءَ (belakang), فَوْقَ (atas), تَحْتَ (bawah), بَيْنَ (antara).',
      ],
      examples: [
        {
          sentenceArabic: 'سَافَرْنَا مِنَ المَدِيْنَةِ إِلَى القَرْيَةِ بِالقِطَارِ.',
          analysis: 'مِنْ, إِلَى, dan البَاءُ adalah huruf jar. Isim setelahnya majrur dengan kasrah.',
          meaning: 'Kami bepergian dari kota ke desa dengan kereta api.',
        },
      ],
    },
    quiz: [
      {
        id: 'q3_1',
        questionArabic: 'مَا إِعْرَابُ كَلِمَةِ "القِطَارِ" فِي: (رَكِبْنَا فِي القِطَارِ)؟',
        questionIndo: 'Apa kedudukan i\'rab kata "القِطَارِ"?',
        options: ['اسْمٌ مَجْرُوْرٌ بِفِي وَعَلَامَةُ جَرِّهِ الكَسْرَةُ', 'مَفْعُوْلٌ بِهِ مَنْصُوْبٌ', 'خَبَرٌ مَرْفُوْعٌ', 'فَاعِلٌ مُؤَخَّرٌ'],
        correctIndex: 0,
        explanation: 'Kata terletak setelah huruf jar فِي, maka kedudukannya adalah isim majrur bil kasrah.',
      },
    ],
  },
  {
    id: 'bab-4',
    number: 4,
    semester: 2,
    titleArabic: 'حِفْظُ البِيْئَةِ فِي الإِسْلَامِ',
    titleIndo: 'Pelestarian Lingkungan Hidup',
    subtitle: 'Hifzhul Bi\'ah fil Islaam',
    theme: 'Etika Ekologi Islam & Keberlanjutan Alam',
    summary: 'Memahami terminologi pelestarian hutan, air bersih, reboisasi madrasah, serta mendalami kaidah Inna wa Akhwatuha dan Isim Maushul.',
    estimatedTime: '45 Menit',
    badgeColor: 'teal',
    mufradat: [
      {
        id: 'm4_1',
        arabic: 'البِيْئَةُ الطَّبِيْعِيَّةُ',
        latin: "Al-Bii'atuth Thabii'iyyah",
        meaning: 'Lingkungan Alam',
        category: 'Ekologi',
        exampleSentenceArabic: 'يَجِبُ عَلَيْنَا حِمَايَةُ البِيْئَةِ مِنَ التَّلَوُّثِ.',
        exampleSentenceIndo: 'Wajib bagi kita menjaga lingkungan hidup dari pencemaran.',
      },
      {
        id: 'm4_2',
        arabic: 'التَّلَوُّثُ البِيْئِيُّ',
        latin: "At-Talawwutsul Bii'iyyu",
        meaning: 'Pencemaran / Polusi Lingkungan',
        category: 'Isu Lingkungan',
        exampleSentenceArabic: 'دُخَانُ المَصَانِعِ يُسَبِّبُ تَلَوُّثَ الهَوَاءِ.',
        exampleSentenceIndo: 'Asap pabrik-pabrik menyebabkan polusi udara.',
      },
      {
        id: 'm4_3',
        arabic: 'غَرْسُ الأَشْجَارِ / التَّشْجِيْرُ',
        latin: "Ghoursul Asyjaar / At-Tasyjiir",
        meaning: 'Penanaman Pohon / Penghijauan',
        category: 'Aksi Nyata',
        exampleSentenceArabic: 'قَامَ طُلَّابُ دَارِ الفَقِيْهِ بِغَرْسِ الأَشْجَارِ فِي فِنَاءِ المَعْهَدِ.',
        exampleSentenceIndo: 'Santri Darul Faqih menanam pepohonan di halaman pesantren.',
      },
    ],
    hiwar: {
      titleArabic: 'حَمْلَةُ النَّظَافَةِ وَالتَّشْجِيْرِ',
      titleIndo: 'Gerakan Kebersihan & Penghijauan Madrasah',
      setting: 'Santri bergotong royong di taman pondok pesantren',
      dialogue: [
        {
          speakerArabic: 'زَيْد',
          speakerIndo: 'Zaid',
          avatar: '🌱',
          textArabic: 'إِنَّ النَّظَافَةَ خُلُقٌ إِسْلَامِيٌّ رَفِيْعٌ.',
          textLatin: "Innan nazhaafata khuluqun Islaamiyyun rafii'.",
          textIndo: 'Sesungguhnya kebersihan adalah akhlak Islam yang mulia.',
        },
        {
          speakerArabic: 'عَمَّار',
          speakerIndo: 'Ammar',
          avatar: '🌳',
          textArabic: 'نَعَمْ، وَغَرْسُ هَذِهِ الشَّجَرَةِ صَدَقَةٌ جَارِيَةٌ لَنَا.',
          textLatin: "Na'am, wa gharsu haadzihis syajarati shadaqatun jaariyatun lanaa.",
          textIndo: 'Benar, dan menanam pohon ini menjadi sedekah jariyah bagi kita.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'رِعَايَةُ المَوَارِدِ المَائِيَّةِ',
      titleIndo: 'Menjaga Sumber Daya Air',
      paragraphs: [
        {
          arabic: 'المَاءُ نِعْمَةٌ عَظِيْمَةٌ مِنْ نِعَمِ اللهِ، جَعَلَ اللهُ مِنْهُ كُلَّ شَيْءٍ حَيٍّ. نَهَى النَّبِيُّ ﷺ عَنِ الإِسْرَافِ فِي المَاءِ وَلَوْ كَانَ المُسْلِمُ عَلَى نَهْرٍ جَارٍ.',
          indo: 'Air adalah karunia agung dari nikmat Allah, yang darinya Allah jadikan segala sesuatu hidup. Nabi ﷺ melarang berlebih-lebihan boros air meskipun seseorang berada di sungai yang mengalir.',
        },
      ],
      vocabularySpotlight: [
        { word: 'الإِسْرَافُ', meaning: 'Berlebih-lebihan / Boros' },
        { word: 'نَهْرٌ جَارٍ', meaning: 'Sungai yang mengalir deras' },
      ],
    },
    qawaid: {
      title: 'إِنَّ وَأَخَوَاتُهَا وَالاسْمُ المَوْصُوْلُ',
      subtitle: 'Kaidah Huruf Tasybih/Taukid Inna & Isim Maushul',
      summary: 'Inna wa Akhwatuha (إِنَّ، أَنَّ، كَأَنَّ، لَكِنَّ، لَيْتَ، لَعَلَّ) masuk ke Jumlah Ismiyyah: MENASHOBKAN mubtada (disebut Isim Inna) dan MERAFACAN khabar (disebut Khabar Inna).',
      formula: 'إِنَّ + اسْمُ إِنَّ (مَنْصُوْبٌ) + خَبَرُ إِنَّ (مَرْفُوْعٌ)',
      explanationPoints: [
        'Saudara-saudari Inna: إِنَّ/أَنَّ (penegasan sesungguhnya), كَأَنَّ (seolah-olah), لَكِنَّ (tetapi), لَيْتَ (andai saja), لَعَلَّ (semoga/mudah-mudahan).',
        'Isim Inna berharakat Fathah (Manshub), sedangkan Khabar Inna berharakat Dhammah (Marfu\').',
        'Isim Maushul kata hubung: الَّذِي (mudzakkar tunggal), الَّتِي (muannats tunggal), الَّذِيْنَ (jama\' mudzakkar).',
      ],
      examples: [
        {
          sentenceArabic: 'إِنَّ البِيْئَةَ نَظِيْفَةٌ.',
          analysis: 'البِيْئَةَ adalah Isim Inna Manshub bil-fathah. نَظِيْفَةٌ adalah Khabar Inna Marfu\' bid-dhammah.',
          meaning: 'Sesungguhnya lingkungan itu bersih.',
        },
      ],
    },
    quiz: [
      {
        id: 'q4_1',
        questionArabic: 'مَا ضَبْطُ حَرَكَةِ اسْمِ إِنَّ فِي: (إِنَّ اللهَ ... المُحْسِنِيْنَ)؟',
        questionIndo: 'Bagaimana harakat akhir isim إِنَّ pada kata (الله)?',
        options: ['المَرْفُوْعُ بِالضَّمَّةِ (اللهُ)', 'المَنْصُوْبُ بِالفَتْحَةِ (اللهَ)', 'المَجْرُوْرُ بِالكَسْرَةِ (اللهِ)', 'السُّكُوْنُ'],
        correctIndex: 1,
        explanation: 'Inna menashobkan isimnya, sehingga kata jalalah "اللهَ" berharakat fathah.',
      },
    ],
  },
  {
    id: 'bab-5',
    number: 5,
    semester: 2,
    titleArabic: 'تِكْنُولُوجِيَا الإِعْلَامِ وَالاتِّصَالِ',
    titleIndo: 'Teknologi Informasi & Komunikasi',
    subtitle: 'Tiknulujiya al-I\'lam wal-Ittishalat',
    theme: 'Digitalisasi Santri & Etika Media Sosial Islami',
    summary: 'Mempelajari kosakata kecerdasan buatan, internet, komputer, dan media dakwah, serta menguasai kaidah Kaana wa Akhwatuha.',
    estimatedTime: '45 Menit',
    badgeColor: 'indigo',
    mufradat: [
      {
        id: 'm5_1',
        arabic: 'الذَّكَاءُ الاصْطِنَاعِيُّ',
        latin: "Adz-Dzakaa'ul Ishthinaa'iyyu",
        meaning: 'Kecerdasan Buatan (Artificial Intelligence)',
        category: 'Teknologi',
        exampleSentenceArabic: 'يُسَاعِدُ الذَّكَاءُ الاصْطِنَاعِيُّ الطُّلَّابَ فِي تَعَلُّمِ اللُّغَاتِ.',
        exampleSentenceIndo: 'AI membantu para santri dalam mempelajari berbagai bahasa.',
      },
      {
        id: 'm5_2',
        arabic: 'شَبَكَةُ التَّوَاصُلِ الاجْتِمَاعِيِّ',
        latin: "Syabakatut Tawaashulil Ijtimaa'iyyi",
        meaning: 'Media Sosial',
        category: 'Digital',
        exampleSentenceArabic: 'نَسْتَخْدِمُ شَبَكَاتِ التَّوَاصُلِ لِنَشْرِ العِلْمِ النَّافِعِ.',
        exampleSentenceIndo: 'Kita memanfaatkan media sosial untuk menyebarkan ilmu yang bermanfaat.',
      },
      {
        id: 'm5_3',
        arabic: 'الحَاسُوْبُ / الهَاتِفُ الذَّكِيُّ',
        latin: "Al-Haasuubu / Al-Haatiphudz Dzakiyyu",
        meaning: 'Komputer / Ponsel Pintar',
        category: 'Perangkat',
        exampleSentenceArabic: 'يَقْرَأُ عَبْدُ اللهِ الكُتُبَ الإِلِكْتُرُوْنِيَّةَ فِي حَاسُوْبِهِ.',
        exampleSentenceIndo: 'Abdullah membaca kitab-kitab elektronik di komputernya.',
      },
    ],
    hiwar: {
      titleArabic: 'اسْتِخْدَامُ الإِنْتَرْنِت فِي التَّعَلُّمِ',
      titleIndo: 'Pemanfaatan Internet untuk Belajar Bahasa Arab',
      setting: 'Santri di lab komputer madrasah Darul Faqih',
      dialogue: [
        {
          speakerArabic: 'فَارُوْق',
          speakerIndo: 'Faruq',
          avatar: '💻',
          textArabic: 'كَانَ التَّعَلُّمُ فِي المَاضِي يَحْتَاجُ إِلَى جُهْدٍ كَبِيْرٍ لِلْبَحْثِ عَنِ المَرَاجِعِ.',
          textLatin: "Kaanat ta'allumu fil maadhii yahtaaju ilaa juhdin kabiirin lil-bahtsi 'anil maraaji'.",
          textIndo: 'Dahulu proses belajar memerlukan tenaga besar mencari kitab referensi.',
        },
        {
          speakerArabic: 'سَلْمَان',
          speakerIndo: 'Salman',
          avatar: '📱',
          textArabic: 'أَمَّا الآنَ فَقَدْ أَصْبَحَتِ المَعْلُوْمَاتُ مُتَاحَةً بِضَغْطَةِ زِرٍّ وَاحِدَةٍ.',
          textLatin: "Ammal aana faqad ashbahatil ma'luumaatu mutaahatan bidhaghtati zirrin waahidah.",
          textIndo: 'Adapun sekarang, informasi telah tersedia hanya dengan sekali sentuhan tombol.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'أَخْلَاقِيَّاتُ اسْتِخْدَامِ التِّكْنُولُوجِيَا',
      titleIndo: 'Etika Santri dalam Pemanfaatan Teknologi',
      paragraphs: [
        {
          arabic: 'التِّكْنُولُوجِيَا سِلَاحٌ ذُوْ حَدَّيْنِ، إِذَا اسْتُعْمِلَتْ فِي الخَيْرِ أَثْمَرَتْ عِلْمًا وَنَفْعًا، وَإِذَا اسْتُعْمِلَتْ فِي الشَّرِّ وَاللَّهْوِ ضَيَّعَتِ الأَوْقَاتِ. لِذَا كَانَ لِزَامًا عَلَى طَالِبِ العِلْمِ أَنْ يُرَاقِبَ اللهَ فِي كُلِّ نَقْرَةٍ.',
          indo: 'Teknologi bagaikan pedang bermata dua, jika dipakai untuk kebaikan akan membuahkan ilmu dan kemanfaatan, namun jika dipakai untuk keburukan dan kelalaian akan menyia-nyiakan waktu. Karena itu wajib bagi santri menuntut ilmu selalu merasa diawasi Allah di setiap kliknya.',
        },
      ],
      vocabularySpotlight: [
        { word: 'سِلَاحٌ ذُوْ حَدَّيْنِ', meaning: 'Pedang bermata dua' },
        { word: 'اللَّهْوُ', meaning: 'Kelalaian / Main-main sia-sia' },
      ],
    },
    qawaid: {
      title: 'كَانَ وَأَخَوَاتُهَا (الأَفْعَالُ النَّاسِخَةُ)',
      subtitle: 'Kaidah Fi\'il Nasikh Kaana dan Saudara-saudaranya',
      summary: 'Kaana wa Akhwatuha (كَانَ، أَصْبَحَ، أَمْسَى، ظَلَّ، بَاتَ، صَارَ، لَيْسَ) masuk ke Jumlah Ismiyyah: MERAFACAN isimnya (Isim Kaana) dan MENASHOBKAN khabarnya (Khabar Kaana). Berlawanan fungsi dengan Inna!',
      formula: 'كَانَ + اسْمُ كَانَ (مَرْفُوْعٌ) + خَبَرُ كَانَ (مَنْصُوْبٌ)',
      explanationPoints: [
        'Fungsi Kaana: Tarfa\'ul Isma wa Tanshibul Khabar (kebalikan dari Inna).',
        'Saudara Kaana: أَصْبَحَ (di waktu pagi/menjadi), صَارَ (berubah menjadi), لَيْسَ (bukan/tidak).',
        'Khabar Kaana bisa berupa isim mufrad, jumlah fi\'liyyah, atau syibhul jumlah.',
      ],
      examples: [
        {
          sentenceArabic: 'كَانَ الامْتِحَانُ سَهْلًا.',
          analysis: 'الامْتِحَانُ adalah Isim Kaana Marfu\' bid-dhammah. سَهْلًا adalah Khabar Kaana Manshub bil-fathah.',
          meaning: 'Ujian itu tadinya mudah.',
        },
      ],
    },
    quiz: [
      {
        id: 'q5_1',
        questionArabic: 'مَا عَمَلُ "كَانَ وَأَخَوَاتُهَا" فِي الجُمْلَةِ الاسْمِيَّةِ؟',
        questionIndo: 'Apa fungsi kaidah "Kaana wa akhwatuha" terhadap susunan mubtada khabar?',
        options: [
          'تَرْفَعُ الاسْمَ وَتَنْصِبُ الخَبَرَ',
          'تَنْصِبُ الاسْمَ وَتَرْفَعُ الخَبَرَ',
          'تَجُرُّ الاسْمَ وَالخَبَرَ',
          'تَجْزِمُ الفِعْلَ المُضَارِعَ',
        ],
        correctIndex: 0,
        explanation: 'Kaidah Kaana adalah merafa\'kan isim (marfu\') dan menashobkan khabar (manshub).',
      },
    ],
  },
  {
    id: 'bab-6',
    number: 6,
    semester: 2,
    titleArabic: 'الأَدْيَانُ فِي إِنْدُونِيْسِيَا وَالتَّسَامُحُ',
    titleIndo: 'Agama di Indonesia & Nilai Tasamuh (Toleransi)',
    subtitle: 'Al-Adyan fi Indunisiya wat-Tasamuh',
    theme: 'Moderasi Beragama & Kerukunan Umat',
    summary: 'Mempelajari nilai-nilai moderasi Islam (Wasathiyyah), Piagam Madinah, konsep ukhuwah, serta mengkaji uslub Ta\'ajjub dan Tamyiz.',
    estimatedTime: '45 Menit',
    badgeColor: 'rose',
    mufradat: [
      {
        id: 'm6_1',
        arabic: 'التَّسَامُحُ الدِّيْنِيُّ',
        latin: "At-Tasaamuhud Diiniyyu",
        meaning: 'Toleransi Beragama',
        category: 'Nilai Kebangsaan',
        exampleSentenceArabic: 'يَتَمَيَّزُ الشَّعْبُ الإِنْدُوْنِيْسِيُّ بِالتَّسَامُحِ وَالتَّعَايُشِ السِّلْمِيِّ.',
        exampleSentenceIndo: 'Bangsa Indonesia bercirikan toleransi dan hidup rukun berdampingan secara damai.',
      },
      {
        id: 'm6_2',
        arabic: 'الوَسَطِيَّةُ فِي الإِسْلَامِ',
        latin: "Al-Wasathiyyatu fil Islaam",
        meaning: 'Moderasi Beragama (Wasathiyyah)',
        category: 'Konsep',
        exampleSentenceArabic: 'نَحْنُ أُمَّةٌ وَسَطٌ لَا إِفْرَاطَ وَلَا تَفْرِيْطَ.',
        exampleSentenceIndo: 'Kita adalah umat yang moderat, tidak ekstrim kanan maupun kiri.',
      },
      {
        id: 'm6_3',
        arabic: 'الأُخُوَّةُ الوَطَنِيَّةُ وَالإِنْسَانِيَّةُ',
        latin: "Al-Ukhuwwatul Wathaniyyatu wal Insaaniyyah",
        meaning: 'Persaudaraan Kebangsaan dan Kemanusiaan',
        category: 'Persaudaraan',
        exampleSentenceArabic: 'نَبْنِي وَطَنَنَا بِرُوْحِ الأُخُوَّةِ الصَّادِقَةِ.',
        exampleSentenceIndo: 'Kita membangun tanah air kita dengan semangat persaudaraan yang tulus.',
      },
    ],
    hiwar: {
      titleArabic: 'حِوَارٌ حَوْلَ مِيْثَاقِ المَدِيْنَةِ',
      titleIndo: 'Diskusi tentang Piagam Madinah sebagai Teladan Kerukunan',
      setting: 'Santri berdiskusi dalam halaqah tafsir dan tarikh',
      dialogue: [
        {
          speakerArabic: 'أَحْمَد',
          speakerIndo: 'Ahmad',
          avatar: '📜',
          textArabic: 'مَا أَعْظَمَ وَثِيْقَةَ المَدِيْنَةِ الَّتِي أَرْسَاهَا الرَّسُوْلُ ﷺ!',
          textLatin: "Maa a'zhama watsiiqatal madiinati allatii arsaahar rasuulu ﷺ!",
          textIndo: 'Betapa agungnya dokumen Piagam Madinah yang diletakkan oleh Rasulullah ﷺ!',
        },
        {
          speakerArabic: 'مُعَاذ',
          speakerIndo: 'Mu\'adz',
          avatar: '🕊️',
          textArabic: 'نَعَمْ، لَقَدْ ضَمِنَتِ الحُرِّيَّةَ الدِّيْنِيَّةَ لِجَمِيْعِ سُكَّانِ المَدِيْنَةِ.',
          textLatin: "Na'am, laqad dhaminatil hurriyyatad diiniyyata lijamii'i sukkaanil madiinah.",
          textIndo: 'Ya, piagam itu sungguh menjamin kebebasan beragama bagi seluruh penduduk Madinah.',
        },
      ],
    },
    qiraah: {
      titleArabic: 'إِنْدُوْنِيْسِيَا بَلَدُ التَّنَوُّعِ وَالوِحْدَةِ',
      titleIndo: 'Indonesia: Negeri Keberagaman dalam Persatuan',
      paragraphs: [
        {
          arabic: 'إِنْدُوْنِيْسِيَا أَرْخَبِيْلٌ عَظِيْمٌ يَتَكَوَّنُ مِنْ آلَافِ الجُزُرِ، وَيَعِيْشُ فِيْهِ مِئَاتُ القَبَائِلِ بِأَدْيَانٍ وَثَقَافَاتٍ مُتَعَدِّدَةٍ تَحْتَ شِعَارِ «الوِحْدَةِ فِي التَّنَوُّعِ» (بِيْنِيْكَا تُوْنْغَّال إِيْكَا).',
          indo: 'Indonesia adalah kepulauan nusantara agung yang terdiri dari ribuan pulau, didiami ratusan suku bangsa dengan berbagai agama dan budaya di bawah semboyan Bhinneka Tunggal Ika.',
        },
      ],
      vocabularySpotlight: [
        { word: 'الأَرْخَبِيْلُ', meaning: 'Kepulauan nusantara' },
        { word: 'شِعَارٌ', meaning: 'Semboyan / Lambang' },
      ],
    },
    qawaid: {
      title: 'أُسْلُوْبُ التَّعَجُّبِ وَالتَّمْيِيْزُ',
      subtitle: 'Kaidah Ungkapan Ketakjuban (Ta\'ajjub) & Tamyiz',
      summary: 'Uslub Ta\'ajjub digunakan untuk mengekspresikan kekaguman menggunakan wazan مَا أَفْعَلَ! Isim setelah wazan ini wajib Manshub dengan fathah (Muta\'ajjab minh). Tamyiz adalah isim nakirah manshub untuk menjelaskan kesamaran kata sebelumnya.',
      formula: 'مَا + أَفْعَلَ + اسْمٌ مَنْصُوْبٌ بِالفَتْحَةِ !',
      explanationPoints: [
        'Wazan utama Ta\'ajjub qiyasi: مَا أَفْعَلَهُ! (contoh: مَا أَجْمَلَ الإِنْدُوْنِيْسِيَا! - Betapa indahnya Indonesia!).',
        'Kata yang dikagumi berharakat Fathah (Manshub sebagai Maf\'ul bih).',
        'Tamyiz menjawab pertanyaan "dalam segi apa?" dan berharakat fathah (contoh: حَسُنَ خُلُقًا - baik budi pekertinya).',
      ],
      examples: [
        {
          sentenceArabic: 'مَا أَعْظَمَ التَّسَامُحَ فِي الإِسْلَامِ!',
          analysis: 'مَا adalah ma at-ta\'ajjubiyyah, أَعْظَمَ adalah fi\'il madhi ta\'ajjub, dan التَّسَامُحَ adalah muta\'ajjab minh manshub bil-fathah.',
          meaning: 'Alangkah agungnya toleransi dalam Islam!',
        },
      ],
    },
    quiz: [
      {
        id: 'q6_1',
        questionArabic: 'مَا حَرَكَةُ كَلِمَةِ "الإِسْلَامَ" فِي أُسْلُوْبِ التَّعَجُّبِ: (مَا أَجْمَلَ ...)؟',
        questionIndo: 'Apa harakat kata yang terletak setelah pola ta\'ajjub (مَا أَجْمَلَ)?',
        options: ['الفَتْحَةُ (الإِسْلَامَ)', 'الضَّمَّةُ (الإِسْلَامُ)', 'الكَسْرَةُ (الإِسْلَامِ)', 'السُّكُوْنُ'],
        correctIndex: 0,
        explanation: 'Muta\'ajjab minh setelah pola "مَا أَفْعَلَ" kedudukannya maf\'ul bih dan wajib manshub dengan fathah.',
      },
    ],
  },
];
