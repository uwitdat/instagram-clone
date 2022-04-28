import React from 'react';
import emojiPickerStyles from '../styles/emoji-picker.module.scss';

const emojis = [
  { value: "🙂", label: "🙂" },
  { value: "😃", label: "😃" },
  { value: "😁", label: "😁" },
  { value: "🤣", label: "🤣" },
  { value: '😎', label: '😎' },
  { value: '😍', label: '😍' },
  { value: '🔥', label: '🔥' },
  { value: '😋', label: '😋' },
  { value: '🥺', label: '🥺' },
  { value: '🤤', label: '🤤' },

];


export const EmojiPicker = ({ handleAddValue }) => {

  return (
    <div className={emojiPickerStyles.container}>
      {emojis.map((emoji, idx) => (
        <span onClick={() => handleAddValue(emoji.value)} key={idx}>{emoji.label}</span>
      ))}
    </div>
  )
}
