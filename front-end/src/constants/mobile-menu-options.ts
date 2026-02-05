import {h} from 'vue';

export const mobileMenuOptions = [
  {
    label: 'Menu',
    children: [
      {
        label: '',
        key: 'Home',
        icon: () => 
          h('img', {
            src: new URL('../assets/HBP-Black.svg', import.meta.url).href,
            style: 'width: 30px; height: 30px; display: block;'
          })
      },
      {
        label: 'Works',
        key: 'Works',
        children: [
          {
            label: 'Fashion',
            key: 'Fashion'
          },
          {
            label: 'Travel',
            key: 'Travel'
          },
          {
            label: 'Grads',
            key: 'Grads'
          },
          {
            label: 'Products',
            key: 'Products'
          },
          {
            label: 'Branding',
            key: 'Branding'
          },
          {
            label: 'Portraits',
            key: 'Portraits'
          },
          {
            label: 'Italy',
            key: 'Italy'
          },
          {
            label: 'Film',
            key: 'Film'
          }
        ]
      },
      {
        label: 'About',
        key: 'AboutPage'
      },
      {
        label: 'Contact',
        key: 'ContactPage'
      },
    ]
  }
]
