"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import {
  Language,
  Product,
  BaseProduct,
  Products,
  Translations,
  ProductTranslations,
  TypedTextProps,
  Category,
  EmailTemplateParams,
  BaseProducts,
  CategoryTranslations,
  Network,
  TranslationKeys,
  CategoryTranslationKeys,
} from "./types"
import { Metadata } from "next"
import Head from "next/head"

// Добавляем импорт шрифта
const senBold = {
  fontFamily: "Sen-Bold",
  src: `url('/fonts/Sen-Bold.ttf') format('truetype')`,
}

export default function KamianiKaraniPreview() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("rings")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [language, setLanguage] = useState<Language>("ru")
  const productContainerRef = useRef<HTMLDivElement>(null)
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [showCart, setShowCart] = useState(false)
  const cartIconRef = useRef<HTMLButtonElement>(null)
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [cookiesAllowed, setCookiesAllowed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [notificationType, setNotificationType] = useState<"success" | "error">("success")
  const [showUsdtNetworks, setShowUsdtNetworks] = useState(false)
  const [showRevolutModal, setShowRevolutModal] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Инициализируем EmailJS
  useEffect(() => {
    emailjs.init("kmBEvr-hVFjlHtPlI")
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Проверяем, было ли уже получено согласие на cookies
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (cookieConsent) {
      setCookiesAllowed(cookieConsent === "accepted")
    }
  }, [])

  // Translations
  const translations: Record<Language, TranslationKeys> = {
    ru: {
      viewCatalog: "Смотреть каталог",
      home: "Главная",
      catalog: "Каталог",
      about: "О нас",
      philosophy: "Наша философия",
      philosophyText:
        "Мы создаем уникальные изделия, вдохновленные природой и геометрией. Каждое изделие — это результат тщательной ручной работы, внимания к деталям и стремления к совершенству. Мы верим, что красота заключается в простоте и естественности форм.",
      jewelry: "Украшения",
      homeDecor: "Декор для дома",
      posters: "Постеры",
      aboutUs: "О нас",
      aboutText1:
        "Мы — небольшая мастерская, создающая уникальные украшения и предметы интерьера. Наша история началась с любви к природе и желания создавать вещи, которые будут радовать глаз и душу.",
      aboutText2:
        "Каждое изделие создается вручную с использованием натуральных материалов и современных технологий. Мы стремимся к тому, чтобы наши работы были не только красивыми, но и функциональными.",
      quote: "Красота в простоте и гармонии с природой",
      rights: "© 2025 kamianikarani. Все права защищены.",
      tagline: "Уникальные украшения и предметы интерьера, созданные с любовью к природе и минимализму",
      prev: "Предыдущие товары",
      next: "Следующие товары",
      orderSuccess: "Заказ успешно отправлен!",
      orderError: "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.",
      sending: "Отправка...",
    },
    en: {
      viewCatalog: "View Catalog",
      home: "Home",
      catalog: "Catalog",
      about: "About",
      philosophy: "Our Philosophy",
      philosophyText:
        "We create unique pieces inspired by nature and geometry. Each item is the result of careful handwork, attention to detail, and the pursuit of perfection. We believe that beauty lies in the simplicity and naturalness of forms.",
      jewelry: "Jewelry",
      homeDecor: "Home Decor",
      posters: "Posters",
      aboutUs: "About Us",
      aboutText1:
        "We are a small workshop creating unique jewelry and interior items. Our story began with a love for nature and a desire to create things that would please the eye and soul.",
      aboutText2:
        "Each piece is handcrafted using natural materials and modern technologies. We strive to make our works not only beautiful but also functional.",
      quote: "Beauty in simplicity and harmony with nature",
      rights: "© 2025 kamianikarani. All rights reserved.",
      tagline: "Unique jewelry and interior items created with love for nature and minimalism",
      prev: "Previous items",
      next: "Next items",
      orderSuccess: "Order successfully submitted!",
      orderError: "An error occurred while submitting your order. Please try again.",
      sending: "Sending...",
    },
  }

  // Category translations
  const categoryTranslations: Record<Language, CategoryTranslationKeys> = {
    ru: {
      rings: "Кольца",
      earrings: "Серьги",
      pendants: "Подвески",
      tables: "Столы",
      lamps: "Лампы",
      posters: "Постеры",
    },
    en: {
      rings: "Rings",
      earrings: "Earrings",
      pendants: "Pendants",
      tables: "Tables",
      lamps: "Lamps",
      posters: "Posters",
    },
  }

  // Product translations
  const productTranslations: Record<Language, Record<string, { title: string; description: string }>> = {
    ru: {
      ring1: {
        title: 'Кольцо "Песок"',
        description: "Изящное кольцо с текстурой песка",
      },
      ring2: {
        title: 'Кольцо "Волна"',
        description: "Кольцо с волнообразным дизайном",
      },
      ring3: {
        title: 'Кольцо "Натура"',
        description: "Кольцо, вдохновленное природными формами",
      },
      ring4: {
        title: 'Кольцо "Форест"',
        description: "Кольцо с мотивами лесной тематики",
      },
      ring5: {
        title: 'Кольцо "Море"',
        description: "Кольцо с мотивами морской стихии",
      },
      earring1: {
        title: 'Серьги "Геометрия"',
        description: "Минималистичные серьги геометрической формы",
      },
      earring2: {
        title: 'Серьги "Лес"',
        description: "Серьги, вдохновленные лесными мотивами",
      },
      earring3: {
        title: 'Серьги "Минимал"',
        description: "Минималистичные серьги для повседневного образа",
      },
      pendant1: {
        title: 'Подвеска "Треугольник"',
        description: "Геометрическая подвеска в форме треугольника",
      },
      pendant2: {
        title: 'Подвеска "Капля"',
        description: "Элегантная подвеска в форме капли",
      },
      pendant3: {
        title: 'Подвеска "Лист"',
        description: "Подвеска в форме листа",
      },
      table1: {
        title: 'Стол "Натура"',
        description: "Стол из натурального дерева с уникальным дизайном",
      },
      table2: {
        title: 'Стол "Река"',
        description: "Стол с элементами эпоксидной смолы",
      },
      lamp1: {
        title: 'Лампа "Ветви"',
        description: "Дизайнерская лампа в форме ветвей дерева",
      },
      lamp2: {
        title: 'Лампа "Геометрия"',
        description: "Лампа с геометрическим дизайном",
      },
      poster1: {
        title: 'Постер "Линии"',
        description: "Минималистичный постер с абстрактными линиями",
      },
      poster2: {
        title: 'Постер "Круги"',
        description: "Постер с геометрическими кругами",
      },
      poster3: {
        title: 'Постер "Геометрия"',
        description: "Постер с геометрическими формами",
      },
    },
    en: {
      ring1: {
        title: 'Ring "Sand"',
        description: "Elegant ring with sand texture",
      },
      ring2: {
        title: 'Ring "Wave"',
        description: "Ring with wave-like design",
      },
      ring3: {
        title: 'Ring "Nature"',
        description: "Ring inspired by natural forms",
      },
      ring4: {
        title: 'Ring "Forest"',
        description: "Ring with forest-themed motifs",
      },
      ring5: {
        title: 'Ring "Sea"',
        description: "Ring with sea-themed motifs",
      },
      earring1: {
        title: 'Earrings "Geometry"',
        description: "Minimalist earrings with geometric shape",
      },
      earring2: {
        title: 'Earrings "Forest"',
        description: "Earrings inspired by forest motifs",
      },
      earring3: {
        title: 'Earrings "Minimal"',
        description: "Minimalist earrings for everyday look",
      },
      pendant1: {
        title: 'Pendant "Triangle"',
        description: "Geometric pendant in the shape of a triangle",
      },
      pendant2: {
        title: 'Pendant "Drop"',
        description: "Elegant pendant in the shape of a drop",
      },
      pendant3: {
        title: 'Pendant "Leaf"',
        description: "Pendant in the shape of a leaf",
      },
      table1: {
        title: 'Table "Nature"',
        description: "Table made of natural wood with unique design",
      },
      table2: {
        title: 'Table "River"',
        description: "Table with epoxy resin elements",
      },
      lamp1: {
        title: 'Lamp "Branches"',
        description: "Designer lamp in the shape of tree branches",
      },
      lamp2: {
        title: 'Lamp "Geometry"',
        description: "Lamp with geometric design",
      },
      poster1: {
        title: 'Poster "Lines"',
        description: "Minimalist poster with abstract lines",
      },
      poster2: {
        title: 'Poster "Circles"',
        description: "Poster with geometric circles",
      },
      poster3: {
        title: 'Poster "Geometry"',
        description: "Poster with geometric shapes",
      },
    },
  }

  const t = translations[language]

  const categories = [
    {
      id: "rings",
      name: categoryTranslations[language].rings,
      icon: (
        <img
          src="/ring-icon.svg"
          alt="Rings"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
    {
      id: "earrings",
      name: categoryTranslations[language].earrings,
      icon: (
        <img
          src="/earring-icon.svg"
          alt="Earrings"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
    {
      id: "pendants",
      name: categoryTranslations[language].pendants,
      icon: (
        <img
          src="/pendants-icon.svg"
          alt="Pendants"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
    {
      id: "tables",
      name: categoryTranslations[language].tables,
      icon: (
        <img
          src="/tables-icon.svg"
          alt="Tables"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
    {
      id: "lamps",
      name: categoryTranslations[language].lamps,
      icon: (
        <img
          src="/lamps-icon.svg"
          alt="Lamps"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
    {
      id: "posters",
      name: categoryTranslations[language].posters,
      icon: (
        <img
          src="/posters-icon.svg"
          alt="Posters"
          className="w-20 h-16 brightness-0 invert object-contain"
        />
      ),
    },
  ]

  // Base product structure
  const baseProducts: BaseProducts = {
    rings: [
      { id: "ring1", image: "/ring/ring_product_1.png?height=300&width=300" },
      { id: "ring2", image: "/ring/ring_product_2.jpg?height=300&width=300" },
      { id: "ring3", image: "/ring/ring_product_3.png?height=300&width=300" },
      
      
    ],
    earrings: [
      { id: "earring1", image: "/earring/earring_product_1.jpg?height=300&width=300" },
      { id: "earring2", image: "/earring/earring_product_2.jpg?height=300&width=300" },
      { id: "earring3", image: "/earring/earring_product_3.png?height=300&width=300" },
      { id: "earring4", image: "/earring/earring_product_4.png?height=300&width=300" },
      { id: "earring5", image: "/earring/earring_product_5.jpg?height=300&width=300" },
      { id: "earring6", image: "/earring/earring_product_6.jpg?height=300&width=300" },
      { id: "earring7", image: "/earring/earring_product_7.jpg?height=300&width=300" },
      { id: "earring8", image: "/earring/earring_product_8.jpg?height=300&width=300" },
      { id: "earring9", image: "/earring/earring_product_9.jpg?height=300&width=300" },
      { id: "earring10", image: "/earring/earring_product_10.jpg?height=300&width=300" },
      { id: "earring11", image: "/earring/earring_product_11.jpg?height=300&width=300" },
      { id: "earring12", image: "/earring/earring_product_12.jpg?height=300&width=300" },
      { id: "earring13", image: "/earring/earring_product_13.jpg?height=300&width=300" },
      { id: "earring14", image: "/earring/earring_product_14.jpg?height=300&width=300" },
      { id: "earring15", image: "/earring/earring_product_15.jpg?height=300&width=300" },
      { id: "earring16", image: "/earring/earring_product_16.jpg?height=300&width=300" },
      { id: "earring17", image: "/earring/earring_product_17.jpg?height=300&width=300" },
      { id: "earring18", image: "/earring/earring_product_18.jpg?height=300&width=300" },
      { id: "earring19", image: "/earring/earring_product_19.jpg?height=300&width=300" },
      { id: "earring20", image: "/earring/earring_product_20.jpg?height=300&width=300" },
      { id: "earring21", image: "/earring/earring_product_21.jpg?height=300&width=300" },
      { id: "earring22", image: "/earring/earring_product_22.jpg?height=300&width=300" },
      { id: "earring23", image: "/earring/earring_product_23.jpg?height=300&width=300" },
      { id: "earring24", image: "/earring/earring_product_24.jpg?height=300&width=300" },
    ],
    pendants: [
      { id: "pendant1", image: "/pendant/pendant_product_1.jpg?height=300&width=300" },
      { id: "pendant2", image: "/pendant/pendant_product_2.jpg?height=300&width=300" },
      
    ],
    tables: [
      { id: "table1", image: "/table/table_product_1.jpg?height=300&width=300" },
      
    ],
    lamps: [
      { id: "lamp1", image: "/lamp/lamp_product_1.jpg?height=300&width=300" },
      { id: "lamp2", image: "/lamp/lamp_product_2.png?height=300&width=300" },
    ],
    posters: [
      { id: "poster1", image: "/poster/poster_product_1.jpg?height=300&width=300" },
      { id: "poster2", image: "/poster/poster_product_2.jpg?height=300&width=300" },
      { id: "poster3", image: "/poster/poster_product_3.jpg?height=300&width=300" },
    ],
  }

  // Generate products with translations
  const products = Object.keys(baseProducts).reduce<Products>((acc, category) => {
    acc[category] = baseProducts[category].map((product) => ({
      ...product,
      title: productTranslations[language][product.id]?.title || "Неизвестный товар",
      description: productTranslations[language][product.id]?.description || "Описание отсутствует",
    }))
    return acc
  }, {})

  const openLightbox = (product: Product) => {
    setSelectedProduct(product)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedProduct(null)
  }

  const TypedText: React.FC<TypedTextProps> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    useEffect(() => {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1))
        }, 80)

        return () => clearTimeout(timeout)
      } else if (!isTypingComplete) {
        setIsTypingComplete(true)
        setShowCursor(false)
      }
    }, [displayedText, text, isTypingComplete])

    return (
      <span
        className="inline-block"
        style={{ fontFamily: "Sen-Bold", fontWeight: 800, letterSpacing: "-0.02em", textShadow: "0 0 1px currentColor" }}
      >
        {displayedText}
        {showCursor && <span className="typed-cursor ml-1">|</span>}
      </span>
    )
  }

  const scrollNext = () => {
    if (productContainerRef.current) {
      const container = productContainerRef.current
      const containerWidth = container.clientWidth
      const newScrollPosition = Math.min(scrollPosition + containerWidth, container.scrollWidth - containerWidth)
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" })
      setScrollPosition(newScrollPosition)
    }
  }

  const scrollPrev = () => {
    if (productContainerRef.current) {
      const container = productContainerRef.current
      const containerWidth = container.clientWidth
      const newScrollPosition = Math.max(scrollPosition - containerWidth, 0)
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" })
      setScrollPosition(newScrollPosition)
    }
  }

  // Reset scroll position when category changes
  useEffect(() => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollTo({ left: 0, behavior: "smooth" })
      setScrollPosition(0)
    }
  }, [selectedCategory])

  const currentProducts = products[selectedCategory] || []
  const isScrollable = (productContainerRef.current?.scrollWidth ?? 0) > (productContainerRef.current?.clientWidth ?? 0)
  const canScrollPrev = scrollPosition > 0
  const canScrollNext =
    productContainerRef.current &&
    scrollPosition < ((productContainerRef.current.scrollWidth ?? 0) - (productContainerRef.current.clientWidth ?? 0))

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru")
  }

  const addToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation()

    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: (updatedCartItems[existingItemIndex].quantity || 1) + 1,
      }
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productId)
    const existingItem = cartItems[existingItemIndex]

    if (existingItemIndex !== -1 && existingItem && existingItem.quantity && existingItem.quantity > 1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      }
      setCartItems(updatedCartItems)
    } else {
      setCartItems(cartItems.filter((item) => item.id !== productId))
    }
  }

  const openCart = () => {
    setShowCart(true)
  }

  const closeCart = () => {
    setShowCart(false)
  }

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const email = (e.target as HTMLFormElement).email.value
    const comment = (e.target as HTMLFormElement).comment.value

    // Безопасно обрабатываем товары в корзине
    const orderDetails = cartItems
      .filter(item => item && item.id) // Проверяем только наличие id
      .map((item) => {
        const quantity = item.quantity || 1
        const title = item.title || productTranslations[language][item.id]?.title || "Неизвестный товар"
        return `${title} (${language === "ru" ? "Количество" : "Quantity"}: ${quantity})`
      })
      .join("\n")

    const templateParams = {
      from_name: email,
      message: comment || "Нет комментария",
      order_details: orderDetails || "Нет товаров в заказе"
    }

    emailjs.send("kamianikarani@gmail.com", "template_io84qs8", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text)
        setNotificationType("success")
        setNotification(t.orderSuccess)
        closeCart()
        setCartItems([])
        setIsSubmitting(false)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      },
      (error) => {
        console.log("FAILED...", error)
        setNotificationType("error")
        setNotification(t.orderError)
        setIsSubmitting(false)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }
    )
  }

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowCookieConsent(false)
    setCookiesAllowed(true)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowCookieConsent(false)
    setCookiesAllowed(false)
  }

  const toggleUsdtNetworks = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowUsdtNetworks(!showUsdtNetworks)
  }

  const toggleRevolutModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowRevolutModal(!showRevolutModal)
  }

  // Функция для безопасного использования cookies
  const setCookie = (name: string, value: string, days: number) => {
    if (!cookiesAllowed) return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // Функция для безопасного получения cookies
  const getCookie = (name: string): string | null => {
    if (!cookiesAllowed) return null

    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  return (
    <div className="min-h-screen font-sans">
      <Head>
        <title>KamianiKarani</title>
        <meta name="description" content="KamianiKarani - украшения и предметы интерьера" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/kamianikarani.svg" />
        <link rel="icon" type="image/png" href="/kamianikarani.png" />
        <link rel="apple-touch-icon" href="/kamianikarani.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      {/* Background with overlay */}
      <div className="fixed inset-0 z-[-1]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>
      </div>

      {/* Language Switcher and Cart - Fixed in top right corner */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
        <button
          ref={cartIconRef}
          onClick={openCart}
          className="bg-gray-200 px-3 py-2 rounded-full text-gray-800 hover:bg-gray-300 transition-all duration-300 flex items-center"
        >
          <img
            src="/cart.svg"
            alt="Cart Icon"
            className="h-5 w-5"
          />
          {cartItems.length > 0 && (
            <span className="ml-1 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
            </span>
          )}
        </button>
        <button
          onClick={toggleLanguage}
          className="bg-gray-200 px-3 py-1 rounded-full text-gray-800 hover:bg-gray-300 transition-all duration-300"
        >
          {language === "ru" ? "EN" : "RU"}
        </button>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            <TypedText text="kamianikarani" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="#catalog"
            className="bg-white/20 backdrop-blur-md px-8 py-3 text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 inline-flex items-center"
          >
            {t.viewCatalog}
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <img
            src="/down.svg"
            alt="Scroll down"
            className="h-10 w-10 rightness-0 invert"
          />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section
        id="intro"
        className="py-20 px-4 md:px-10 relative z-10 bg-gradient-to-b from-black/0 via-black/20 to-black/40 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6 md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t.philosophy}
              </motion.h2>

              <motion.p
                className="text-white/80 mb-12 md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t.philosophyText}
              </motion.p>
            </div>

            <div className="md:w-1/2">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-square relative">
                    <img
                      src="/philosophy_1.png?height=200&width=200"
                      alt={t.jewelry}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-square relative">
                    <img
                      src="/philosophy_2.jpg?height=200&width=200"
                      alt={t.homeDecor}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-square relative">
                    <img
                      src="/philosophy_3.png?height=200&width=200"
                      alt={t.posters}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20 px-4 md:px-10 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.catalog}
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-white/10 backdrop-blur-md p-3 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 w-14 h-14 relative ${selectedCategory === category.id ? "ring-2 ring-white" : ""}`}
              >
                <div className="w-16 h-16 flex items-center justify-center text-white">{category.icon}</div>
              </button>
            ))}
          </motion.div>

          <div>
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-4 w-14 h-14 flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-white">
                {categories.find((c) => c.id === selectedCategory)?.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h3>
            </motion.div>

            <div className="relative">
              {/* Navigation Arrows */}
              {currentProducts.length > 3 && (
                <>
                  {canScrollPrev && (
                    <button
                      onClick={scrollPrev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md text-white rounded-full p-3 transition-opacity opacity-80 hover:opacity-100"
                      aria-label={t.prev}
                    >
                      <img
                        src="/left.svg"
                        alt="Previous"
                        className="h-8 w-8 brightness-0 invert"
                      />
                    </button>
                  )}
                  {canScrollNext && (
                    <button
                      onClick={scrollNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md text-white rounded-full p-3 transition-opacity opacity-80 hover:opacity-100"
                      aria-label={t.next}
                    >
                      <img
                        src="/right.svg"
                        alt="Next"
                        className="h-8 w-8 brightness-0 invert"
                      />
                    </button>
                  )}
                </>
              )}

              {/* Product container with completely hidden scrollbar */}
              <div
                ref={productContainerRef}
                className="overflow-x-auto hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex space-x-6" style={{ paddingLeft: "12px", paddingRight: "12px" }}>
                  {currentProducts.map((product: Product) => (
                    <motion.div
                      key={product.id}
                      className="flex-shrink-0 w-[280px] md:w-[320px] overflow-hidden"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(product)}
                    >
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer relative">
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          <button
                            className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-all z-10"
                            onClick={(e) => addToCart(product, e)}
                            aria-label={language === "ru" ? "Добавить в корзину" : "Add to cart"}
                          >
                            <img
                              src="/cart.svg"
                              alt="Cart Icon"
                              className="h-5 w-5"
                            />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{product.title}</h3>
                          <p className="text-sm text-white/70">{product.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-10 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.aboutUs}
          </motion.h2>

          <div className="space-y-8">
            <motion.p
              className="text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t.aboutText1}
            </motion.p>

            <motion.p
              className="text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t.aboutText2}
            </motion.p>

            <motion.blockquote
              className="border-l-4 border-purple-500 pl-6 py-2 my-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl italic text-white/90">"{t.quote}"</p>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-0 border-white/20 text-center bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-6 mb-6">
            <div className="relative group">
              <a
                href="mailto:kamianikarani@gmail.com"
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                aria-label="Email us"
              >
                <img
                  src="/mail.svg"
                  alt="mail Icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-white/10 text-white text-sm rounded-md py-1 px-3 shadow-lg border border-gray-200">
                  {language === "ru" ? "Написать нам" : "Email us"}
                </div>
               </div>
            </div>

            <div className="relative group">
              <a
                href="https://www.instagram.com/kamianikarani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                aria-label="Follow us on Instagram"
              >
                <img
                  src="/instargam.svg"
                  alt="instagram Icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-white/10 text-white text-sm rounded-md py-1 px-3 shadow-lg border border-gray-200">
                  {language === "ru" ? "Подписаться в Instagram" : "Follow us on Instagram"}
                </div>
               </div>
            </div>

            {/* USDT Icon */}
            <div className="relative group">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                aria-label="USDT Donation"
                onClick={toggleUsdtNetworks}
              >
                 <img
                  src="/tether.svg"
                  alt="USDT Icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-white/10 text-white text-sm rounded-md py-1 px-3 shadow-lg border border-gray-200">
                  {language === "ru" ? "Donation USDT" : "USDT Donation"}
                </div>
               </div>
            </div>

            {/* PayPal Icon */}
            <div className="relative group">
              <a
                href="https://www.paypal.me/storminside"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                aria-label="PayPal Payment"
              >
                <img
                  src="/paypal.svg"
                  alt="PayPal Icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-white/10 text-white text-sm rounded-md py-1 px-3 shadow-lg border border-gray-200">
                  {language === "ru" ? "Donation PayPal" : "PayPal Donation"}
                </div>
               </div>
            </div>

            {/* Revolut Icon */}
            <div className="relative group">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center"
                aria-label="Revolut Payment"
                onClick={toggleRevolutModal}
              >
                 <img
                  src="/revolut.svg"
                  alt="Revolut Icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-white/10 text-white text-sm rounded-md py-1 px-3 shadow-lg border border-gray-200">
                  {language === "ru" ? "Donation Revolut" : "Revolut Donation"}
                </div>
               </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            © 2025 KamianiKarani. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-lg"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-white rounded-full p-2 hover:bg-white/10 transition-colors"
              onClick={closeLightbox}
            >
              <img
                src="/cross.svg"
                alt="Close"
                className="h-9 w-9 brightness-0 invert"
              />
            </button>

            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-white space-y-2 px-6">
              <h3 className="text-xl font-bold">{selectedProduct.title}</h3>
              <p className="text-white/70 text-sm max-w-md text-center">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg">
          <div className="relative max-w-2xl w-full bg-black/40 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden p-6 mx-4">
            <button
              className="absolute top-4 right-4 z-10 text-white/70 rounded-full p-2 hover:bg-white/10 transition-colors"
              onClick={closeCart}
            >
              <img
                src="/cross.svg"
                alt="Close"
                className="h-9 w-9 brightness-0 invert"
              />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">{language === "ru" ? "Корзина" : "Shopping Cart"}</h2>

            {cartItems.length === 0 ? (
              <p className="text-white/70 text-center py-8">
                {language === "ru" ? "Ваша корзина пуста" : "Your cart is empty"}
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto mb-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center justify-between bg-black/30 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-md overflow-hidden mr-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <p className="text-white/60 text-sm">
                            {language === "ru" ? "Количество: " : "Quantity: "}
                            {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/60 hover:text-white/90 transition-colors"
                      >
                        <img
                          src="/bin.svg"
                          alt="Remove item"
                          className="h-6 w-6 invert"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <form ref={formRef} className="space-y-4" onSubmit={handleSubmitOrder}>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      {language === "ru" ? "Email для связи" : "Contact Email"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder={language === "ru" ? "Введите ваш email" : "Enter your email"}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-white mb-2">
                      {language === "ru" ? "Комментарий к заказу" : "Order Notes"}
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder={language === "ru" ? "Дополнительная информация" : "Additional information"}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t.sending : language === "ru" ? "Отправить заказ" : "Submit Order"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-black/70 backdrop-blur-md text-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {language === "ru" ? "Мы используем cookies" : "We use cookies"}
            </h3>
            <p className="text-sm text-white/80 mb-4">
              {language === "ru"
                ? "Мы используем cookies для улучшения вашего опыта на нашем сайте."
                : "We use cookies to enhance your experience on our website."}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={acceptCookies}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-md text-sm transition-colors"
              >
                {language === "ru" ? "Принять" : "Accept"}
              </button>
              <button
                onClick={declineCookies}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-md text-sm transition-colors"
              >
                {language === "ru" ? "Отклонить" : "Decline"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Уведомление */}
      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notificationType === "success" ? "bg-green-600" : "bg-red-600"
          } text-white font-medium transition-all duration-300`}
        >
          {notification}
        </div>
      )}
      {/* USDT Networks Modal */}
      {showUsdtNetworks && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-black/60 backdrop-blur-md shadow-xl rounded-lg overflow-hidden p-6 mx-4">
            <button
              className="absolute top-4 right-4 z-10 text-white/70 rounded-full p-2 hover:bg-white/10 transition-colors"
              onClick={toggleUsdtNetworks}
            >
               <img
                src="/cross.svg"
                alt="Close"
                className="h-9 w-9 brightness-0 invert"
              />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {language === "ru" ? "Выберите сеть USDT" : "Choose USDT Network"}
            </h2>

            <div className="space-y-3">
              {[
                { name: "Ethereum", id: "eth", address: "0xec9Eb2a6bd47c9610d23717E32995AABD3CeEe9F" },
                { name: "TON", id: "ton", address: "UQAVYJ7bi9YwRxTNMDgiUM4Zj-I8YQJ7A6jE5bVsKW1z3ZOg" },
                { name: "Solana", id: "sol", address: "42ZWJWtSuTJoCPgc5pQc4ERW3DWEFJyvtzGURb5ptthk" },
                { name: "Polygon", id: "polygon", address: "0xec9Eb2a6bd47c9610d23717E32995AABD3CeEe9F" },
                { name: "BNB Chain (BEP-20)", id: "bnb", address: "0xec9Eb2a6bd47c9610d23717E32995AABD3CeEe9F" },
                { name: "Arbitrum", id: "arbitrum", address: "0xec9Eb2a6bd47c9610d23717E32995AABD3CeEe9F" },
                { name: "Tron (TRC-20)", id: "tron", address: "TYB64Tr9HoNEraNQVDVkUPWekSxx2sSuBy" },
              ].map((network) => (
                <button
                  key={network.id}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-md text-left transition-colors flex items-center justify-between"
                  onClick={() => {
                    navigator.clipboard.writeText(network.address)
                    setNotificationType("success")
                    setNotification(language === "ru" ? "Адрес скопирован" : "Address copied")
                    setTimeout(() => {
                      setNotification(null)
                    }, 3000)
                    setShowUsdtNetworks(false)
                  }}
                >
                  <span>{network.name}</span>
                  <span className="text-white/50 text-sm">{language === "ru" ? "Копировать" : "Copy"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Revolut Modal */}
      {showRevolutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-black/60 backdrop-blur-md shadow-xl rounded-lg overflow-hidden p-6 mx-4">
            <button
              className="absolute top-4 right-4 z-10 text-white/70 rounded-full p-2 hover:bg-white/10 transition-colors"
              onClick={() => setShowRevolutModal(false)}
            >
              <img
                src="/cross.svg"
                alt="Close"
                className="h-9 w-9 brightness-0 invert"
              />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              {language === "ru" ? "Revolut Donation" : "Revolut Donation"}
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <img
                  src="/revolut-qr.png"
                  alt="Revolut QR Code"
                  className="w-48 h-48 mb-4"
                />
                <p className="text-white/70 text-sm text-center mb-4">
                  {language === "ru" 
                    ? "Отсканируйте QR-код для перевода через Revolut" 
                    : "Scan QR code to transfer via Revolut"}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-white/70 text-sm">
                  {language === "ru" ? "Или используйте ссылку:" : "Or use the link:"}
                </p>
                <a
                  href="https://revolut.me/kamianikarani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-md text-left transition-colors flex items-center justify-between"
                >
                  <span>revolut.me/kamianikarani</span>
                  <span className="text-white/50 text-sm">{language === "ru" ? "Перейти" : "Go to"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: "KamianiKarani",
  description: "KamianiKarani - украшения и предметы интерьера",
}

