export const siteConfig = {
  name: "Life Begins After Coffee",
  nav: [
    { label: "Self", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Contact us", href: "#contact" },
  ],
  contact: {
    phone: "+8493 3688 247",
    email: "hello@beer.com",
  },
  socials: [
    { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { name: "X", href: "https://x.com", icon: "x" },
  ],
} as const;

export type SocialIcon = (typeof siteConfig.socials)[number]["icon"];