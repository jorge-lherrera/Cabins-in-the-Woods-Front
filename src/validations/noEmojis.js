const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

export default function noEmojis(value, field) {
  if (typeof value === "string" && emojiRegex.test(value)) {
    throw new Error(`O campo ${field} não pode conter emoticonos.`);
  }
}
