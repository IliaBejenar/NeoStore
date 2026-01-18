export const products = [
  /* ================= iPhone ================= */
  {
    id: "iphone-17",
    title: "iPhone 17",
    category: "iphone",
    price: 999,
    image: "iphone-17.png",

    description:
      "Powerful and elegant iPhone with advanced performance and stunning display.",

    highlights: [
      "6.1-inch OLED display",
      "A18 chip",
      "Advanced dual-camera system",
      "All-day battery life",
      "iOS 19"
    ],

    specs: {
      Display: "6.1-inch OLED",
      Chip: "Apple A18",
      Camera: "48MP + Ultra Wide",
      Battery: "Up to 26 hours video playback",
      OS: "iOS 19"
    },

    box: ["iPhone 17", "USB-C Charge Cable", "Documentation"],

    options: {
      colors: ["Black", "White", "Blue"],
      storage: ["128GB", "256GB", "512GB"]
    }
  },

  {
    id: "iphone-17-pro",
    title: "iPhone 17 Pro",
    category: "iphone",
    price: 1299,
    image: "iphone-17-pro.png",

    description:
      "The ultimate iPhone with ProMotion display, titanium body and A19 Pro chip.",

    highlights: [
      "6.3-inch ProMotion OLED display",
      "A19 Pro chip",
      "48MP Pro camera system",
      "Titanium design",
      "All-day battery life"
    ],

    specs: {
      Display: "6.3-inch OLED, 120Hz",
      Chip: "Apple A19 Pro",
      Camera: "48MP + Ultra Wide + Telephoto",
      Battery: "Up to 29 hours video playback",
      OS: "iOS 19"
    },

    box: ["iPhone 17 Pro", "USB-C Charge Cable", "Documentation"],

    options: {
      colors: ["Deep Blue", "Silver", "Orange"],
      storage: ["256GB", "512GB", "1TB"]
    }
  },

  /* ================= MacBook ================= */
  {
    id: "mbp-14",
    title: "MacBook Pro 14”",
    category: "macbook",
    price: 1999,
    image: "macbook-pro-14.png",

    description:
      "High-performance MacBook Pro with Apple Silicon for professionals.",

    highlights: [
      "14-inch Liquid Retina XDR display",
      "Apple M4 Pro chip",
      "Pro-level performance",
      "Up to 22 hours battery life"
    ],

    specs: {
      Display: "14.2-inch Liquid Retina XDR",
      Chip: "Apple M4 Pro",
      Memory: "Up to 32GB unified memory",
      Storage: "Up to 1TB SSD",
      Battery: "Up to 22 hours"
    },

    box: ["MacBook Pro 14”", "USB-C Power Adapter", "USB-C to MagSafe Cable"],

    options: {
      colors: ["Space Black", "Silver"],
      ram: ["16GB", "32GB"],
      ssd: ["512GB", "1TB"]
    }
  },

  {
    id: "mbp-16",
    title: "MacBook Pro 16”",
    category: "macbook",
    price: 2499,
    image: "macbook-pro-16.png",

    description:
      "The most powerful MacBook ever built for demanding workflows.",

    highlights: [
      "16-inch Liquid Retina XDR display",
      "Apple M4 Max chip",
      "Extreme performance",
      "Long-lasting battery"
    ],

    specs: {
      Display: "16.2-inch Liquid Retina XDR",
      Chip: "Apple M4 Max",
      Memory: "Up to 64GB unified memory",
      Storage: "Up to 2TB SSD",
      Battery: "Up to 24 hours"
    },

    box: ["MacBook Pro 16”", "USB-C Power Adapter", "USB-C to MagSafe Cable"],

    options: {
      colors: ["Space Black", "Silver"],
      ram: ["16GB", "32GB", "64GB"],
      ssd: ["1TB", "2TB"]
    }
  },

  {
    id: "mba-13",
    title: "MacBook Air 13”",
    category: "macbook",
    price: 1199,
    image: "macbook-air-13.png",

    description:
      "Ultra-thin MacBook Air with incredible performance and silent design.",

    highlights: [
      "13-inch Liquid Retina display",
      "Apple M3 chip",
      "Fanless design",
      "All-day battery life"
    ],

    specs: {
      Display: "13.6-inch Liquid Retina",
      Chip: "Apple M3",
      Memory: "Up to 16GB",
      Storage: "Up to 512GB SSD",
      Battery: "Up to 18 hours"
    },

    box: ["MacBook Air 13”", "USB-C Power Adapter", "USB-C Charge Cable"],

    options: {
      colors: ["Midnight", "Starlight", "Silver"],
      ram: ["8GB", "16GB"],
      ssd: ["256GB", "512GB"]
    }
  },

  {
    id: "mba-15",
    title: "MacBook Air 15”",
    category: "macbook",
    price: 1399,
    image: "macbook-air-15.png",

    description:
      "Larger MacBook Air with immersive display and powerful Apple Silicon.",

    highlights: [
      "15-inch Liquid Retina display",
      "Apple M3 chip",
      "Thin and lightweight design",
      "Long battery life"
    ],

    specs: {
      Display: "15.3-inch Liquid Retina",
      Chip: "Apple M3",
      Memory: "Up to 16GB",
      Storage: "Up to 512GB SSD",
      Battery: "Up to 18 hours"
    },

    box: ["MacBook Air 15”", "USB-C Power Adapter", "USB-C Charge Cable"],

    options: {
      colors: ["Midnight", "Starlight", "Silver"],
      ram: ["8GB", "16GB"],
      ssd: ["256GB", "512GB"]
    }
  },

  /* ================= AirPods ================= */
  {
    id: "airpods-pro-2",
    title: "AirPods Pro (2nd generation)",
    category: "airpods",
    price: 249,
    oldPrice: 299,
    image: "airpods-pro.png",

    description:
      "Active Noise Cancellation with immersive sound and adaptive transparency.",

    highlights: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Spatial Audio",
      "MagSafe Charging Case"
    ],

    specs: {
      Chip: "Apple H2",
      Battery: "Up to 6 hours (30 with case)",
      Resistance: "Sweat and water resistant"
    },

    box: ["AirPods Pro", "MagSafe Charging Case", "USB-C Cable", "Ear tips"],

    options: {
      colors: ["White"]
    }
  },

  {
    id: "airpods-4",
    title: "AirPods 4",
    category: "airpods",
    price: 179,
    image: "airpods-4.png",

    description:
      "Comfortable wireless earbuds with rich sound and seamless Apple integration.",

    highlights: [
      "High-quality sound",
      "Adaptive EQ",
      "Siri support",
      "Wireless charging case"
    ],

    specs: {
      Chip: "Apple H2",
      Battery: "Up to 6 hours (30 with case)"
    },

    box: ["AirPods", "Charging Case", "USB-C Cable"],

    options: {
      colors: ["White"]
    }
  },

  {
    id: "airpods-max",
    title: "AirPods Max",
    category: "airpods",
    price: 549,
    image: "airpods-max.png",

    description:
      "Over-ear headphones with high-fidelity audio and premium materials.",

    highlights: [
      "High-fidelity sound",
      "Active Noise Cancellation",
      "Spatial Audio",
      "Premium design"
    ],

    specs: {
      Chip: "Apple H1",
      Battery: "Up to 20 hours",
      Weight: "384g"
    },

    box: ["AirPods Max", "Smart Case", "Lightning Cable"],

    options: {
      colors: ["Space Gray", "Silver", "Blue"]
    }
  },

  /* ================= iPad ================= */
  {
    id: "ipad-air",
    title: "iPad Air",
    category: "ipad",
    price: 599,
    image: "ipad-air.png",

    description:
      "Powerful and versatile iPad Air with Apple Silicon performance.",

    highlights: [
      "10.9-inch Liquid Retina display",
      "Apple M2 chip",
      "Apple Pencil support",
      "All-day battery"
    ],

    specs: {
      Display: "10.9-inch Liquid Retina",
      Chip: "Apple M2",
      Battery: "Up to 10 hours"
    },

    box: ["iPad Air", "USB-C Cable", "Power Adapter"],

    options: {
      colors: ["Blue", "Purple", "Starlight"],
      storage: ["64GB", "256GB"]
    }
  },

  {
    id: "ipad-pro",
    title: "iPad Pro",
    category: "ipad",
    price: 999,
    image: "ipad-pro.png",

    description:
      "The ultimate iPad experience with M4 performance and Pro display.",

    highlights: [
      "Liquid Retina XDR display",
      "Apple M4 chip",
      "Pro cameras",
      "Face ID"
    ],

    specs: {
      Display: "12.9-inch Liquid Retina XDR",
      Chip: "Apple M4",
      Battery: "Up to 10 hours"
    },

    box: ["iPad Pro", "USB-C Cable", "Power Adapter"],

    options: {
      colors: ["Space Gray", "Silver"],
      storage: ["256GB", "512GB", "1TB"]
    }
  },

  {
    id: "ipad-mini",
    title: "iPad Mini",
    category: "ipad",
    price: 499,
    image: "ipad-mini.png",

    description:
      "Compact and powerful iPad mini with stunning performance.",

    highlights: [
      "8.3-inch Liquid Retina display",
      "Apple A17 chip",
      "Touch ID",
      "Portable design"
    ],

    specs: {
      Display: "8.3-inch Liquid Retina",
      Chip: "Apple A17",
      Battery: "Up to 10 hours"
    },

    box: ["iPad Mini", "USB-C Cable", "Power Adapter"],

    options: {
      colors: ["Purple", "Pink", "Gray"],
      storage: ["64GB", "256GB"]
    }
  }
];
