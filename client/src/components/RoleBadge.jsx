const RoleBadge = ({ role = 'user', children }) => {
  return (
    <span className={`role-badge ${role} flex-center gap-10px`}>
      {children}
    </span>
  )
}

export default RoleBadge;
