import { defineStore } from 'pinia'

type PageLabel = {
  id: string
  index?: number
  show?: boolean
  route?: string
  icon?: string
  title?: string
  description?: string
  subPageLabels?: PageLabel[]
}

type Page = {
  id: string
  route: string
  title?: string
  description?: string
  layout?: string
  navbar?: PageLabel
  sidebar?: PageLabel
  footer?: PageLabel
  [key: string]: any
}

// Default values for a PageLabel object
const defaultPageLabel: PageLabel = {
  id: '', // Its important to be empty
  show: false, // Its important to be false
  index: 0,
  subPageLabels: [],
}

// Default values for a Page object
const defaultPage: Page = {
  id: '', // Its important to be empty
  route: '', // Its important to be empty
  navbar: { ...defaultPageLabel },
  sidebar: { ...defaultPageLabel },
  footer: { ...defaultPageLabel },
}

/**
 * Function to format Page Label
 */
function formatPageLabel({
  pageLabel,
  page,
}: {
  pageLabel: PageLabel
  page: Page
}): PageLabel {
  let route = pageLabel.route ?? page.route
  // Extract the last segment of the route to use as the default title for the page label, if not already set
  let title = route?.split('/')?.slice(-1)[0]
  let id = pageLabel.id || page.id
  return { ...pageLabel, id, route, title }
}

/**
 * Function to define the data for a Page
 * @param page
 */
function addPageToPages({
  page,
  pages,
}: {
  page: Page
  pages: Page[]
}): Page[] {
  // New pages
  let newPages: Page[] = [...pages]

  // Check if page ID already exists in pages array
  const pageExists = newPages.some((currentPage) => currentPage.id === page.id)

  // If page ID does not exist, push the page to the array
  if (!pageExists) {
    let pageLabels = ['navbar', 'footer', 'sidebar']
    const newPage = { ...defaultPage, ...page }
    for (const pageLabel of pageLabels) {
      if (newPage[pageLabel])
        newPage[pageLabel] = formatPageLabel({
          pageLabel: newPage[pageLabel],
          page,
        })
    }
    newPages.push(newPage)
  }
  return newPages
}

/**
 * Initializes the `pages` array by adding a Page object for each route defined
 * in the current Vue Router instance. Each Page's ID will be set to the route's
 * name and its route to the route's path. The Page's additional properties will
 * be set based on the route's `meta` object (if any).
 */
function getRoutesAsPages(): Page[] {
  const router = useRouter()
  let routes = router.options.routes
  return routes.map((route) => {
    const { meta, name, path } = route
    return {
      id: name,
      route: path,
      ...(meta as any),
    }
  })
}

/**
 * This function takes in an object with two properties: `pages`, an array of `Page` objects, and `target`, a string.
 * @param param0
 * @returns
 */
function getTargetPages({
  pages,
  target,
}: {
  pages: Page[]
  target: string
}): Page[] {
  // The `filter()` method is called on the `pages` array to return a new array with only the `Page` objects that meet the specified conditions.
  return pages.filter((page: Page) => page[target].show && page.id !== 'index')
}

/**
 * Groups the given list of pages by their target routes.
 *
 * @param {Object} params - The object containing the list of pages to group
 * @param {Page[]} params.pages - List of pages to group
 * @returns {PageLabel[]} - Grouped pages
 */
function getGroupedPageLabels({
  pages,
  target,
}: {
  pages: Page[]
  target: string
}): PageLabel[] {
  // Initialize an empty array to store the grouped pages
  const groupedPages: PageLabel[] = []

  // Iterate through each page and group them based on their routes
  for (const page of pages) {
    // Initialize variables for the parent, parent label, and current target
    let parent = null
    let parentLabel = null
    let currentTarget: PageLabel = page[target] ?? {}

    // Destructure the `id`, `title`, and `targetData` properties from the current target object
    let { id, title, ...targetData } = currentTarget

    // Split the route of the current page by forward slashes and filter out any empty segments
    const routeSegments = page.route.split('/').filter(Boolean)

    // Log the `routeSegments` for debugging purposes
    logger.debug('[method: groupPageLabels]', '[routeSegments]', {
      routeSegments,
    })

    // Iterate through each segment of the route of the current page
    for (const [index, segment] of routeSegments.entries()) {
      // If this is the first segment of the route
      if (!parent) {
        // Find the parent label with a matching title in the `groupedPages` array
        parentLabel = groupedPages.find((group) => group.title === segment)
        // If a parent label doesn't exist, create a new one and push it to the `groupedPages` array
        if (!parentLabel) {
          parentLabel = {
            id: segment,
            title: segment,
            subPageLabels: [],
            ...targetData,
          }
          groupedPages.push(parentLabel)
        }

        // Set the `parent` variable to the subPageLabels array of the parent label
        parent = parentLabel.subPageLabels
      } else {
        // Find the sub-page label with a matching title in the `parent` array
        const subPageLabel: any = parent.find(
          (group: any) => group.title === segment,
        )
        // If a sub-page label doesn't exist, create a new one and push it to the `parent` array
        if (!subPageLabel) {
          parent.push({
            id: segment,
            title: segment,
            subPageLabels: [],
            ...targetData,
          })
          // Set the `parent` variable to the subPageLabels array of the newly created sub-page label
          parent = parent[parent.length - 1].subPageLabels
        } else {
          // If a sub-page label already exists, set the `parent` variable to its subPageLabels array
          parent = subPageLabel.subPageLabels
        }
      }
    }

    // Add the current page to the subPageLabels array of the parent label, if it exists and has a title
    if (parent && page.title) {
      parent.push({
        id: page.title,
        title: page.title,
        description: page.description || '',
        ...targetData,
      })
    }
  }

  // Return the `groupedPages` array
  return groupedPages
}

// This function defines a navigation store that holds all the defined pages.
function defineStoreNavigation() {
  // Create a reactive reference to an array of page objects.
  const appPages = ref<Page[]>([])

  // Get Vue Router Routes as Pages
  const nuxtPages = getRoutesAsPages()

  // Loop through the Vue Router routes and add them to the appPages array.
  for (const nuxtPage of nuxtPages) {
    appPages.value = addPageToPages({
      pages: appPages.value,
      page: { ...nuxtPage },
    })
  }

  // Define computed properties for the navbar, footer, and sidebar pages.
  const navbar = computed((): Page[] => {
    return getTargetPages({
      pages: appPages.value,
      target: 'navbar',
    })
  })

  const footer = computed((): Page[] => {
    return getTargetPages({
      pages: appPages.value,
      target: 'footer',
    })
  })

  const sidebar = computed((): Page[] => {
    return getTargetPages({
      pages: appPages.value,
      target: 'sidebar',
    })
  })

  // Define computed properties for the grouped navbar, footer, and sidebar pages.
  const navbarGrouped = computed(() => {
    return getGroupedPageLabels({
      pages: navbar.value,
      target: 'navbar',
    })
  })

  const footerGrouped = computed(() => {
    return getGroupedPageLabels({
      pages: footer.value,
      target: 'footer',
    })
  })

  const sidebarGrouped = computed(() => {
    return getGroupedPageLabels({
      pages: sidebar.value,
      target: 'sidebar',
    })
  })

  // Return an object containing all the defined properties.
  return {
    appPages,
    nuxtPages,

    navbar,
    footer,
    sidebar,

    navbarGrouped,
    footerGrouped,
    sidebarGrouped,
  }
}

export const useStoreNavigation = defineStore(
  'Navigation',
  defineStoreNavigation,
)
