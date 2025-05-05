import {h} from 'vue';

export const menuOptions = [
  {
    label: 'Home',
    key: 'Home'
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
  {
    icon: () => h(
      'a',
      {
        href: 'https://www.instagram.com/haydenbproductions/',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      [
        h('img', {
          src: new URL('../assets/Instagram-Logo.svg', import.meta.url).href,
          style: 'width: 20px; height: 20px; display: block;'
        })
      ]  
    )
  }

]