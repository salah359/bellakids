const products = [
    // --- BOYS COLLECTION ---
    {
        id: 1,
        name_en: "Urban Explorer Hoodie",
        name_ar: "هودي مستكشف المدينة",
        price: 45.00,
        category: "boys",
        image: "assets/images/boy-1.png",
        description_en: "A heavyweight cotton blend hoodie designed for durability and warmth. Features a kangaroo pocket and rib-knit cuffs for a perfect fit during outdoor adventures.",
        description_ar: "هودي من مزيج القطن الثقيل مصمم للمتانة والدفء. يتميز بجيب كانغارو وأطراف أكمام محبوكة لملاءمة مثالية أثناء المغامرات الخارجية."
    },
    {
        id: 2,
        name_en: "Classic Denim Dungarees",
        name_ar: "أوفرول جينز كلاسيكي",
        price: 55.00,
        category: "boys",
        image: "assets/images/boy-2.png",
        description_en: "Timeless denim overalls with adjustable metal buckles and reinforced stitching. Made from soft, pre-washed denim that moves with your child.",
        description_ar: "أوفرول جينز خالد مع أبازيم معدنية قابلة للتعديل وخياطة معززة. مصنوع من جينز ناعم مغسول مسبقاً يتحرك مع طفلك."
    },
    {
        id: 3,
        name_en: "Midnight Cargo Joggers",
        name_ar: "بنطال كارغو ليلي",
        price: 38.00,
        category: "boys",
        image: "assets/images/boy-3.png",
        description_en: "Modern cargo-style joggers featuring six functional pockets and an elasticated drawstring waist. The perfect mix of street style and comfort.",
        description_ar: "بنطال رياضي عصري بنمط كارغو يتميز بستة جيوب عملية وخصر مرن برباط. المزيج المثالي بين ستايل الشارع والراحة."
    },
    {
        id: 4,
        name_en: "Little Captain Polo",
        name_ar: "بولو القبطان الصغير",
        price: 29.00,
        category: "boys",
        image: "assets/images/boy-4.png",
        description_en: "A smart piqué cotton polo shirt with a classic two-button placket. Breathable and elegant, ideal for weekend events or family gatherings.",
        description_ar: "قميص بولو أنيق من قطن البيكيه بفتحة كلاسيكية بزرين. جيد التهوية وأنيق، مثالي لفعاليات نهاية الأسبوع أو التجمعات العائلية."
    },
    {
        id: 5,
        name_en: "Dino-Adventure PJs",
        name_ar: "بيجاما مغامرة الديناصورات",
        price: 32.00,
        category: "boys",
        image: "assets/images/boy-5.png",
        description_en: "Two-piece pajama set made from 100% organic cotton. Features fun dinosaur prints and a tag-less design to ensure an itch-free, cozy sleep.",
        description_ar: "طقم بيجاما من قطعتين مصنوع من القطن العضوي 100%. يتميز بطبعات ديناصورات ممتعة وتصميم بدون ملصقات لضمان نوم مريح وخالٍ من الحكة."
    },
    {
        id: 6,
        name_en: "Arctic Puffer Vest",
        name_ar: "فيست منفوخ للبرد",
        price: 48.00,
        category: "boys",
        image: "assets/images/boy-6.png",
        description_en: "Water-resistant quilted vest with a fleece-lined collar. Great for layering over sweaters to provide extra core warmth without the bulk of a coat.",
        description_ar: "فيست مبطن مقاوم للماء بياقة مبطنة بالصوف. رائع للارتداء فوق الكنزات لتوفير دفء إضافي للجسم دون ثقل المعطف."
    },

    // --- GIRLS COLLECTION ---
    {
        id: 7,
        name_en: "Whimsical Garden Dress",
        name_ar: "فستان الحديقة السحري",
        price: 52.00,
        category: "girls",
        image: "assets/images/girl-1.png",
        description_en: "A stunning floral A-line dress with a tiered skirt and delicate cap sleeves. Crafted from soft cotton-sateen for a premium look and feel.",
        description_ar: "فستان مذهل بنقشة الزهور مع تنورة متعددة الطبقات وأكمام قصيرة رقيقة. مصنوع من ساتان القطن الناعم لمظهر وملمس فاخر."
    },
    {
        id: 8,
        name_en: "Lavender Knit Cardigan",
        name_ar: "كارديجان محبوك لافندر",
        price: 35.00,
        category: "girls",
        image: "assets/images/girl-2.png",
        description_en: "Soft-touch knit cardigan with decorative open-work detailing. Features beautiful pearlized buttons to add a touch of sophistication to any outfit.",
        description_ar: "كارديجان محبوك ناعم الملمس مع تفاصيل مفرغة مزخرفة. يتميز بأزرار لؤلؤية جميلة لإضافة لمسة من الرقي إلى أي ملابس."
    },
    {
        id: 9,
        name_en: "Sparkle Star Tulle Skirt",
        name_ar: "تنورة تول النجوم اللامعة",
        price: 42.00,
        category: "girls",
        image: "assets/images/girl-3.png",
        description_en: "Voluminous tulle skirt with gold foil star prints. Features a glittery elastic waistband and a soft cotton under-layer for comfort during twirling.",
        description_ar: "تنورة تول واسعة بطبعات نجوم ذهبية. تتميز بخصر مرن لامع وطبقة سفلية قطنية ناعمة للراحة أثناء الدوران."
    },
    {
        id: 10,
        name_en: "Boho Linen Romper",
        name_ar: "رومبر كتان بوهيمي",
        price: 39.00,
        category: "girls",
        image: "assets/images/girl-4.png",
        description_en: "Breathable linen-blend romper with ruffled shoulder straps and easy-snap buttons for quick dressing. Perfect for warm summer days in the sun.",
        description_ar: "رومبر من مزيج الكتان جيد التهوية مع حمالات كتف مكشكشة وأزرار ضغط سهلة لارتداء سريع. مثالي لأيام الصيف الدافئة تحت الشمس."
    },
    {
        id: 11,
        name_en: "Golden Heart Leggings",
        name_ar: "ليجن القلوب الذهبية",
        price: 22.00,
        category: "girls",
        image: "assets/images/girl-5.png",
        description_en: "High-stretch jersey leggings that keep their shape. Decorated with small golden hearts, making them a fun essential for school or play.",
        description_ar: "بنطال ليجن جيرسي عالي المرونة يحافظ على شكله. مزين بقلوب ذهبية صغيرة، مما يجعله قطعة أساسية ممتعة للمدرسة أو اللعب."
    },
    {
        id: 12,
        name_en: "Velvet Party Peacoat",
        name_ar: "معطف مخملي للمناسبات",
        price: 65.00,
        category: "girls",
        image: "assets/images/girl-6.png",
        description_en: "A luxury velvet coat with a satin lining and oversized bow detail. Designed to keep your little one stylish and warm for the most special occasions.",
        description_ar: "معطف مخملي فاخر ببطانة ساتان وتفاصيل فيونكة كبيرة. مصمم ليبقي طفلتك أنيقة ودافئة في أكثر المناسبات تميزاً."
    }
];