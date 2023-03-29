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


    // Define an array of test routes, including names, paths, and metadata for some of the routes
    const testRoutes = [      { name: 'home', path: '/' },      {        name: 'blog',        path: '/blog',        meta: {          title: 'Blog',          description: 'A collection of articles on various topics',        },      },      {        name: 'post',        path: '/blog/:slug',        meta: {          title: 'Blog Post',          description: 'A single blog post',        },      },    ];

    // Create a router object with the test routes
    const router = { options: { routes: testRoutes } };

    // Create a test that verifies that the _getRoutesAsPages function returns an array of pages with the correct properties
    test('returns an array of pages with correct properties', ({ expect }) => {
      const expectedPages: Page[] = [
        { id: 'home', route: '/' },
        {
          id: 'blog',
          route: '/blog',
          title: 'Blog',
          description: 'A collection of articles on various topics',
        },
        {
          id: 'post',
          route: '/blog/:slug',
          title: 'Blog Post',
          description: 'A single blog post',
        },
      ];

      // Call the _getRoutesAsPages function with the router object and verify that it returns the expected array of pages
      const pages = _getRoutesAsPages({ router });
      expect(pages).toEqual(expectedPages);
    });

    // Create a test that verifies that the _getRoutesAsPages function returns an empty array if no routes are defined
    test('returns an empty array if no routes are defined', ({ expect }) => {
      const router = { options: { routes: [] } };
      const pages = _getRoutesAsPages({ router });
      expect(pages).toEqual([]);
    });

    // Create a test that verifies that the _getRoutesAsPages function adds any additional meta properties to the page object
    test('adds any additional meta properties to page object', ({ expect }) => {
      // Define an array of test routes with metadata for one of the routes
      const testRoutesWithMeta = [
        { name: 'page1', path: '/', meta: { foo: 'bar' } },
        { name: 'page2', path: '/page2' },
      ];
      const router = { options: { routes: testRoutesWithMeta } };

      const expectedPages: Page[] = [
        { id: 'page1', route: '/', foo: 'bar' },
        { id: 'page2', route: '/page2' },
      ];

      // Call the _getRoutesAsPages function with the router object and verify that it returns the expected array of pages with the added metadata
      const pages = _getRoutesAsPages({ router });
      expect(pages).toEqual(expectedPages);
    });
  })

  describe('_getTargetPages - Method to get the Pages of a given PageLabel target', async () => {
    const testPages: Page[] = [
      {
        id: 'page1',
        route: '/page1',
        navbar: {
          id: 'navbar1',
          show: true,
        },
        sidebar: {
          id: 'sidebar1',
          show: false,
        },
        footer: {
          id: 'footer1',
          show: true,
        },
      },
      {
        id: 'page2',
        route: '/page2',
        navbar: {
          id: 'navbar2',
          show: false,
        },
        sidebar: {
          id: 'sidebar2',
          show: true,
        },
        footer: {
          id: 'footer2',
          show: false,
        },
      },
      {
        id: 'page3',
        route: '/page3',
        navbar: {
          id: 'navbar3',
          show: true,
        },
        sidebar: {
          id: 'sidebar3',
          show: true,
        },
        footer: {
          id: 'footer3',
          show: false,
        },
      },
    ]
  
    test('returns only pages with target show equal to true', ({ expect }) => {
      const filteredPages = _getTargetPages({ pages: testPages, target: 'navbar' })
      expect(filteredPages.length).toBe(2)
      expect(filteredPages.map((page) => page.id)).toEqual(['page1', 'page3'])
    })
    
    test('returns only pages with target show equal to true', ({ expect }) => {
      const filteredPages = _getTargetPages({ pages: testPages, target: 'sidebar' })
      expect(filteredPages.length).toBe(2)
      expect(filteredPages.map((page) => page.id)).toEqual(['page2', 'page3'])
    })
   
    test('returns only pages with target show equal to true', ({ expect }) => {
      const filteredPages = _getTargetPages({ pages: testPages, target: 'footer' })
      expect(filteredPages.length).toBe(1)
      expect(filteredPages.map((page) => page.id)).toEqual(['page1'])
    })
  })
})
