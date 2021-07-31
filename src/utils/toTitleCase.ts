const smallWords =
  /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;

const toTitleCase = (text: string): string =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) =>
      word.search(smallWords) === -1
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");

export default toTitleCase;
