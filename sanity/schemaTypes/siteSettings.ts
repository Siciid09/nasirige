import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Dejinta Guud (Header & Footer)',
  type: 'document',
  groups: [
    {name: 'header', title: 'Madaxa (Header)'},
    {name: 'footer', title: 'Cagta (Footer)'},
  ],
  fields: [
    // --- HEADER ---
    defineField({
      name: 'siteTitle',
      title: 'Magaca Bogga',
      type: 'string',
      group: 'header',
      initialValue: 'Nasir Ige.'
    }),
    defineField({
      name: 'navLinks',
      title: 'Xiriiriyaha (Navigation Links)',
      type: 'array',
      group: 'header',
      of: [{type: 'string'}] // Simple list of links like "About", "News"
    }),

    // --- FOOTER ---
    defineField({
      name: 'footerText',
      title: 'Qoraalka Cagta (Footer Text)',
      type: 'text',
      group: 'footer',
      initialValue: 'The official campaign for a united, prosperous, and sovereign Somalia.'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Baraha Bulshada (Social Media)',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
             {name: 'platform', type: 'string', title: 'Platform Name'},
             {name: 'url', type: 'url', title: 'Link'}
          ]
        }
      ]
    })
  ]
})