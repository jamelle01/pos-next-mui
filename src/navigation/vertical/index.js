// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import BasketOutline from 'mdi-material-ui/BasketOutline'
import Account from 'mdi-material-ui/Account'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      subtitle: 'Products',
      icon: ShoppingOutline,
      items: [
        {
          title: 'Products',
          path: [{ href: '/products' }, { href: '/products/create' }]
        },
        {
          title: 'Product Categories',
          path: [{ href: '/products/product-categories' }]
        },
        {
          title: 'Brands',
          path: [{ href: '/products/brands' }]
        }
      ]
    },
    {
      title: 'Quotations',
      icon: BasketOutline,
      path: '/quotations'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      subtitle: 'Form Layouts',
      icon: CubeOutline,
      items: [
        {
          title: 'Form Layout 1',
          path: [{ href: '/form-layouts' }]
        }
      ]
    }
  ]
}

export default navigation
