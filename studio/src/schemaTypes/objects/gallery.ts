import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

/**
 * Image Gallery schema object. Displays a collection of images in various layouts.
 */

export const gallery = defineType({
  name: 'gallery',
  title: 'Image Gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the gallery section',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessibility.',
                  validation: (Rule) => Rule.required(),
                },
              ],
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption displayed below the image',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              alt: 'image.alt',
            },
            prepare({title, media, alt}) {
              return {
                title: title || alt || 'Untitled Image',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Masonry', value: 'masonry'},
          {title: 'Carousel', value: 'carousel'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'Number of columns for grid layout (2-4)',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
      initialValue: 3,
      hidden: ({parent}) => parent?.layout !== 'grid',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          const parent = context.parent
          if (parent?.layout === 'grid' && (!value || value < 2 || value > 4)) {
            return 'Columns must be between 2 and 4 for grid layout'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      images: 'images',
      layout: 'layout',
    },
    prepare({title, images, layout}) {
      const count = images?.length || 0
      const layoutLabel = layout === 'grid' ? 'Grid' : layout === 'masonry' ? 'Masonry' : 'Carousel'
      return {
        title: title || 'Image Gallery',
        subtitle: `${count} ${count === 1 ? 'image' : 'images'} · ${layoutLabel}`,
        media: images?.[0]?.image,
      }
    },
  },
})
