/* =============================================================================
   Helia Namazi — Content Data Source
   All bilingual résumé / portfolio text. Kept in sync with resume_fa/en PDFs.
   ============================================================================= */
const SITE_DATA = {

    /* Icons are kept as raw SVG path fragments so render.js can inject them
       without a build step or external icon library. */

    education: [
        {
            featured: true,
            badge: { fa: "بالاترین مدرک", en: "Highest Degree" },
            degree: { fa: "دکترای تخصصی (Ph.D)", en: "Ph.D." },
            field: { fa: "بیوتکنولوژی دارویی", en: "Pharmaceutical Biotechnology" },
            uni: { fa: "دانشکده داروسازی، دانشگاه علوم پزشکی شهید بهشتی", en: "School of Pharmacy, Shahid Beheshti University of Medical Sciences" },
            year: { fa: "سال: ۱۳۹۶", en: "Year: 2017" },
            gpa: { fa: "معدل: ۱۸.۶۲", en: "GPA: 18.62/20" }
        },
        {
            degree: { fa: "کارشناسی ارشد", en: "M.Sc." },
            field: { fa: "بیوتکنولوژی میکروبی", en: "Microbial Biotechnology" },
            uni: { fa: "دانشکده علوم و فناوری‌های نوین، دانشگاه اصفهان", en: "Faculty of Advanced Sciences and Technologies, University of Isfahan" },
            year: { fa: "سال: ۱۳۸۹", en: "Year: 2010" },
            gpa: { fa: "معدل: ۱۷.۹۴", en: "GPA: 17.94/20" }
        },
        {
            degree: { fa: "کارشناسی", en: "B.Sc." },
            field: { fa: "زیست‌شناسی", en: "Biology" },
            uni: { fa: "دانشکده علوم زیستی، دانشگاه خوارزمی (تربیت معلم تهران)", en: "Faculty of Biological Sciences, Kharazmi University" },
            year: { fa: "سال: ۱۳۸۶", en: "Year: 2007" },
            gpa: { fa: "معدل: ۱۶.۵۸", en: "GPA: 16.58/20" }
        },
        {
            degree: { fa: "دیپلم", en: "High School Diploma" },
            field: { fa: "علوم تجربی", en: "Experimental Sciences" },
            uni: { fa: "نی‌ریز، استان فارس", en: "Neyriz, Fars Province" },
            year: { fa: "سال: ۱۳۸۱", en: "Year: 2002" },
            gpa: { fa: "معدل: ۱۹.۵۵", en: "GPA: 19.55/20" }
        }
    ],

    experience: [
        {
            date: { fa: "مهر ۱۴۰۲ - اسفند ۱۴۰۴", en: "Oct 2023 - Mar 2026" },
            title: { fa: "مدیر رگولاتوری", en: "Regulatory Affairs Manager" },
            desc: { fa: "شرکت داروسازی نفس زیست فارمد", en: "Nafas Zist Pharmed Company" }
        },
        {
            date: { fa: "دی ۱۳۹۸ - مهر ۱۴۰۱", en: "Dec 2019 - Oct 2022" },
            title: { fa: "کارشناس اداره فرآورده‌های بیولوژیک و کارشناس اداره مواد اولیه دارویی", en: "Expert at Biological Products Department & Pharmaceutical API Department" },
            desc: { fa: "سازمان غذا و دارو", en: "Iran Food and Drug Administration (IFDA)" }
        },
        {
            date: { fa: "آذر ۱۳۹۶ - آذر ۱۳۹۸", en: "Nov 2017 - Dec 2019" },
            title: { fa: "مسئول فنی ماده اولیه و سرپرست R&D واحد ماده اولیه و داروهای شیمیایی", en: "API Technical Manager & R&D Supervisor of API and Chemical Drugs Unit" },
            desc: { fa: "شرکت داروسازی زیست تخمیر", en: "Zist Takhmir Company" }
        }
    ],

    certificates: [
        { title: { fa: "گواهی مسئول فنی تولید و واردات مواد اولیه دارویی", en: "Technical Responsible Certificate for Production and Import of Active Pharmaceutical Ingredients (APIs)" } },
        { title: { fa: "گواهی مسئول فنی تولید و واردات تجهیزات پزشکی", en: "Technical Responsible Certificate for Production and Import of Medical Devices" } },
        { title: { fa: "گواهی مسئول فنی محصولات سلول درمانی", en: "Technical Responsible Certificate for Cell Therapy Products" } }
    ],

    skills: [
        {
            id: "regulatory",
            title: { fa: "رگولاتوری، تضمین کیفیت و مستندسازی", en: "Regulatory Affairs, Quality Assurance & Documentation" },
            icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
            tags: [
                { fa: "تهیه و تدوین مستندات دارویی: CoA، SOP، گزارش In vitro، Analytical method validation، BMR، SMF و Brand Master file", en: "Pharmaceutical documentation: CoA, SOP, In vitro reports, Analytical Method Validation, BMR, SMF, and Brand Master File" },
                { fa: "جمع‌آوری و نگارش CTD ماده اولیه و محصول نهایی و آشنایی کامل با سامانه TTAC", en: "Drafting CTD for API and finished products; comprehensive familiarity with the TTAC system" },
                { fa: "اخذ مجوز مصرف واکسن و فرآورده‌های بیولوژیک، ماده اولیه، داروهای شیمیایی و تجهیزات پزشکی", en: "Obtaining licenses for vaccines, biological products, APIs, chemical drugs, and medical devices" },
                { fa: "تسلط به فارماکوپه‌ها و اصول GMP تولید فرآورده‌ها، مواد اولیه و داروهای پرخطر", en: "Mastery of Pharmacopoeias and GMP for products, APIs, and high-risk drugs" },
                { fa: "بررسی عوارض دارویی و ارزیابی سیگنال (فارماکوویژیلانس)", en: "ADR investigation and signal evaluation (Pharmacovigilance)" },
                { fa: "نگارش Feasibility study، Due diligence و ارزیابی شرکت‌های دانش‌بنیان", en: "Feasibility Studies, Due Diligence reports, and knowledge-based company evaluation" }
            ]
        },
        {
            id: "rd",
            title: { fa: "تحقیق، توسعه و فرمولاسیون (R&D)", en: "Research, Development & Formulation (R&D)" },
            icon: "M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0",
            tags: [
                { fa: "فرمولاسیون اشکال متنوع: تزریقی، قرص و کپسول (DC و Wet granulation)، گرانول ذوب‌شونده، محلول خوراکی، اسپری و نانوامولسیون", en: "Dosage forms: injectables, tablets & capsules (DC, Wet granulation), ODG, oral solutions, sprays, and nanoemulsions" },
                { fa: "طراحی Validation تست‌های Assay و Dissolution", en: "Validation design for Assay and Dissolution tests" },
                { fa: "تست‌های کنترلی: Content uniformity، Disintegration، Friability", en: "Control tests: Content Uniformity, Disintegration, Friability" },
                { fa: "آنالیز HPLC داروهای شیمیایی و ماده اولیه؛ تست‌های میکروبی مواد اولیه، محصول و بسته‌بندی", en: "HPLC for chemical drugs and APIs; microbial tests for materials, products, and packaging" },
                { fa: "الزامات تهیه Working standard از بچ ماده اولیه", en: "Preparation of Working Standards from API batches" }
            ]
        },
        {
            id: "lab",
            title: { fa: "تکنیک‌های آزمایشگاهی، سلولی و مولکولی", en: "Laboratory, Cellular & Molecular Techniques" },
            icon: "M6 2h12l-2 7h-8zM8 9v9a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V9",
            tags: [
                { fa: "کشت سلول: میکروبی، جانوری، پرایمری، بنیادی جنینی و قلبی انسانی", en: "Cell culture: microbial, animal, primary, human embryonic & cardiac stem cells" },
                { fa: "ارزیابی سلولی و ویروسی: MTT, MTS, Annexin/PI، Plaque reduction، anti-HIV، Tube formation", en: "Cellular & viral assays: MTT, MTS, Annexin/PI, Plaque reduction, anti-HIV, Tube formation" },
                { fa: "تکنیک‌های مولکولی: ترانسفورماسیون، ترانسفکشن، کلونینگ، استخراج DNA/RNA/پلاسمید، Real-Time PCR", en: "Molecular: transformation, transfection, cloning, DNA/RNA/plasmid extraction, Real-Time PCR" },
                { fa: "پروتئین و تخلیص: FPLC، SDS-PAGE، Western blot، ELISA، ایمونوسیتوشیمی و فلوسایتومتری", en: "Protein & purification: FPLC, SDS-PAGE, Western blot, ELISA, Immunocytochemistry, Flow cytometry" },
                { fa: "فیلتراسیون و اگزوزوم: TFF، تغلیظ با Centricon/Amicon، استخراج اگزوزوم از محیط کشت", en: "Filtration & exosomes: TFF, Centricon/Amicon concentration, exosome extraction from culture media" }
            ]
        },
        {
            id: "tools",
            title: { fa: "نرم‌افزارها و زبان‌ها", en: "Software & Languages" },
            icon: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
            tags: [
                { fa: "تسلط به SPSS، GraphPad Prism، EndNote و مجموعه Microsoft Office", en: "SPSS, GraphPad Prism, EndNote, and Microsoft Office Suite" },
                { fa: "انگلیسی: تخصصی و حرفه‌ای", en: "English: Professional Proficiency" },
                { fa: "فارسی: زبان مادری", en: "Persian: Native" }
            ]
        }
    ],

    courses: [
        {
            visible: true,
            icon: "📋",
            title: { fa: "GMP و استانداردهای بین‌المللی", en: "GMP & International Standards" },
            items: [
                { fa: "اصول GMP پیشرفته، داروهای پرخطر و استریل (PIC/S، EU-GMP، WHO، EMA)", en: "Advanced GMP principles for high-risk and sterile drugs (PIC/S, EU-GMP, WHO, EMA)" },
                { fa: "دوره آموزشی GMP پیشرفته در صنایع دارویی بر اساس تغییرات PIC/S 2018 و راهنمای EU GMP", en: "Advanced GMP training based on PIC/S 2018 revisions and EU GMP guide" },
                { fa: "دوره آموزشی GMP مواد اولیه و داروهای پرخطر بر اساس تغییرات PIC/S 2018 و راهنمای EU GMP", en: "GMP training for APIs and high-risk drugs based on PIC/S 2018 and EU GMP" },
                { fa: "اصول GMP تولید فرآورده‌های دارویی استریل بر اساس راهنمای WHO، PIC/S و EMA سال 2020", en: "GMP for sterile pharmaceuticals based on WHO, PIC/S and EMA 2020 guidelines" },
                { fa: "دوره آموزشی مستندات مهم و الزامی در صنایع دارویی", en: "Essential and mandatory documentation in the pharmaceutical industry" }
            ]
        },
        {
            visible: true,
            icon: "✅",
            title: { fa: "اعتبارسنجی‌ها (Validation)", en: "Validation" },
            items: [
                { fa: "اعتبارسنجی روش‌های آنالیتیکال (Analytical method validation)", en: "Analytical method validation" },
                { fa: "Process validation: اصول کلی و عملیات اجرایی", en: "Process validation: general principles and operational practices" },
                { fa: "Cleaning validation با رویکرد کیفیت مبتنی بر طراحی (QbD)", en: "Cleaning validation with Quality by Design (QbD) approach" },
                { fa: "جوانب میکروبی اعتبارسنجی روش‌های پاکسازی و شستشو", en: "Microbial aspects of cleaning validation" },
                { fa: "معتبرسازی فرآیند تولید فرآورده‌های استریل آسپتیک (مدیا فیل) بر اساس PIC/S", en: "Process validation of aseptic sterile manufacturing (Media Fill) per PIC/S" }
            ]
        },
        {
            visible: false,
            icon: "🏭",
            title: { fa: "زیرساخت و تضمین کیفیت", en: "Infrastructure & Quality Assurance" },
            items: [
                { fa: "طراحی و احراز کیفیت سیستم‌های هواساز HVAC در صنایع دارویی", en: "Design and qualification of HVAC systems in pharmaceutical industries" },
                { fa: "تولید، ذخیره‌سازی و توزیع آب دارویی و احراز کیفیت سیستم آبساز (PIC/S، WHO، ISPE)", en: "Pharmaceutical water systems qualification (PIC/S, WHO, ISPE)" },
                { fa: "مدیریت ریسک‌های کیفیتی (Quality Risk Management) بر اساس PIC/S و ICH Q9", en: "Quality Risk Management based on PIC/S and ICH Q9" },
                { fa: "روش ارزیابی ریسک نقشه در طراحی خطوط دارویی", en: "Risk mapping assessment in pharmaceutical line design" },
                { fa: "کاربرد ایزولاتور، Bio-Safety Cabinets و RABS در تولید و آزمایشگاه", en: "Application of Isolators, Bio-Safety Cabinets, and RABS" }
            ]
        },
        {
            visible: false,
            icon: "📝",
            title: { fa: "رگولاتوری، ثبت دارو و مستندات", en: "Regulatory Affairs, Drug Registration & Documentation" },
            items: [
                { fa: "شیوه تهیه پرونده جامع ساخت دارو با الگوی CTD و استانداردهای ثبت دارو", en: "Preparation of comprehensive drug manufacturing dossiers (CTD model)" },
                { fa: "Working Standard و Reference standard آزمایشگاهی", en: "Laboratory Working Standard and Reference Standard training" },
                { fa: "Biowaiver بر اساس سیستم طبقه‌بندی Biopharmaceutics", en: "Biowaiver based on the Biopharmaceutics Classification System" },
                { fa: "تاریخچه فارماکوویژیلانس و الزامات ADR", en: "History of Pharmacovigilance and ADR requirements" }
            ]
        },
        {
            visible: false,
            icon: "🏢",
            title: { fa: "دانش‌بنیان و تجهیزات پزشکی", en: "Knowledge-Based & Medical Devices" },
            items: [
                { fa: "ارزیابی شرکت‌های دانش‌بنیان، مزایا و خدمات صندوق نوآوری و شکوفایی", en: "Knowledge-based company evaluation and Innovation & Prosperity Fund services" },
                { fa: "مسئول فنی تولیدات و واردات تجهیزات پزشکی و اخذ گواهی مسئول فنی", en: "Technical responsible for medical device manufacturing/import and certification" }
            ]
        },
        {
            visible: false,
            icon: "🔬",
            title: { fa: "تکنیک‌های تخصصی آزمایشگاهی", en: "Advanced Laboratory Techniques" },
            items: [
                { fa: "تکنیک‌های کروماتوگرافی، ژل الکتروفورز، PCR و کشت سلول پرایمری — انستیتو رازی، کرج، ۱۳۸۶", en: "Chromatography, gel electrophoresis, PCR and primary cell culture — Razi Institute, Karaj, 2007" },
                { fa: "ایمنی در آزمایشگاه — دانشکده داروسازی، دانشگاه علوم پزشکی شهید بهشتی، ۱۳۹۱", en: "Laboratory Safety — School of Pharmacy, SBMU, 2012" },
                { fa: "تولید و کنترل کیفی داروهای دستگاه تنفسی", en: "Production and quality control of respiratory system drugs" }
            ]
        }
    ],

    projects: [
        {
            tag: { fa: "محصول تزریقی", en: "Injectable" },
            icon: "M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.5M2 10h20M18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 4-1.5-1.5",
            title: { fa: "اداراوون (Edaravone)", en: "Edaravone" },
            items: [
                { fa: "ماده اولیه و محصول تزریقی (زیست تخمیر / زیست دارو دانش)", en: "API & injectable product (Zist Takhmir / Zist Daroo Danesh)" }
            ]
        },
        {
            tag: { fa: "ماده اولیه و قرص", en: "API & Tablet" },
            icon: "M3 3h18v18H3zM3 12h18M12 3v18",
            title: { fa: "توفاسیتینیب و آپرمیلاست", en: "Tofacitinib & Apremilast" },
            items: [
                { fa: "ماده اولیه و قرص Tofacitinib (زیست تخمیر / زیست دارو دانش)", en: "Tofacitinib API & tablet (Zist Takhmir / Zist Daroo Danesh)" },
                { fa: "ماده اولیه و قرص Apremilast (زیست تخمیر / بنیان سلامت کسری)", en: "Apremilast API & tablet (Zist Takhmir / Bonyan Salamat Kasra)" }
            ]
        },
        {
            tag: { fa: "فرمولاسیون نوین", en: "Advanced Formulation" },
            icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            title: { fa: "فرمولاسیون‌های نوین", en: "Advanced Formulations" },
            items: [
                { fa: "کپسول Anagrelide (زیست تخمیر)", en: "Anagrelide capsule (Zist Takhmir)" },
                { fa: "اسپری زیرزبانی ویتامین D3 — نانوامولسیون (بنیان سلامت کسری)", en: "Vitamin D3 sublingual spray — nanoemulsion (Bonyan Salamat Kasra)" },
                { fa: "گرانول ذوب‌شونده Immune Zinc (زینک و ویتامین C) (بنیان سلامت کسری)", en: "Immune Zinc (Zinc & Vitamin C) orally disintegrating granules (Bonyan Salamat Kasra)" },
                { fa: "گرانول ذوب‌شونده Magnetra (منیزیم اکساید) (بنیان سلامت کسری)", en: "Magnetra (Magnesium Oxide) orally disintegrating granules (Bonyan Salamat Kasra)" }
            ]
        }
    ],

    publications: {
        honors: {
            visible: true,
            emoji: "🏆",
            title: { fa: "افتخارات", en: "Honors" },
            text: { fa: "نفر اول امتحان جامع بیوتکنولوژی دارویی دانشجویان Ph.D ورودی ۹۰، دانشکده داروسازی، دانشگاه علوم پزشکی شهید بهشتی", en: "Ranked 1st in the Comprehensive Exam of Pharmaceutical Biotechnology among Ph.D. students (2011 entry), School of Pharmacy, SBMU" }
        },
        phd: {
            visible: true,
            emoji: "🎓",
            title: { fa: "پایان‌نامه دکترای تخصصی (PhD)", en: "PhD Dissertation" },
            rows: [
                { label: { fa: "عنوان:", en: "Title:" }, value: { fa: "\"بررسی In vitro اثرات پروآنژیوژنیک و آنتی‌آپوپتوتیک اگزوزوم‌های ترشح شده از سلول‌های بنیادی قلبی انسانی در شرایط هیپوکسی\"", en: "\"In vitro investigation of pro-angiogenic and anti-apoptotic effects of exosomes secreted from human cardiac stem cells after treatment under hypoxic conditions.\"" } },
                { label: { fa: "راهنما:", en: "Supervisors:" }, value: { fa: "دکتر ناصر اقدمی و دکتر الهام محیط", en: "Dr. N. Aghdami & Dr. E. Mohit" } },
                { label: { fa: "همکار علمی:", en: "Scientific Collaborator:" }, value: { fa: "پژوهشگاه رویان (۱۳۹۲–۱۳۹۵)", en: "Royan Institute (2013–2016)" } }
            ]
        },
        msc: {
            visible: false,
            emoji: "📘",
            title: { fa: "پایان‌نامه کارشناسی ارشد (MSc)", en: "Master's Thesis (MSc)" },
            rows: [
                { label: { fa: "عنوان:", en: "Title:" }, value: { fa: "\"بررسی خاصیت ضد هرپس سیمپلکس ویروسی گیاه حرا (Avicennia marina) در شرایط In vitro\"", en: "\"In vitro investigation of anti-Herpes Simplex Virus activity of an Iranian native plant (Avicennia marina).\"" } },
                { label: { fa: "راهنما:", en: "Supervisors:" }, value: { fa: "دکتر ماندانا بهبهانی و دکتر عباس رضایی", en: "Dr. M. Behbahani & Dr. A. Rezaei" } }
            ]
        },
        research: {
            visible: false,
            emoji: "🔬",
            title: { fa: "طرح‌های تحقیقاتی", en: "Research Projects" },
            text: { fa: "مجری و همکار اصلی در ۳ طرح تحقیقاتی متمرکز بر پتانسیل درمانی و بهینه‌سازی استخراج اگزوزوم‌ها", en: "Principal Investigator and main collaborator in 3 research projects focused on the therapeutic potential and optimization of exosome extraction" },
            location: { fa: "پژوهشگاه رویان و دانشگاه علوم پزشکی شهید بهشتی (SBMU)", en: "Royan Institute and SBMU" }
        },
        articles: {
            visible: false,
            emoji: "📄",
            title: { fa: "گزیده مقالات ISI و علمی-پژوهشی", en: "Selected ISI & Scientific-Research Articles" },
            list: [
                "Namazi H, et al. \u201cExosomes secreted by cardiosphere-derived cells have anti-apoptotic effect\u201d, Iranian Journal of Pharmaceutical Research. 2018.",
                "Namazi H, et al. \u201cExosomes secreted by hypoxic cardiosphere-derived cells enhance tube formation...\u201d, Journal of Cellular Biochemistry. 2017.",
                "Rostami M, Namazi R, et al. \u201cDesign, synthesis and anti-HIV-1 evaluation...\u201d, Medicinal Chemistry Research. 2015.",
                "Namazi R, et al. \u201cInhibitory activity of Avicennia marina... against HIV and HSV\u201d, Iranian Journal of Pharmaceutical Research. 2013."
            ]
        }
    }
};
