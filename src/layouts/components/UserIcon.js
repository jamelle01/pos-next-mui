const UserIcon = props => {
  // ** Props
  const { icon, iconProps } = props
  const IconTag = icon
  let styles

  if (icon.type.render.displayName.toString() === 'CircleOutlineIcon') {
    styles = {
      // color: 'red',
      fontSize: '1rem',
      marginLeft: '1.5em'
    }
  }

  // @ts-ignore
  return <IconTag {...iconProps} style={{ ...styles }} />
}

export default UserIcon
