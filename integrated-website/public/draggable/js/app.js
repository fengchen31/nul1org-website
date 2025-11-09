import { preloadImages } from './utils.js'

gsap.registerPlugin(Draggable, Flip, SplitText)

class Grid {
  constructor() {
    this.dom = document.querySelector(".container")
    this.grid = document.querySelector(".grid")
    this.products = [...document.querySelectorAll(".product div")]

    this.details = document.querySelector(".details")
    this.detailsThumb = this.details.querySelector(".details__thumb")

    this.cross = document.querySelector(".cross")

    this.isDragging = false

    // Zoom state
    this.zoom = {
      current: 1,
      target: 1,
      min: 0.1, // Will be calculated dynamically
      max: 2,   // Maximum zoom in
      sensitivity: 0.01
    }
  }

  init() {
    this.intro()
  }

  intro() {
    this.centerGrid()

    const timeline = gsap.timeline()

    timeline.set(this.dom, { scale: .5 })

    // Ensure all products start visible (opacity: 1) to prevent disappearing
    timeline.set(this.products, {
      scale: 0.5,
      opacity: 1,
    })

    timeline.to(this.products, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        amount: 1.2,
        from: "random"
      }
    })
    timeline.to(this.dom, {
      scale: 1,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        this.setupDraggable()
        this.addEvents()
        this.refreshProducts()

        // Make sure all products are visible before observing
        this.products.forEach(product => {
          gsap.set(product, { scale: 1, opacity: 1 })
        })

        this.observeProducts()
        this.handleDetails()
      }
    })
  }

  refreshProducts() {
    // Re-query products after dynamic loading
    this.products = [...document.querySelectorAll(".product div")]
  }

  centerGrid() {
    const gridWidth = this.grid.offsetWidth
    const gridHeight = this.grid.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const centerX = (windowWidth - gridWidth) / 2
    const centerY = (windowHeight - gridHeight) / 2

    gsap.set(this.grid, {
      x: centerX,
      y: centerY
    })
  }

  setupDraggable() {
    this.dom.classList.add("--is-loaded")

    // Calculate minimum zoom to fit entire grid
    this.calculateZoomLimits()

    this.draggable = Draggable.create(this.grid, {
      type: "x,y",
      bounds: {
        minX: -(this.grid.offsetWidth - window.innerWidth),
        maxX: 0,
        minY: -(this.grid.offsetHeight - window.innerHeight),
        maxY: 0
      },
      inertia: true,
      allowEventDefault: true,
      edgeResistance: 0.9,

      onDragStart: () => {
        this.isDragging = true
        this.grid.classList.add("--is-dragging")
      },

      onDragEnd: () => {
        this.isDragging = false
        this.grid.classList.remove("--is-dragging")
      }
    })[0]
  }

  calculateZoomLimits() {
    const gridWidth = this.grid.offsetWidth
    const gridHeight = this.grid.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Calculate the scale needed to fit grid width to viewport width
    // This will make left and right edges align with screen sides
    const scaleX = windowWidth / gridWidth

    // Set minimum zoom to fit width perfectly
    this.zoom.min = scaleX

    // Ensure min is reasonable (not too small)
    this.zoom.min = Math.max(0.1, this.zoom.min)

    console.log('Zoom limits:', { min: this.zoom.min, max: this.zoom.max, gridWidth, gridHeight, windowWidth, windowHeight, scaleX })
  }

  addEvents() {
    window.addEventListener("wheel", (e) => {
      e.preventDefault()

      // Check if this is a pinch-to-zoom gesture (ctrlKey is true on trackpad pinch)
      if (e.ctrlKey) {
        // Don't allow zoom when details are showing
        if (this.SHOW_DETAILS) return

        // Pinch to zoom
        const zoomDelta = -e.deltaY * this.zoom.sensitivity
        const oldZoom = this.zoom.target
        this.zoom.target = Math.max(this.zoom.min, Math.min(this.zoom.max, this.zoom.target + zoomDelta))

        // Only apply zoom if it actually changed
        if (this.zoom.target !== oldZoom) {
          // Viewport center point
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2

          // Get current transform and scale
          const currentX = gsap.getProperty(this.grid, "x")
          const currentY = gsap.getProperty(this.grid, "y")

          // Calculate what point in the grid is currently at viewport center
          // Grid point = (viewport center - grid position) / current scale
          const gridCenterX = (centerX - currentX) / this.zoom.current
          const gridCenterY = (centerY - currentY) / this.zoom.current

          // Calculate new position so that same grid point stays at viewport center
          // New position = viewport center - (grid point * new scale)
          const newX = centerX - (gridCenterX * this.zoom.target)
          const newY = centerY - (gridCenterY * this.zoom.target)

          this.applyZoom(newX, newY)
        }
      } else {
        // Regular pan
        const deltaX = -e.deltaX * 7
        const deltaY = -e.deltaY * 7

        const currentX = gsap.getProperty(this.grid, "x")
        const currentY = gsap.getProperty(this.grid, "y")

        const newX = currentX + deltaX
        const newY = currentY + deltaY

        const bounds = this.draggable.vars.bounds
        const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX))
        const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY))

        gsap.to(this.grid, {
          x: clampedX,
          y: clampedY,
          duration: 0.3,
          ease: "power3.out"
        })
      }
    }, { passive: false })

    window.addEventListener("resize", () => {
      this.calculateZoomLimits()
      this.updateBounds()
    })

    window.addEventListener("mousemove", (e) => {
      if (this.SHOW_DETAILS) {
        this.handleCursor(e)
      }
    })
  }

  applyZoom(targetX, targetY) {
    // Show all products when zooming out
    if (this.zoom.target <= this.zoom.min * 1.2) {
      this.products.forEach(product => {
        gsap.to(product, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true
        })
      })
    }

    // Direct zoom without intermediate smoothing
    const animConfig = {
      scale: this.zoom.target,
      duration: 0.2,
      ease: "power1.out",
      overwrite: true,
      transformOrigin: "0% 0%", // Explicitly set transform origin to top-left
      onUpdate: () => {
        this.zoom.current = gsap.getProperty(this.grid, "scale")
        this.updateBounds()
      },
      onComplete: () => {
        // Trigger observer to re-check all products after zoom
        this.updateProductVisibility()

        // If zoomed out to show entire grid, center it
        if (this.zoom.current <= this.zoom.min * 1.01) {
          this.centerGridIfFitsInViewport()
        }
      }
    }

    // Apply position if provided
    if (targetX !== undefined && targetY !== undefined) {
      animConfig.x = targetX
      animConfig.y = targetY
    }

    gsap.to(this.grid, animConfig)
  }

  updateProductVisibility() {
    // Force update all product visibility based on current zoom
    if (this.zoom.current <= this.zoom.min * 1.2) {
      // Show all products when zoomed out
      this.products.forEach(product => {
        gsap.to(product, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true
        })
      })
    }
  }

  centerGridIfFitsInViewport() {
    const scaledWidth = this.grid.offsetWidth * this.zoom.current
    const scaledHeight = this.grid.offsetHeight * this.zoom.current

    // If grid is smaller than viewport, center it
    if (scaledWidth <= window.innerWidth && scaledHeight <= window.innerHeight) {
      const centerX = (window.innerWidth - scaledWidth) / 2
      const centerY = (window.innerHeight - scaledHeight) / 2

      gsap.to(this.grid, {
        x: centerX,
        y: centerY,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  updateBounds() {
    if (this.draggable) {
      const scaledWidth = this.grid.offsetWidth * this.zoom.current
      const scaledHeight = this.grid.offsetHeight * this.zoom.current

      this.draggable.vars.bounds = {
        minX: -(scaledWidth - window.innerWidth),
        maxX: 0,
        minY: -(scaledHeight - window.innerHeight),
        maxY: 0
      }

      // Update draggable with new bounds
      this.draggable.update()
    }
  }

  observeProducts() {
    this.productObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {

        if (entry.target === this.currentProduct) return

        // Always show products when zoomed out
        if (this.zoom.current <= this.zoom.min * 1.2) {
          gsap.to(entry.target, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          })
          return
        }

        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        } else {
          // Only hide when zoomed in
          gsap.to(entry.target, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "power2.in"
          })
        }
      })
    }, {
      root: null,
      threshold: 0.05
    })

    this.products.forEach(product => {
      this.productObserver.observe(product)
    })
  }

  handleDetails() {
    this.SHOW_DETAILS = false

    this.titles = this.details.querySelectorAll(".details__title p")
    this.texts = this.details.querySelectorAll(".details__body [data-text]")

    const splitTitles = new SplitText(this.titles, {
      type: "lines, chars",
      mask: "lines",
      charsClass: "char"
    })

    const splitTexts = new SplitText(this.texts, {
      type: "lines",
      mask: "lines",
      linesClass: "line"
    })

    this.products.forEach(product => {
      product.addEventListener("click", (e) => {
        e.stopPropagation()
        this.showDetails(product)
      })
    })

    this.dom.addEventListener("click", (e) => {
      if (this.SHOW_DETAILS) this.hideDetails()
    })
  }

  showDetails(product) {
    if (this.SHOW_DETAILS) return
    this.SHOW_DETAILS = true
    this.details.classList.add("--is-showing")
    this.dom.classList.add("--is-details-showing")

    // Disable dragging and zooming while details are open
    if (this.draggable) {
      this.draggable.disable()
    }

    gsap.to(this.dom, {
      x: "-50vw",
      duration: 1.2,
      ease: "power3.inOut",
    })

    gsap.to(this.details, {
      x: 0,
      duration: 1.2,
      ease: "power3.inOut",
    })

    this.flipProduct(product)

    const title = this.details.querySelector(`[data-title="${product.dataset.id}"]`)
    const text = this.details.querySelector(`[data-desc="${product.dataset.id}"]`)

    if (title) {
      gsap.to(title.querySelectorAll(".char"), {
        y: 0,
        duration: 1.1,
        delay: .4,
        ease: "power3.inOut",
        stagger: 0.025
      })
    }

    if (text) {
      gsap.to(text.querySelectorAll(".line"), {
        y: 0,
        duration: 1.1,
        delay: .4,
        ease: "power3.inOut",
        stagger: .05,
      })
    }
  }

  hideDetails() {
    this.SHOW_DETAILS = false

    this.dom.classList.remove("--is-details-showing")

    // Re-enable dragging and zooming
    if (this.draggable) {
      this.draggable.enable()
    }

    gsap.to(this.dom, {
      x: 0,
      duration: 1.2,
      delay: .3,
      ease: "power3.inOut",
      onComplete: () => {
        this.details.classList.remove("--is-showing")
      }
    })

    gsap.to(this.details, {
      x: "50vw",
      duration: 1.2,
      delay: .3,
      ease: "power3.inOut"
    })

    this.unFlipProduct()

    this.titles.forEach(title => {
      gsap.to(title.querySelectorAll(".char"), {
        y: "100%",
        duration: 0.6,
        ease: "power3.inOut",
        stagger: {
          amount: 0.025,
          from: "end"
        }
      })
    })

    this.texts.forEach(text => {
      gsap.to(text.querySelectorAll(".line"), {
        y: "100%",
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.05,
      })
    })
  }

  flipProduct(product) {
    this.currentProduct = product
    this.originalParent = product.parentNode

    if (this.observer) {
      this.observer.unobserve(product)
    }

    const state = Flip.getState(product)

    this.detailsThumb.appendChild(product)

    Flip.from(state, {
      absolute: true,
      duration: 1.2,
      ease: "power3.inOut",
    })

    gsap.to(this.cross, {
      scale: 1,
      duration: 0.4,
      delay: .5,
      ease: "power2.out"
    })
  }

  unFlipProduct() {
    if (!this.currentProduct || !this.originalParent) return

    gsap.to(this.cross, {
      scale: 0,
      duration: 0.4,
      ease: "power2.out"
    })

    const state = Flip.getState(this.currentProduct)

    const finalRect = this.originalParent.getBoundingClientRect()
    const currentRect = this.currentProduct.getBoundingClientRect()

    gsap.set(this.currentProduct, {
      position: "absolute",
      top: currentRect.top - this.detailsThumb.getBoundingClientRect().top + "px",
      left: currentRect.left - this.detailsThumb.getBoundingClientRect().left + "px",
      width: currentRect.width + "px",
      height: currentRect.height + "px",
      zIndex: 10000,
    })

    gsap.to(this.currentProduct, {
      top: finalRect.top - this.detailsThumb.getBoundingClientRect().top + "px",
      left: finalRect.left - this.detailsThumb.getBoundingClientRect().left + "px",
      width: finalRect.width + "px",
      height: finalRect.height + "px",
      duration: 1.2,
      delay: .3,
      ease: "power3.inOut",
      onComplete: () => {
        this.originalParent.appendChild(this.currentProduct)

        gsap.set(this.currentProduct, {
          position: "",
          top: "",
          left: "",
          width: "",
          height: "",
          zIndex: "",
        })

        this.currentProduct = null
        this.originalParent = null
      },
    })
  }

  handleCursor(e) {
    const x = e.clientX
    const y = e.clientY

    gsap.to(this.cross, {
      x: x - this.cross.offsetWidth / 2,
      y: y - this.cross.offsetHeight / 2,
      duration: 0.4,
      ease: "power2.out"
    })
  }
}

const grid = new Grid()

preloadImages('.grid img').then(() => {
  grid.init()
  document.body.classList.remove('loading')
})
