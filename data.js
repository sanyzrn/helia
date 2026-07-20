/* =============================================================================
   Helia Namazi — Content Data Source
   All bilingual résumé / portfolio text. Edit this file to update site content.
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
            uni: { fa: "دانشگاه علوم پزشکی شهید بهشتی", en: "Shahid Beheshti University of Medical Sciences" },
            year: { fa: "سال: ۱۳۹۶", en: "Year: 2017" },
            gpa: { fa: "معدل: ۱۸.۶۲", en: "GPA: 18.62/20" }
        },
        {
            degree: { fa: "کارشناسی ارشد", en: "M.Sc." },
            field: { fa: "بیوتکنولوژی میکروبی", en: "Microbial Biotechnology" },
            uni: { fa: "دانشگاه اصفهان", en: "University of Isfahan" },
            year: { fa: "سال: ۱۳۸۹", en: "Year: 2010" },
            gpa: { fa: "معدل: ۱۷.۹۴", en: "GPA: 17.94/20" }
        },
        {
            degree: { fa: "کارشناسی", en: "B.Sc." },
            field: { fa: "زیست‌شناسی", en: "Biology" },
            uni: { fa: "دانشگاه خوارزمی (تربیت معلم)", en: "Kharazmi University (Tarbiat Moallem)" },
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
            date: { fa: "مهر ۱۴۰۲ - اسفند ۱۴۰۴", en: "Sep 2023 - Mar 2026" },
            title: { fa: "مدیر رگولاتوری", en: "Regulatory Affairs Manager" },
            desc: { fa: "شرکت داروسازی نفس زیست فارمد", en: "Nafas Zist Pharmed Pharmaceutical Company" }
        },
        {
            date: { fa: "دی ۱۳۹۸ - مهر ۱۴۰۲", en: "Dec 2019 - Sep 2023" },
            title: { fa: "کارشناس اداره فرآورده‌های بیولوژیک، اداره مواد اولیه دارویی", en: "Expert at Biological Products Department, Pharmaceutical API Department" },
            desc: { fa: "سازمان غذا و دارو", en: "Iran Food and Drug Administration (IFDA)" }
        },
        {
            date: { fa: "آذر ۱۳۹۶ - آذر ۱۳۹۸", en: "Dec 2017 - Dec 2019" },
            title: { fa: "مسئول فنی ماده اولیه و سرپرست R&D واحد ماده اولیه و داروهای شیمیایی", en: "API Technical Manager & R&D Supervisor of API and Chemical Drugs Unit" },
            desc: { fa: "شرکت داروسازی زیست تخمیر", en: "Zist Takhmir Pharmaceutical Company" }
        }
    ],

    certificates: [
        { title: { fa: "گواهی مسئول فنی تولید و واردات مواد اولیه دارویی", en: "Certificate: Technical Manager of Production and Import of Pharmaceutical APIs" } },
        { title: { fa: "گواهی مسئول فنی تولید و واردات تجهیزات پزشکی", en: "Certificate: Technical Manager of Production and Import of Medical Devices" } },
        { title: { fa: "گواهی مسئول فنی محصولات سلول درمانی", en: "Certificate: Technical Manager of Cell Therapy Products" } }
    ],

    /* skills: grouped for the tag-cloud / filterable visualization */
    skills: [
        {
            id: "regulatory",
            title: { fa: "رگولاتوری و مستندسازی", en: "Regulatory Affairs & Documentation" },
            icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
            tags: [
                { fa: "تهیه مستندات (SOP, BMR, SMF, Brand Master file)", en: "Preparation of documents (SOP, BMR, SMF, Brand Master file)" },
                { fa: "جمع‌آوری و نگارش CTD ماده اولیه و محصول نهایی", en: "Collection and writing of CTD for API and finished product" },
                { fa: "تسلط به سامانه TTAC و فارماکوپه‌ها", en: "Proficient in TTAC system and Pharmacopoeias" },
                { fa: "اخذ مجوز فرآورده‌های بیولوژیک، دارو و تجهیزات پزشکی", en: "Licensing of biological products, pharmaceuticals and medical devices" },
                { fa: "فارماکوویژیلانس و ارزیابی سیگنال عوارض دارویی", en: "Pharmacovigilance and adverse drug reaction signal assessment" },
                { fa: "آشنایی با نگارش Feasibility study و ارزیابی دانش‌بنیان", en: "Familiarity with Feasibility study writing and knowledge-based evaluation" }
            ]
        },
        {
            id: "rd",
            title: { fa: "تحقیق، توسعه و فرمولاسیون", en: "Research, Development & Formulation" },
            icon: "M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0",
            tags: [
                { fa: "فرمولاسیون اشکال تزریقی، قرص و کپسول (DC, Wet granulation)", en: "Formulation of injectables, tablets and capsules (DC, Wet granulation)" },
                { fa: "گرانول‌های ذوب‌شونده دهانی و نانوامولسیون‌ها", en: "Oral disintegrating granules and nanoemulsions" },
                { fa: "انواع اسپری (زیرزبانی، دهانی، بینی) و محلول‌های خوراکی", en: "Various sprays (sublingual, oral, nasal) and oral solutions" },
                { fa: "طراحی Validation تست‌های Assay و Dissolution", en: "Validation design for Assay and Dissolution tests" },
                { fa: "تست‌های کنترلی (Content uniformity, Disintegration)", en: "Quality control tests (Content uniformity, Disintegration)" },
                { fa: "آنالیز HPLC داروهای شیمیایی و تست‌های میکروبی", en: "HPLC analysis of chemical drugs and microbiological tests" }
            ]
        },
        {
            id: "lab",
            title: { fa: "تکنیک‌های آزمایشگاهی", en: "Laboratory Techniques" },
            icon: "M6 2h12l-2 7h-8zM8 9v9a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V9",
            tags: [
                { fa: "کشت سلول (جانوری، پرایمری، بنیادی جنینی و قلبی)", en: "Cell culture (animal, primary, embryonic and cardiac stem cells)" },
                { fa: "تکنیک‌های مولکولی (PCR, Real time PCR, کلونینگ)", en: "Molecular techniques (PCR, Real time PCR, cloning)" },
                { fa: "تخلیص پروتئین: FPLC، SDS-PAGE، Western blot", en: "Protein purification: FPLC, SDS-PAGE, Western blot" },
                { fa: "ارزیابی سلولی: MTT, MTS, فلوسایتومتری، ایمونوسیتوشیمی", en: "Cellular assessment: MTT, MTS, Flow cytometry, Immunocytochemistry" },
                { fa: "فیلتراسیون (TFF) و استخراج اگزوزوم از محیط کشت", en: "Filtration (TFF) and exosome extraction from culture medium" },
                { fa: "تست‌های ضد‌ویروسی (HIV, HSV)", en: "Antiviral tests (HIV, HSV)" }
            ]
        }
    ],

    courses: [
        {
            visible: true,
            icon: "📋",
            title: { fa: "GMP و استانداردهای بین‌المللی", en: "GMP & International Standards" },
            items: [
                { fa: "اصول GMP پیشرفته، داروهای پرخطر و استریل بر اساس راهنماهای PIC/S، EU-GMP، WHO و EMA", en: "Advanced GMP principles for high-risk and sterile drugs based on PIC/S, EU-GMP, WHO and EMA guidelines" },
                { fa: "دوره آموزشی GMP پیشرفته در صنایع دارویی بر اساس تغییرات PIC/S 2018 و راهنمای EU GMP", en: "Advanced GMP training in pharmaceutical industry based on PIC/S 2018 revisions and EU GMP guide" },
                { fa: "دوره آموزشی GMP مواد اولیه و داروهای پرخطر در صنایع دارویی بر اساس تغییرات PIC/S 2018 و راهنمای EU GMP", en: "GMP training for APIs and high-risk drugs based on PIC/S 2018 revisions and EU GMP guide" },
                { fa: "اصول GMP تولید فرآورده‌های دارویی استریل بر اساس راهنمای WHO، PIC/S و EMA سال 2020", en: "GMP principles for sterile pharmaceutical products based on WHO, PIC/S and EMA 2020 guidelines" },
                { fa: "دوره آموزشی مستندات مهم و الزامی در صنایع دارویی", en: "Training on essential and mandatory documentation in pharmaceutical industry" }
            ]
        },
        {
            visible: true,
            icon: "✅",
            title: { fa: "اعتبارسنجی‌ها (Validation)", en: "Validation" },
            items: [
                { fa: "اعتبارسنجی روش‌های آنالیتیکال (Analytical method validation)", en: "Analytical method validation" },
                { fa: "دوره آموزشی Process validation، اصول کلی و عملیات اجرایی", en: "Process validation training, general principles and operational practices" },
                { fa: "دوره آموزشی Cleaning validation طراحی و توسعه روش‌های پاکسازی و شستشو با رویکرد \"کیفیت مبتنی بر طراحی\"", en: "Cleaning validation training: design and development of cleaning methods with Quality by Design (QbD) approach" },
                { fa: "دوره آموزشی جوانب میکروبی اعتبارسنجی روش‌های پاکسازی و شستشو (Microbial Aspects of Cleaning Validation)", en: "Microbial aspects of cleaning validation training" },
                { fa: "معتبرسازی فرآیند تولید فرآورده‌های استریل آسپتیک (مدیا فیل) بر اساس آخرین نسخه راهنمای PIC/S", en: "Process validation of aseptic sterile products (Media Fill) based on the latest version of PIC/S guide" }
            ]
        },
        {
            visible: false,
            icon: "🏭",
            title: { fa: "زیرساخت و تضمین کیفیت", en: "Infrastructure & Quality Assurance" },
            items: [
                { fa: "دوره آموزشی طراحی و احراز کیفیت سیستم‌های هواساز HVAC در صنایع دارویی و دامی بر اساس استانداردهای بین‌المللی PIC/S، EU-GMP، WHO و ISO", en: "Training on design and qualification of HVAC systems in pharmaceutical and veterinary industries based on PIC/S, EU-GMP, WHO and ISO standards" },
                { fa: "دوره آموزشی چگونگی تولید، ذخیره‌سازی و توزیع آب دارویی و احراز کیفیت و بازرسی از سیستم آبساز بر اساس استانداردهای بین‌المللی PIC/S، WHO و ISPE", en: "Training on production, storage and distribution of pharmaceutical water and qualification and inspection of water systems based on PIC/S, WHO and ISPE standards" },
                { fa: "دوره آموزشی مدیریت ریسک‌های کیفیتی Quality Risk Management بر اساس استانداردهای بین‌المللی PIC/S و ICH Q9", en: "Quality Risk Management training based on PIC/S and ICH Q9 standards" },
                { fa: "روش ارزیابی ریسک نقشه در طراحی خطوط دارویی", en: "Risk mapping assessment method in pharmaceutical line design" },
                { fa: "دوره آموزشی کاربرد ایزولاتور، Bio Safety Cabin و RABS در تولید و آزمایشگاه", en: "Training on application of Isolator, Bio Safety Cabinet and RABS in production and laboratory" }
            ]
        },
        {
            visible: false,
            icon: "📝",
            title: { fa: "رگولاتوری، ثبت دارو و مستندات", en: "Regulatory Affairs, Drug Registration & Documentation" },
            items: [
                { fa: "دوره آموزشی شیوه تهیه پرونده جامع ساخت دارو با الگوی CTD و استانداردهای بین‌المللی ثبت و بررسی داروهای جدید", en: "Training on preparation of comprehensive drug manufacturing dossier with CTD format and international standards for new drug registration and review" },
                { fa: "دوره آموزشی Working Standard و Reference standard آزمایشگاهی", en: "Training on Working Standard and Laboratory Reference Standard" },
                { fa: "دوره آموزشی Biowaiver بر اساس سیستم طبقه‌بندی Biopharmaceutics", en: "Biowaiver training based on Biopharmaceutics Classification System" },
                { fa: "دوره آموزشی تاریخچه فارماکوویژیلانس و الزامات ADR در تصمیم‌گیری گزارش‌دهی خودبه‌خودی در ایران", en: "Training on Pharmacovigilance history and ADR requirements in spontaneous reporting decision-making in Iran" }
            ]
        },
        {
            visible: false,
            icon: "🏢",
            title: { fa: "دانش‌بنیان و تجهیزات پزشکی", en: "Knowledge-Based & Medical Devices" },
            items: [
                { fa: "دوره آموزشی ارزیابی شرکت‌های دانش‌بنیان، مزایای مشمول شرکت‌های دانش‌بنیان، خدمات صندوق نوآوری و شکوفایی", en: "Training on knowledge-based company evaluation, benefits for knowledge-based companies, services of Innovation and Prosperity Fund" },
                { fa: "دوره آموزشی مسئول فنی تولیدات و واردات تجهیزات پزشکی و اخذ گواهی مسئول فنی تولیدکنندگان و واردکنندگان تجهیزات پزشکی", en: "Training on technical responsible for medical device manufacturing and import and obtaining technical responsible certificate for medical device manufacturers and importers" }
            ]
        },
        {
            visible: false,
            icon: "🔬",
            title: { fa: "تکنیک‌های تخصصی آزمایشگاهی", en: "Advanced Laboratory Techniques" },
            items: [
                { fa: "آموزش تکنیک‌های کروماتوگرافی، ژل الکتروفورز، PCR و کشت سلول پرایمری، انستیتو رازی، کرج، 1386", en: "Training on chromatography, gel electrophoresis, PCR and primary cell culture techniques, Razi Institute, Karaj, 2007" },
                { fa: "دوره آموزشی \"ایمنی در آزمایشگاه\" دانشکده داروسازی، دانشگاه علوم پزشکی شهید بهشتی، 1391", en: "\"Laboratory Safety\" training course, School of Pharmacy, Shahid Beheshti University of Medical Sciences, 2012" },
                { fa: "دوره آموزشی تولید و کنترل کیفی داروهای دستگاه تنفسی", en: "Training on production and quality control of respiratory drugs" }
            ]
        }
    ],

    /* Featured projects — the products developed at Zist Takhmir Co. */
    projects: [
        {
            tag: { fa: "محصول تزریقی", en: "Injectable" },
            icon: "M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.5M2 10h20M18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 4-1.5-1.5",
            title: { fa: "اداراوون (Edaravone)", en: "Edaravone" },
            items: [
                { fa: "توسعه دانش فنی تولید و اخذ پروانه ساخت ماده اولیه", en: "Development of technical production knowledge and obtaining API manufacturing license" },
                { fa: "اخذ پروانه ساخت محصول تزریقی (زیست دارو دانش)", en: "Obtaining injectable product manufacturing license (Zist Daru Danesh)" }
            ]
        },
        {
            tag: { fa: "ماده اولیه و قرص", en: "API & Tablet" },
            icon: "M3 3h18v18H3zM3 12h18M12 3v18",
            title: { fa: "توفاسیتینیب و آپرمیلاست", en: "Tofacitinib & Apremilast" },
            items: [
                { fa: "ماده اولیه و قرص Tofacitinib (زیست دارو دانش)", en: "Tofacitinib API and tablet (Zist Daru Danesh)" },
                { fa: "ماده اولیه و قرص Apremilast (بنیان سلامت کسری)", en: "Apremilast API and tablet (Bonyan Salamat Kasra)" }
            ]
        },
        {
            tag: { fa: "فرمولاسیون نوین", en: "Advanced Formulation" },
            icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            title: { fa: "فرمولاسیون‌های نوین", en: "Advanced Formulations" },
            items: [
                { fa: "اسپری زیرزبانی ویتامین D3 (نانوامولسیون)", en: "Vitamin D3 sublingual spray (nanoemulsion)" },
                { fa: "گرانول‌های ذوب‌شونده ایمیون زینک", en: "Immune Zinc oral disintegrating granules" },
                { fa: "گرانول‌های ذوب‌شونده مگنترا (منیزیم اکساید)", en: "Magnetra oral disintegrating granules (Magnesium Oxide)" },
                { fa: "کپسول Anagrelide", en: "Anagrelide capsules" }
            ]
        }
    ],

    publications: {
        honors: {
            visible: true,
            emoji: "🏆",
            title: { fa: "افتخارات", en: "Honors" },
            text: { fa: "نفر اول امتحان جامع بیوتکنولوژی دارویی دانشجویان PhD ورودی ۹۰ دانشکده داروسازی علوم پزشکی شهید بهشتی", en: "Ranked first in the comprehensive exam of Pharmaceutical Biotechnology among PhD students (entrance 2011) at the School of Pharmacy, Shahid Beheshti University of Medical Sciences" }
        },
        phd: {
            visible: true,
            emoji: "🎓",
            title: { fa: "پایان‌نامه دکترای تخصصی (PhD)", en: "PhD Dissertation" },
            rows: [
                { label: { fa: "عنوان:", en: "Title:" }, value: { fa: "\"بررسی برون‌تن اثرات پروآنژیوژنیک و آنتی‌آپوپتوتیک اگزوزوم‌های ترشح شده از سلول‌های بنیادی قلبی انسانی پس از تیمار در شرایط هیپوکسی\"", en: "\"In vitro evaluation of pro-angiogenic and anti-apoptotic effects of exosomes secreted from human cardiac stem cells after hypoxic preconditioning\"" } },
                { label: { fa: "راهنما:", en: "Supervisors:" }, value: { fa: "دکتر ناصر اقدمی و دکتر الهام محیط", en: "Dr. Nasser Aghdami & Dr. Elham Mohit" } },
                { label: { fa: "همکار علمی:", en: "Scientific Collaborator:" }, value: { fa: "پژوهشگاه رویان، پژوهشکده سلول‌های بنیادی، گروه قلب (۱۳۹۵-۱۳۹۲)", en: "Royan Institute, Stem Cell Research Center, Heart Group (2013-2016)" } }
            ]
        },
        msc: {
            visible: false,
            emoji: "📘",
            title: { fa: "پایان‌نامه کارشناسی ارشد (MSc)", en: "Master's Thesis (MSc)" },
            rows: [
                { label: { fa: "عنوان:", en: "Title:" }, value: { fa: "\"بررسی خاصیت ضد هرپس سیمپلکس ویروسی یک گیاه بومی ایران (Avicennia marina) در شرایط In vitro\"", en: "\"Evaluation of anti-herpes simplex virus activity of a native Iranian plant (Avicennia marina) under In vitro conditions\"" } },
                { label: { fa: "راهنما:", en: "Supervisors:" }, value: { fa: "دکتر ماندانا بهبهانی و دکتر عباس رضایی", en: "Dr. Mandana Behbahani & Dr. Abbas Rezaei" } }
            ]
        },
        research: {
            visible: false,
            emoji: "🔬",
            title: { fa: "طرح‌های تحقیقاتی", en: "Research Projects" },
            text: { fa: "مجری و همکار اصلی در ۳ طرح تحقیقاتی متمرکز بر پتانسیل درمانی و بهینه‌سازی استخراج اگزوزوم‌ها", en: "Principal investigator and main collaborator in 3 research projects focused on therapeutic potential and optimization of exosome extraction" },
            location: { fa: "پژوهشگاه رویان و دانشگاه علوم پزشکی شهید بهشتی", en: "Royan Institute & Shahid Beheshti University of Medical Sciences" }
        },
        articles: {
            visible: false,
            emoji: "📄",
            title: { fa: "گزیده مقالات ISI و علمی-پژوهشی", en: "Selected ISI & Scientific-Research Articles" },
            list: [
                "Namazi H, et al. \u201cExosomes secreted by cardiosphere-derived cells have anti-apoptotic effect\u201d, Iranian Journal of Pharmaceutical Research. 2018.",
                "Namazi H, et al. \u201cExosomes secreted by hypoxic cardiosphere-derived cells enhance tube formation...\u201d, Journal of Cellular Biochemistry. 2017.",
                "Rostami M, ..., Namazi R, et al. \u201cDesign, synthesis and anti-HIV-1 evaluation...\u201d, Medicinal Chemistry Research. 2015.",
                "Namazi R, et al. \u201cInhibitory activity of Avicennia marina... against HIV and HSV\u201d, Iranian Journal of Pharmaceutical Research. 2013."
            ]
        }
    }
};
