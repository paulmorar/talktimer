import React from 'react'

import Layout from '../components/layout'
import Head from '../components/head'
import SEO from '../components/seo'

class IndexPage extends React.Component {
  state = {
    bgOpacity: 0,
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
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      secondsCount--

      const derivedOpacity =
        (100 - (secondsCount * 100) / (minuteCount * 60)) / 100

      this.setState({
        bgOpacity: derivedOpacity,
        minuteValue: minutes,
        secondsValue: seconds,
      })

      if (secondsCount < 0) {
        clearInterval(counter)
        this.setState({
          bgOpacity: 0,
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
      bgOpacity,
      isCountdownStarted,
      minuteValue,
      secondsValue,
    } = this.state

    const layoutStyle = {
      background: `rgba(202, 6, 6, ${bgOpacity})`,
      color: '#ffffff',
      height: `100%`,
      padding: `0px 1.0875rem 1.45rem`,
      paddingTop: 0,
    }

    return (
      <Layout style={layoutStyle}>
        <SEO
          title="Home"
          keywords={[
            `talk timer`,
            `speaker timer`,
            `timer`,
            `timer app`,
            `online timer`,
            `stylish timer`,
            `minute countdown`,
            `minute`,
            `countdown`,
          ]}
        />
        {isCountdownStarted ? (
          <div className="timer-wrapper">
            <div className="timer">
              {minuteValue && secondsValue && `${minuteValue}:${secondsValue}`}
            </div>
          </div>
        ) : (
          <>
            <Head />
            <form className="counter-form" onSubmit={this.handleTimerStart}>
              <input
                className="counter-form__input"
                type="number"
                placeholder="Minutes?"
                onChange={this.handleSetMinuteValue}
              />
              <input
                className="counter-form__button"
                type="submit"
                value="Start"
              />
            </form>
          </>
        )}
      </Layout>
    )
  }
}

export default IndexPage
