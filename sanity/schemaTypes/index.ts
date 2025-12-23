// File: schemas/index.ts
import homePage2 from './homePage2' // 🟢 Import New
import news from './news'
import shop from './shop'
// import homePage from './homePage' // 🔴 Comment out the broken one

export const schemaTypes = [
  homePage2, // 🟢 Add New
  news,
  shop
]