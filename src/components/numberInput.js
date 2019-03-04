import React from "react"

class NumberInput extends React.Component {
  render() {
    const { name, value, onChange } = this.props
    return <input type="number" name={name} value={value} onChange={onChange} />
  }
}

export default NumberInput
