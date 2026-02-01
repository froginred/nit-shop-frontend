import React from 'react'
import '../styles/CustomLink.css'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'

const CustomLink = ({ to, children, className = "", ...rest }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  const finalClassName = `custom-link ${isActive ? "active" : ""} ${className}`.trim();

  return (
    <Link to={to} {...rest} className={finalClassName}>
      {children}
    </Link>
  )
}

export default CustomLink
