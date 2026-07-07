import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

const D: Record<LangCode, Dict> = {
  en: {
    "nav.home": "Home", "nav.services": "Services", "nav.assistant": "AI Assistant",
    "nav.complaints": "Complaints", "nav.schemes": "Government Schemes", "nav.resources": "Resources",
    "hero.badge": "Powered by Bharat AI · Now with 25 languages",
    "hero.subtitle": "AI Powered Civic Companion",
    "hero.desc": "Helping every citizen access government services through AI — with multilingual support, complaint tracking, document guidance and personalized scheme recommendations.",
    "hero.try": "Try AI Assistant", "hero.explore": "Explore Services",
    "hero.trusted": "Trusted by 5M+ citizens",
    "stats.services": "Government Services", "stats.languages": "Languages Supported",
    "stats.citizens": "Citizens Served", "stats.support": "AI Support",
    "chat.title": "Bharat AI", "chat.online": "Online · answers in your language",
    "chat.placeholder": "Ask about any government service…",
    "chat.empty": "Ask me about passports, PAN, PM Kisan, complaints — in any Indian language.",
  },
  hi: {
    "nav.home": "होम", "nav.services": "सेवाएं", "nav.assistant": "एआई सहायक",
    "nav.complaints": "शिकायतें", "nav.schemes": "सरकारी योजनाएं", "nav.resources": "संसाधन",
    "hero.badge": "भारत एआई द्वारा संचालित · 25 भाषाओं में",
    "hero.subtitle": "एआई संचालित नागरिक साथी",
    "hero.desc": "हर नागरिक को एआई के माध्यम से सरकारी सेवाओं तक पहुंचने में मदद — बहुभाषी समर्थन, शिकायत ट्रैकिंग और व्यक्तिगत योजना सिफारिशों के साथ।",
    "hero.try": "एआई सहायक आज़माएं", "hero.explore": "सेवाएं देखें",
    "hero.trusted": "50 लाख+ नागरिकों का भरोसा",
    "stats.services": "सरकारी सेवाएं", "stats.languages": "भाषाएं समर्थित",
    "stats.citizens": "नागरिक सेवित", "stats.support": "एआई सहायता",
    "chat.title": "भारत एआई", "chat.online": "ऑनलाइन · आपकी भाषा में उत्तर",
    "chat.placeholder": "किसी भी सरकारी सेवा के बारे में पूछें…",
    "chat.empty": "मुझसे पासपोर्ट, पैन, पीएम किसान, शिकायतों के बारे में — किसी भी भारतीय भाषा में पूछें।",
  },
  ta: {
    "nav.home": "முகப்பு", "nav.services": "சேவைகள்", "nav.assistant": "AI உதவியாளர்",
    "nav.complaints": "புகார்கள்", "nav.schemes": "அரசு திட்டங்கள்", "nav.resources": "வளங்கள்",
    "hero.badge": "பாரத் AI ஆல் இயக்கப்படுகிறது · 25 மொழிகள்",
    "hero.subtitle": "AI இயங்கும் குடிமை துணை",
    "hero.desc": "ஒவ்வொரு குடிமகனுக்கும் அரசு சேவைகளை AI மூலம் அணுக உதவுகிறது — பன்மொழி ஆதரவு, புகார் கண்காணிப்பு மற்றும் தனிப்பயனாக்கப்பட்ட திட்ட பரிந்துரைகளுடன்.",
    "hero.try": "AI உதவியாளரை முயற்சிக்கவும்", "hero.explore": "சேவைகளை ஆராயுங்கள்",
    "hero.trusted": "50 லட்சம்+ குடிமக்களின் நம்பிக்கை",
    "stats.services": "அரசு சேவைகள்", "stats.languages": "ஆதரிக்கப்படும் மொழிகள்",
    "stats.citizens": "பணியாற்றிய குடிமக்கள்", "stats.support": "AI ஆதரவு",
    "chat.title": "பாரத் AI", "chat.online": "ஆன்லைனில் · உங்கள் மொழியில் பதில்கள்",
    "chat.placeholder": "எந்த அரசு சேவை பற்றியும் கேளுங்கள்…",
    "chat.empty": "பாஸ்போர்ட், பான், PM கிசான், புகார்கள் பற்றி எந்த இந்திய மொழியிலும் என்னிடம் கேளுங்கள்.",
  },
  bn: {
    "nav.home": "হোম", "nav.services": "সেবা", "nav.assistant": "এআই সহকারী",
    "nav.complaints": "অভিযোগ", "nav.schemes": "সরকারি প্রকল্প", "nav.resources": "সম্পদ",
    "hero.badge": "ভারত এআই দ্বারা চালিত · 25টি ভাষা",
    "hero.subtitle": "এআই চালিত নাগরিক সহচর",
    "hero.desc": "প্রতিটি নাগরিককে এআই-এর মাধ্যমে সরকারি পরিষেবা পেতে সাহায্য করা — বহুভাষিক সমর্থন, অভিযোগ ট্র্যাকিং এবং ব্যক্তিগত প্রকল্প সুপারিশ সহ।",
    "hero.try": "এআই সহকারী চেষ্টা করুন", "hero.explore": "সেবা অন্বেষণ",
    "hero.trusted": "৫০ লক্ষ+ নাগরিকের আস্থা",
    "stats.services": "সরকারি সেবা", "stats.languages": "সমর্থিত ভাষা",
    "stats.citizens": "নাগরিক পরিসেবিত", "stats.support": "এআই সহায়তা",
    "chat.title": "ভারত এআই", "chat.online": "অনলাইন · আপনার ভাষায় উত্তর",
    "chat.placeholder": "যেকোনো সরকারি পরিষেবা সম্পর্কে জিজ্ঞাসা করুন…",
    "chat.empty": "পাসপোর্ট, প্যান, পিএম কিসান, অভিযোগ সম্পর্কে যেকোনো ভারতীয় ভাষায় জিজ্ঞাসা করুন।",
  },
  te: { "nav.home": "హోమ్", "nav.services": "సేవలు", "nav.assistant": "AI సహాయకుడు", "nav.complaints": "ఫిర్యాదులు", "nav.schemes": "ప్రభుత్వ పథకాలు", "nav.resources": "వనరులు", "hero.badge": "భారత్ AI · 25 భాషలు", "hero.subtitle": "AI ఆధారిత పౌర సహచరుడు", "hero.desc": "ప్రతి పౌరుడు AI ద్వారా ప్రభుత్వ సేవలను పొందడంలో సహాయపడతాము.", "hero.try": "AI సహాయకుడిని ప్రయత్నించండి", "hero.explore": "సేవలను అన్వేషించండి", "hero.trusted": "50L+ పౌరుల నమ్మకం", "stats.services": "ప్రభుత్వ సేవలు", "stats.languages": "మద్దతు భాషలు", "stats.citizens": "పౌరులు", "stats.support": "AI మద్దతు", "chat.title": "భారత్ AI", "chat.online": "ఆన్‌లైన్ · మీ భాషలో", "chat.placeholder": "ఏదైనా ప్రభుత్వ సేవ గురించి అడగండి…", "chat.empty": "ఏదైనా భారతీయ భాషలో అడగండి." },
  mr: { "nav.home": "मुख्यपृष्ठ", "nav.services": "सेवा", "nav.assistant": "AI सहाय्यक", "nav.complaints": "तक्रारी", "nav.schemes": "सरकारी योजना", "nav.resources": "संसाधने", "hero.badge": "भारत AI · 25 भाषा", "hero.subtitle": "AI संचालित नागरी साथी", "hero.desc": "प्रत्येक नागरिकाला AI द्वारे सरकारी सेवा मिळवण्यास मदत.", "hero.try": "AI सहाय्यक वापरा", "hero.explore": "सेवा पहा", "hero.trusted": "50L+ नागरिकांचा विश्वास", "stats.services": "सरकारी सेवा", "stats.languages": "भाषा", "stats.citizens": "नागरिक", "stats.support": "AI मदत", "chat.title": "भारत AI", "chat.online": "ऑनलाइन · तुमच्या भाषेत", "chat.placeholder": "कोणत्याही सरकारी सेवेबद्दल विचारा…", "chat.empty": "कोणत्याही भारतीय भाषेत विचारा." },
  gu: { "nav.home": "હોમ", "nav.services": "સેવાઓ", "nav.assistant": "AI સહાયક", "nav.complaints": "ફરિયાદો", "nav.schemes": "સરકારી યોજનાઓ", "nav.resources": "સંસાધનો", "hero.badge": "ભારત AI · 25 ભાષાઓ", "hero.subtitle": "AI સંચાલિત નાગરિક સાથી", "hero.desc": "દરેક નાગરિકને AI દ્વારા સરકારી સેવાઓ મેળવવામાં મદદ.", "hero.try": "AI સહાયક અજમાવો", "hero.explore": "સેવાઓ જુઓ", "hero.trusted": "50L+ નાગરિકોનો વિશ્વાસ", "stats.services": "સરકારી સેવાઓ", "stats.languages": "ભાષાઓ", "stats.citizens": "નાગરિકો", "stats.support": "AI સહાય", "chat.title": "ભારત AI", "chat.online": "ઓનલાઇન", "chat.placeholder": "કોઈપણ સરકારી સેવા વિશે પૂછો…", "chat.empty": "કોઈપણ ભારતીય ભાષામાં પૂછો." },
  kn: { "nav.home": "ಮುಖಪುಟ", "nav.services": "ಸೇವೆಗಳು", "nav.assistant": "AI ಸಹಾಯಕ", "nav.complaints": "ದೂರುಗಳು", "nav.schemes": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", "nav.resources": "ಸಂಪನ್ಮೂಲಗಳು", "hero.badge": "ಭಾರತ AI · 25 ಭಾಷೆಗಳು", "hero.subtitle": "AI ಚಾಲಿತ ನಾಗರಿಕ ಸಂಗಾತಿ", "hero.desc": "ಪ್ರತಿ ನಾಗರಿಕರಿಗೆ AI ಮೂಲಕ ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಸಹಾಯ.", "hero.try": "AI ಸಹಾಯಕ ಪ್ರಯತ್ನಿಸಿ", "hero.explore": "ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", "hero.trusted": "50L+ ನಾಗರಿಕರ ವಿಶ್ವಾಸ", "stats.services": "ಸರ್ಕಾರಿ ಸೇವೆಗಳು", "stats.languages": "ಭಾಷೆಗಳು", "stats.citizens": "ನಾಗರಿಕರು", "stats.support": "AI ಬೆಂಬಲ", "chat.title": "ಭಾರತ AI", "chat.online": "ಆನ್‌ಲೈನ್", "chat.placeholder": "ಯಾವುದೇ ಸರ್ಕಾರಿ ಸೇವೆಯ ಬಗ್ಗೆ ಕೇಳಿ…", "chat.empty": "ಯಾವುದೇ ಭಾರತೀಯ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ." },
  ml: { "nav.home": "ഹോം", "nav.services": "സേവനങ്ങൾ", "nav.assistant": "AI സഹായി", "nav.complaints": "പരാതികൾ", "nav.schemes": "സർക്കാർ പദ്ധതികൾ", "nav.resources": "വിഭവങ്ങൾ", "hero.badge": "ഭാരത് AI · 25 ഭാഷകൾ", "hero.subtitle": "AI പ്രവർത്തിത പൗര സഹചാരി", "hero.desc": "എല്ലാ പൗരനും AI വഴി സർക്കാർ സേവനങ്ങൾ ലഭ്യമാക്കാൻ സഹായിക്കുന്നു.", "hero.try": "AI സഹായി പരീക്ഷിക്കുക", "hero.explore": "സേവനങ്ങൾ കാണുക", "hero.trusted": "50L+ പൗരന്മാരുടെ വിശ്വാസം", "stats.services": "സർക്കാർ സേവനങ്ങൾ", "stats.languages": "ഭാഷകൾ", "stats.citizens": "പൗരന്മാർ", "stats.support": "AI പിന്തുണ", "chat.title": "ഭാരത് AI", "chat.online": "ഓൺലൈൻ", "chat.placeholder": "ഏതെങ്കിലും സർക്കാർ സേവനത്തെക്കുറിച്ച് ചോദിക്കുക…", "chat.empty": "ഏത് ഇന്ത്യൻ ഭാഷയിലും ചോദിക്കുക." },
  pa: { "nav.home": "ਹੋਮ", "nav.services": "ਸੇਵਾਵਾਂ", "nav.assistant": "AI ਸਹਾਇਕ", "nav.complaints": "ਸ਼ਿਕਾਇਤਾਂ", "nav.schemes": "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", "nav.resources": "ਸਰੋਤ", "hero.badge": "ਭਾਰਤ AI · 25 ਭਾਸ਼ਾਵਾਂ", "hero.subtitle": "AI ਸੰਚਾਲਿਤ ਨਾਗਰਿਕ ਸਾਥੀ", "hero.desc": "ਹਰ ਨਾਗਰਿਕ ਦੀ AI ਰਾਹੀਂ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਤੱਕ ਪਹੁੰਚ ਵਿੱਚ ਮਦਦ।", "hero.try": "AI ਸਹਾਇਕ ਅਜ਼ਮਾਓ", "hero.explore": "ਸੇਵਾਵਾਂ ਵੇਖੋ", "hero.trusted": "50L+ ਨਾਗਰਿਕਾਂ ਦਾ ਭਰੋਸਾ", "stats.services": "ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ", "stats.languages": "ਭਾਸ਼ਾਵਾਂ", "stats.citizens": "ਨਾਗਰਿਕ", "stats.support": "AI ਸਹਾਇਤਾ", "chat.title": "ਭਾਰਤ AI", "chat.online": "ਔਨਲਾਈਨ", "chat.placeholder": "ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਸੇਵਾ ਬਾਰੇ ਪੁੱਛੋ…", "chat.empty": "ਕਿਸੇ ਵੀ ਭਾਰਤੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ." },
};

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("smart-bharat-lang") as LangCode | null) : null;
    if (saved && D[saved]) setLangState(saved);
  }, []);
  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("smart-bharat-lang", l);
  };
  const t = (k: string) => D[lang][k] ?? D.en[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}
