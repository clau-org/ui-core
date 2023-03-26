import { defineStore } from 'pinia'

type PageLabel = {
  show?: boolean
  icon?: string
  title?: string
  description?: string
  index?: number
}

type Page = {
  id: string
  route: string
  title?: string
  description?: string
  navbar?: PageLabel
  sidebar?: PageLabel
  footer?: PageLabel
  layout?: string
  [key: string]: any
}

const defaultPageLabel: PageLabel = {
  show: false,
  index: 0,
}

// Set default values
const defaultPage: Page = {
  id: 'default',
  route: '/default',
  navbar: { ...defaultPageLabel },
  sidebar: { ...defaultPageLabel },
  footer: { ...defaultPageLabel },
}

export const useStoreNavigation = defineStore('Navigation', () => {
  const pages = ref<Page[]>([])

  const navbar = ref<PageLabel[]>([])
  const sidebar = ref<PageLabel[]>([])
  const footer = ref<PageLabel[]>([])

  /**
   * Function to define the data for a Page
   * @param page
   */
  function _definePage(page: Page) {
    // Check if page ID already exists in pages array
    const pageExists = pages.value.some((p) => p.id === page.id)

    // If page ID does not exist, push the page to the array
    if (!pageExists) {
      const newPage = Object.assign({}, defaultPage, page)

      if (newPage.navbar?.show) {
        newPage.navbar.title = newPage.navbar.title || newPage.id
        newPage.navbar.index = navbar.value.length

        navbar.value.push(newPage.navbar)
      }

      if (newPage.sidebar?.show) {
        newPage.sidebar.title = newPage.sidebar.title || newPage.id
        newPage.sidebar.index = sidebar.value.length

        sidebar.value.push(newPage.sidebar)
      }

      if (newPage.footer?.show) {
        newPage.footer.title = newPage.footer.title || newPage.id
        newPage.footer.index = footer.value.length

        footer.value.push(newPage.footer)
      }

      pages.value.push(newPage)
      logger.debug('Page added', prettyJson(newPage))
    }
  }

  function _setupPages() {
    const router = useRouter()
    let routes = router.options.routes

    routes.forEach((route) => {
      const { meta } = route
      _definePage({
        ...(meta as any),
      })
    })
  }

  return {
    pages,
    navbar,
    sidebar,
    footer,

    definePage: _definePage,
    setupPages: _setupPages,
  }
})

/**
 * Function to setup pages
 */
export const setupPages = () => useStoreNavigation().setupPages()

/**
 * Function to add pages
 * @param page
 */
export const definePage = (page: Page) => useStoreNavigation().definePage(page)
