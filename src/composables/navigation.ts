import { defineStore } from 'pinia'

type PageLabel = {
  id: string
  show?: boolean
  route?: string
  icon?: string
  title?: string
  description?: string
  index?: number
  subPageLabels?: PageLabel[]
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

export const useStoreNavigation = defineStore('Navigation', () => {
  // Holds all the defined pages
  const pages = ref<Page[]>([])

  // Holds all the defined navbar items
  const navbar = ref<PageLabel[]>([])

  // Holds all the defined sidebar items
  const sidebar = ref<PageLabel[]>([])

  // Holds all the defined footer items
  const footer = ref<PageLabel[]>([])

  // Computed property that groups navbar items based on their routes
  const groupedNavbar = computed(() => {
    return _getGroupedPageLabels(pages.value)
  })

  // Default values for a PageLabel object
  const defaultPageLabel: PageLabel = {
    id: 'default',
    show: false,
    index: 0,
    subPageLabels: [],
  }

  // Default values for a Page object
  const defaultPage: Page = {
    id: 'default',
    route: '/default',
    navbar: { ...defaultPageLabel },
    sidebar: { ...defaultPageLabel },
    footer: { ...defaultPageLabel },
  }

  /**
   * Groups the given list of pages by their navbar routes.
   *
   * @param {Page[]} pages - List of pages to group
   * @returns {PageLabel[]} - Grouped pages
   */
  function _getGroupedPageLabels(pages: Page[]): PageLabel[] {
    const tmpNavbar: Page[] = []
    const groupedPages: PageLabel[] = []

    // Group pages in tmpNavbar based on their route
    pages.forEach((page: Page) => {
      let parent = null
      let parentLabel = null
      let { navbar: { id, title, ...currentNavbar } = {} } = page

      const routeSegments = page.route.split('/').filter(Boolean)

      for (const [index, segment] of routeSegments.entries()) {
        if (!parent) {
          parentLabel = groupedPages.find((group) => group.title === segment)
          if (!parentLabel) {
            // logger.info({ currentNavbar, title: segment })
            parentLabel = {
              id: segment,
              title: segment,
              subPageLabels: [],
              ...currentNavbar,
            }
            groupedPages.push(parentLabel)
          }

          parent = parentLabel.subPageLabels
        } else {
          const subPageLabel: any = parent.find(
            (group: any) => group.title === segment,
          )
          if (!subPageLabel) {
            // logger.info({ currentNavbar, title: segment })
            parent.push({
              id: segment,
              title: segment,
              subPageLabels: [],
              ...currentNavbar,
            })
            parent = parent[parent.length - 1].subPageLabels
          } else {
            parent = subPageLabel.subPageLabels
          }
        }
      }

      // Add the page to the subPageLabels of the parent PageLabel
      if (parent && page.title) {
        // logger.info({ currentNavbar, title: page.title })
        parent.push({
          id: page.title,
          title: page.title,
          description: page.description || '',
          ...currentNavbar,
        })
      }
    })

    return groupedPages
  }

  /**
   * Add a page to the specified target list (navbar, sidebar, or footer)
   * @param page The page to add
   * @param target The list to add the page to
   * @param label The label to use when adding the page (navbar, sidebar, or footer)
   */
  function _addPageTo({
    page,
    target,
    label,
  }: {
    page: Page
    target: Ref<PageLabel[]>
    label: string
  }) {
    const newPage = Object.assign({}, defaultPage, page)
    if (newPage[label]?.show) {
      newPage[label].id = newPage[label].id || newPage.id
      newPage[label].title = newPage[label].title || newPage.id
      newPage[label].route = newPage[label].route ?? newPage.route
      newPage[label].index = newPage[label].index ?? target.value.length

      target.value.push(newPage[label])
    }
  }

  /**
   * Function to define the data for a Page
   * @param page
   */
  function _definePage({ page }: { page: Page }) {
    // Check if page ID already exists in pages array
    const pageExists = pages.value.some((p) => p.id === page.id)

    // If page ID does not exist, push the page to the array
    if (!pageExists) {
      const newPage = Object.assign({}, defaultPage, page)

      _addPageTo({ page, target: navbar, label: 'navbar' })
      _addPageTo({ page, target: sidebar, label: 'sidebar' })
      _addPageTo({ page, target: footer, label: 'footer' })

      pages.value.push(newPage)
      // logger.debug('Page added', prettyJson(newPage))
    }
  }

  /**
   * Initializes the `pages` array by adding a Page object for each route defined
   * in the current Vue Router instance. Each Page's ID will be set to the route's
   * name and its route to the route's path. The Page's additional properties will
   * be set based on the route's `meta` object (if any).
   */
  function _setupPages() {
    const router = useRouter()
    let routes = router.options.routes

    routes.forEach((route) => {
      const { meta, name, path } = route
      _definePage({
        page: {
          id: name,
          route: path,
          ...(meta as any),
        },
      })
    })
  }

  return {
    pages,
    navbar,
    groupedNavbar,
    sidebar,
    footer,

    _definePage,
    _setupPages,
  }
})

/**
 * Function to setup pages
 */
export const setupPages = () => useStoreNavigation()._setupPages()

/**
 * Function to add pages
 * @param page
 */
export const definePage = (page: Page) =>
  useStoreNavigation()._definePage({ page })
