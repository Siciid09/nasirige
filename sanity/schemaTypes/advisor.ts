import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'advisor',
  title: 'Advisors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Advisor Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'img',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})