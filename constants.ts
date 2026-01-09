
import { Garment, Translation, Landmark, GalleryItem, Pose } from './types';

export const APP_NAME = "DZtryFitting";

export const DEFAULT_LANDMARKS: Landmark[] = [
  { id: 'neck', x: 50, y: 22, label: 'Cou / Neck' },
  { id: 'l_shoulder', x: 35, y: 28, label: 'Épaule G. / L Shoulder' },
  { id: 'r_shoulder', x: 65, y: 28, label: 'Épaule D. / R Shoulder' },
  { id: 'waist', x: 50, y: 48, label: 'Taille / Waist' },
  { id: 'l_hip', x: 38, y: 58, label: 'Hanche G. / L Hip' },
  { id: 'r_hip', x: 62, y: 58, label: 'Hanche D. / R Hip' },
  { id: 'l_ankle', x: 42, y: 92, label: 'Cheville G. / L Ankle' },
  { id: 'r_ankle', x: 58, y: 92, label: 'Cheville D. / R Ankle' },
];

export const POSES: Pose[] = [
  {
    id: 'front',
    label: 'Front Facing',
    prompt: 'standing facing forward looking at camera',
    icon: 'fa-user'
  },
  {
    id: 'side_right',
    label: 'Side (Right)',
    prompt: 'standing in profile view turning to the right',
    icon: 'fa-user-tag'
  },
  {
    id: 'walk_front',
    label: 'Walking Forward',
    prompt: 'walking towards the camera with dynamic movement',
    icon: 'fa-person-walking'
  },
  {
    id: 'walk_side',
    label: 'Walking Side',
    prompt: 'walking towards the right side',
    icon: 'fa-person-walking-arrow-right'
  },
  {
    id: 'sitting_queen',
    label: 'Queen Sitting',
    prompt: 'sitting elegantly on a luxurious velvet sofa, upright regal posture like a queen, hands resting gently on lap',
    icon: 'fa-couch'
  }
];

export const GARMENTS: Garment[] = [
  // --- KARAKOU (Algiers) ---
  {
    id: 'k1',
    name: 'Royal Velvet Karakou',
    category: 'Karakou',
    region: 'Maison My Heritage',
    image: 'images/garments/Royal Velvet Karakou.png',
    price: '180,000 DZD',
    description: 'A masterpiece of Algérois embroidery using pure gold thread (fetla) on royal blue velvet.',
    material: 'Velvet & Gold Thread',
    colors: ['#1e3a8a', '#000000', '#881337'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'k2',
    name: 'Midnight Fetla Karakou',
    category: 'Karakou',
    region: 'Maison My Heritage',
    image: 'images/garments/Midnight Fetla Karakou.png',
    price: '195,000 DZD',
    description: 'Classic black velvet Karakou with heavy gold fetla patterns, symbolizing Algiers elegance.',
    material: 'Black Velvet & Gold Fetla',
    colors: ['#000000', '#1a1a1a'],
    sizes: ['36', '38', '40']
  },
  {
    id: 'k3',
    name: 'Emerald Majestic Karakou',
    category: 'Karakou',
    region: 'Maison My Heritage',
    image: 'images/garments/Emerald Majestic Karakou.png',
    price: '210,000 DZD',
    description: 'Modern emerald green velvet Karakou with intricate pearl and gold embroidery.',
    material: 'Emerald Velvet & Pearls',
    colors: ['#065f46', '#064e3b'],
    sizes: ['38', '40', '42', '44']
  },

  // --- KABYLE (Kabylia) ---
  {
    id: 'kb1',
    name: 'Thagwendourth Classic',
    category: 'Kabyle Dress',
    region: 'Kabylia Arts',
    image: 'images/garments/Thagwendourth Classic.png',
    price: '45,000 DZD',
    description: 'White cotton base with vibrant hand-stitched silk zigzags representing the Djurdjura peaks.',
    material: 'Cotton & Silk Ribbons',
    colors: ['#ffffff', '#e11d48', '#d4af37'],
    sizes: ['36', '38', '40', '42']
  },
  {
    id: 'kb2',
    name: 'Ceremonial Silk Kabyle',
    category: 'Kabyle Dress',
    region: 'Kabylia Arts',
    image: 'images/garments/Ceremonial Silk Kabyle.png',
    price: '65,000 DZD',
    description: 'Deep red silk dress with traditional Tazzelt embroidery and silver thread accents.',
    material: 'Premium Silk',
    colors: ['#be123c', '#9f1239'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'kb3',
    name: 'Ouadhia Heritage Gown',
    category: 'Kabyle Dress',
    region: 'Kabylia Arts',
    image: 'images/garments/Ouadhia Heritage Gown.png',
    price: '85,000 DZD',
    description: 'Exquisite heavy dress from the Ouadhia region, famous for its dense and colorful silk motifs.',
    material: 'Heavy Cotton & Multi-color Silk',
    colors: ['#fbbf24', '#f59e0b', '#dc2626'],
    sizes: ['40', '42', '44']
  },

  // --- NAILI (Ouled Naïl) ---
  {
    id: 'n1',
    name: 'Authentic Naili Veil',
    category: 'Naili',
    region: 'Maison du Caftan',
    image: 'images/garments/Authentic Naili Veil.png',
    price: '110,000 DZD',
    description: 'Traditional white robe with lace and a long veil, symbols of the Saharan Atlas nobility.',
    material: 'Fine Lace & Voile',
    colors: ['#ffffff', '#f9fafb'],
    sizes: ['Free Size']
  },
  {
    id: 'n2',
    name: 'Silk Naili Ensemble',
    category: 'Naili',
    region: 'Maison du Caftan',
    image: 'images/garments/Silk Naili Ensemble.png',
    price: '135,000 DZD',
    description: 'Luxurious silk version of the Naili dress in soft pastel tones with pearl encrustations.',
    material: 'Satin Silk',
    colors: ['#fdf2f8', '#fce7f3', '#fff1f2'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'n3',
    name: 'Royal White Naili',
    category: 'Naili',
    region: 'Maison du Caftan',
    image: 'images/garments/Royal White Naili.png',
    price: '160,000 DZD',
    description: 'High-end ceremonial Naili dress with hand-stitched lace and gold filigree details.',
    material: 'Handmade Lace & Silk',
    colors: ['#ffffff', '#f3f4f6'],
    sizes: ['38', '40', '42', '44']
  },

  // --- MELHFA CHAOUI (Aurès) ---
  {
    id: 'c1',
    name: 'Aurès Tribal Melhfa',
    category: 'Melhfa Chaoui',
    region: 'Golden Needle',
    image: 'images/garments/Aures Tribal Melhfa.png',
    price: '55,000 DZD',
    description: 'Black fabric with traditional red and yellow embroidery, held by silver fibulas (Khlel).',
    material: 'Light Cotton & Tribal Embroidery',
    colors: ['#000000', '#dc2626'],
    sizes: ['Free Size']
  },
  {
    id: 'c2',
    name: 'Indigo Tribal Melhfa',
    category: 'Melhfa Chaoui',
    region: 'Golden Needle',
    image: 'images/garments/Indigo Tribal Melhfa.png',
    price: '60,000 DZD',
    description: 'Unique indigo blue Melhfa featuring ancient Berber symbols and silver jewelry patterns.',
    material: 'Dyed Cotton',
    colors: ['#1e3a8a', '#1e40af'],
    sizes: ['Free Size']
  },
  {
    id: 'c3',
    name: 'Wedding Velvet Melhfa',
    category: 'Melhfa Chaoui',
    region: 'Golden Needle',
    image: 'images/garments/Wedding Velvet Melhfa.png',
    price: '95,000 DZD',
    description: 'Velvet version of the Chaoui Melhfa for weddings, heavily embroidered with silver thread.',
    material: 'Velvet & Silver Thread',
    colors: ['#4c1d95', '#1e1b4b'],
    sizes: ['38', '40', '42']
  },

  // --- CONSTANTINOIS / FERGANI (Constantine) ---
  {
    id: 'f1',
    name: 'Grand Fergani Burgundy',
    category: 'Fergani',
    region: 'Maison My Heritage',
    image: 'images/garments/Grand Fergani Burgundy.png',
    price: '220,000 DZD',
    description: 'The iconic deep burgundy velvet Fergani, heavily embroidered with the majestic Majboud technique.',
    material: 'Velvet & Majboud',
    colors: ['#881337', '#7f1d1d'],
    sizes: ['40', '42', '44']
  },
  {
    id: 'f2',
    name: 'Sapphire Majboud Fergani',
    category: 'Fergani',
    region: 'Maison My Heritage',
    image: 'images/garments/Sapphire Majboud Fergani.png',
    price: '240,000 DZD',
    description: 'Royal sapphire blue velvet adorned with gold and silver Majboud floral motifs.',
    material: 'Royal Velvet & Gold Thread',
    colors: ['#1e3a8a', '#1e1b4b'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'f3',
    name: 'Modern Floral Fergani',
    category: 'Fergani',
    region: 'Maison My Heritage',
    image: 'images/garments/Modern Floral Fergani.png',
    price: '190,000 DZD',
    description: 'A lighter, modern interpretation of the Fergani with smaller floral patterns for cocktails.',
    material: 'Satin Velvet',
    colors: ['#10b981', '#065f46'],
    sizes: ['36', '38', '40']
  },


  // --- DZIRI (Algiers Modern) ---
  {
    id: 'd1',
    name: 'Algiers Badroune Dziri',
    category: 'Dziri',
    region: 'Maison du Caftan',
    image: 'images/garments/Algiers Badroune Dziri.png',
    price: '120,000 DZD',
    description: 'A traditional and refined Algiers dress, perfect for ceremonies.',
    material: 'Satin & Gold Embroidery',
    colors: ['#ffffff', '#fdf5e6'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'd2',
    name: 'Silk Dziri Kaftan',
    category: 'Dziri',
    region: 'Maison du Caftan',
    image: 'images/garments/Silk Dziri Kaftan.png',
    price: '145,000 DZD',
    description: 'Light and fluid silk kaftan with modern Algiers floral embroidery.',
    material: 'Fluid Silk',
    colors: ['#f472b6', '#db2777'],
    sizes: ['38', '40', '42']
  },
  {
    id: 'd3',
    name: 'Modern Algiers Ensemble',
    category: 'Dziri',
    region: 'Maison du Caftan',
    image: 'images/garments/Modern Algiers Ensemble.png',
    price: '110,000 DZD',
    description: 'Contemporary two-piece set combining tradition and urban chic for the modern Algiers woman.',
    material: 'Crêpe & Gold Cord',
    colors: ['#3b82f6', '#1d4ed8'],
    sizes: ['36', '38', '40', '42']
  },

  // --- ENSEMBLE MODERNE (Modern Sets) ---
  {
    id: 'em1',
    name: 'Modern Set 1',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 1.png',
    price: '85,000 DZD',
    description: 'A modern two-piece chic outfit with elegant pants and blazer featuring traditional subtle embroidery.',
    material: 'Premium Crepe & Silk Thread',
    sizes: ['36', '38', '40', '42']
  },
  {
    id: 'em2',
    name: 'Modern Set 2',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 2.png',
    price: '78,000 DZD',
    description: 'Stylish skirt and top set with a modern silhouette and Berber-inspired geometric patterns.',
    material: 'Linen & Cotton Blend',
    sizes: ['38', '40', '42']
  },
  {
    id: 'em3',
    name: 'Modern Set 3',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 3.png',
    price: '92,000 DZD',
    description: 'Sophisticated jumpsuit with Algerian golden line details, minimalist and elegant for urban wear.',
    material: 'Satin Silk',
    sizes: ['36', '38', '40']
  },
  {
    id: 'em4',
    name: 'Modern Set 4',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 4.png',
    price: '65,000 DZD',
    description: 'Trendy two-piece set with a modern cut, inspired by Algerian heritage in soft pastel colors.',
    material: 'Soft Cotton',
    sizes: ['34', '36', '38', '40']
  },
  {
    id: 'em5',
    name: 'Modern Set 5',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 5.png',
    price: '110,000 DZD',
    description: "Elegant women's power suit with delicate hand-stitched details on sleeve and collar.",
    material: 'Wool & Silk Lining',
    sizes: ['38', '40', '42', '44']
  },
  {
    id: 'em6',
    name: 'Modern Set 6',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 6.png',
    price: '95,000 DZD',
    description: 'A contemporary take on the traditional Badroune, designed for the modern lifestyle.',
    material: 'Silk Satin',
    sizes: ['36', '38', '40']
  },
  {
    id: 'em7',
    name: 'Modern Set 7',
    category: 'Ensemble Moderne',
    region: "L'Algérienne Moderne",
    image: 'images/garments/Modern Set 7.png',
    price: '88,000 DZD',
    description: 'Modern ensemble combining traditional floral motifs with a contemporary urban cut.',
    material: 'Crêpe de Chine',
    sizes: ['36', '38', '40', '42']
  }
];

export const PARTNERS = [
  { name: 'Maison du Caftan', logo: 'images/partners/maison_caftan.png' },
  { name: 'Kabylia Arts', logo: 'images/partners/kabylia_arts.png' },
  { name: 'Golden Needle', logo: 'images/partners/golden_needle.png' },
  { name: "L'Algérienne Moderne", logo: 'images/partners/modern_house.png' },
  { name: "Maison My Heritage", logo: 'images/partners/heritage_logo.png' },
];

// Gallery items will now use traditional garment images for consistency
const TRADITIONAL_IMAGES = GARMENTS
  .filter(g => g.category !== 'Ensemble Moderne')
  .map(g => g.image);

const AVAILABLE_COLORS = [
  { hex: '#881337', name: 'Burgundy' },
  { hex: '#e11d48', name: 'Rose' },
  { hex: '#d4af37', name: 'Gold' },
  { hex: '#000000', name: 'Black' },
  { hex: '#ffffff', name: 'White' },
  { hex: '#1e3a8a', name: 'Royal Blue' },
  { hex: '#047857', name: 'Emerald' },
  { hex: '#4b5563', name: 'Grey' },
];

export const GALLERY_ITEMS: GalleryItem[] = GARMENTS
  .filter(g => g.category !== 'Ensemble Moderne')
  .map((garment, index) => {
    const partner = PARTNERS.find(p => p.name === garment.region) || PARTNERS[4]; // Default to My Heritage
    const shuffledColors = [...AVAILABLE_COLORS].sort(() => 0.5 - Math.random());
    const numColors = Math.floor(Math.random() * 3) + 3;
    const itemColors = shuffledColors.slice(0, numColors).map(c => c.hex);

    return {
      id: `prod-gallery-${garment.id}`,
      title: `${garment.name} - ${garment.category}`,
      partnerName: partner.name,
      partnerLogo: partner.logo,
      category: garment.category,
      image: garment.image,
      secondaryImage: garment.image, // Using same image for simplicity in gallery
      date: 'Nouveau',
      likes: 150 + index * 2,
      price: garment.price,
      description: garment.description,
      sizes: garment.sizes || ['38', '40', '42'],
      colors: garment.colors || itemColors
    };
  });

export const ALL_GARMENTS: Garment[] = [
  ...GARMENTS,
  ...GALLERY_ITEMS.map(item => ({
    id: item.id,
    name: item.title,
    category: item.category,
    region: item.partnerName,
    image: item.image,
    price: item.price,
    description: item.description,
    material: 'Haute Couture',
    colors: item.colors,
    sizes: item.sizes,
  }))
];

export const I18N: Translation = {
  welcome: {
    en: 'Weaving Gold into Digital Reality',
    ar: 'ننسج الذهب في الواقع الرقمي'
  },
  subtitle: {
    en: 'Experience the Algerian heritage with our AI-powered virtual fitting room.',
    ar: 'جرب التراث الجزائري مع غرفة القياس الافتراضية المدعومة بالذكاء الاصطناعي.'
  },
  cta_start: {
    en: 'Start Traditional Fitting',
    ar: 'ابدأ القياس التقليدي'
  },
  dashboard: { en: 'Dashboard', ar: 'الرئيسية' },
  studio: { en: 'Style Studio', ar: 'استوديو التصميم' },
  gallery: { en: 'My Heritage', ar: 'تراثي' },
  about: { en: 'About Us', ar: 'من نحن' },
  partners: { en: 'Partners', ar: 'الشركاء' },
  subscription: { en: 'For Artisans', ar: 'للحرفيين' },
  security: { en: 'Security', ar: 'الأمان' },
  styling: { en: 'Styling', ar: 'استشارات' },
  upload_photo: { en: 'Upload Photo', ar: 'رفع صورة' },
  take_photo: { en: 'Use Camera', ar: 'استخدم الكاميرا' },
  calibrate: { en: 'Calibrate Body Points', ar: 'ضبط نقاط الجسم' },
  select_garment: { en: 'Select Garment', ar: 'اختر الزي' },
  generate: { en: 'Weave Magic', ar: 'اصنع السحر' },
  generating: { en: 'Weaving...', ar: 'جاري النسج...' },
  mission_stat: { en: 'Preserving Heritage across 69 Wilayas', ar: 'حفظ التراث عبر 69 ولاية' },
  sec_title: { en: 'Guarantees & Security', ar: 'الضمانات والأمان' },
  sec_subtitle: { en: 'Your trust is our priority', ar: 'ثقتكم هي أولويتنا' },
  sec_photo_title: { en: 'Photo Security', ar: 'أمان الصور' },
  sec_photo_1: { en: '256-bit SSL Encryption', ar: 'تشفير SSL 256 بت' },
  sec_photo_2: { en: 'Auto-delete after 24h', ar: 'حذف تلقائي après 24 ساعة' },
  sec_photo_3: { en: 'Never sold or shared', ar: 'لا تباع ولا تشارك أبداً' },
  sec_photo_4: { en: 'GDPR Compliant', ar: 'متوافق avec le RGPD' },
  sec_privacy_title: { en: 'Privacy', ar: 'الخصوصية' },
  sec_privacy_1: { en: 'Personal data anonymized', ar: 'بيانات مجهولة المصدر' },
  sec_privacy_2: { en: 'No tracking', ar: 'بدون تتبع' },
  sec_privacy_3: { en: 'Explicit consent', ar: 'موافقة صريحة' },
  sec_privacy_4: { en: 'Right to be forgotten enabled', ar: 'حق النسيان مفعل' },
  sec_return_title: { en: 'Free Returns', ar: 'إرجاع مجاني' },
  sec_return_1: { en: '30 days, fees covered', ar: '30 يوماً، الرسوم مغطاة' },
  sec_return_2: { en: 'Refund within 7 days', ar: 'استرداد خلال 7 أيام' },
  sec_return_3: { en: 'Shipping insurance', ar: 'تأمين النقل' },
  sec_return_4: { en: '24/7 Customer Support', ar: 'دعم العملاء 24/7' },
  modern_collection: { en: "Modern Women's Sets", ar: 'مجموعة الأطقم العصرية' },
  my_heritage: { en: "My Heritage", ar: 'تراثي' },
};
