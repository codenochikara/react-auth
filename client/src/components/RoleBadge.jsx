const RoleBadge = ({ role = 'user', icon = null, children }) => {
  return (
    <span className={`role-badge ${role} flex-center gap-10px`}>
      {icon}
      {children}
    </span>
  )
}

export default RoleBadge;
