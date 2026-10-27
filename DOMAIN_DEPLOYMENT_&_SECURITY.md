# 🛡️ ڕێبەری دۆمەین و پاراستنی ئەمنی (Domain Deployment & Security Guide)
### C.I.S Cedars International College Digital Campus

---

## 🌟 کورتەی بەهێزکردنی ئەمنی (Security Hardening Summary)

سیستەمەکە ئێستا ١٠٠٪ ئامادەیە بۆ بەستنەوە بە هەر دۆمەینێکی ڕاستەقینە (نموونە: `cis-college.edu.krd` یان `cis-iraq.com`) بە بەرزترین ستانداردەکانی سایبەر سیکیوریتی:

1. **پاراستنی بەهێزی ئەدمین (SHA-256 Passcode Protection)**:
   - پێشتر چوونەژوورەوەی ئەدمین بەبێ وشەی نهێنی بوو. ئێستا وشەی نهێنی سەرەکی (Master Passcode) دانراوە کە بە شێوازی کرپتۆگرافی `SHA-256` هاش (Hash) دەکرێت.
   - وشەی نهێنی بنەڕەتی (Default): `cis2026admin`
   - دەتوانیت لە بەشی نوێی **"Cyber Security & Domain Hub"** لەناو داشبۆردی ئەدمین وشەی نهێنی نوێ دابنێیت.

2. **بەرگری دژی هێرشی دووبارە (Anti-Brute Force Rate Limiter)**:
   - ئەگەر هەرکەسێک یان بۆتێک ٥ جار وشەی نهێنی بە هەڵە لێبدات، فۆڕمەکە بۆ ماوەی **٦٠ چرکە قفڵ دەبێت** و تایمەری ڕاگرتن نیشان دەدات.

3. **پاراستنی دانیشتنەکان دژی ساختەکاری (Anti-Tamper Cryptographic Token)**:
   - ئەگەر کەسێک لە ڕێگەی کونسۆڵی براوسەر (DevTools) هەوڵ بدات رۆڵی خۆی بگۆڕێت بۆ ئەدمین (`localStorage.setItem('cis_user_type', 'admin')`)، سیستەمەکە واژۆی دیجیتالیەکە (HMAC Signature) دەپشکنێت، دەستکاریەکە دەدۆزێتەوە و ڕاستەوخۆ دانیشتنەکە دەسڕێتەوە و دەستڕاگەیشتن بلۆک دەکات.

4. **سەرپۆشی ئەمنی سێرڤەر و دۆمەین (Server Security Headers)**:
   - پڕۆژەکە خاوەنی فایلی تەواوی `.htaccess`، `_headers`، و `vercel.json`ـە کە ئەم پارێزەرانە کارا دەکەن:
     - **Content Security Policy (CSP)**: ڕێگری لە دزینی داتا و سکرێپتی دەرەکی.
     - **X-Frame-Options (SAMEORIGIN)**: پاراستن دژی هێرشی Clickjacking.
     - **X-Content-Type-Options (nosniff)**: ڕێگری لە فایلی ساختە.
     - **Strict-Transport-Security (HSTS)**: زۆرەملێکردنی پرۆتۆکۆڵی پارێزراوی HTTPS (SSL).

---

## 🚀 چۆنێتی بەستنەوە بە دۆمەین (Step-by-Step Domain Deployment)

### ڕێگای یەکەم: هاوستینگی باو (cPanel / Apache / Hostinger / Namecheap)
1. بچۆ ناو کۆنتڕۆڵ پانێڵی هاوستینگەکەت (**cPanel** یان **Hostinger hPanel**).
2. بڕۆ بەشی **File Manager** -> فۆڵدەری **`public_html`**.
3. هەموو فایلەکانی ناو ئەم فۆڵدەرەی وێبسایتەکە ئەپلۆد بکە (دڵنیابە لە فایلی `.htaccess` کە بە نهێنی نەمێنێتەوە).
4. لە بەشی **SSL / TLS** بڕوانامەی بێبەرامبەری **Let's Encrypt SSL** کارا بکە بۆ ئەوەی قفڵی سەوز لەسەر دۆمەینەکە دەربکەوێت (`https://`).

### ڕێگای دووەم: سێرڤەری هەوری (Cloudflare Pages یان Vercel)
1. فۆڵدەری پرۆژەکە ببەستەوە بە ئەکاونتی GitHub.
2. لە Cloudflare Pages یان Vercel پرۆژەکە داخڵ بکە (Deploy). فایلەکانی `_headers` و `vercel.json` خۆیان ئۆتۆماتیکی هەموو سیکیوریتیەکان کارا دەکەن.
3. دۆمەینی فەرمی خۆت (`your-college.edu.krd`) ببەستەوە بە ڕێکخستنی DNS (A Record / CNAME).

---

## 🔑 زانیارییە گرنگەکان بۆ بەڕێوەبەر (Important Admin Credentials)

- **Admin Account ID**: `CIS-ADM-01` (ژیار هێمن - Zhiyar Hemn)
- **Initial Master Passcode**: `cis2026admin`
- **Security Hub Location**: لە پۆڕتاڵی ئەدمین -> تابەی ژمارە ٧ بە ناوی `🛡️ Cyber Security & Domain`.
