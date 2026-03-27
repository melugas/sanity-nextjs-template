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
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short label text above headline',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'Primary headline - large hero heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      description: 'Supporting tagline or description below the headline',
    }),
    defineField({
      name: 'headingLinks',
      title: 'Heading Links',
      type: 'array',
      description: 'Optional links to highlight words in the headline',
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
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'Call-to-action buttons for the hero section',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'link',
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                ],
                layout: 'radio',
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              style: 'style',
            },
            prepare({title, style}) {
              return {
                title: title || 'Untitled Button',
                subtitle: style === 'primary' ? 'Primary Button' : 'Secondary Button',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(2),
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
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Optional fallback background color if no image is set',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
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
