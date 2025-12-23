import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shop',
  title: '🛒 Shop Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price (e.g. $25.00)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle/Description (e.g. 100% Cotton)',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Badge (Optional)',
      type: 'string',
      description: 'e.g. NEW, HOT, SALE',
      options: {
        list: [
            { title: 'None', value: '' },
            { title: 'NEW', value: 'NEW' },
            { title: 'HOT', value: 'HOT' },
            { title: 'SALE', value: 'SALE' }
        ]
      }
    }),
    // 🟢 HYBRID IMAGE
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'object',
      fields: [
        { name: 'upload', type: 'image', options: { hotspot: true }, title: 'Upload Image' },
        { name: 'url', type: 'url', title: 'OR Image URL' }
      ]
    })
  ]
})