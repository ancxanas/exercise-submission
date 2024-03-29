import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import './Togglable.css'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="togglable-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="togglable-button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
