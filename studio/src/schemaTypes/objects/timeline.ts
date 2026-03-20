import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

/**
 * Timeline schema object. Displays a vertical timeline with entries (work experience, education, etc.)
 */

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Work Experience", "Education"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'Timeline Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo / Image',
              type: 'image',
              description: 'Company logo, school badge, or profile picture',
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
              name: 'organization',
              title: 'Organization',
              type: 'string',
              description: 'Company name, school name, etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Title',
              type: 'string',
              description: 'Job title, degree, position, etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'string',
              description: 'e.g., "2022", "Jan 2022"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'string',
              description: 'e.g., "2023", "Present", "Now"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Brief description of the role or achievement',
            }),
          ],
          preview: {
            select: {
              title: 'organization',
              subtitle: 'role',
              media: 'image',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare({title, subtitle, media, startDate, endDate}) {
              return {
                title: title || 'Untitled Entry',
                subtitle: `${subtitle || ''} ${startDate ? `(${startDate}${endDate ? ` - ${endDate}` : ''})` : ''}`,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      entries: 'entries',
    },
    prepare({title, entries}) {
      const count = entries?.length || 0
      return {
        title: title || 'Untitled Timeline',
        subtitle: `${count} ${count === 1 ? 'entry' : 'entries'}`,
      }
    },
  },
})
