import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

/**
 * Hero schema object. Displays the main hero section on the homepage.
 */

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small text above the main heading',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'text',
      rows: 2,
      description: 'Large hero heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingLinks',
      title: 'Heading Links',
      type: 'array',
      description: 'Optional links to highlight words in the heading',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Link Text',
              type: 'string',
              description: 'The text to be linked (e.g., "Sanity", "Next.js")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Hero background image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero',
      }
    },
  },
})
