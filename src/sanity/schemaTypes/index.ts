import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../../../hackathon-template02/schema/product'
import { Category } from '../../../hackathon-template02/schema/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    Category
  ],
}
