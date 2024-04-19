// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {funDetails, clickEmoji} = props
  const {id, emojiName, emojiUrl} = funDetails

  const onClickEmoji = () => {
    clickEmoji(id)
  }

  return (
    <li className="list-card ">
      <button type="button" className="game-btn" onClick={onClickEmoji}>
        <img src={emojiUrl} className="fun-img" alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
