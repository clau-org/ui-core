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

function getUniqueObjects({ arr, prop }: { arr: any[]; prop: string }) {
  const set = new Set(arr.map((e) => e[prop]))
  const uniqueObjs = [...set].map((id) => arr.find((e: any) => e[prop] === id))
  return uniqueObjs
}

// Default values for a PageLabel object
const defaultPageLabel: PageLabel = {
  id: '',
  show: true,
  index: 0,
  subPageLabels: [],
}

// Default values for a Page object
const defaultPage: Page = {
  id: '',
  route: '',
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
  let id = pageLabel.id || page.id

  // Extract the last segment of the route to use as the default title for the page label, if not already set
  let title = route?.split('/')?.slice(-1)[0]

  const formattedPageLabel = { ...pageLabel, id, route, title }

  return formattedPageLabel
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
  // Check if page ID already exists in pages array
  const pageExists = pages.some((p) => p.id === page.id)

  // If page ID does not exist, push the page to the array
  if (!pageExists) {
    const newPage = { ...defaultPage, ...page }

    let pageLabels = ['navbar', 'footer', 'sidebar']
    pageLabels.forEach((pageLabel) => {
      if (newPage[pageLabel])
        newPage[pageLabel] = formatPageLabel({
          pageLabel: newPage[pageLabel],
          page,
        })
    })

    pages.push(newPage)
  }

  return pages
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
  let pages: Page[] = []

  routes.forEach((route) => {
    const { meta, name, path } = route

    pages.push({
      id: name,
      route: path,
      ...(meta as any),
    })
  })
  return pages
}

function getTargetPageLabels({
  pages,
  target,
}: {
  pages: Page[]
  target: string
}): PageLabel[] {
  let pageLabels: PageLabel[] = []

  pages.forEach((page: Page) => {
    let currentPageLabel: PageLabel = page[target]

    if (currentPageLabel.show) {
      pageLabels.push(currentPageLabel)
    }
  })

  return pageLabels
}

/**
 * Groups the given list of pages by their navbar routes.
 *
 * @param {Object} params - The object containing the list of pages to group
 * @param {Page[]} params.pages - List of pages to group
 * @returns {PageLabel[]} - Grouped pages
 */
function _groupPageLabels({ pages }: { pages: Page[] }): PageLabel[] {
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

function groupPages({ pages }: { pages: Page[] }) {
  let pageRoutesAsArray = pages.map((page) => {
    let currentPage = page

    if (currentPage.route === '/') currentPage.route = '/index'

    let routeAsArray = currentPage.route
      .split('/')
      .filter((route) => route)
      .map((e) => ({
        id: e,
        page,
      }))

    // logger.info(
    //   prettyJson({
    //     routeAsArray,
    //   }),
    // )

    return routeAsArray
  })

  let maxArrayLength = Math.max(
    ...pageRoutesAsArray.map((array) => array.length),
  )

  // logger.info(prettyJson({
  //   pageRoutesAsArray,
  //   maxArrayLength,
  // }))

  // for (let i = 0; i <= maxArrayLength; i++) {
  //   let some: any = {
  //     i,
  //   }

  //   pageRoutesAsArray.forEach((routesAsArray) => {
  //     logger.info({routesAsArray})
  //     some[`${routesAsArray[i]}`] = routesAsArray[i]
  //   })

  //   // logger.info({
  //   //   some,
  //   // })
  // }

  let routeMatrix = pageRoutesAsArray


  for(let i=0; i<=maxArrayLength; i++){
    for(let j=0; j<=maxArrayLength; j++){
      logger.info({
        data: routeMatrix[i][j]?.id
      })

      routeMatrix[i][j] = routeMatrix[i][j]
    } 
  }

  const getFirst = () => {
    const firsElements = routeMatrix.map((e) => e[0]);

    logger.info({firsElements})
    const uniqueFirst = getUniqueObjects({
      arr: firsElements,
      prop: 'id',
    }).map(e => e.page)

    return uniqueFirst
  }
    

  // let firsElements = routeMatrix.map((e) => e[0])

  // const set = new Set(firsElements.map((e) => e.id))

  // const uniqueObjs = [...set].map((id) => firsElements.find((e) => e.id === id))

  // const arr = Array.from(new Set (routeMatrix.map((e) => e[0]).map(e => JSON.stringify(e)))).map(e => JSON.parse(e))

  const getAfterFirst = (id: string) => {
    let result = []
    for (let i = 0; i < routeMatrix.length; i++) {
      let currentArray = routeMatrix[i]
      for (let j = 0; j < maxArrayLength; j++) {
        let currentElement = routeMatrix[i][j]
        // logger.info({
        //   i,
        //   j,
        //   currentElement,
        // })

        if (currentElement?.id === id) {
          result.push(currentArray[0].page)
        }
      }
    }

    return result
  }

  logger.info(
    prettyJson({
      // routeMatrix,
      first: getFirst(),
      // uniqueObjs
      // getAfterFirst: getAfterFirst('home'),
    }),
  )

  return {
    pageRoutesAsArray,
    maxArrayLength,
  }
}

export const useStoreNavigation = defineStore('Navigation', () => {
  // Holds all the defined pages
  const navigationPages = ref<Page[]>([])

  // Vue Router Routes as Pages
  const routesAsPages = getRoutesAsPages()

  // Add routes to Navigation Pages
  routesAsPages.forEach((routeAsPage) => {
    addPageToPages({
      pages: navigationPages.value,
      page: routeAsPage,
    })
  })

  const navbarPageLabels = computed((): PageLabel[] =>
    getTargetPageLabels({
      pages: navigationPages.value,
      target: 'navbar',
    }),
  )

  const groupedNavbar = computed(() => {
    return groupPages({
      pages: navigationPages.value,
    })
  })

  return {
    navigationPages,
    routesAsPages,

    navbarPageLabels,
    groupedNavbar,
  }
})
