import { CategoryCreateInput } from "@/db/prisma/models/Category";

export const categoriesData: CategoryCreateInput[] = [
  {
    name: 'Coffee',
    slug: 'coffee',
    products: {
      create: [
        {
          name: 'Cold Brew Coffee',
          slug: 'cold-brew-coffee',
          description:
            'Our cold brew is slowly steeped for many hours using carefully selected premium coffee beans. The result is a smooth, naturally sweet cup with low bitterness, a rich aroma, and a clean finish. Served chilled over ice, it is an easy choice for anyone looking for a refreshing coffee with a deeper flavor profile.',
          price: 799,
          isNew: true,
          imageUrl: '/images/menu/coffee/image-17.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 949 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Espresso',
          slug: 'espresso',
          description:
            'Rich and aromatic espresso made from freshly ground beans with a balanced body and smooth finish.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-12.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 649 },
            ],
          },
        },
        {
          name: 'Americano',
          slug: 'americano',
          description:
            'Smooth espresso topped with hot water for a clean, bold, and balanced coffee.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-10.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Cappuccino',
          slug: 'cappuccino',
          description:
            'Classic espresso combined with steamed milk and a thick layer of creamy foam.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-15.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 849 },
            ],
          },
        },
        {
          name: 'Cafe Latte',
          slug: 'cafe-latte',
          description:
            'Smooth espresso blended with steamed milk, creating a creamy texture and gentle coffee flavor that works beautifully throughout the day.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-11.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 849 },
            ],
          },
        },
        {
          name: 'Mocha',
          slug: 'mocha',
          description:
            'Espresso combined with rich chocolate and steamed milk for a smooth coffee drink with a subtle dessert-like sweetness.',
          price: 649,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-18.png',
          sizes: {
            create: [
              { name: 'Small', price: 649 },
              { name: 'Medium', price: 749 },
              { name: 'Large', price: 899 },
            ],
          },
        },
        {
          name: 'Caramel Latte',
          slug: 'caramel-latte',
          description:
            'Creamy espresso latte finished with a rich caramel flavor and a soft sweet finish.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-14.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Vanilla Latte',
          slug: 'vanilla-latte',
          description:
            'Espresso and steamed milk combined with smooth vanilla for a lightly sweet and comforting coffee.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-16.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Hazelnut Latte',
          slug: 'hazelnut-latte',
          description:
            'A creamy latte with roasted hazelnut flavor, smooth espresso, and a delicate nutty aroma.',
          price: 749,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-13.png',
          sizes: {
            create: [
              { name: 'Small', price: 749 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Flat White',
          slug: 'flat-white',
          description:
            'Velvety espresso drink made with finely textured milk and a stronger coffee character.',
          price: 649,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-19.png',
          sizes: {
            create: [
              { name: 'Small', price: 649 },
              { name: 'Medium', price: 749 },
              { name: 'Large', price: 899 },
            ],
          },
        },
        {
          name: 'Macchiato',
          slug: 'macchiato',
          description:
            'A bold espresso marked with a small amount of steamed milk foam.',
          price: 549,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-11.png',
          sizes: {
            create: [
              { name: 'Small', price: 549 },
              { name: 'Medium', price: 649 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Double Espresso',
          slug: 'double-espresso',
          description:
            'Two rich espresso shots brewed together for a stronger and more concentrated coffee experience.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-10.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 799 },
            ],
          },
        },
        {
          name: 'Long Black',
          slug: 'long-black',
          description:
            'Bold espresso poured over hot water, creating a smooth coffee with a clean and lasting finish.',
          price: 549,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-18.png',
          sizes: {
            create: [
              { name: 'Small', price: 549 },
              { name: 'Medium', price: 649 },
              { name: 'Large', price: 799 },
            ],
          },
        },
        {
          name: 'Cortado',
          slug: 'cortado',
          description:
            'Balanced espresso softened with warm steamed milk for a rich but gentle coffee.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-15.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 799 },
            ],
          },
        },
        {
          name: 'Irish Cream Latte',
          slug: 'irish-cream-latte',
          description:
            'Creamy espresso latte with a smooth Irish cream flavor, subtle sweetness, and a rich aroma that makes it especially enjoyable as an afternoon treat.',
          price: 799,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-17.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 899 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Cinnamon Latte',
          slug: 'cinnamon-latte',
          description:
            'Warm espresso latte with aromatic cinnamon and creamy steamed milk.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-12.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Honey Latte',
          slug: 'honey-latte',
          description:
            'Silky espresso latte naturally sweetened with honey for a softer and more floral finish.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-14.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Hazelnut Mocha',
          slug: 'hazelnut-mocha',
          description:
            'Rich chocolate mocha combined with roasted hazelnut and smooth espresso. The drink has a creamy texture, deep chocolate aroma, and a nutty finish that makes it feel closer to a dessert while still keeping the character of freshly brewed coffee.',
          price: 849,
          isNew: true,
          imageUrl: '/images/menu/coffee/image-19.png',
          sizes: {
            create: [
              { name: 'Small', price: 849 },
              { name: 'Medium', price: 999 },
              { name: 'Large', price: 1199 },
            ],
          },
        },
        {
          name: 'Brown Sugar Latte',
          slug: 'brown-sugar-latte',
          description:
            'Espresso latte sweetened with caramelized brown sugar and finished with smooth steamed milk.',
          price: 749,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-16.png',
          sizes: {
            create: [
              { name: 'Small', price: 749 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Spanish Latte',
          slug: 'spanish-latte',
          description:
            'Rich espresso blended with creamy condensed milk, creating a smooth, sweet, and satisfying coffee with a velvety texture.',
          price: 749,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-13.png',
          sizes: {
            create: [
              { name: 'Small', price: 749 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Oat Milk Latte',
          slug: 'oat-milk-latte',
          description:
            'Smooth espresso paired with creamy oat milk, offering a naturally soft texture and subtle sweetness.',
          price: 799,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-18.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 899 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Almond Latte',
          slug: 'almond-latte',
          description:
            'Espresso with smooth almond milk and a gentle roasted-nut finish.',
          price: 799,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-10.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 899 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Vanilla Cold Brew',
          slug: 'vanilla-cold-brew',
          description:
            'Slow-steeped cold brew combined with subtle vanilla sweetness for a smooth and refreshing coffee.',
          price: 799,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-17.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 949 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Nitro Cold Brew',
          slug: 'nitro-cold-brew',
          description:
            'Smooth cold brew infused with nitrogen to create a naturally creamy texture and rich mouthfeel without adding heavy sweetness.',
          price: 899,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-15.png',
          sizes: {
            create: [
              { name: 'Small', price: 899 },
              { name: 'Medium', price: 1049 },
              { name: 'Large', price: 1199 },
            ],
          },
        },
        {
          name: 'Espresso Tonic',
          slug: 'espresso-tonic',
          description:
            'Bright espresso served over sparkling tonic water with ice for a refreshing combination of bitterness, citrus-like acidity, and gentle sweetness.',
          price: 749,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-11.png',
          sizes: {
            create: [
              { name: 'Small', price: 749 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Affogato',
          slug: 'affogato',
          description:
            'Creamy vanilla ice cream topped with a fresh espresso shot, creating a beautiful contrast between cold sweetness and warm coffee.',
          price: 899,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-16.png',
          sizes: {
            create: [
              { name: 'Small', price: 899 },
              { name: 'Medium', price: 1099 },
              { name: 'Large', price: 1299 },
            ],
          },
        },
        {
          name: 'Dirty Latte',
          slug: 'dirty-latte',
          description:
            'Chilled milk topped with a rich espresso shot. Simple, creamy, refreshing, and especially satisfying when you want a strong coffee flavor without a heavy drink.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-12.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Maple Latte',
          slug: 'maple-latte',
          description:
            'Creamy espresso latte with natural maple sweetness and a warm, smooth finish.',
          price: 749,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-14.png',
          sizes: {
            create: [
              { name: 'Small', price: 749 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Coconut Latte',
          slug: 'coconut-latte',
          description:
            'Espresso blended with creamy coconut milk for a smooth tropical coffee with a lightly sweet finish.',
          price: 799,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-19.png',
          sizes: {
            create: [
              { name: 'Small', price: 799 },
              { name: 'Medium', price: 899 },
              { name: 'Large', price: 1099 },
            ],
          },
        },
        {
          name: 'Pistachio Latte',
          slug: 'pistachio-latte',
          description:
            'A creamy espresso-based drink made with freshly brewed espresso, steamed milk, and a smooth pistachio blend. It has a gentle roasted-nut aroma, balanced sweetness, and a soft creamy texture that stays pleasant from the first sip to the last. Finished with a light layer of milk foam, this latte is designed for customers who enjoy a richer and more dessert-like coffee experience without making the drink overwhelmingly sweet.',
          price: 899,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-13.png',
          sizes: {
            create: [
              { name: 'Small', price: 899 },
              { name: 'Medium', price: 1049 },
              { name: 'Large', price: 1199 },
            ],
          },
        },
        {
          name: 'Dark Chocolate Mocha',
          slug: 'dark-chocolate-mocha',
          description:
            'Bold espresso blended with rich dark chocolate for a deep, smooth, and slightly bitter coffee experience.',
          price: 849,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-18.png',
          sizes: {
            create: [
              { name: 'Small', price: 849 },
              { name: 'Medium', price: 999 },
              { name: 'Large', price: 1149 },
            ],
          },
        },
        {
          name: 'Iced Coffee',
          slug: 'iced-coffee',
          description:
            'Classic brewed coffee served chilled over ice for a simple, refreshing everyday drink.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/coffee/image-10.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 849 },
            ],
          },
        },
      ],
    },
  },

  {
    name: 'Cold Drinks',
    slug: 'cold-drinks',
    products: {
      create: [
        {
          name: 'Iced Latte',
          slug: 'iced-latte',
          description:
            'Chilled espresso with milk and ice, creating a smooth and refreshing coffee drink with a creamy finish.',
          price: 699,
          isNew: true,
          imageUrl: '/images/menu/cold-drinks/image-23.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Lemonade',
          slug: 'lemonade',
          description:
            'Freshly squeezed lemonade with a hint of mint and a bright citrus finish.',
          price: 399,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-20.png',
          sizes: {
            create: [
              { name: 'Small', price: 399 },
              { name: 'Medium', price: 499 },
              { name: 'Large', price: 649 },
            ],
          },
        },
        {
          name: 'Peach Tea',
          slug: 'peach-tea',
          description:
            'Refreshing iced tea with sweet peach flavor and a light fruity aroma.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-24.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Passion Fruit Tea',
          slug: 'passion-fruit-tea',
          description:
            'Fragrant iced tea with tropical passion fruit, gentle sweetness, and a refreshing tart finish.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-22.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Lychee Tea',
          slug: 'lychee-tea',
          description:
            'Light and refreshing tea with juicy lychee flavor and a delicate floral aroma.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-25.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Strawberry Soda',
          slug: 'strawberry-soda',
          description:
            'Sparkling soda with sweet strawberry flavor and plenty of ice.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-21.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Blueberry Soda',
          slug: 'blueberry-soda',
          description:
            'Refreshing sparkling soda with blueberry notes and a clean, fruity finish.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-20.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Mango Smoothie',
          slug: 'mango-smoothie',
          description:
            'Creamy smoothie made with ripe mangoes, blended until smooth and naturally sweet.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-23.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 749 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Strawberry Smoothie',
          slug: 'strawberry-smoothie',
          description:
            'Fresh strawberry smoothie with a creamy texture, gentle sweetness, and bright berry flavor.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-24.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 749 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Mixed Berry Smoothie',
          slug: 'mixed-berry-smoothie',
          description:
            'A generous blend of strawberries, blueberries, and raspberries. The combination creates a vibrant fruit flavor with a creamy texture and a naturally tart finish that balances the sweetness of the berries.',
          price: 649,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-22.png',
          sizes: {
            create: [
              { name: 'Small', price: 649 },
              { name: 'Medium', price: 799 },
              { name: 'Large', price: 999 },
            ],
          },
        },
        {
          name: 'Mango Tea',
          slug: 'mango-tea',
          description:
            'Iced tea infused with tropical mango flavor and a refreshing fruity finish.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-21.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Green Apple Soda',
          slug: 'green-apple-soda',
          description:
            'Crisp sparkling soda with fresh green apple flavor and a slightly tart finish.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-25.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Orange Fizz',
          slug: 'orange-fizz',
          description:
            'Sparkling orange drink with a bright citrus flavor, gentle sweetness, and a refreshing finish.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-20.png',
          sizes: {
            create: [
              { name: 'Small', price: 449 },
              { name: 'Medium', price: 549 },
              { name: 'Large', price: 699 },
            ],
          },
        },
        {
          name: 'Cucumber Lime Cooler',
          slug: 'cucumber-lime-cooler',
          description:
            'Cool cucumber and fresh lime come together in this light and refreshing drink. The crisp cucumber flavor is balanced by bright citrus and a subtle sweetness, making it especially enjoyable on warm afternoons.',
          price: 549,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-23.png',
          sizes: {
            create: [
              { name: 'Small', price: 549 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 899 },
            ],
          },
        },
        {
          name: 'Watermelon Cooler',
          slug: 'watermelon-cooler',
          description:
            'Refreshing watermelon drink served chilled over ice with a naturally sweet and juicy flavor.',
          price: 549,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-24.png',
          sizes: {
            create: [
              { name: 'Small', price: 549 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 899 },
            ],
          },
        },
        {
          name: 'Ginger Lemon Tea',
          slug: 'ginger-lemon-tea',
          description:
            'Iced tea with bright lemon and warming ginger. Fresh, lightly spicy, and refreshing with a clean citrus finish.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-22.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Honey Lemon Tea',
          slug: 'honey-lemon-tea',
          description:
            'Refreshing lemon tea lightly sweetened with honey and served chilled.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-21.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Pineapple Soda',
          slug: 'pineapple-soda',
          description:
            'Tropical pineapple flavor combined with sparkling soda for a bright and refreshing drink.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-25.png',
          sizes: {
            create: [
              { name: 'Small', price: 499 },
              { name: 'Medium', price: 599 },
              { name: 'Large', price: 749 },
            ],
          },
        },
        {
          name: 'Raspberry Lemonade',
          slug: 'raspberry-lemonade',
          description:
            'Fresh lemonade balanced with sweet raspberry and served over ice. Bright, fruity, and slightly tart, this drink is designed to be refreshing without becoming overly sweet.',
          price: 549,
          isNew: true,
          imageUrl: '/images/menu/cold-drinks/image-23.png',
          sizes: {
            create: [
              { name: 'Small', price: 549 },
              { name: 'Medium', price: 699 },
              { name: 'Large', price: 899 },
            ],
          },
        },
        {
          name: 'Coconut Cooler',
          slug: 'coconut-cooler',
          description:
            'Light and refreshing coconut-based cold drink with a smooth tropical flavor.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-20.png',
          sizes: {
            create: [
              { name: 'Small', price: 599 },
              { name: 'Medium', price: 749 },
              { name: 'Large', price: 949 },
            ],
          },
        },
        {
          name: 'Iced Matcha',
          slug: 'iced-matcha',
          description:
            'Smooth Japanese matcha served chilled over ice. The drink has a gentle earthy aroma, creamy texture, and subtle bitterness balanced by a light sweetness.',
          price: 699,
          isNew: false,
          imageUrl: '/images/menu/cold-drinks/image-24.png',
          sizes: {
            create: [
              { name: 'Small', price: 699 },
              { name: 'Medium', price: 849 },
              { name: 'Large', price: 1049 },
            ],
          },
        },
      ],
    },
  },

  {
    name: 'Bakery',
    slug: 'bakery',
    products: {
      create: [
        {
          name: 'Croissant',
          slug: 'croissant',
          description:
            'Buttery and flaky French pastry with delicate layers and a golden, crisp exterior.',
          price: 350,
          isNew: true,
          imageUrl: '/images/menu/bakery/image-28.png',
        },
        {
          name: 'Chocolate Croissant',
          slug: 'chocolate-croissant',
          description:
            'Flaky French pastry filled with rich chocolate and baked until golden brown.',
          price: 399,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-26.png',
        },
        {
          name: 'Almond Croissant',
          slug: 'almond-croissant',
          description:
            'Buttery croissant topped with toasted almonds and a lightly sweet almond filling.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-30.png',
        },
        {
          name: 'Blueberry Muffin',
          slug: 'blueberry-muffin',
          description:
            'Soft and tender muffin packed with juicy blueberries and finished with a lightly golden top.',
          price: 399,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-27.png',
        },
        {
          name: 'Chocolate Muffin',
          slug: 'chocolate-muffin',
          description:
            'Moist chocolate muffin with rich cocoa flavor and a soft center that pairs beautifully with coffee.',
          price: 399,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-29.png',
        },
        {
          name: 'Banana Bread',
          slug: 'banana-bread',
          description:
            'Moist homemade-style banana bread made with ripe bananas and a gentle touch of cinnamon.',
          price: 429,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-26.png',
        },
        {
          name: 'Cinnamon Roll',
          slug: 'cinnamon-roll',
          description:
            'Soft pastry rolled with cinnamon sugar and finished with a smooth glaze. Warm, fragrant, and comforting, it makes an easy pairing with freshly brewed coffee.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-28.png',
        },
        {
          name: 'Chocolate Brownie',
          slug: 'chocolate-brownie',
          description:
            'Rich and fudgy chocolate brownie with an intense cocoa flavor and soft, chewy center.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-30.png',
        },
        {
          name: 'Cheesecake Slice',
          slug: 'cheesecake-slice',
          description:
            'Creamy cheesecake with a buttery biscuit base and a smooth, rich texture. The balanced sweetness makes it suitable as a light dessert after coffee or as an afternoon treat on its own.',
          price: 599,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-27.png',
        },
        {
          name: 'Carrot Cake',
          slug: 'carrot-cake',
          description:
            'Moist carrot cake layered with smooth cream cheese frosting and a gentle blend of warm spices.',
          price: 549,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-29.png',
        },
        {
          name: 'Lemon Tart',
          slug: 'lemon-tart',
          description:
            'Buttery tart filled with bright lemon curd, balancing a crisp pastry shell with fresh citrus acidity.',
          price: 499,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-26.png',
        },
        {
          name: 'Apple Danish',
          slug: 'apple-danish',
          description:
            'Flaky Danish pastry filled with cinnamon apples and a lightly sweet glaze.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-28.png',
        },
        {
          name: 'Pain au Chocolat',
          slug: 'pain-au-chocolat',
          description:
            'Classic French pastry filled with dark chocolate and baked until crisp and golden.',
          price: 429,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-30.png',
        },
        {
          name: 'Vanilla Pound Cake',
          slug: 'vanilla-pound-cake',
          description:
            'Classic buttery pound cake with delicate vanilla flavor and a soft, dense crumb.',
          price: 449,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-27.png',
        },
        {
          name: 'Matcha Cookie',
          slug: 'matcha-cookie',
          description:
            'Crisp cookie with a delicate matcha flavor, subtle sweetness, and a gentle earthy finish.',
          price: 299,
          isNew: true,
          imageUrl: '/images/menu/bakery/image-29.png',
        },
        {
          name: 'Chocolate Chip Cookie',
          slug: 'chocolate-chip-cookie',
          description:
            'Soft-baked cookie filled with chocolate chips and finished with a lightly crisp edge.',
          price: 299,
          isNew: false,
          imageUrl: '/images/menu/bakery/image-26.png',
        },
      ],
    },
  },
];