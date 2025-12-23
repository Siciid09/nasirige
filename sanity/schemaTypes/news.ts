import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: '📰 News & Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' }
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'category',
      title: 'Category Tag (e.g. Official Statement)',
      type: 'string'
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt (Shown on Home Page)',
      type: 'text',
      rows: 3
    }),
    // 🟢 HYBRID IMAGE
    defineField({
      name: 'mainImage',
      title: 'Main Article Image',
      type: 'object',
      fields: [
        { name: 'upload', type: 'image', options: { hotspot: true }, title: 'Upload Image' },
        { name: 'url', type: 'url', title: 'OR Image URL' }
      ]
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link (If this news is on BBC/Facebook)',
      type: 'url'
    }),
    defineField({
      name: 'body',
      title: 'Full Article Body',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ]
})