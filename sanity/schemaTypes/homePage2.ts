// File: schemas/homePage2.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage2', // 🟢 NEW NAME
  title: '🏠 Home Page V2', // 🟢 NEW TITLE
  type: 'document',
  groups: [
    { name: 'header', title: '0. Header & Navigation' },
    { name: 'hero', title: '1. Hero Section' },
    { name: 'countdown', title: '2. Countdown' },
    { name: 'priorities', title: '3. Priorities' },
    { name: 'about', title: '4. About & Vision' },
    { name: 'quoteSection', title: '⭐ Big Quote Section' },
    { name: 'timeline', title: '5. Timeline' },
    { name: 'gallery', title: '6. Gallery' },
    { name: 'advisors', title: '7. Advisors' },
    { name: 'trail', title: '8. Campaign Trail' },
    { name: 'testimonials', title: '9. Testimonials' },
    { name: 'manifesto', title: '10. Manifesto' },
    { name: 'news', title: '11. News Selection' },
    { name: 'shop', title: '12. Shop Selection' },
    { name: 'footer', title: '13. Footer & Partners' },
  ],
  fields: [
    // --- HEADER ---
    defineField({
      name: 'navLinks',
      title: 'Navigation Menu Links',
      type: 'array',
      group: 'header',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Link Text' },
          { name: 'url', type: 'string', title: 'URL or Anchor (#about)' }
        ]
      }]
    }),

    // --- HERO ---
    defineField({
      name: 'heroTag',
      title: 'Hero Top Tag (Uppercase)',
      type: 'string',
      group: 'hero'
    }),
    defineField({
      name: 'heroTitle', 
      title: 'Main Headline',
      type: 'string',
      group: 'hero',
      description: 'Type the full headline. Logic: If 2 words, last word is Blue/Italic. If 3+ words, last part is Blue/Italic.'
    }),
    defineField({
        name: 'heroImage',
        title: 'Hero Background Image',
        type: 'object',
        group: 'hero',
        fields: [
            { name: 'upload', type: 'image', options: { hotspot: true } },
            { name: 'url', type: 'url', title: 'Or External Image URL' }
        ]
    }),
    defineField({
      name: 'heroQuoteSomali',
      title: 'Hero Quote (Somali)',
      type: 'text',
      rows: 3,
      group: 'hero'
    }),
    defineField({
      name: 'heroQuoteEnglish',
      title: 'Hero Quote (English)',
      type: 'text',
      rows: 4,
      group: 'hero'
    }),

    // --- COUNTDOWN ---
    defineField({
      name: 'electionDate',
      title: 'Election Date (Target)',
      type: 'datetime',
      group: 'countdown'
    }),
    defineField({
        name: 'countdownLink',
        title: 'Countdown Button Link (Join Network)',
        type: 'url',
        group: 'countdown'
    }),
    defineField({
      name: 'actionCards',
      title: 'Action Cards',
      type: 'array',
      group: 'countdown',
      of: [{
        type: 'object',
        fields: [
            { name: 'title', type: 'string' },
            { name: 'subtitle', type: 'string' },
            { name: 'icon', type: 'string', title: 'FontAwesome Icon Class' },
            { name: 'color', type: 'string', options: { list: ['white', 'blue'] } }
        ]
      }]
    }),

    // --- PRIORITIES ---
    defineField({
        name: 'prioritiesTitle',
        title: 'Priorities Section Title',
        type: 'string',
        group: 'priorities'
    }),
    defineField({
        name: 'priorities',
        title: 'Priorities List',
        type: 'array',
        group: 'priorities',
        of: [{
            type: 'object',
            fields: [
                { name: 'title', type: 'string' },
                { name: 'desc', type: 'string' },
                { name: 'icon', type: 'string' }
            ]
        }]
    }),

    // --- ABOUT ---
    defineField({
        name: 'aboutImage',
        title: 'About Portrait Image',
        type: 'object',
        group: 'about',
        fields: [
            { name: 'upload', type: 'image', options: { hotspot: true } },
            { name: 'url', type: 'url' }
        ]
    }),
    defineField({
        name: 'aboutQuote',
        title: 'Image Overlay Quote',
        type: 'string',
        group: 'about'
    }),
    defineField({
        name: 'visionTitle',
        title: 'Vision Title',
        type: 'string',
        group: 'about'
    }),
    defineField({
        name: 'visionText',
        title: 'Vision Pledge Text',
        type: 'text',
        group: 'about',
        rows: 6
    }),
    defineField({
        name: 'aboutSignature', 
        title: 'Signature Text',
        type: 'string',
        group: 'about'
    }),

    // --- BIG QUOTE ---
    defineField({
        name: 'parallaxQuote',
        title: 'Large Background Quote',
        type: 'object',
        group: 'quoteSection',
        fields: [
            { name: 'text', title: 'Quote Text', type: 'text', rows: 3 },
            { name: 'author', title: 'Author Name', type: 'string' },
            { name: 'image', title: 'Background Image', type: 'object', fields: [{ name: 'upload', type: 'image' }, { name: 'url', type: 'url' }] }
        ]
    }),

    // --- TIMELINE ---
    defineField({
        name: 'timelineTitle',
        title: 'Timeline Title',
        type: 'string',
        group: 'timeline'
    }),
    defineField({
        name: 'timeline',
        title: 'Timeline Milestones',
        type: 'array',
        group: 'timeline',
        of: [{
            type: 'object',
            fields: [
                { name: 'year', type: 'string' },
                { name: 'title', type: 'string' }, 
                { name: 'desc', type: 'text' },
                { name: 'tag', type: 'string' }
            ]
        }]
    }),

    // --- GALLERY ---
    defineField({
        name: 'galleryLink',
        title: 'Gallery Header Link',
        type: 'url',
        group: 'gallery'
    }),
    defineField({
        name: 'galleryImages',
        title: 'Gallery Images',
        type: 'array',
        group: 'gallery',
        of: [{ 
            type: 'object',
            fields: [
                { name: 'upload', type: 'image', options: { hotspot: true } },
                { name: 'url', type: 'url' }
            ]
        }]
    }),
    defineField({
        name: 'galleryQuote',
        title: 'Gallery Quote (Bottom)',
        type: 'text',
        group: 'gallery'
    }),

    // --- ADVISORS ---
    defineField({
        name: 'advisorsTitle',
        title: 'Advisors Title',
        type: 'string',
        group: 'advisors'
    }),
    defineField({
        name: 'advisors',
        title: 'Advisors Team',
        type: 'array',
        group: 'advisors',
        of: [{
            type: 'object',
            fields: [
                { name: 'name', type: 'string' },
                { name: 'role', type: 'string' },
                { name: 'quote', type: 'text' },
                { name: 'image', type: 'object', fields: [{name: 'upload', type: 'image'}, {name: 'url', type: 'url'}] }
            ]
        }]
    }),

    // --- TRAIL ---
    defineField({
        name: 'trail',
        title: 'Campaign Trail Events',
        type: 'array',
        group: 'trail',
        of: [{
            type: 'object',
            fields: [
                { name: 'date', type: 'string' },
                { name: 'title', type: 'string' },
                { name: 'desc', type: 'text' },
                { name: 'category', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'videoUrl', type: 'url' }
            ]
        }]
    }),

    // --- TESTIMONIALS ---
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
                { name: 'image', type: 'object', fields: [{name: 'upload', type: 'image'}, {name: 'url', type: 'url'}] }
            ]
        }]
    }),

    // --- MANIFESTO ---
    defineField({
        name: 'manifestoDownloads',
        title: 'Manifesto Files',
        type: 'array',
        group: 'manifesto',
        of: [{
            type: 'object',
            fields: [
                { name: 'title', type: 'string' },
                { name: 'icon', type: 'string' },
                { name: 'fileUpload', type: 'file' },
                { name: 'externalLink', type: 'url' }
            ]
        }]
    }),

    // --- NEWS & SHOP ---
    defineField({
        name: 'newsSection',
        title: 'Featured News',
        type: 'array',
        group: 'news',
        of: [{ type: 'reference', to: [{ type: 'news' }] }] 
    }),
    defineField({
        name: 'shopSection',
        title: 'Featured Products',
        type: 'array',
        group: 'shop',
        of: [{ type: 'reference', to: [{ type: 'shop' }] }] 
    }),

    // --- FOOTER ---
    defineField({
      name: 'partners',
      title: 'Trusted By Media (Marquee)',
      type: 'array',
      group: 'footer',
      of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'logo', type: 'object', fields: [{name: 'upload', type: 'image'}, {name: 'url', type: 'url'}] }] }]
    }),
    defineField({
        name: 'footer',
        title: 'Footer Configuration',
        type: 'object',
        group: 'footer',
        fields: [
            { name: 'facebook', type: 'url' },
            { name: 'twitter', type: 'url' },
            { name: 'instagram', type: 'url' },
            { name: 'youtube', type: 'url' },
            {
                name: 'quickLinks',
                title: 'Column 2: Quick Links',
                type: 'array',
                of: [{ type: 'object', fields: [{ name: 'text', type: 'string' }, { name: 'url', type: 'string' }] }]
            },
            {
                name: 'getInvolved',
                title: 'Column 3: Get Involved',
                type: 'array',
                of: [{ type: 'object', fields: [{ name: 'text', type: 'string' }, { name: 'url', type: 'string' }] }]
            },
            { name: 'phone', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'address', type: 'string' },
        ]
    })
  ]
})