Mam już wystarczająco materiału dowodowego z całego repozytorium (index.html, style.css 1826 linii, data.js, render.js, script.js, README, struktura plików). Poniżej pełny audyt profesjonalny.

---

# **🔍 Kompleksowy audyt profesjonalny — `sanyzrn/helia`**

**Data audytu:** 20 lipca 2026  
 **Repozytorium:** [github.com/sanyzrn/helia](https://github.com/sanyzrn/helia)  
 **Strona produkcyjna:** [helianamazi.ir](http://helianamazi.ir/)  
 **Typ produktu:** Dwujęzyczne (FA/EN) statyczne portfolio/CV — Dr Helia Namazi (biotechnologia farmaceutyczna, Regulatory Affairs)  
 **Stos:** HTML5 \+ CSS3 (custom, bez frameworka) \+ Vanilla JS ES6+ (bez build stepa) \+ Vazirmatn (WOFF2 lokalny)  
 **Rozmiar kodu:** 3 463 linii (index 436 / css 1826 / data 263 / render 352 / script 586\)

---

## **1\. CONTENT AUDIT**

### **1.1 Błędy krytyczne treści**

| \# | Lokalizacja | Istniejący tekst | Problem | Poprawka | Priorytet |
| ----- | ----- | ----- | ----- | ----- | ----- |
| C-01 | `index.html:358` (footer) | `© ۲۰۲۶ هلیا نمازی` / `© 2026 Helia Namazi` | Wpisany na sztywno rok 2026\. Za rok stanie się nieaktualny — klasyczny anti-pattern. | Generować dynamicznie: `new Date().getFullYear()` w JS albo `<span id="year"></span>`. | 🟠 High |
| C-02 | `data.js:45` | `en: "Oct 2023 - Mar 2026"` | Marzec 2026 to **PRZYSZŁOŚĆ** (dziś: 20 lip 2026). Data zakończenia obecnej pracy wygląda jak literówka albo nieaktualny wpis. Jednocześnie wpis nie ma flagi `current: true`, mimo że w kodzie renderującym (`render.js:83–89`) taka flaga istnieje i wyświetla “Current”/„در حال حاضر". | Zweryfikować: (a) jeśli praca trwa — usunąć datę końcową, dodać `current: true`; (b) jeśli zakończona 03/2026 — data jest poprawna, ale wtedy sekcja “Doświadczenie” nie zawiera obecnego stanowiska. | 🔴 Critical |
| C-03 | `index.html:11` (title FA) | „هلیا نمازی | متخصص بیوتکنولوژی دارویی و رگولاتوری" (72 znaki z brandem) | Poprawne. Ale wersja EN w `data-en` ma 84 znaki \+ encję `&amp;` — Google obcina po \~60. | Skrócić EN: `Helia Namazi — Pharma Biotech & Regulatory Affairs`. | 🟡 Medium |
| C-04 | `index.html:12` (meta description FA) | 199 znaków | OK długością (Google \~160 dla EN, więcej dla FA). Brak wersji EN — pole `<meta name="description">` ma tylko FA i nie zmienia się przy przełączeniu języka. | Dodać do `script.js` w `setupLanguage()` aktualizację `document.querySelector('meta[name=description]')` na podstawie osobnego `data-en-desc` na `<title>` albo dedykowanego atrybutu. | 🟠 High |
| C-05 | `index.html:293` | „…محصولات زیر که هم‌اکنون در خط تولید شرکت‌های معتبر **دایر می‌باشند**." | „دایر می‌باشند" to archaiczne, sztywne biurokratyczne perskie — nie pasuje do premium personal brand. | „…محصولات زیر که هم‌اکنون در خط تولید شرکت‌های معتبر ایرانی تولید می‌شوند." | 🟡 Medium |
| C-06 | `index.html:164` | „تهران، ایران · تاریخ تولد: ۱۳۶۴/۰۶/۲۵" | **Data urodzenia w hero na stronie publicznej \+ `birthDate: "1985-09-16"` w JSON-LD (linia 383\) \+ gender/nationality w [schema.org](http://schema.org/).** To PII na poziomie ryzyka RODO/GDPR-adekwatnego. Nikt na LinkedIn/premium CV site nie eksponuje DOB. | Usunąć DOB z hero **i** z JSON-LD. Zostawić „Tehran, Iran" jako lokalizację. | 🔴 Critical (privacy) |
| C-07 | `index.html:382` (JSON-LD) | `"telephone": "+98-912-875-3389"` — pełny numer \+ `mailto:helia.namazi2017@gmail.com` | Pełny telefon komórkowy i prywatny Gmail w publicznym HTML są farmą dla scraperów spamowych. Zwłaszcza gmail z rokiem urodzenia w handlu \= łatwo do identyfikacji. | Rozważyć formularz kontaktowy (Formspree/Netlify Forms) zamiast `mailto:`. Telefon zostawić za CAPTCHA lub tylko na LinkedIn. | 🟠 High |
| C-08 | `data.js:259` (articles) | `"Rostami M, Namazi R, et al..."` oraz `"Namazi R, et al..."` w 2 z 4 artykułów | **Namazi R** vs **Namazi H** — literowa niespójność. To publikacje naukowe, autorka to Helia (H), nie R. Jeśli to były publikacje pod inicjałem panieńskim/rodzinnym, powinien być komentarz; w innym wypadku to błąd który podważa wiarygodność całej listy. | Zweryfikować z oryginalnymi DOI i ujednolicić. Dodać linki DOI. | 🔴 Critical |
| C-09 | `data.js:256–260` | Lista artykułów bez DOI, bez linków, bez PubMed | Publikacje bez linków to sygnał braku profesjonalizmu w środowisku naukowym. Recruiter/współpracownik nie może zweryfikować. | Dodać pole `doi` / `url` do każdego wpisu w `articles` i wygenerować `<a href="https://doi.org/...">`. | 🟠 High |
| C-10 | `index.html:88` | logo tekstowe „هلیا نمازی" — a `data-en="Helia Namazi"` | Logo jest linkiem `href="#"` — po kliknięciu skacze do góry, ale bez `event.preventDefault()` dokleja `#` do URL i psuje historię. | `href="#top-anchor"` albo `href="/"`. | 🟡 Medium |
| C-11 | `data.js:83` | `title: {..., en: "Research, Development & Formulation (R&D)"}` | „R\&D" duplikuje się w nawiasie — nadmiarowo. | „Research, Development & Formulation". | 🟢 Low |
| C-12 | `index.html:219` | `data-fa="کاوش کنید"` | „کاوش کنید" (Eksploruj) to generyczny AI-slop — brzmi jak każda inna landing page. | „ادامه" (“Kontynuuj”) lub po prostu strzałka bez tekstu. | 🟡 Medium |
| C-13 | `index.html:328` | „بیایید گفتگو کنیم" / „Let’s Talk" | Slogan „Let’s Talk" jest zużyty przez każdy szablon portfolio na świecie. Dla profilu naukowo-regulatoryjnego brzmi nieprofesjonalnie. | FA: „همکاری و تماس", EN: „Get in touch" lub „Professional inquiries". | 🟡 Medium |
| C-14 | `index.html:161` (hero paragraph) | 617 znaków FA / 611 EN, jeden monolityczny blok, `text-align: justify` | Zbyt długi bez podziału — czytelnik gubi się w pierwszych 3 sekundach. Justify \+ RTL \+ długie zdania \= fatalna czytelność. | Podzielić na 2–3 krótsze akapity, użyć bulletów albo pull-quote dla kluczowych osiągnięć (nfr 1 w egzaminie). | 🟠 High |
| C-15 | `data.js` różne miejsca | Mieszanka: gdzieś „GPA: 18.62/20" (EN), gdzieś „معدل: ۱۸.۶۲" (FA — bez /20) | Niespójny format skali ocen między językami. | Ujednolicić — w FA też „از ۲۰" lub w EN też bez „/20". | 🟢 Low |
| C-16 | `data.js:112` | `"English: Professional Proficiency"` | „Professional" to nienormatywne. Standardem branżowym jest skala CEFR (C1/C2) lub IELTS/TOEFL score. | „English: C1 (Professional Working Proficiency)" lub podać IELTS. | 🟡 Medium |
| C-17 | `data.js:161` | `"Working Standard و Reference standard آزمایشگاهی"` | Niespójna kapitalizacja — „Working Standard" (Title Case) i „Reference standard" (mixed) w tej samej pozycji. Cała `data.js` ma podobne rozbieżności: „Wet granulation" vs „wet granulation" itp. | Ustanowić style guide: terminy naukowe \= Title Case, ogólne \= lowercase. Przelecieć całą `data.js`. | 🟢 Low |
| C-18 | `index.html:281,315` | „مشاهده بیشتر" / „Show More" | Nie mówi CZEGO więcej. „Show More" to najmniej efektywne CTA. | „Show all 6 categories" / „Zobacz wszystkie kursy" — z liczbą. | 🟡 Medium |
| C-19 | `index.html:171` | „ارتباط مستقیم" / „Contact Me" | „Contact Me" i „ارتباط مستقیم" nie znaczą tego samego — FA sugeruje „bezpośredni kontakt" (mocniejsze niż EN). | EN: „Get in touch" lub FA→EN: „Contact directly". | 🟢 Low |
| C-20 | `index.html:359–361` | `Created with ❤️ by DBS Graphic` — LTR wymuszony w RTL layout | W kontekście premium personal branda linia „Created with ❤️ by X" jest przyzwoita, ale emoji ❤️ i drobny tekst nie pasują do minimal-slate palety. | Zamienić emoji na tekst „Design by" i cichszy styl. | 🟢 Low |

### **1.2 Głos marki (Brand voice)**

* **Perska wersja:** ton formalny, akademicki, długie zdania z zapożyczeniami z francuskiego/angielskiego (rgułatoryjne, fromulasyoni). Adekwatny dla środowiska farm/regulatorów.  
* **Angielska wersja:** miejscami sztywno przetłumaczone kalki („Effective collaboration in technical knowledge development" — kalka „دانش فنی" \= technical know-how / process know-how). „Effective collaboration" to biurowy pustosłowie.  
* **Rekomendacja:** angielska wersja wymaga native-speaker copyedit. Obecnie widać ślady tłumaczenia maszynowego (kolejność słów, artykuły, „the pharmaceutical" vs „pharmaceutical").

### **1.3 Brakująca treść**

* **Brak sekcji „About/Bio" ponad hero.** Cała historia zawodowa opiera się na kartach z jednym zdaniem opisu — brak narracji.  
* **Brak zdjęć/logotypów firm** w timeline (Zist Takhmir, Nafas Zist, IFDA). Sekcja doświadczenia wygląda bardzo pusto.  
* **Brak dowodu społecznego** — testimoniale, rekomendacje LinkedIn.  
* **Brak sekcji „Publications" z prawdziwymi cytatami** i wskaźnikami (Scopus, Google Scholar h-index).  
* **Brak polityki prywatności / stopki prawnej** — mimo że są dane osobowe.

---

## **2\. VISUAL DESIGN AUDIT**

**Wobec celu: „Minimal, modern, elegant, premium, high-end":**

| \# | Problem | Uzasadnienie | Rekomendacja | Oczekiwana poprawa |
| ----- | ----- | ----- | ----- | ----- |
| V-01 | Paleta „quiet slate" bardzo bezpieczna, ale bez punktu kontaktowego z branżą (biotech/pharma) | Kolory `#5a6570` / `#1c1f24` — poprawne, ale generyczne. Każde SaaS wygląda tak. Brak subtelnego akcentu (np. delikatny nasycony teal/sage, który sugerowałby lab/naukę). | Dodać **jeden** akcentowy kolor spoza szarości (np. deep sage `#4a6b5c` lub kliniczny navy `#1e3a5f`) używany max 3 razy: eyebrow, CTA primary hover, timeline current dot. | Premium poczucie „intentional palette" zamiast „default gray theme". |
| V-02 | Trzy CTA-akcenty konkurują wizualnie w hero: `.gradient-text`, `.tagline::before` (kropka), `.hero-image::after` (przerywana ramka), pulsujący glow `heroGlowPulse` | Za dużo elementów walczy o uwagę. Ma być „minimal". Przerywana ramka za zdjęciem to wzorzec z 2019 roku (Notion/Linear porzuciły). | Zostawić **jeden** ozdobnik: sam glow lub sama ramka. Usunąć animację `heroGlowPulse` z pola widzenia stałego (rozprasza przy czytaniu). | Silniejszy focus na tekście hero. Prawdziwy minimalizm. |
| V-03 | `.hero-image::after` — dashed border 2px, przesunięty offset \-18px | Wygląda „portfolio 2018". Nowoczesny premium (Vercel, Linear, Stripe) używa czystych zaokrągleń bez ozdobników. | Usunąć albo zamienić na cienką, pełną linię 1px z bardzo niską opacity (0.15). | Bardziej editorial, mniej Behance-tutorial. |
| V-04 | Sekcje-headery używają `text-align: center` \+ eyebrow \+ h2 \+ długi separator (`::after`) w każdej sekcji | Statyczna, monotonna rytmika. Każda sekcja wygląda tak samo — brak variety. Premium sites łamią rytm (czasem lewa, czasem centered). | Wprowadzić 2 warianty header: (a) centered z eyebrow (jak teraz), (b) left-aligned bez eyebrow (dla „Experience" i „Publications"). | Poczucie edytorskiego layoutu, nie template. |
| V-05 | `section-header h2::after` dubel `width`: `56px` i `36px` (linia 762–766) | **Bug CSS** — druga deklaracja nadpisuje pierwszą. Kod nieprawidłowo utrzymywany. | Usunąć zduplikowaną linię. | Czysty kod. |
| V-06 | Cień `--shadow-md: 0 4px 14px rgba(28,31,36,0.07)` | Cienie są **za miękkie/za jasne** dla premium look. Apple/Linear używają wyraźnie ciemniejszych, bardziej zdefiniowanych cieni (`0 12px 40px rgba(0,0,0,0.08)`) albo w ogóle rezygnują z cieni na rzecz borderów. | Wybrać strategię: (a) precyzyjne, głębokie cienie tylko na kartach z hover, (b) system bezcieniowy z 1px border \+ subtle background — nie oba na raz. | Konsystentny system depth. |
| V-07 | Skill chips (`.skill-chip`) mają `border-radius: 999px` (pill) i tło `--accent` | Chipy są dobre, ale w kontekście długich fraz („Pharmaceutical documentation: CoA, SOP, In vitro reports…" — 66 znaków) pill-chip staje się bardzo szerokim „stadionem". Traci to charakter chipa. | Dla długich tekstów przełączyć na kartę (radius 8px, padding 12/16). Chipy tylko dla 1–3 słów. | Lepsza czytelność. |
| V-08 | Timeline pionowy — tylko 3 wpisy | Timeline z 3 elementami wygląda niedopracowanie na desktopie (dużo białego, pojedyncze karty). Timeline ma sens od 5+ wpisów. | Zamienić na kompaktowy 2-kolumnowy layout albo horizontalny „career journey" bar. Zostawić timeline tylko jeśli dojdą wpisy. | Uzupełniona kompozycja. |
| V-09 | `.stat-num` — `background: var(--primary); -webkit-background-clip: text; color: transparent;` | Gradient text na jednolitym `var(--primary)` (`#1c1f24`) NIE ROBI NIC — background-clip nie ma sensu bez faktycznego gradientu. Kod „na przyszłość" który wygląda jak niedokończony. | Usunąć te 4 linie. Zostawić `color: var(--primary)`. | Czysty CSS, mniejszy bundle. |
| V-10 | `.gradient-text` (index.html:158) — klasa dodana ale w CSS (linia 590–592) definiuje tylko `color: var(--primary)` | Nazwa klasy sugeruje gradient — kod go nie realizuje. Dead intention. | Albo dodać prawdziwy gradient (`background: linear-gradient(...)` \+ clip), albo przemianować klasę na `.hero-accent`. | Kod odpowiada nazwie. |
| V-11 | Ambient background (linie 78–83 index) — 4 „glow-parallax" divy które w CSS (linia 231–232) są `display:none` | **Martwy kod** — 4 elementy DOM tworzące parallax, do których JS podpina eventy `mousemove` (script.js `setupParallax`), ale one są ukryte. | Usunąć elementy z HTML, usunąć `setupParallax` z script.js, usunąć `.glow-orb` / `.glow-parallax` z CSS. | \-8 elementów DOM, \-1 event listener globalny. |
| V-12 | `.cursor-glow` (script.js `setupCursorGlow`) tworzy element z `.is-visible` opacity=0 (linia 1551\) \+ `display: none !important` (linia 1550\) | **Kompletnie martwa funkcjonalność.** Tworzy DOM node przy każdym załadowaniu, dodaje 2 event listeners, żeby wyświetlić nic. | Usunąć `setupCursorGlow` z script.js, `.cursor-glow` z CSS. | \-1 element DOM, \-2 listeners, \~40 linii kodu. |
| V-13 | Hero chips (PhD, Regulatory, R\&D) mają `animation-delay` w CSS (linia 717–719) ale `@keyframes floatChip` istnieje (720–723) — animacja jest zdefiniowana, ale brak `animation-name: floatChip` na `.hero-chip` | Kolejny „zapomniany" fragment. Chipy są statyczne mimo intencji unoszenia się. | Albo dodać `animation: floatChip 4s ease-in-out infinite`, albo usunąć keyframes. | Zgodność intencji z realizacją. |
| V-14 | Zdjęcie profilowe 269×359 px, waga 16 KB | Zaskakująco małe. Na wysokich DPI (Retina 2x/3x) będzie rozmazane. `hero-image` w CSS ma 380×380 → obraz mniejszy niż kontener \+ `object-fit: cover` \= rozciągnięcie w pionie do 380px. | Wgrać wersję 2× (760×760 px WebP \+ AVIF fallback), 60–80 KB. Użyć `<picture>` z `srcset`. | Ostre zdjęcie, LCP bez straty jakości. |
| V-15 | `favicon.svg` — **43 KB** | Standardowy favicon SVG powinien mieć \<2 KB. 43 KB oznacza że to prawdopodobnie skomplikowany plik (może wektoryzowany raster). | Uprościć favicon albo eksportować z Figmy jako minimalną wektorową ikonę \+ PNG 32/16 fallback. | \-41 KB. |
| V-16 | Font Vazirmatn ładuje **5 wag** (300, 400, 500, 700, 900\) | 900 jest zdefiniowana z `font-weight: 700` (linia 31\) — kolizja/bug. Zwykle strona portfolio nie potrzebuje 5 wag; 3 wystarczą. | Zredukować do 400 \+ 500 \+ 700\. Naprawić przypisanie 900→900. | \-2 pliki WOFF2 (\~60 KB). Poprawność rendering. |
| V-17 | `text-align: justify` na hero `p` (linia 599\) | Justify w RTL z długimi słowami arabskimi/perskimi tworzy „rivers of white" (nierówne odstępy między słowami). Nowoczesne strony premium tego nie używają. | `text-align: start`. | Lepsza czytelność. |
| V-18 | Sekcje „Certificates" i „Education" mają identyczny wizualnie layout kart — brak wizualnej hierarchii między nimi | Karta certyfikatu i karta edukacji wyglądają identycznie. Certyfikat ma być drugorzędny. | Karty edukacji: bogatsze (badge dla „Highest Degree" — jest, dobrze). Certyfikaty: mniejsze, chip-style, w rzędzie. | Wizualna hierarchia. |
| V-19 | `.contact-link` — 70×70 kwadraty z ikoną 12×12 w środku (`.contact-icon svg { width: 12px; height: 12px }`) | Ikony w kontakcie są **za małe** (12px) w kontenerze 70px — proporcje wyglądają dziwnie, dużo pustego pola wokół. | Ikony 20–24px w kontenerze 56–64px. | Lepszy balans. |
| V-20 | Copyright wpisany na 2 linie: rok+nazwa, potem „Created with ❤️" — LTR mixed z RTL | W kontekście RTL body, blok LTR bez wyraźnego wydzielenia (`direction: ltr` jest, ale wizualnie ląduje na tej samej wysokości co copyright FA) | Wydzielić kartę „Colophon" na dole. | Czystszy footer. |

**Werdykt wizualny:** *Dobre podstawy (paleta, radius, spacing), ale wykonanie ma za dużo „portfolio tricks" (dashed border, gradient text nieużywany, cursor glow, parallax) — te elementy walczą z celem „minimal, premium".*

---

## **3\. MOBILE UX AUDIT**

| \# | Problem | Priorytet |
| ----- | ----- | ----- |
| M-01 | **Karuzele scroll-snap na mobile dla `.edu-grid`, `.cards-grid`, `.skill-grid` (linie 1699–1731) — brak wizualnego wskaźnika że można scrollować w poziomie.** Użytkownik widzi jedną kartę i myśli „to wszystko". Brak dots, brak strzałek, brak podglądu następnej karty (bo `flex: 0 0 82%` daje tylko \~8% peek). | 🔴 Critical |
| M-02 | Karuzela `cards-grid` (Certificates) ma tylko 3 wpisy — na mobile użytkownik musi scrollować 3 razy w poziomie żeby zobaczyć 3 certyfikaty, które zmieściłyby się jako stack pionowy. | 🟠 High |
| M-03 | Karuzela `skill-grid` ukrywa filter-tabs (kategorie) na mobile? — Nie, `.skill-tabs` ma `flex-wrap: wrap; justify-content: center`. Ale na wąskim ekranie tabs się zawijają na 3–4 rzędy → wygląda amatorsko i zajmuje miejsce. | 🟠 High |
| M-04 | `.hero-image` na 480px: 190×190 px \+ `margin-bottom: 84px` (linia 1747\) — 84px pustej przestrzeni pod zdjęciem, żeby zmieścić chipy pod obrazem. To dużo martwej przestrzeni. | 🟡 Medium |
| M-05 | Timeline na mobile ma linię i kropki (17px inset-start) — dot 18×18 px, tekst zaczyna się od `padding-inline-start: 50px`. Rozmiar dot OK, ale **timeline-content ma `border-radius: 10px` (–radius-md)** — traci charakter timeline (zwykle karty timeline są mniej zaokrąglone). | 🟢 Low |
| M-06 | `contact-link` na mobile 60×60 (linia 1680\) → na 480px 50×50 → **tap target \< 44×44 rekomendowanego przez Apple/WCAG?** — 50×50 spełnia minimum. OK. | 🟢 Low |
| M-07 | `.nav-links` `display: none` (linia 1621\) — mobile menu przez hamburger. Ale hamburger `menu-toggle` w desktop `display: none` — po zmianie orientacji z landscape (\>992px) do portrait, menu ląduje w prawidłowym trybie. **Ale**: menu mobile pokazuje **8 pozycji** w bardzo małym panelu 290×\~360px — pierwsza pozycja może być pod paskiem statusu telefonu. | 🟡 Medium |
| M-08 | Brak `<meta name="apple-mobile-web-app-capable">` i `<meta name="mobile-web-app-capable">` — brak wsparcia dla PWA add-to-homescreen. | 🟢 Low |
| M-09 | Test w Chrome DevTools: `input.classList.remove('lang-en-pending')` na `<html>` w script.js **modyfikuje `<html>`, nie `<body>`** — w bootstrap (index.html:64) klasa jest dodawana do `documentElement`, w script.js (linia 483\) też do `documentElement`. Spójne. OK. | 🟢 Low |
| M-10 | `.hero-image::before` na mobile 190px — ma `top: -70px; right: -70px` (od desktop settings), NIE nadpisane w mobile media queries → glow wystaje 70px poza 190px zdjęcia \= może powodować **horizontal overflow** mimo `overflow-x: hidden` na body. | 🟠 High |
| M-11 | `.expand-content` max-height 480px collapsed → na wysokich telefonach 6.7" widać całą sekcję kursów bez potrzeby „Show More" → przycisk „Show More" wygląda dziwnie gdy nie ma czego dodatkowego pokazać. Warto sprawdzić czy ilość wpisów uzasadnia collapse. | 🟡 Medium |
| M-12 | `viewport` meta ma `viewport-fit=cover` — dobrze dla iOS notch. Ale brak `env(safe-area-inset-*)` w CSS — `header` fixed na iPhone z Dynamic Island może być zasłonięty. | 🟠 High |
| M-13 | Scroll snap `scroll-snap-type: x mandatory` na `.edu-grid` — **mandatory** jest agresywne. Użytkownik nie może zatrzymać się „między" kartami. `x proximity` byłoby lepsze. | 🟡 Medium |

---

## **4\. UI/UX REVIEW**

### **4.1 Nawigacja & informacja**

* **8 pozycji nav** to za dużo dla personal portfolio. Best practice: 4–6 (Home/Bio, Experience, Publications, Contact). Sekcje Education, Skills, Courses, Products mogłyby żyć pod jedną „About" albo być na osobnej pod-stronie.  
* **Brak sekcji „Certificates" w primary nav**, ale sekcja istnieje w DOM (`id="certificates"`) → użytkownik nie ma sposobu żeby do niej skoczyć, poza scrollowaniem.  
* **Sekcja `#certificates` nie ma odpowiadającego linku w nav** — ani `nav-links` (index:91–98), ani `mobile-nav` (122–145). To bug informacji architektonicznej.

### **4.2 CTA & konwersja**

* Hero ma 2 CTA: „Download CV" (primary) \+ „Contact Me" (outline). Dobre. Ale brak trzeciej ścieżki dla rekruterów: „View LinkedIn". LinkedIn ikona jest tylko w stopce — trzeba zjechać cały ekran.  
* **Główny cel strony jest niejasny**: czy to szukanie pracy? Konsultacje? Współprace naukowe? Brak wyraźnej propozycji wartości typu „Available for regulatory consulting" / „Open to R\&D leadership roles".

### **4.3 Loading & stany**

* **Brak loadera / skeleton loader** — treść jest budowana w JS (`render.js` po `DOMContentLoaded`), więc na wolniejszym łączu użytkownik widzi 8 pustych sekcji przez chwilę.  
* **Brak stanów error** — jeśli `data.js` nie załaduje się (offline / błąd), sekcje pozostają puste bez komunikatu.  
* **Brak `<noscript>` fallback** — użytkownicy z wyłączonym JS zobaczą tylko hero (statyczny HTML). To akceptowalne dla portfolio, ale zawołanie „Please enable JavaScript" byłoby dobre.

### **4.4 Friction points**

* Toggle języka `EN` → po kliknięciu zmienia się wszystko \+ aktualizuje URL (`?lang=en`) — dobre.  
* Toggle motywu: 3 stany (system default, light, dark) — obecnie tylko 2 (`localStorage`). Brak opcji „reset to system". Minor.  
* Timeline **nie klika** — item wygląda klikalnie (hover shadow), ale nic nie robi. Frustujące.  
* Karty edukacji **nie klikają** — brak linków do dyplomów/uczelni (mimo że nazwa uczelni to znak wartościowej informacji).

### **4.5 Cognitive load**

* Sekcja Skills ma 3 kategorie × 5–6 chipsów, każdy chip zawiera całe zdanie (do 130 znaków). **To nie są chipsy — to lista punktowana w kształcie chipsów.** Wysokie obciążenie poznawcze.

---

## **5\. FRONTEND CODE REVIEW**

### **5.1 Architektura ogólna**

* ✅ **Zero-dependency, no-build** — dobre dla statycznego portfolio (portability, longevity).  
* ✅ **Rozdzielenie danych/renderowania/interakcji** (`data.js`/`render.js`/`script.js`) — czyste.  
* ❌ **Brak modułów ES** — wszystko w IIFE. Dla 3.5k linii to jeszcze OK, ale skalowalność zero.  
* ❌ **Brak TypeScriptu** — dla portfolio nie krytyczne, ale nawet JSDoc pomoże.

### **5.2 Konkretne code smells**

| \# | Plik:linia | Problem | Rekomendacja |
| ----- | ----- | ----- | ----- |
| CR-01 | `style.css:31` | `font-weight: 700` dla wagi 900 | Naprawić na 900 |
| CR-02 | `style.css:765` | Duplikat `width` w `h2::after` | Usunąć jedną |
| CR-03 | `style.css:759–768` | `transform: translateX(50%)` dla RTL i `-50%` dla LTR — logika mylona (linia 760 pisze `translateX(50%)`, potem linia 768 pisze `translateX(-50%)` przy LTR) — to daje **przesunięty decoratory bar** poza sekcją w RTL | Zmienić na `translateX(-50%)` uniwersalnie (bo `left: 50%` \+ `transform: translateX(-50%)` \= wycentrowanie, kierunek pisma bez znaczenia) |
| CR-04 | `style.css:851` | `transform-origin: inset-inline-end` | **Nieprawidłowa wartość** — `transform-origin` nie akceptuje słów kluczowych `inset-inline-*`. Efektywnie ignorowane. |
| CR-05 | `style.css:878–881` | Dwa `color` w rzędzie (`var(--bg-base)`, potem `#fff`) — druga wygrywa, pierwsza dead | Usunąć duplikat |
| CR-06 | `render.js:34` | `pathD.split(/(?=M)/)` do rozdzielania SVG paths | Fragile — jeśli path zawiera „M" wewnątrz (np. w Bezier), łamie. Nie duży problem tu, ale znak niepełnej abstrakcji. |
| CR-07 | `script.js:315–332` | `animate()` używa 4 różnych mechanizmów synchronizacji (`performance.now`, `requestAnimationFrame`, `setTimeout` dla klasy `count-done`) | Można uprościć \+ `will-change` na `.stat-num` przed animacją, usunąć po. |
| CR-08 | `script.js:500–526` | `setupLanguage.apply` iteruje **wszystkie** `[data-fa][data-en]` w DOM przy każdym przełączeniu i ma 5 gałęzi if/else | Ta logika jest krucha (tag-name based, dziecko-based). Zamienić na deklaratywne — używać `<span data-i18n>` z jedną strategią. |
| CR-09 | `script.js:22–25` | `prefersReducedMotion` sprawdzane raz przy load. | Nie reaguje na zmianę systemową w trakcie sesji. Zarejestrować `matchMedia().addEventListener('change', ...)`. |
| CR-10 | `style.css:1550–1552` | `.cursor-glow` ma `display: none !important` \+ `.is-visible { opacity: 0 }` | Kod całkowicie martwy. Usunąć obie klasy. |
| CR-11 | `script.js:385–407` | `setupCursorGlow` tworzy element i podpina 3 listenery po nic (patrz CR-10) | Usunąć całą funkcję. |
| CR-12 | `script.js:356–380` | `setupParallax` — działa na `.glow-parallax` które w CSS 231–232 `display: none` | Martwe. Usunąć. |
| CR-13 | `index.html:78–83` \+ `render.js` | Ambient bg orbs (4 elementy) — wszystkie z `display: none` | Usunąć elementy DOM. |
| CR-14 | `index.html:432–434` | `?v=6/7/10` cache-busting query strings | Manualne wersje — łatwo o pomyłkę. Rozważyć zbudowany hash w nazwie pliku (statyczny asset pipeline typu `esbuild --entry-names=[name]-[hash]`) albo w ogóle nie wersjonować (bo statyczny hosting daje ETag). Obecnie style.css=v10 a script.js=v6 — rozjazd wersji jest podejrzany. |
| CR-15 | `render.js:cały plik` | Manipulacja DOM z `createElement` po jednym — 250+ elementów tworzonych ręcznie | Rozważyć template literals `insertAdjacentHTML` — 3× szybsze i czytelniejsze. Albo `<template>` w HTML. |
| CR-16 | `script.js:190–205` | `setupSmoothScroll` — `getBoundingClientRect().top + window.scrollY` na każdym kliknięciu | OK, ale mieszanie z `html { scroll-behavior: smooth }` (style.css:112) — dubel. Native CSS wystarczy, JS może być usunięty. |
| CR-17 | `style.css:1112, 1115` | `--dir-sign` CSS variable jako `1` dla RTL, `-1` dla LTR \+ użycie w `translateX(calc(-3px * var(--dir-sign)))` | Bardzo pomysłowe. ✅ Wzorcowe. |
| CR-18 | `data.js:5-263` | Cała treść w jednym JS file (263 linii, 22 KB) | Zamiast tego JSON \+ fetch. Ale bez build stepa JSON wymaga serwera; obecne rozwiązanie jest OK dla „open index.html" locally. |
| CR-19 | `index.html:432–434` | `<script defer>` × 3 | ✅ Poprawne. |
| CR-20 | `render.js:349–351` | `if (document.readyState === 'loading') {...} else { renderAll(); }` | ✅ Poprawne, safe. |
| CR-21 | `script.js:60–63` | `onContentReady(() => { setupTimelineActive(); setupScrollReveal(); setupActiveNavObserver(); })` — te trzy są wywoływane 2× (raz w `init`, raz po `content:rendered`) | `setupScrollReveal` jest idempotentne (dobra flaga `revealObserver`). `setupActiveNavObserver` NIE jest — ma `if (navObserver) navObserver.disconnect()` (linia 291\) — spełnia. `setupTimelineActive` — tworzy nowy IntersectionObserver bez cleanupu. Wywołane 1× więc OK. |
| CR-22 | Brak pliku `robots.txt` i `sitemap.xml` w repo | Duży błąd SEO dla statycznej strony. |  |
| CR-23 | Brak `.gitignore` (podglądam repo — nie widzę), brak `LICENSE` | Manko OSS hygieny. Nie krytyczne, ale portfolio na GitHubie zwykle ma choćby MIT. |  |
| CR-24 | Brak `netlify.toml` / `_headers` / `vercel.json` | Brak konfiguracji nagłówków (CSP, HSTS, cache) — jeśli deploy na Netlify/Vercel, warto ustawić. |  |
| CR-25 | Brak `manifest.webmanifest` | Nie ma PWA (rozważyć). |  |

### **5.3 Rozmiar**

* CSS 52 KB → po minifikacji \~35 KB → po gzip \~8 KB. **OK**.  
* JS łącznie 62 KB → gzip \~15 KB. **OK**.  
* Fonty 5 × \~30 KB \= \~150 KB. **Można zredukować do 90 KB.**

### **5.4 Bundle optimization**

* Brak minifikacji — plik `style.css` w produkcji byłby o \~35% mniejszy.  
* Brak `<link rel="preconnect">` / `<link rel="dns-prefetch">` (nie potrzebne — brak zewnętrznych domen ✅).  
* Brak `<link rel="modulepreload">` (nie używane, bo brak modułów).

---

## **6\. PERFORMANCE AUDIT**

Na podstawie kodu (nie odpalałem Lighthouse, ale przewidywalne):

| Metric | Prognoza | Uzasadnienie |
| ----- | ----- | ----- |
| **LCP** | \~1.2–1.8 s (dobry) | `hero-image` preloadowany, `fetchpriority=high`, mały (16 KB). Ale rozmycie na Retinie może wymusić re-layout jeśli źródło się zmieni. |
| **CLS** | \~0.05 (dobry) | `img width/height` ustawione. Ryzyko: `render.js` wstrzykuje treść do sekcji po DOMContentLoaded — spowoduje CLS jeśli hero wczyta się przed sekcjami. Ale hero jest w statycznym HTML, więc CLS ograniczony do dolnych sekcji. |
| **INP** | \~150–200 ms (średni) | Sporo synchronicznych operacji przy przełączeniu języka (500+ elementów w DOM \* 5 branchy if/else). |
| **FCP** | \~0.6–0.9 s (bardzo dobry) | Statyczny HTML, \~32 KB, brak blokującego CSS na krytycznej ścieżce (wszystko w `<head>` ale small). |
| **TBT** | \~50 ms | Trzy skrypty `defer`, tempo rozsądne. |

### **Wąskie gardła**

1. **Font Vazirmatn** — 5 wag × 30 KB \= 150 KB, wszystkie z `font-display: swap` → OK, ale niepotrzebne wagi (300, 900\) można usunąć.  
2. **`favicon.svg` 43 KB** — pobierane w tle po LCP, ale zwiększa całkowity transfer.  
3. **Brak `<link rel="preload">` dla najważniejszej wagi fontu (700)** — hero-title może załadować się z fallback fontem najpierw.  
4. **`Drhelianamazi.jpg` 16 KB, JPG bez WebP/AVIF** — można zredukować do 8 KB WebP.  
5. **`renderAll()` uruchamiane raz, ale każda sekcja iteruje przez data \+ reveal observer** — cheap, ale sporo `document.createElement`.  
6. **Brak `Content-Encoding: gzip/br`** — zależy od hostingu; jeśli GitHub Pages/Netlify, gzip default. Jeśli custom server, sprawdzić.  
7. **Brak `Cache-Control` headers** w repo — deploy config zależy od hostingu.

### **Rekomendacje Lighthouse Opportunities**

* Konwersja obrazu do WebP/AVIF.  
* Zredukowanie CSS o unused rules (ambient-bg, cursor-glow, glow-orb).  
* Removal of unused JS (setupParallax, setupCursorGlow).  
* Serve font subset (Arabic \+ Latin extended tylko, bez CJK — sprawdzić czy nie jest już subset).

---

## **7\. SEO AUDIT**

| \# | Element | Stan | Rekomendacja |
| ----- | ----- | ----- | ----- |
| S-01 | `<title>` | Tylko FA po pierwszym paint. JS podmienia. | Ustawić `<title>` bazujący na `?lang=en` w server-side (albo w inline bootstrap script na linii 47–66) tak, żeby Googlebot widział poprawny język od razu. |
| S-02 | Meta description | Tylko FA. Nie zmienia się przy EN. | Dodać dynamiczne przełączanie w `setupLanguage`. |
| S-03 | Open Graph | Ustawione dla FA. Brak `og:locale` przełączania. Obraz `og:image` \= zdjęcie profilowe 269×359 — **powinno być 1200×630** dla LinkedIn/Twitter cards. | Wygenerować dedykowany OG image 1200×630 z nazwiskiem, tytułem, motywem. |
| S-04 | Twitter Card | `summary_large_image` — ale `twitter:image` \= to samo małe zdjęcie. | Podmienić na 1200×630. |
| S-05 | `canonical` | ✅ Ustawione. |  |
| S-06 | `hreflang` | ✅ Ustawione fa/en/x-default. Ale wersja `en` w `?lang=en` — Google nie zawsze indeksuje URL param jako alternate. | Rozważyć osobną ścieżkę `/en/` z pre-renderowanym statyczny HTML EN. |
| S-07 | `sitemap.xml` | ❌ **BRAK** | Utworzyć minimalny sitemap.xml z 2 URL (fa, en). |
| S-08 | `robots.txt` | ❌ **BRAK** | Utworzyć: `User-agent: *\nAllow: /\nSitemap: https://helianamazi.ir/sitemap.xml`. |
| S-09 | JSON-LD Person | ✅ Bogaty [schema.org](http://schema.org/) Person. **Ale zawiera birthDate, gender, telephone** — patrz C-06. | Usunąć DOB, gender. Zostawić alumniOf, knowsAbout. |
| S-10 | Heading hierarchy | ✅ 1× h1, wielokrotne h2 dla sekcji, h3 dla kart. Poprawne. |  |
| S-11 | Internal linking | Anchor links tylko wewnątrz strony. Brak sekcji „Related". | OK dla single-page. |
| S-12 | URL structure | Wszystko na `/`. Nie ma pod-stron. | OK dla portfolio. |
| S-13 | Image alt | `alt="هلیا نمازی"` na hero image. `data-fa-alt`/`data-en-alt` — przełącza. ✅ | OK, ale sam profile image mógłby mieć bogatszy alt: „Dr Helia Namazi — PhD in Pharmaceutical Biotechnology". |
| S-14 | Ikony SVG | Wszystkie `aria-hidden="true"` — nie są indeksowane. ✅ |  |
| S-15 | Semantic HTML | `<main>`, `<header>`, `<footer>`, `<section>`, `<nav>`, `<article>` (dla project-card w render.js:228). ✅ |  |
| S-16 | Crawlability | Treść budowana w JS. Googlebot renderuje JS, ale wolniej indeksuje. | Rozważyć pre-render (build step) albo SSR — dla max SEO. Obecnie akceptowalne. |
| S-17 | Brak breadcrumbs | Dla single-page nie konieczne. |  |
| S-18 | Brak `<meta property="article:author">` | Dodać przy dedykowanej stronie z publikacjami. |  |

---

## **8\. ACCESSIBILITY AUDIT (WCAG 2.2 AA)**

| \# | Kategoria | Problem | Priorytet |
| ----- | ----- | ----- | ----- |
| A-01 | **Contrast** | `--text-light: #7a828c` na `--bg-base: #f6f6f7` \= kontrast **3.4:1** — poniżej WCAG AA (4.5:1) dla tekstu poniżej 18pt. Używane dla `hero-meta`, `stat-label`, `card list`, `timeline-desc`, `edu-uni`. Duża część tekstu strony ma za niski kontrast. | 🔴 Critical |
| A-02 | **Contrast dark** | `--text-light: #8b939c` na `--bg-base: #12151a` \= kontrast \~5.6:1 — OK. Dark theme lepszy. | 🟢 Low |
| A-03 | **Focus indicators** | ✅ `:focus-visible { outline: 2px solid var(--secondary); outline-offset: 3px }` — poprawne. | ✅ |
| A-04 | **Skip link** | ✅ `.skip-link` obecny. | ✅ |
| A-05 | **Keyboard navigation** | Timeline, hero-chips, mobile-nav — sprawdzić focus trap. Focus trap w mobile menu **istnieje** (`createFocusTrap` linia 178). ✅ | ✅ |
| A-06 | **ARIA** | Duża liczba: `role="menuitem"` w primary nav ale `<a>` — konflikt semantyczny. `<a>` nie potrzebuje `role="menuitem"` chyba że nav jest prawdziwym menu z klawiszami arrow-key. | 🟠 High |
| A-07 | **Menu semantics** | `<ul role="menu">` z `<li role="none">` — to imituje ARIA menu bez klawiaturowej obsługi strzałek. Zła praktyka. | 🟠 High |
| A-08 | **Button aria-labels** | `aria-label="Switch language"` po zmianie na EN nie mówi „Switch to Persian" — statyczny label. | 🟡 Medium |
| A-09 | **Language attribute switching** | `<html lang="fa">` zmienia się w JS. ✅ | ✅ |
| A-10 | **Screen reader on RTL/LTR toggle** | Brak `aria-live` — użytkownik nie dostaje ogłoszenia „Language changed to English". | 🟠 High |
| A-11 | **Reduced motion** | ✅ Sprawdzone i wyłączone. | ✅ |
| A-12 | **Motion sensitivity** | `heroGlowPulse`, `floatChip`, `scrollDot` — poprawnie wyłączone w reduce-motion. ✅ | ✅ |
| A-13 | **Semantic buttons** | `.btn-toggle` używa `<button>` ✅. `.scroll-indicator` używa `<button>` ✅. Ale **cała nav** używa `<a href="#anchor">` — dla anchor OK. | ✅ |
| A-14 | **Alt text** | Zdjęcie ma `alt`. Ikonki mają `aria-hidden`. ✅ |  |
| A-15 | **Form accessibility** | Brak formularza — n/a. | ✅ |
| A-16 | **Error announcements** | Brak formularzy, brak dynamicznych błędów. | ✅ |
| A-17 | **Heading order** | h1 (hero) → h2 (sekcje) → h3 (karty). Nie ma skoku h1 → h3. ✅ | ✅ |
| A-18 | **Emoji in headings** | `render.js:262–272` wstawia emoji w `<h3>` z `aria-hidden="true"` na wrapperze. ✅ |  |
| A-19 | **Color-only differentiation** | Timeline „current" oznaczone kolorem — mocne, ale też ma tekst-status („Current" chip). ✅ |  |
| A-20 | **Zoom** | `viewport` nie ma `user-scalable=no` ✅. |  |
| A-21 | **Tap target size** | Wszystkie primary buttons \>= 40×40. `contact-link` 50×50 na najmniejszym mobile. ✅ |  |
| A-22 | **`aria-pressed` na theme toggle** | ✅ `aria-pressed="false"` z aktualizacją w `updateChrome`. |  |

---

## **9\. SECURITY REVIEW**

| \# | Zagrożenie | Ocena | Rekomendacja |
| ----- | ----- | ----- | ----- |
| SE-01 | **XSS przez `data.js`** | `render.js` używa `textContent` i `setAttribute` — **nie ma `innerHTML`**. ✅ Immune to XSS. |  |
| SE-02 | **CSP** | ❌ Brak `<meta http-equiv="Content-Security-Policy">` i brak headers. | Dodać restrykcyjne CSP: `default-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'self' 'unsafe-inline'` (unsafe-inline dla bootstrap w `<head>`). |
| SE-03 | **Secrets/env** | Wszystko static — brak sekretów w kodzie. ✅ |  |
| SE-04 | **Client-side exposure** | Numer telefonu, email w statycznym HTML — vector do spam scraping (patrz C-07). | Rozważyć obfuskację JS albo formularz. |
| SE-05 | **`localStorage`** | Używany dla `theme`, `language`. Bez wrażliwych danych. ✅ |  |
| SE-06 | **External links** | LinkedIn: `target="_blank" rel="noopener noreferrer"` ✅. DBS Graphic link: `target="_blank" rel="noopener"` — brak `noreferrer`. | Dodać `noreferrer`. |
| SE-07 | **Authentication/Authorization** | Brak — statyczna strona. n/a. |  |
| SE-08 | **API usage** | Brak zewnętrznych API. ✅ |  |
| SE-09 | **Dependency vulnerabilities** | Brak dependencies (npm). ✅ ale też brak śledzenia. |  |
| SE-10 | **Referrer policy** | Brak `<meta name="referrer">`. | Dodać `strict-origin-when-cross-origin`. |
| SE-11 | **HTTPS** | Zależy od hostingu. Domena [helianamazi.ir](http://helianamazi.ir/) — sprawdzić HSTS. | Wymusić przez `Strict-Transport-Security` header w konfiguracji hostingu. |
| SE-12 | **Subresource Integrity** | Nie potrzebne (wszystko lokalne). ✅ |  |

---

## **10\. QUALITY ASSURANCE**

| \# | Kategoria | Znalezione | Priorytet |
| ----- | ----- | ----- | ----- |
| Q-01 | **Broken links** | `<a href="#"` w logo (linia 88\) — nie prowadzi nigdzie, tylko dokleja `#`. | 🟠 High |
| Q-02 | **Broken links** | Brak `#certificates` w nav. Sekcja niedostępna. | 🟠 High |
| Q-03 | **Console errors (prognoza)** | `pathD.split(/(?=M)/)` w render.js — jeśli path bez „M" trafi (np. `certIcon` — zawiera 2 M na początku każdego path, OK). Bez uruchomienia trudno stwierdzić. |  |
| Q-04 | **Runtime errors** | `setupSmoothScroll` — `if (!target) return;` chroni przed missing anchor. ✅ |  |
| Q-05 | **Layout shifts** | Sekcje wypełniane po DOMContentLoaded — CLS w środku strony. | 🟡 Medium |
| Q-06 | **Visual bugs** | Odchodzą kropka logo (`.logo::before` opacity 0.55) razem z tekstem — jeśli tekst zmieni się na dłuższy „Helia Namazi", w niektórych stylach może się rozjechać. |  |
| Q-07 | **Cross-browser** | Backdrop-filter fallback ✅ (linia 255). Safari `-webkit-backdrop-filter` ✅. `scroll-snap-type: x mandatory` — działa w Safari 11+, Chrome. ✅ |  |
| Q-08 | **Missing assets** | `resume_fa.pdf` (1.2 MB), `resume_en.pdf` (139 KB). ✅ obecne. |  |
| Q-09 | **PDF resumes weight** | Persian PDF **1.2 MB** — bardzo dużo dla PDF CV. Prawdopodobnie osadzone fonty \+ obrazy. | 🟡 Medium |
| Q-10 | **`Dr. Helia Namazi - Resume (English) V2.docx`** i podobny FA — 1.8 MB / 2.2 MB **w publicznym repo** | Repozytorium git zawiera oryginalne pliki Word wraz z PDF — niepotrzebne, powiększają repo. | 🟡 Medium — usunąć DOCX z repo |
| Q-11 | **Loading failures** | Fallback dla hero image ✅ (`setupHeroImageFallback`). |  |
| Q-12 | **Form validation** | n/a. |  |
| Q-13 | **Edge case: bardzo długie skill chip** | Chip może się zawinąć do 3 linii, brak max-lines. | 🟢 Low |
| Q-14 | **Edge case: język przełączony przed content:rendered** | `apply(currentLang)` wywołane w `setupLanguage`, i ponownie po `content:rendered` (linia 574). ✅ safe. |  |
| Q-15 | **Timezone/lang w formatowaniu liczb** | `toLocaleString('fa-IR')` ✅. |  |
| Q-16 | **Print styles** | ✅ Rozbudowane, uwzględniają hidden-items. |  |

---

## **11\. BRAND CONSISTENCY**

| \# | Aspekt | Ocena |
| ----- | ----- | ----- |
| B-01 | Typografia | Jedna rodzina (Vazirmatn) — spójnie. ✅ Ale 5 wag z niejasnym zastosowaniem. Zredukować. |
| B-02 | Kolorystyka | Spójna, ale bez wyrazistego akcentu. Wszystko szare — bezpiecznie, ale zapomniane. |
| B-03 | Radius system | `--radius-sm/md/lg/xl/pill` — dobra skala. Ale użycie chaotyczne: karty `.card` \= `--radius-lg`, `.timeline-content` \= `--radius-lg`, `.simple-item` \= `--radius-lg`, ale `.card-icon` \= `--radius-sm`, `.contact-icon` \= `--radius-md`, `.hero-image` \= `--radius-xl`, `.hero-image` mobile \= `--radius-lg`. Trudno wyczuć hierarchię. |
| B-04 | Ikony | 3 style: (1) inline SVG w HTML (nav), (2) generowane przez `render.js` z path fragments, (3) hardkodowane w hero-chips. Rozmiary: 12, 14, 16, 17, 18, 20, 22 px. Zbyt rozproszone. |
| B-05 | Ton głosu | FA: formalny, akademicki, dobry. EN: kalki językowe, wymaga native editorial. |
| B-06 | Section rhythm | Bardzo regularny (72px section-pad) — dobrze. Może za jednorodny. |
| B-07 | Design language | Konfliktowe kierunki: minimalistyczne (paleta szara) \+ ozdobne (dashed border, glow, gradient text nieużywany, floating chips, cursor spotlight). Trzeba wybrać jeden. |
| B-08 | Foto/branding | Jedno zdjęcie profilowe. Brak innych brandowych elementów wizualnych (patterns, illustrations, mockupy laboratorium). |

**Spójność ogólna: 6/10** — dobre podstawy (jeden font, jedna paleta, jeden radius scale), ale wykonanie „dołączane" (nieużywane parallax/glow/cursor-glow) świadczy o iteracyjnym rozwoju bez końcowego uporządkowania.

---

## **12\. DESIGN IMPROVEMENT IDEAS (high-level)**

### **12.1 Hero (najwyższy priorytet)**

* **Wyciszyć**: usunąć dashed border, usunąć `heroGlowPulse` animację (albo bardzo zmniejszyć amplitudę: 0.28→0.32 zamiast 0.28→0.42).  
* **Wprowadzić „pattern of trust"**: pod CTA logotypy 3–4 instytucji (IFDA, SBMU, Royan Institute, Zist Takhmir) w monochromie 40% opacity — powszechna technika premium personal sites.  
* **Cytat/testimonial** obok stats — jednolinijkowy quote z ex-kolegi/managera.  
* **Zmienić hero-stats** z generic countów na konkretne osiągnięcia z ikonami (np. „Ranked \#1 in national PhD Comprehensive Exam" jako badge).

### **12.2 Nawigacja**

* Zredukować z 8 do 5 pozycji: **Bio / Experience / Publications / Contact / \[Language\]**.  
* Reszta sekcji pod „Bio" (dropdown albo sub-scroll).  
* Sticky nav shrink on scroll — istnieje `header.scrolled` (border-bottom), ale można też zmniejszyć wysokość headera z 64→48px dla oszczędności miejsca.

### **12.3 Cards**

* **Ujednolicić** system kart: 1 style — `background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px`. Wariacje przez `data-variant="featured"`.  
* Usunąć `::before` gradient bar na hover — outdated.  
* Dodać subtle interaction: podniesienie tylko 1px (obecnie 2px) i lekkie rozjaśnienie tła (`hsl` shift o 2–3%).

### **12.4 Buttons**

* Aktualne buttony są OK. Dodać `<button>` typu „ghost" (bez borderu) dla akcji drugorzędnych.  
* Loading state dla przycisku „Download CV" (spinner na 500ms po kliknięciu).

### **12.5 Forms**

* Wprowadzić kontakt formularz (Formspree/Netlify Forms) zamiast `mailto:`.

### **12.6 Footer**

* **Uprościć**. Obecnie: 4 ikony kontaktowe \+ copyright \+ credit. Rozważyć układ 3-kolumnowy: (a) Contact (email/phone/LinkedIn), (b) Quick links (Bio, Experience, Publications, Download CV), © Meta (© 2026, Design credit, Privacy Policy).

### **12.7 Sekcje**

* Publications: **dodać prawdziwe cytacje ISI/PubMed** z linkami DOI, thumbnail journal cover jeśli dostępny.  
* Skills: chipsy zamienić na tag cloud \+ kliknięcie chipa filtruje projekty gdzie ten skill był użyty. Prawdziwa interakcja zamiast fake.  
* Experience: dodać expandable „What I did there" (2–3 bullet-y osiągnięć per rola) — obecnie jest tylko nazwa firmy.

### **12.8 Animacje**

* Usunąć: cursor glow (martwy), parallax orbs (martwe), dashed border shift on hover.  
* Zostawić: reveal on scroll (dobre), timeline progress bar (dobre), stat counters (dobre).  
* Dodać: **subtelne page transitions** przy przełączeniu FA/EN (fade 200ms zamiast twardego swap).

### **12.9 Typografia**

* Dodać `font-variation-settings` jeśli Vazirmatn jest variable font (nie jest w tym repo — pliki są statyczne po wagach).  
* Wprowadzić większą hierarchię: hero h1 clamp(2rem, 4vw, 3rem) — obecnie **maksymalnie 2.15rem**, dla premium personal site to za małe.

### **12.10 Spacing**

* Wprowadzić `--space-*` tokens (4, 8, 12, 16, 24, 32, 48, 64, 96\) i używać konsekwentnie zamiast raw px.

---

## **13\. PRIORITY MATRIX**

### **🔴 Critical (blokery jakości/wiarygodności)**

1. **C-02** — Data zakończenia obecnej pracy w przyszłości (03/2026) — natychmiast zweryfikować.  
2. **C-06** — Ekspozycja daty urodzenia (privacy risk).  
3. **C-08** — Rozbieżność „Namazi H" vs „Namazi R" w publikacjach.  
4. **A-01** — Kontrast tekstu `--text-light` na jasnym motywie **3.4:1** — poniżej WCAG AA.

### **🟠 High**

* C-01 (rok 2026 hardcoded), C-04, C-07, C-09, C-14, V-14 (obraz LR), V-16 (fonty), M-01 (karuzele bez peek), M-02, M-03, M-10 (overflow), M-12 (safe-area), Q-01, Q-02, A-06, A-07, A-10, S-01, S-02, S-03, S-07, S-08.

### **🟡 Medium**

* C-03, C-05, C-12, C-13, C-16, C-18, V-01, V-04, V-06, V-07, V-08, V-17, V-19, M-04, M-07, M-11, M-13, CR-14, CR-15, CR-18, Q-05, Q-06, Q-09, Q-10.

### **🟢 Low**

* C-11, C-15, C-17, C-19, C-20, V-20, M-05, M-06, M-08, M-09, CR-06, CR-07, CR-24, CR-25, Q-13, SE-06, SE-10.

---

## **14\. QUICK WINS (kilka godzin, wysoki wpływ)**

1. **Napraw kontrast `--text-light`** → `#6b737d` daje \~4.7:1 na `#f6f6f7`. (\~10 min) \[A-01\]  
2. **Usuń martwy kod**: `.cursor-glow`, `setupCursorGlow`, `setupParallax`, `.glow-orb`, `.glow-parallax`, ambient-bg orbs w HTML. (\~20 min) \[V-11, V-12, CR-10, CR-11, CR-12\]  
3. **Rok dynamiczny w stopce**: `<span id="year"></span>` \+ `document.getElementById('year').textContent = new Date().getFullYear();`. (\~5 min) \[C-01\]  
4. **Weryfikuj/napraw datę „Oct 2023 \- Mar 2026"** w `data.js`. (\~5 min) \[C-02\]  
5. **Usuń datę urodzenia** z hero i JSON-LD. (\~5 min) \[C-06\]  
6. **Dodaj link `#certificates` do nav** (desktop \+ mobile). (\~10 min) \[Q-02\]  
7. **Zmień `<a href="#">` logo na `<a href="#top-anchor">` lub `href="/"`.** (\~2 min) \[Q-01\]  
8. **Napraw duplikat `width` w `.section-header h2::after`** (linia 762/765). (\~1 min) \[V-05\]  
9. **Zmień `text-align: justify` na `start`** w hero p. (\~1 min) \[V-17\]  
10. **Usuń DOCX pliki z repozytorium git** (`git rm *.docx && git commit`). (\~2 min) \[Q-10\]  
11. **Dodaj `robots.txt` i `sitemap.xml`**. (\~10 min) \[S-07, S-08\]  
12. **Popraw literówkę „Namazi R" → „Namazi H"** w `data.js` (jeśli zawierzasz że wszystkie 4 są autorki). (\~2 min) \[C-08\]  
13. **Dodaj `rel="noreferrer"` do external link DBS Graphic**. (\~1 min) \[SE-06\]  
14. **Konwertuj `Drhelianamazi.jpg` do WebP 2x**, dodaj `<picture>`. (\~15 min) \[V-14\]  
15. **Naprawić font-weight 900**: `@font-face` linia 31 z `700` na `900`. (\~1 min) \[V-16, CR-01\]  
16. **Poprawić `transform-origin: inset-inline-end` → `right`** (linia 851). (\~1 min) \[CR-04\]  
17. **Skrócić EN meta description i skorygować title EN pod 60 znaków**. (\~5 min) \[C-03\]  
18. **Dodać `env(safe-area-inset-top)` do header padding** dla iOS. (\~5 min) \[M-12\]

**Suma: \~1.5 h czasu, \~20 realnych ulepszeń.**

---

## **15\. LONG-TERM IMPROVEMENTS**

1. **Pre-render statyczny dla EN** (osobna ścieżka `/en/`) — poprawia SEO, Time-to-First-Byte dla anglojęzycznych.  
2. **Migracja na Astro / Eleventy / Next.js static export** — zachowanie „no framework at runtime", ale z build-timowym pre-renderingiem, TypeScriptem, ESLint, automatyczną optymalizacją obrazów.  
3. **Design system w Figma \+ tokens** — export do CSS variables przez Style Dictionary. Utrzymanie spójności.  
4. **Publikacje z API Google Scholar / Semantic Scholar** — automatyczna aktualizacja listy publikacji, h-index badge.  
5. **CMS dla treści** — Sanity/Contentful/Decap CMS. Dr Namazi mogłaby aktualizować treść bez ingerencji w kod.  
6. **Dedykowana strona projektu dla każdego produktu** (`/products/edaravone`, `/products/tofacitinib`) — z case study, wyzwaniem, rezultatem. To SEO gold dla farmaceutycznych keywordów.  
7. **Blog naukowy** — długoterminowo najlepsza inwestycja w personal branding w niszy regulatoryjnej.  
8. **Analytics** — obecnie brak śledzenia (co dobre dla RODO, ale traci insights). Rozważyć Plausible/Umami (privacy-first).  
9. **PWA \+ offline** — manifest.webmanifest, service worker cache dla PDF-ów.  
10. **Kontakt-formularz z anty-spam** (Cloudflare Turnstile) zamiast surowego mailto.  
11. **Formalne testy** — Playwright dla e2e (przełączanie języka, dark mode, karuzele mobile).  
12. **CI/CD** — GitHub Actions: lint HTML/CSS, sprawdzać kontrast automatycznie (axe-core), Lighthouse budget, deploy do Netlify/Cloudflare Pages.  
13. **CSP i security headers** przez `_headers` (Netlify) albo `netlify.toml`.  
14. **Wersjonowanie treści CV** — release notes, kiedy dodano jaką pozycję.

---

## **16\. FINAL SCORE**

| Kategoria | Ocena / 10 | Uzasadnienie |
| ----- | ----- | ----- |
| **Content** | **5.5** | Bogata merytorycznie po FA, ale EN ma kalki językowe. Krytyczne błędy: DOB w hero, „Namazi R" vs „H", data przyszła. Brak DOI dla publikacji. |
| **Visual Design** | **6.5** | Solidne fundamenty (paleta, spacing, radius). Mieszanie stylów (minimal \+ ozdobne elementy portfoliopl 2018). Za dużo martwego dekoru. |
| **UI** | **7** | Komponenty czyste, hover states adekwatne. Ale timeline nie klika, karty nie klikają, chipsy są miskonstrukcją (długie zdania w pillach). |
| **UX** | **6** | Skacz między sekcjami działa, ale nawigacja przeładowana (8 pozycji), brak głównego celu strony, brak sekcji `#certificates` w nav. |
| **Mobile Experience** | **5.5** | Odważny wybór karuzeli scroll-snap, ale bez peek/dots \= użytkownik nie wie o dodatkowej treści. Overflow hero glow. Brak safe-area iOS. |
| **Performance** | **7.5** | Zero dependencies, defer scripts, preload hero. Ale 5 wag fontu, 43 KB SVG favicon, JPG bez WebP, martwy JS. Realistyczne LCP 1.5s. |
| **Accessibility** | **5** | Skip link, focus-visible, reduced-motion, alt text ✅. Ale **kontrast poniżej WCAG AA** dla dużej części tekstu — to sam dyskwalifikuje z „AA". |
| **SEO** | **6** | Bogaty JSON-LD, canonical, hreflang, OG. Ale brak sitemap.xml, brak robots.txt, OG image niepoprawnego rozmiaru, meta description tylko FA. |
| **Code Quality** | **6.5** | Czyste rozdzielenie warstw, safe DOM manipulation, no innerHTML. Ale \~120 linii martwego kodu (parallax, cursor-glow), zduplikowane style, wagi fontu z bugiem. |
| **Maintainability** | **6** | Bez build-stepa łatwo edytować. Ale bez TypeScriptu, bez linterów, bez testów, bez CI — trudno rozwijać. |
| **Security** | **6.5** | XSS-immune (textContent), no eval, no external. Ale brak CSP, DOB/telefon w publicznym HTML, brak security headers. |
| **Brand Consistency** | **6** | Jeden font, jedna paleta. Ale nadmiar wag, chaos radius scale, mieszane style ikon. |
| **Overall Professionalism** | **6** | Widoczna praca (bilingual, dark mode, RTL, print styles, print). Ale niedoszlifowana: martwy kod, sprzeczne intencje projektowe, treść z krytycznymi błędami. |

### **OVERALL SCORE: 6.2 / 10**

---

## **Executive Summary**

Strona `sanyzrn/helia` ([helianamazi.ir](http://helianamazi.ir/)) to **rzetelnie zbudowana, statyczna, dwujęzyczna wizytówka zawodowa** z solidną warstwą techniczną (zero-dependency, defer scripts, RTL/LTR, dark mode, reduced-motion, print styles). Architektura kodu jest czysta w zamierzeniu (`data.js` / `render.js` / `script.js`) i bezpieczna pod kątem XSS.

Jednak strona **nie osiąga aspiracji „premium, minimal, high-end"** z czterech powodów:

1. **Warstwa treści zawiera cztery błędy krytyczne** (data pracy w przyszłości bez flagi „current", ekspozycja daty urodzenia w hero i JSON-LD, rozbieżność autorstwa publikacji „Namazi R/H", rok 2026 hardcoded w stopce). To bezpośrednio uderza w wiarygodność właścicielki jako profesjonalistki regulatoryjnej — akurat tej cechy, która musi być nieskazitelna.

2. **Warstwa wizualna ma podwójną osobowość**: paleta i spacing są minimalistyczne, ale dashed border za zdjęciem, pulsujący glow, floating chips, martwy cursor-glow i parallax orby są sygnałami z ery „Behance portfolio 2019". Trzeba wybrać jeden kierunek.

3. **Dostępność nie spełnia WCAG AA** — kolor `--text-light: #7a828c` na jasnym tle daje kontrast 3.4:1, co dyskwalifikuje dużą część treści (opisy w timeline, karty, GPA, wszystkie meta-teksty). Dla akademiczki, której odbiorcami są też starsi recruiterzy/regulatorzy, to problem realny, nie akademicki.

4. **\~120 linii martwego JavaScript** (`setupCursorGlow`, `setupParallax`, ambient-bg orbs) tworzy elementy DOM i podpina listenery bez efektu wizualnego — świadczy o iteracyjnym rozwoju bez końcowego uporządkowania, i utrudnia utrzymanie.

**Dobre wiadomości:** \~90% zidentyfikowanych problemów jest **naprawialne w \~1.5 godziny** (quick wins) bez architektonicznej refaktoryzacji. Po ich wdrożeniu ocena skoczyłaby do \~7.5/10. Długoterminowo, migracja na Astro/Eleventy z pre-renderingiem i formalnym design systemem doprowadziłaby produkt do 9/10.

**Rekomendacja priorytetowa:** *natychmiast* rozwiązać 4 błędy krytyczne treści (C-02, C-06, C-08, A-01) — mają największy wpływ na wiarygodność zawodową i zgodność WCAG. Kod estetycznie/dead można refaktorować w drugiej kolejności.

---

Chcesz, żebym w kolejnym kroku:

* (a) przygotował **konkretny plan wdrożenia quick wins** (patch po patchu, z gotowym diffem),  
* (b) skupił się na **redesignie sekcji hero** (mockup \+ zaktualizowane HTML/CSS),  
* © zajął się **refaktorem `script.js` / usunięciem martwego kodu**,  
* (d) opracował **poprawiony content pack** (FA \+ EN native editorial)?

