// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import VerticalNavDropdown from './VerticalNavDropdown'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  if (item.subtitle) return VerticalNavDropdown

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return (
      <>
        <TagName {...props} key={index} item={item} />
      </>
    )
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
