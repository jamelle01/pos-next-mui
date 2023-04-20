// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** Utils
import { handleURLQueries } from 'src/@core/layouts/utils'

// miui icons
import CircleOutline from 'mdi-material-ui/CircleOutline'
import { ChevronRight, ChevronDown } from 'mdi-material-ui'

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavDropdown = ({ item, navVisible, toggleNavVisibility }) => {
  // ** Props
  // const { item } = props

  // ** Hooks
  const router = useRouter()
  const IconTag = item.icon
  const [res, setRes] = useState(false)

  const isNavLinkActive = item => {
    let isActive = false
    for (let i = 0; i < item.path.length; i++) {
      const path = item.path[i]
      if (router.pathname === path.href || handleURLQueries(router, path.href)) {
        isActive = true
        break
      }
    }
    return isActive
  }


  const [isClicked, setIsClicked] = useState(false)

  return (
    <>
      <ListItem
        // style={{ display: 'block' }}
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1.5, px: '0 !important' }}
      >
        {/* <Link passHref href={item.path === undefined ? '/' : `${item.path}`}> */}
        <MenuNavLink
          component={'a'}
          className={isClicked ? 'active' : ''}
          style={{
            background: isClicked ? 'linear-gradient(to right, #cccccc, #b3b3b3)' : ''
          }}
          // {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            // if (item.path === undefined) {
            //   e.preventDefault()
            //   e.stopPropagation()
            // }
            // if (navVisible) {
            //   toggleNavVisibility()
            // }
            setIsClicked(!isClicked)
          }}
          sx={{
            pl: 5.5,
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
          }}
        >
          <ListItemIcon
            sx={{
              mr: 2.5,
              color: 'text.primary',
              transition: 'margin .25s ease-in-out'
            }}
          >
            <UserIcon icon={IconTag} />
          </ListItemIcon>

          <MenuItemTextMetaWrapper>
            <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.subtitle}</Typography>

            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  marginLeft: 1.25,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
          <ListItemIcon
            sx={{
              mr: 2.5,
              color: 'text.primary',
              transition: 'margin .25s ease-in-out'
            }}
          >
            <UserIcon icon={isClicked ? ChevronDown : ChevronRight} />
          </ListItemIcon>
        </MenuNavLink>

        {/* <MenuNavLink>...</MenuNavLink> */}
        {/* </Link> */}
      </ListItem>
      {isClicked && (
        <>
          {item.items.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              className='nav-link'
              disabled={item.disabled || false}
              sx={{ mt: 1.5, px: '0 !important' }}
            >
              {console.log(item.path[0].href)}
              <Link passHref href={item.path[0].href === undefined ? '/' : `${item.path[0].href}`}>
                <MenuNavLink
                  component={'a'}
                  className={isNavLinkActive(item) ? 'active' : ''}
                  {...(item.openInNewTab ? { target: '_blank' } : null)}
                  onClick={e => {
                    if (item.path[0].href === undefined) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    if (navVisible) {
                      toggleNavVisibility()
                    }
                  }}
                  sx={{
                    pl: 5.5,
                    ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                  }}
                >
                  <ListItemIcon
                    sx={{
                      mr: 2.5,
                      color: 'text.primary',
                      transition: 'margin .25s ease-in-out'
                    }}
                  >
                    <UserIcon icon={CircleOutline} />
                  </ListItemIcon>

                  <MenuItemTextMetaWrapper>
                    <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>

                    {item.badgeContent ? (
                      <Chip
                        label={item.badgeContent}
                        color={item.badgeColor || 'primary'}
                        sx={{
                          height: 20,
                          fontWeight: 500,
                          marginLeft: 1.25,
                          '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                        }}
                      />
                    ) : null}
                  </MenuItemTextMetaWrapper>
                </MenuNavLink>
              </Link>
            </ListItem>
          ))}
        </>
      )}
    </>
  )
}

export default VerticalNavDropdown
