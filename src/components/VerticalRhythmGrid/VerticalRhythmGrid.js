import React from 'react'
import './VerticalRhythmGrid.css'

export default class VerticalRhythmGrid extends React.Component {
  state = {
    show: false
  }
  componentWillMount () {
    if (process.env.NODE_ENV !== 'production') {
      document.body.addEventListener('mouseenter', this.handleMouseEnter)
      document.body.addEventListener('mouseleave', this.handleMouseLeave)
    }
  }
  componentWillUnmount () {
    document.body.removeEventListener('mouseenter', this.handleMouseEnter)
    document.body.removeEventListener('mouseleave', this.handleMouseLeave)
  }
  handleMouseEnter = () => {
    this.setState({ show: true })
  }
  handleMouseLeave = () => {
    this.setState({ show: false })
  }
  render () {
    if (!this.state.show) {
      return null
    }
    return <div className="VerticalRhythmGrid"/>
  }
}
