import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({
      clickedEmojisList: [],
      isGameInProgress: true,
    })
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    // 1.destructuring the emojiList from props

    const {clickedEmojisList} = this.state
    // 2. destructuring the clickedEmojiList from state

    const isEmojiPresent = clickedEmojisList.includes(id)
    // 3.checking weather the clickedEmojisList contains the id(which clicked present) or not.

    const clickedEmojisLength = clickedEmojisList.length
    // 4.assigning the length of the clickedEmojisList to the clickedEmojisLength.

    if (isEmojiPresent) {
      // 5.if the clickedEmojisList already contains the present clicked id, (that means same emoji clicked twice)
      // Then the method finishGameAndSetTopScore will be called and game will be finished.
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        // 6.if the all the emoji's in the emojiList are clicked exactly once then the game will be finished.

        // 6.1 the emojisList.length -1 will be equal to the length of the clickedEmojisLength(when clicking the final emoji)
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))

      // 7.setting the state clickedEmojisList by appending the clicked emoji id using the spread operator and setState() method.
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props

    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="list-container">
        {shuffledEmojisList.map(eachFun => (
          <EmojiCard
            key={eachFun.id}
            funDetails={eachFun}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGameInProgress, topScore} = this.state

    return (
      <div className="game-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />

        <div className="card-container">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
