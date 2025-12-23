import { defineField, defineType } from 'sanity'

export default defineType({
  // 🔴 FIX: Changed from 'NasaHome' to 'homePage' to match your error
  name: 'homePage',
  title: 'Home Page (Nasa Ige)',
  type: 'document',
  
  // 🟢 WORDPRESS STYLE TABS
  groups: [
    { name: 'hero', title: '1. Hero & Header' },
    { name: 'countdown', title: '2. Countdown' },
    { name: 'priorities', title: '3. Priorities Grid' },
    { name: 'about', title: '4. About & Vision' },
    { name: 'timeline', title: '5. Journey Timeline' },
    { name: 'gallery', title: '6. Gallery & Quote' },
    { name: 'advisors', title: '7. Advisors' },
    { name: 'trail', title: '8. Campaign Trail' },
    { name: 'testimonials', title: '9. Testimonials' },
    { name: 'manifesto', title: '10. Manifesto Downloads' },
    { name: 'blog', title: '11. News & Media' },
    { name: 'shop', title: '12. Shop' },
    { name: 'footer', title: '13. Footer & Settings' },
  ],
  fields: [
    // ============================================================
    // 1. HERO SECTION
    // ============================================================
    defineField({
      name: 'candidateName',
      title: 'Candidate Name (Header)',
      type: 'string',
      group: 'hero',
      initialValue: 'Nasa Ige.',
    }),
    defineField({
      name: 'heroTopTag',
      title: 'Hero Top Tag (Uppercase)',
      type: 'string',
      group: 'hero',
      initialValue: 'SOOMAALIYA WAA HAL QARAN',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Main Title (Somali)',
      type: 'string',
      group: 'hero',
      initialValue: 'Maskax Cusub, Mustaqbal Ifaya',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Main Image (Candidate Photo)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroQuoteSomali',
      title: 'Hero Quote (Somali)',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Dhalinyaradu Waa Awoodda Qaranka Iyo Laf-dhabarta Isbedelka Dhabta Ah.',
    }),
    defineField({
      name: 'heroQuoteEnglish',
      title: 'Hero Quote (English)',
      type: 'text',
      rows: 4,
      group: 'hero',
      initialValue: 'Youth are the strength of the nation. It is time to unite our voices, drive innovation, and build a lasting legacy of peace, shared prosperity, and limitless opportunity for everyone on the global stage.',
    }),

    // ============================================================
    // 2. COUNTDOWN & ACTION CARDS
    // ============================================================
    defineField({
      name: 'targetDate',
      title: 'Election Date (For Countdown)',
      type: 'date',
      group: 'countdown',
      initialValue: '2026-05-15',
    }),
    defineField({
      name: 'countdownTitle',
      title: 'Countdown Title',
      type: 'string',
      group: 'countdown',
      initialValue: 'Election Day 2026',
    }),
    defineField({
      name: 'joinLink',
      title: 'Join Network Link',
      type: 'url',
      group: 'countdown',
      initialValue: 'https://somaliyouthparty.com',
    }),
    defineField({
      name: 'actionCards',
      title: 'Action Cards (4 Boxes)',
      type: 'array',
      group: 'countdown',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'subtitle', type: 'string' },
          { name: 'iconClass', type: 'string', title: 'FontAwesome Class (e.g. fa-solid fa-check)' },
          { name: 'color', type: 'string', title: 'Color Theme (Blue/White)', options: {list: ['white', 'blue']} }
        ]
      }],
      initialValue: [
        { title: 'Register to Vote', subtitle: 'Make your voice heard.', iconClass: 'fa-solid fa-check-to-slot', color: 'white' },
        { title: 'Attend Events', subtitle: 'Meet Nasa Ige.', iconClass: 'fa-regular fa-calendar-check', color: 'white' },
        { title: 'Get Involved', subtitle: 'Make a real impact.', iconClass: 'fa-solid fa-bullhorn', color: 'blue' },
        { title: 'Support Vision', subtitle: 'Help us build the future.', iconClass: 'fa-solid fa-handshake', color: 'white' },
      ]
    }),

    // ============================================================
    // 3. PRIORITIES
    // ============================================================
    defineField({
      name: 'priorities',
      title: 'Priorities Grid',
      type: 'array',
      group: 'priorities',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'desc', type: 'string' },
          { name: 'icon', type: 'string', title: 'FontAwesome Icon' }
        ]
      }],
      initialValue: [
        { title: 'Economic', desc: 'Sustainable growth.', icon: 'fa-solid fa-chart-line' },
        { title: 'Medical', desc: 'Accessible healthcare.', icon: 'fa-solid fa-heart-pulse' },
        { title: 'Social', desc: 'Equality for all.', icon: 'fa-solid fa-users' },
        { title: 'Security', desc: 'National safety.', icon: 'fa-solid fa-shield-halved' },
        { title: 'Education', desc: 'Universal literacy.', icon: 'fa-solid fa-graduation-cap' },
        { title: 'Water', desc: 'Clean access.', icon: 'fa-solid fa-droplet' },
        { title: 'Energy', desc: 'Renewable power.', icon: 'fa-solid fa-solar-panel' },
        { title: 'Fisheries', desc: 'Resource protection.', icon: 'fa-solid fa-fish-fins' },
      ]
    }),

    // ============================================================
    // 4. ABOUT & VISION
    // ============================================================
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      group: 'about',
    }),
    defineField({
      name: 'aboutQuote',
      title: 'Quote Overlay on Image',
      type: 'string',
      group: 'about',
      initialValue: 'True leadership is not just about power, it is about empowering the people.',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      group: 'about',
      initialValue: 'Women are the Vital Backbone of our Thriving Society.',
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Description (Pledge)',
      type: 'text',
      group: 'about',
      initialValue: 'If entrusted with the presidency, I make a solemn pledge to shatter historical barriers by appointing a highly qualified, visionary woman to serve as our nation\'s next Prime Minister.',
    }),

    // ============================================================
    // 5. TIMELINE
    // ============================================================
    defineField({
      name: 'timeline',
      title: 'The Journey Timeline',
      type: 'array',
      group: 'timeline',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', type: 'string', title: 'Year' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'tag', type: 'string', title: 'Category Tag' }
        ]
      }],
      initialValue: [
        { year: '2012', title: 'Restored electricity.', tag: 'Infrastructure' },
        { year: '2015', title: 'Galmudug Dialogue.', tag: 'Diplomacy' },
        { year: '2018', title: 'Built 20 schools.', tag: 'Education' },
        { year: '2021', title: 'National Task Force.', tag: 'Health' },
        { year: '2024', title: 'Launched Campaign.', tag: 'Leadership' },
      ]
    }),

    // ============================================================
    // 6. GALLERY & QUOTE
    // ============================================================
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      group: 'gallery',
      of: [{ type: 'image' }],
      description: 'Upload the 10 grid images here.'
    }),
    defineField({
      name: 'parallaxQuote',
      title: 'Parallax Section Quote',
      type: 'text',
      group: 'gallery',
      initialValue: 'Waxaan rabnaa i aan awooda dib ugu celino Dhalinyarada, sidoo kalena talada dalka qaybtooda aan siino haweenka',
    }),

    // ============================================================
    // 7. ADVISORS
    // ============================================================
    defineField({
      name: 'advisors',
      title: 'Strategic Advisors',
      type: 'array',
      group: 'advisors',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'role', type: 'string' },
          { name: 'quote', type: 'text' },
          { name: 'photo', type: 'image' }
        ]
      }],
      initialValue: [
        { name: "Dr. A. Yusuf", role: "Chief Economic Advisor", quote: "His understanding of the challenges faced by farmers is what we need." },
        { name: "Fatima H. Ali", role: "Social Policy Director", quote: "A true independent voice who prioritizes women." },
        { name: "Gen. M. Farole", role: "Security Strategist", quote: "Strength through unity. His plan is the only path." }
      ]
    }),

    // ============================================================
    // 8. CAMPAIGN TRAIL
    // ============================================================
    defineField({
      name: 'campaignEvents',
      title: 'Campaign Trail Events',
      type: 'array',
      group: 'trail',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'date', type: 'string' },
          { name: 'category', type: 'string' },
          { name: 'desc', type: 'text' },
          { name: 'location', type: 'string' },
          { name: 'videoUrl', type: 'url', title: 'Facebook/Video Link' }
        ]
      }],
      initialValue: [
         { date: 'NOV 24, 2025', category: 'International Tour', title: 'Grand Diaspora Welcome in Sweden', desc: 'Presidential Candidate Nasa Ige receives a thunderous reception...', location: 'Sweden', videoUrl: 'https://www.facebook.com/watch/?v=1166128272402732' },
         { date: 'NOV 25, 2025', category: 'Gala Event', title: 'Sweden Victory Ceremony', desc: 'An electric atmosphere at the "Xaflada Sweden"...', location: 'Stockholm, Sweden', videoUrl: 'https://www.facebook.com/watch/?v=1166128272402732' },
         { date: 'DEC 15, 2025', category: 'Keynote Speech', title: 'The Garowe Declaration', desc: 'A pivotal moment in Puntland...', location: 'Garowe, Puntland', videoUrl: 'https://www.facebook.com/watch/?v=1424889892385666' }
      ]
    }),

    // ============================================================
    // 9. TESTIMONIALS
    // ============================================================
    defineField({
      name: 'testimonials',
      title: 'Voter Testimonials',
      type: 'array',
      group: 'testimonials',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'role', type: 'string' },
          { name: 'text', type: 'text' },
          { name: 'photo', type: 'image' }
        ]
      }],
      initialValue: [
        { name: "Fatima Ali", role: "Teacher", text: "Waxbarashadu waa mustaqbalka. Guul Nasa!" },
        { name: "Mohamed Abdi", role: "Fisherman", text: "Dhaqaalaha dalka wuu kobcinayaa." },
        { name: "Ayan Hassan", role: "Entrepreneur", text: "Nabad iyo nolol baan rabnaa." },
      ]
    }),

    // ============================================================
    // 10. MANIFESTO (LINK OR FILE)
    // ============================================================
    defineField({
      name: 'manifestoDownloads',
      title: 'Manifesto Files',
      type: 'array',
      group: 'manifesto',
      of: [{
        type: 'object',
        fields: [
            { name: 'title', type: 'string', title: 'Button Title (e.g. Economic Plan)' },
            { name: 'icon', type: 'string', title: 'FontAwesome Class' },
            // 🟢 HYBRID UPLOAD SYSTEM
            { name: 'fileUpload', type: 'file', title: 'Upload PDF File' },
            { name: 'externalLink', type: 'url', title: 'OR External Link (Google Drive)' },
        ]
      }],
      initialValue: [
          { title: 'Economic Plan', icon: 'fa-solid fa-file-pdf' },
          { title: 'Security Brief', icon: 'fa-solid fa-shield-halved' }
      ]
    }),

    // ============================================================
    // 11. BLOG & MEDIA
    // ============================================================
    defineField({
      name: 'newsItems',
      title: 'News & Press Items',
      type: 'array',
      group: 'blog',
      of: [{
        type: 'object',
        fields: [
            { name: 'title', type: 'string' },
            { name: 'date', type: 'string' },
            { name: 'excerpt', type: 'text' },
            { name: 'tag', type: 'string' },
            { name: 'link', type: 'url' },
            { name: 'image', type: 'image' }
        ]
      }],
      initialValue: [
        { title: 'Nasa Ige Officially Declares Candidacy for 2026 Presidency', date: 'Nov 18, 2025', excerpt: 'Former Senior Political Advisor announces his bid...', tag: 'Official Statement', link: 'https://www.facebook.com/onderzoekJournalist/posts/somali-politician-Nasa-ige-who-previously-served-as-a-senior-political-advisor-/1374233577401102/' },
        { title: 'Historic Promise: Appointing a Female Prime Minister', date: 'Dec 02, 2025', excerpt: 'Breaking barriers: Nasa Ige vows to empower women...', tag: 'Policy Pledge', link: 'https://www.soomaalinimo.com/2025/12/somalia-presidential-candidate-nasa-ige.html' }
      ]
    }),
    defineField({
      name: 'marqueeBrands',
      title: 'Marquee Media Names',
      type: 'array',
      group: 'blog',
      of: [{ type: 'string' }],
      initialValue: ['BBC SOMALIA', 'AL JAZEERA', 'Hiiraan Online', 'The EastAfrican', 'Universal TV', 'Goobjoog News', 'Garowe Online', 'SNTV', 'VOA Somali']
    }),

    // ============================================================
    // 12. SHOP
    // ============================================================
    defineField({
      name: 'shopProducts',
      title: 'Shop Products',
      type: 'array',
      group: 'shop',
      of: [{
        type: 'object',
        fields: [
            { name: 'name', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'subtitle', type: 'string' },
            { name: 'badge', type: 'string', title: 'Badge (NEW, HOT, SALE)' },
            { name: 'image', type: 'image' }
        ]
      }],
      initialValue: [
          { name: 'The "Unity" Tee', price: '$10.00', subtitle: '100% Cotton, Somalia Blue', badge: 'NEW' },
          { name: 'Campaign Cap', price: '$5.00', subtitle: 'Embroidered Logo' },
          { name: 'Voter Hoodie', price: '$25.00', subtitle: 'Heavyweight Fleece', badge: 'HOT' },
          { name: 'Rally Flag', price: '$12.00', subtitle: 'Polyester, 3x5ft' }
      ]
    }),

    // ============================================================
    // 13. FOOTER & SETTINGS
    // ============================================================
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'footer',
      fields: [
          { name: 'facebook', type: 'url', initialValue: '#' },
          { name: 'twitter', type: 'url', initialValue: '#' },
          { name: 'instagram', type: 'url', initialValue: '#' },
          { name: 'youtube', type: 'url', initialValue: '#' },
      ]
    }),
    defineField({
        name: 'contactInfo',
        title: 'Contact Details',
        type: 'object',
        group: 'footer',
        fields: [
            { name: 'phone', type: 'string', initialValue: '+252 61 555 0124' },
            { name: 'email', type: 'string', initialValue: 'info@Nasaige2026.so' },
            { name: 'address', type: 'string', initialValue: 'Km4 Junction, Mogadishu' }
        ]
    })
  ]
})