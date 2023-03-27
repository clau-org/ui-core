import { describe, test } from 'vitest'
import { setup } from '@nuxt/test-utils'
import {
  _defaultPageLabel,
  _defaultPage,
  _formatPageLabel,
  _addPageToPages,
  _getRoutesAsPages,
  _getTargetPages,
} from '../../src/composables/navigation'

describe('[STORE NAVIGATION]', async () => {
  await setup({
    // test context options
  })

  describe('_defaultPageLabel - Default page label values', async () => {
    test('expect default id to me empty', ({ expect }) => {
      expect(_defaultPageLabel.id).toBe('')
    })

    test('expect default id to me empty', ({ expect }) => {
      expect(_defaultPageLabel.show).toBe(false)
    })
  })

  describe('_defaultPage - Default page values', async () => {
    test('expect default id to me empty', ({ expect }) => {
      expect(_defaultPage.id).toBe('')
    })

    test('expect default route to me empty', ({ expect }) => {
      expect(_defaultPage.route).toBe('')
    })
  })a

  describe('_formatPageLabel - Method to format page labels', () => {
    const pageLabel = { id: '1', route: '/page1', title: 'Page 1' }
    const page = { id: '1', route: '/page1', title: 'Page 1' }
  
    test('returns expected page label when both page label and page have route and title', ({ expect }) => {
      const formattedPageLabel = _formatPageLabel({ pageLabel, page })
      expect(formattedPageLabel).toEqual({ id: '1', route: '/page1', title: 'Page 1' })
    })
  
    test('sets title to last segment of route when title is not defined in page label', ({ expect }) => {
      const formattedPageLabel = _formatPageLabel({ pageLabel: { route: '/page1' }, page })
      expect(formattedPageLabel.title).toBe('page1')
    })
  
    test('sets title to last segment of route when title is not defined in page', ({ expect }) => {
      let {title, ...testPageLabel} = pageLabel
      const formattedPageLabel = _formatPageLabel({ pageLabel: testPageLabel, page: { route: '/page1' } })
      expect(formattedPageLabel.title).toBe('page1')
    })
  
    test('sets id to page label id if defined, otherwise sets it to page id', ({ expect }) => {
      const formattedPageLabel1 = _formatPageLabel({ pageLabel: { id: '2' }, page })
      expect(formattedPageLabel1.id).toBe('2')
  
      const formattedPageLabel2 = _formatPageLabel({ pageLabel: {}, page })
      expect(formattedPageLabel2.id).toBe('1')
    })
  })
  
})
