import { describe, test,     } from 'vitest'
import { setup } from '@nuxt/test-utils'
import {
  Page,
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
  })

  describe('_formatPageLabel - Method to format page labels', () => {
    const pageLabel = { id: '1', route: '/page1', title: 'Page 1' }
    const page = { id: '1', route: '/page1', title: 'Page 1' }

    test('returns expected page label when both page label and page have route and title', ({
      expect,
    }) => {
      const formattedPageLabel = _formatPageLabel({ pageLabel, page })
      expect(formattedPageLabel).toEqual({
        id: '1',
        route: '/page1',
        title: 'Page 1',
      })
    })

    test('sets title to last segment of route when title is not defined in page label', ({
      expect,
    }) => {
      const formattedPageLabel = _formatPageLabel({
        pageLabel: { route: '/page1' },
        page,
      })
      expect(formattedPageLabel.title).toBe('page1')
    })

    test('sets title to last segment of route when title is not defined in page', ({
      expect,
    }) => {
      let { title, ...testPageLabel } = pageLabel
      const formattedPageLabel = _formatPageLabel({
        pageLabel: testPageLabel,
        page: { route: '/page1' },
      })
      expect(formattedPageLabel.title).toBe('page1')
    })

    test('sets id to page label id if defined, otherwise sets it to page id', ({
      expect,
    }) => {
      const formattedPageLabel1 = _formatPageLabel({
        pageLabel: { id: '2' },
        page,
      })
      expect(formattedPageLabel1.id).toBe('2')

      const formattedPageLabel2 = _formatPageLabel({ pageLabel: {}, page })
      expect(formattedPageLabel2.id).toBe('1')
    })
  })

  describe('_addPageToPages - Method to add a page to the global pages', async () => {
    const testPage: Page = {
      id: 'test-page',
      route: '/test',
      title: 'Test Page',
      description: 'This is a test page',
      navbar: {
        id: 'test-navbar',
        index: 1,
        show: true,
        route: '/test',
        icon: 'test-icon',
        title: 'Test Navbar',
        description: 'This is a test navbar',
      },
      sidebar: {
        id: 'test-sidebar',
        index: 1,
        show: true,
        route: '/test',
        icon: 'test-icon',
        title: 'Test Sidebar',
        description: 'This is a test sidebar',
      },
      footer: {
        id: 'test-footer',
        index: 1,
        show: true,
        route: '/test',
        icon: 'test-icon',
        title: 'Test Footer',
        description: 'This is a test footer',
      },
    }
  
    const testPages: Page[] = [
      {
        id: 'existing-page',
        route: '/existing',
      },
    ]
  
    test('adds a new page to pages array', ({expect}) => {
      const newPages = _addPageToPages({ page: testPage, pages: testPages })
      expect(newPages.length).toBe(2)
      expect(newPages[1]).toEqual(testPage)
    })
  
    test('does not add page if it already exists in pages array', ({expect}) => {
      const newPages = _addPageToPages({ page: testPage, pages: [testPage] })
      expect(newPages.length).toBe(1)
      expect(newPages[0]).toEqual(testPage)
    })
  
    test('formats page labels correctly', ({expect}) => {
      const newPages = _addPageToPages({ page: testPage, pages: [] })
      const formattedNavbar = newPages[0].navbar
      const formattedSidebar = newPages[0].sidebar
      const formattedFooter = newPages[0].footer
      expect(formattedNavbar?.id).toBe(testPage.navbar?.id)
      expect(formattedNavbar?.show).toBe(testPage.navbar?.show)
      expect(formattedSidebar?.id).toBe(testPage.sidebar?.id)
      expect(formattedSidebar?.show).toBe(testPage.sidebar?.show)
      expect(formattedFooter?.id).toBe(testPage.footer?.id)
      expect(formattedFooter?.show).toBe(testPage.footer?.show)
    })

  })

  describe('_getRoutesAsPages - Method to get the Nuxt Routes as Page objects', async () => {
    let router // Use `any` type to mock `useRouter` hook
    let routes // Use `any` type to mock Vue Router's `RouteConfig` interface

    const useRouter = {
      "options": {
        "routes": [
          {
            "name": "home",
            "path": "/home",
            "meta": {
              "navbar": {
                "show": false
              },
              "footer": {
                "show": true
              },
              "sidebar": {
                "show": false
              }
            },
            "alias": []
          },
          {
            "name": "index",
            "path": "/",
            "meta": {
              "navbar": {
                "show": false
              },
              "footer": {
                "show": false
              },
              "sidebar": {
                "show": false
              },
              "layout": "dev"
            },
            "alias": []
          },
          {
            "name": "some-nested",
            "path": "/some/nested",
            "meta": {
              "navbar": {
                "show": true
              },
              "footer": {
                "show": true
              },
              "sidebar": {
                "show": true
              }
            },
            "alias": []
          },
          {
            "name": "some-shit",
            "path": "/some/shit",
            "meta": {
              "navbar": {
                "show": true
              },
              "footer": {
                "show": true
              },
              "sidebar": {
                "show": true
              }
            },
            "alias": []
          }
        ]
      }
    } 

    test('returns empty array if no routes defined', ({ expect }) => {
      routes = []
      const pages = _getRoutesAsPages({router:useRouter})
      expect(pages).toEqual([])
    })

    test('returns Page object for each defined route', ({ expect }) => {
      routes = [      {        name: 'home',        path: '/',        meta: {          title: 'Home Page',        },      },      {        name: 'about',        path: '/about',        meta: {          title: 'About Us',          layout: 'secondary',        },      },    ]
      const expectedPages = [      {        id: 'home',        route: '/',        title: 'Home Page',      },      {        id: 'about',        route: '/about',        title: 'About Us',        layout: 'secondary',      },    ]
      const pages = _getRoutesAsPages({router:useRouter})
      expect(pages).toEqual(expectedPages)
    })
  })

  describe('_getTargetPages - Method to get the Pages of a given PageLabel target', async () => {
    test('expect ', ({ expect }) => {})
  })
})
