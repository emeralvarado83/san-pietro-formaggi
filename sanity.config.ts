import { defineConfig, defineField, defineType } from 'sanity'
import { structureTool } from 'sanity/structure'

const prodottoSchema = defineType({
  name: 'prodotto',
  title: 'Prodotto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Freschi', value: 'Freschi' },
          { title: 'Semistagionati', value: 'Semistagionati' },
          { title: 'Stagionati', value: 'Stagionati' },
          { title: 'Specialità', value: 'Specialità' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizioneBreve',
      title: 'Descrizione breve (visibile nella pagina prodotto)',
      type: 'string',
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione completa',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'Titolo sezione', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Grassetto', value: 'strong' },
              { title: 'Corsivo', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'disponibilita',
      title: 'Disponibilità',
      type: 'string',
      options: {
        list: [
          { title: 'Disponibile', value: 'Disponibile' },
          { title: 'Non disponibile', value: 'Non disponibile' },
        ],
        layout: 'radio',
      },
      initialValue: 'Disponibile',
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'categoria',
      media: 'immagine',
    },
  },
})

const ricettaSchema = defineType({
  name: 'ricetta',
  title: 'Ricetta',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titolo' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'indicazioni',
      title: 'Indicazioni',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ingredienti',
      title: 'Ingredienti',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'preparazione',
      title: 'Preparazione',
      type: 'text',
      rows: 12,
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'titolo',
      media: 'immagine',
    },
  },
})

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'San Pietro Formaggi',
  apiVersion: '2024-01-01',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [prodottoSchema, ricettaSchema],
  },
})
