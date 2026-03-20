import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

/**
 * Recent Posts schema object. Displays recent blog posts on the homepage.
 */

export const recentPosts = defineType({
  name: 'recentPosts',
  title: 'Recent Posts',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Title for the recent posts section',
      initialValue: 'Recent Posts',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'limit',
      title: 'Number of Posts',
      type: 'number',
      description: 'How many recent posts to display',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      limit: 'limit',
    },
    prepare({title, limit}) {
      return {
        title: title || 'Recent Posts',
        subtitle: `Show ${limit} posts`,
      }
    },
  },
})
