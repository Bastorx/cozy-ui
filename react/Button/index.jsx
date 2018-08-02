import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import styles from './styles.styl'
import Icon from '../Icon'

const btnClass = function(options) {
  const { className, extension, size, theme, variant } = options
  return cx(className, styles['c-btn'], {
    [styles[`c-btn--${theme}`]]: theme,
    [styles[`c-btn--${size}`]]: size,
    [styles[`c-btn--${variant}`]]: variant,
    [styles[`c-btn--${extension}`]]: extension
  })
}

const transformToAria = tag => props => {
  const { busy, disabled, ...newProps } = props

  if (busy) {
    newProps['aria-busy'] = true
  }
  if (disabled) {
    newProps['aria-disabled'] = true
  }
  if (tag === 'button' && disabled) {
    newProps['disabled'] = true
  }

  return newProps
}

const tagToTransformProps = {
  button: transformToAria('button'),
  a: transformToAria('a')
}

const identity = x => x

const BaseButton = props => {
  const {
    children,
    icon,
    label,
    subtle,
    className,
    extension,
    size,
    theme,
    tag: Tag,
    ...restProps
  } = props

  const transformProps = tagToTransformProps[Tag] || identity
  return (
    <Tag
      {...transformProps(restProps)}
      className={btnClass({
        extension,
        size,
        theme,
        className,
        variant: subtle && 'subtle'
      })}
    >
      <span>
        {Icon.isProperIcon(icon) ? <Icon icon={icon} /> : icon}
        {label && <span>{label}</span>}
        {children}
      </span>
    </Tag>
  )
}

const Button = props => <BaseButton {...props} />
const ButtonLink = props => <BaseButton {...props} />

export { Button, ButtonLink }

const DefaultButton = props => {
  if (!props.tag) {
    return <Button {...props} />
  } else {
    return <BaseButton {...props} />
  }
}

export default DefaultButton

// Proptypes (unfortunately, Styleguidist does not pick
// proptypes coming from a spread so we have to keep both
// proptypes in sync)
Button.propTypes = {
  /** DEPRECATED: please use label and icon */
  children: PropTypes.node,
  /** Label of the button */
  label: PropTypes.node,
  /** Icon of the button */
  icon: PropTypes.node,
  theme: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  /** Spacing of the button */
  extension: PropTypes.oneOf(['narrow', 'full']),
  /** Extra class */
  className: PropTypes.string,
  /** What to do on click */
  onClick: PropTypes.func,

  // Only for Button
  /** Will display a spinner if true */
  busy: PropTypes.bool,
  /** Disables the button */
  disabled: PropTypes.bool,
  /** Type of the underlying `<button />` */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  /** Use the `subtle` alternative look for the Button  */
  subtle: PropTypes.bool
}

BaseButton.defaultProps = {
  role: 'button'
}

Button.defaultProps = {
  type: 'submit',
  tag: 'button'
}

ButtonLink.defaultProps = {
  tag: 'a'
}