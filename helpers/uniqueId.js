 const uniqueId = (s) => {
    return s + "-" + Math.floor(Math.random() * Date.now());
  };
  
  module.exports = uniqueId ;