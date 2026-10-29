import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Volume2,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Scale,
  SpellCheck,
} from 'lucide-react';
import { speakArabic } from '../utils/speech';

interface AITutorViewProps {
  initialTopic?: string;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ initialTopic }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'irab' | 'grammar'>('chat');

  // CHAT STATE
  const [messages, setMessages] = useState<
    {
      role: 'user' | 'assistant';
      content?: string;
      replyData?: {
        arabic: string;
        latin: string;
        indonesian: string;
        notes?: string;
      };
    }[]
  >([
    {
      role: 'assistant',
      replyData: {
        arabic: 'أَهْلًا وَسَهْلًا بِكَ يَا بَطَلَ دَارِ الفَقِيْهِ! أَنَا "أُسْتَاذ بَيَان"، مُعَلِّمُكَ الذَّكِيُّ لِلُّغَةِ العَرَبِيَّةِ. كَيْفَ أُسَاعِدُكَ اليَوْمَ؟',
        latin: "Ahlan wa sahlan bika ya bathala Daril Faqih! Anaa Ustaadz Bayan, mu'allimukadz dzakiyyu lil-lughatil 'arabiyyah. Kaifa usaa'idukal yaum?",
        indonesian: 'Selamat datang santri kebanggaan Darul Faqih! Saya Ustadz Bayan, asisten AI pembelajaran Bahasa Arab Anda. Ada materi atau percakapan yang ingin kita pelajari hari ini?',
        notes: 'Silakan ketik pertanyaan seputar silabus kelas 11 MA, latihan percakapan fushah, atau minta contoh kalimat nahwu.',
      },
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // IRAB STATE
  const [irabInput, setIrabInput] = useState('يَشْتَرِي الطَّالِبُ الكِتَابَ فِي السُّوْقِ المَرْكَزِيِّ');
  const [irabLoading, setIrabLoading] = useState(false);
  const [irabResult, setIrabResult] = useState<any>(null);

  // GRAMMAR CHECK STATE
  const [grammarSentence, setGrammarSentence] = useState('اشْتَرَى الطَّالِبُ مِائَةُ كِتَابًا');
  const [grammarMeaning, setGrammarMeaning] = useState('Santri membeli 100 buku');
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [grammarResult, setGrammarResult] = useState<any>(null);

  // Handle Send Chat
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isSendingChat) return;

    const newMsgs = [...messages, { role: 'user' as const, content: textToSend }];
    setMessages(newMsgs);
    setInputMessage('');
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs.map((m) => ({
            role: m.role,
            content: m.content || m.replyData?.arabic || '',
          })),
          userMessage: textToSend,
          topic: initialTopic || 'Bahasa Arab Kelas 11 MA Darul Faqih',
        }),
      });

      if (!res.ok) throw new Error('Gagal menghubungi server AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', replyData: data.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          replyData: {
            arabic: 'عَفْوًا، حَدَثَ خَطَأٌ فِي الاتِّصَالِ. يُرْجَى إِعَادَةُ المُحَاوَلَةِ.',
            latin: "Afwan, hadatsa khatha'un fil ittishaal. Yurjaa i'aadatil muhaawalah.",
            indonesian: 'Afwan, koneksi ke asisten AI terganggu. Silakan pastikan server backend berjalan.',
            notes: err.message,
          },
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Handle Run I'rab
  const handleRunIrab = async () => {
    if (!irabInput.trim() || irabLoading) return;
    setIrabLoading(true);
    setIrabResult(null);

    try {
      const res = await fetch('/api/ai/irab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: irabInput.trim() }),
      });
      if (!res.ok) throw new Error('Gagal menganalisis kalimat');
      const data = await res.json();
      setIrabResult(data.result);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIrabLoading(false);
    }
  };

  // Handle Run Grammar Check
  const handleRunGrammarCheck = async () => {
    if (!grammarSentence.trim() || grammarLoading) return;
    setGrammarLoading(true);
    setGrammarResult(null);

    try {
      const res = await fetch('/api/ai/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: grammarSentence.trim(),
          intendedMeaning: grammarMeaning.trim(),
        }),
      });
      if (!res.ok) throw new Error('Gagal mengoreksi kalimat');
      const data = await res.json();
      setGrammarResult(data.correction);
    } catch (err: any) {
      console.error(err);
    } finally {
      setGrammarLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>AI Tutor Ustadz Bayan • MA Darul Faqih</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مُسَاعِدُ اللُّغَةِ العَرَبِيَّةِ الذَّكِيُّ
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Asisten cerdas pendamping belajar santri. Tanyakan materi, bedah kedudukan I&apos;rab nahwu, koreksi tulisan insya&apos;, dan latih percakapan bahasa Arab fushah secara real-time.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Tutor Percakapan (Muhadatsah)</span>
        </button>

        <button
          onClick={() => setActiveTab('irab')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'irab'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Analisis I&apos;rab &amp; Nahwu</span>
        </button>

        <button
          onClick={() => setActiveTab('grammar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'grammar'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <SpellCheck className="w-4 h-4" />
          <span>Tashih Insya&apos; (Koreksi Kalimat)</span>
        </button>
      </div>

      {/* TAB 1: CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Quick Prompts */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="font-bold text-slate-400 shrink-0 uppercase tracking-wider pl-1">Saran Topik:</span>
            {[
              'Bagaimana aturan bilangan 100 dan 1000 dalam bahasa Arab?',
              'Jelaskan perbedaan Fa\'il dan Na\'ibul Fa\'il beserta contohnya',
              'Bagaimana contoh kalimat Inna wa Akhwatuha di bab pelestarian lingkungan?',
              'Mari latihan percakapan tentang belanja (التسوق)',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 text-slate-600 transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Content Bubble */}
                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="font-medium text-sm leading-relaxed">{msg.content}</p>
                  ) : msg.replyData ? (
                    <div className="space-y-3">
                      {/* Arabic Main Answer */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-2">
                        <button
                          onClick={() => speakArabic(msg.replyData!.arabic)}
                          className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition cursor-pointer"
                          title="Dengarkan pengucapan Arab"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <p className="font-arabic text-xl sm:text-2xl font-bold text-emerald-950 text-right leading-relaxed flex-1">
                          {msg.replyData.arabic}
                        </p>
                      </div>

                      {msg.replyData.latin && (
                        <p className="text-[11px] text-slate-500 italic">{msg.replyData.latin}</p>
                      )}

                      <p className="text-xs text-slate-800 font-semibold">{msg.replyData.indonesian}</p>

                      {msg.replyData.notes && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
                          <strong className="text-emerald-950">Catatan Ustadz:</strong> {msg.replyData.notes}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {isSendingChat && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></div>
                  <span className="ml-1">Ustadz Bayan sedang merumuskan jawaban...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ketik pertanyaan atau ajak bicara dalam bahasa Arab/Indonesia..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isSendingChat || !inputMessage.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: IRAB */}
      {activeTab === 'irab' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Analisis Sintaksis &amp; Morfologi Arab
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Bedah I&apos;rab Kalimat Arab</h3>
            <p className="text-xs text-slate-500">
              Masukkan kalimat bahasa Arab (berharakat atau gundul) untuk diurai kedudukan nahwu, status i&apos;rab, dan tanda harakatnya.
            </p>
          </div>

          {/* Input Box */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                rows={2}
                value={irabInput}
                onChange={(e) => setIrabInput(e.target.value)}
                placeholder="Contoh: يَشْتَرِي الطَّالِبُ الكِتَابَ فِي المَكْتَبَةِ"
                className="w-full p-4 rounded-2xl border border-slate-200 font-arabic text-xl text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  'اشْتَرَيْتُ مِائَةَ كِتَابٍ',
                  'فُحِصَ المَرِيْضُ فِي المُسْتَشْفَى',
                  'إِنَّ البِيْئَةَ نَظِيْفَةٌ',
                  'كَانَ الدَّرْسُ سَهْلًا',
                ].map((eg, i) => (
                  <button
                    key={i}
                    onClick={() => setIrabInput(eg)}
                    className="text-[11px] font-arabic px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition cursor-pointer"
                  >
                    {eg}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRunIrab}
                disabled={irabLoading || !irabInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{irabLoading ? 'Menganalisis...' : 'Bedah I\'rab Sekarang'}</span>
              </button>
            </div>
          </div>

          {/* I'rab Result Table */}
          {irabResult && (
            <div className="mt-6 space-y-6 pt-6 border-t border-slate-100 animate-in fade-in duration-200">
              {/* Vocalized sentence card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Kalimat Sempurna:</span>
                  <p className="font-arabic text-3xl font-bold text-emerald-950 mt-1 leading-normal">
                    {irabResult.vocalized}
                  </p>
                  <p className="text-xs text-emerald-900 font-semibold mt-1">{irabResult.translation}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold px-3 py-1 bg-white border border-emerald-300 rounded-full text-emerald-800">
                    {irabResult.sentenceType}
                  </span>
                  <button
                    onClick={() => speakArabic(irabResult.vocalized)}
                    className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table of words breakdown */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Kata (الكلمة)</th>
                      <th className="p-3">Kedudukan (الموقع)</th>
                      <th className="p-3">Hukum I&apos;rab (الحكم)</th>
                      <th className="p-3">Tanda I&apos;rab (العلامة)</th>
                      <th className="p-3">Penjelasan Kaidah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {irabResult.breakdown?.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-arabic text-xl font-bold text-emerald-900">{row.word}</td>
                        <td className="p-3 font-semibold text-slate-800">{row.position}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-[11px]">
                            {row.irab}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">{row.sign}</td>
                        <td className="p-3 text-slate-600 leading-relaxed">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Rule Box */}
              {irabResult.summaryRule && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <strong className="text-emerald-800 block">Kaidah Nahwu Utama:</strong>
                  <p>{irabResult.summaryRule}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GRAMMAR CHECK */}
      {activeTab === 'grammar' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Tashih Kalimat &amp; Insya&apos; Santri
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Koreksi Tata Bahasa Arab</h3>
            <p className="text-xs text-slate-500">
              Tulis kalimat karangan bahasa Arab santri dan dapatkan perbaikan harakat, tata bahasa nahwu/sharaf, serta rekomendasi uslub yang lebih fasih.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kalimat Bahasa Arab Santri:
              </label>
              <textarea
                rows={2}
                value={grammarSentence}
                onChange={(e) => setGrammarSentence(e.target.value)}
                placeholder="Tulis kalimat di sini..."
                className="w-full p-4 rounded-2xl border border-slate-200 font-arabic text-xl text-right focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Maksud Kalimat (Bahasa Indonesia):
              </label>
              <input
                type="text"
                value={grammarMeaning}
                onChange={(e) => setGrammarMeaning(e.target.value)}
                placeholder="Arti kalimat yang dimaksudkan santri..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleRunGrammarCheck}
                disabled={grammarLoading || !grammarSentence.trim()}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <SpellCheck className="w-4 h-4" />
                <span>{grammarLoading ? 'Memeriksa Kalimat...' : 'Periksa & Tashih'}</span>
              </button>
            </div>
          </div>

          {/* Grammar Result Box */}
          {grammarResult && (
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
              <div
                className={`p-5 rounded-2xl border ${
                  grammarResult.isCorrect
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                } space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      grammarResult.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {grammarResult.isCorrect ? 'Mumtaz! Kalimat Sudah Tepat' : 'Ada Koreksi Tata Bahasa'}
                  </span>
                  <button
                    onClick={() => speakArabic(grammarResult.corrected)}
                    className="p-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Kalimat Setelah Ditashih:</span>
                  <p className="font-arabic text-3xl font-bold text-slate-900 leading-normal text-right">
                    {grammarResult.corrected}
                  </p>
                </div>
              </div>

              {/* Correction Points */}
              {grammarResult.correctionsList?.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Poin Penjelasan Koreksi:
                  </h5>
                  {grammarResult.correctionsList.map((c: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Alternative Uslub */}
              {grammarResult.improvedAlternative && (
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-teal-800">Uslub Alternatif Yang Indah:</span>
                  <p className="font-arabic text-xl font-bold text-teal-950 text-right">
                    {grammarResult.improvedAlternative}
                  </p>
                </div>
              )}

              {/* Advice */}
              {grammarResult.advice && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 italic">
                  &quot;{grammarResult.advice}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
