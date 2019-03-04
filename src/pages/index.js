import React from "react"
import styled from "styled-components"
import NumberInput from "../components/numberInput"

const Container = styled.div`
  background-color: #11689b;
`

class Main extends React.Component {
  state = {
    minuteCount: null,
    minuteValue: null,
    secondsValue: null,
    isCountdownStarted: false,
  }

  startCountDown() {
    const { isCountdownStarted, minuteCount } = this.state
    if (isCountdownStarted) {
      return
    }

    this.setState({ isCountdownStarted: true })

    let secondsCount = minuteCount * 60

    const counter = setInterval(() => {
      let minutes = parseInt(secondsCount / 60, 10)
      let seconds = parseInt(secondsCount % 60, 10)

      // append 0 for one digit values
      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds

      secondsCount--

      this.setState({
        minuteValue: minutes,
        secondsValue: seconds,
      })

      if (secondsCount < 0) {
        clearInterval(counter)
        this.setState({
          isCountdownStarted: false,
        })
      }
    }, 1000)
  }

  handleTimerStart = () => {
    this.startCountDown()
  }

  handleSetMinuteValue = event => {
    this.setState({
      minuteCount: event.target.value,
    })
  }

  render() {
    const {
      isCountdownStarted,
      minuteCount,
      minuteValue,
      secondsValue,
    } = this.state
    return (
      <Container>
        {isCountdownStarted && (minuteValue || secondsValue) ? (
          <div className="countdown__counter">
            {minuteValue}:{secondsValue}
          </div>
        ) : (
          <div className="countdown__form">
            <NumberInput
              name="minute-input"
              value={minuteCount}
              onChange={this.handleSetMinuteValue}
            />
            <input
              type="submit"
              className="countdown__button"
              value="Start timer"
              onClick={this.handleTimerStart}
            />
          </div>
        )}
      </Container>
    )
  }
}

export default Main
