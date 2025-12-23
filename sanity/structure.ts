import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // 1. Singleton Home Page
      S.listItem()
        .title('🏠 Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Editor')
        ),
      
      S.divider(),

      // 2. News List
      S.listItem()
        .title('📰 News & Articles')
        .child(S.documentTypeList('news').title('All News')),

      // 3. Shop List
      S.listItem()
        .title('🛒 Shop Products')
        .child(S.documentTypeList('shop').title('All Products')),
      
      S.divider(),
      
      // Hide the defined types from the 'Others' list to avoid duplicates
      ...S.documentTypeListItems().filter(
        (item) => !['homePage', 'news', 'shop'].includes(item.getId() as string)
      ),
    ])