const getAvater = (name = "sss") => {
  const arr = [
    "adventurer","adventurer-neutral","avataaars","big-ears","big-ears-neutral","big-smile","bottts","croodles","croodles-neutral","female","gridy","human","identicon","initials","jdenticon","male","micah","miniavs","open-peeps","personas","pixel-art","pixel-art-neutral"
  ]
  const ran = Math.floor(Math.random() * arr.length);
  return(`https://avatars.dicebear.com/api/${arr[ran]}/:${name}.svg`);
  
}
export default getAvater;