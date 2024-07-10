//This function capitalizes the firs letter of a word
function capitalizeFirst(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

export {capitalizeFirst}