import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'advisorSection',
  title: 'Qeybta La-taliyayaasha (Advisors Block)',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Cinwaanka Qeybta',
      type: 'string',
      initialValue: 'Meet The Visionary Team'
    }),
    defineField({
      name: 'subtitle',
      title: 'Qoraalka Yar (Subtitle)',
      type: 'string',
      initialValue: 'Strategic Advisory Council'
    }),
    // We don't need to add advisors here because we will just fetch 
    // all documents from the "advisor" type we created earlier.
  ],
  preview: {
    prepare() {
      return { title: 'Advisors Section', subtitle: 'Bandhiga La-taliyayaasha' }
    }
  }
})