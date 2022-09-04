


 const contactValidator = (value) => {
  const regex = /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/;
  if (!regex.test(value.trim())) return false;
  return true;
};
 const emailValidator = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value.trim())) return false;
  return true;
};

 const nameValidator = (value) => {
  const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  if (!regex.test(value.trim())) return false;
  return true;
};
const paramsValidator = (params, res) => {
  if (Object.keys(params).length === 0) {
     res.status(422).json ({
     
      message: "Bad Request",
    });
    return true;
  }
};
 const emptyBodyValidator = (body, res) => {
  if (Object.keys(body).length) {
  return res.status(422).json  ({
      message: "Bad Request",
    });
    return true;
  }
};

 const bodyValidator = (body, res) => {
  if (Object.keys(body).length === 0) {
    return res.status(422).json ({
      message: "Bad Request",
    });
    return true;
  }
};

 const emptyQueryValidator = (query, res) => {
  if (Object.keys(query) != 0) {
    
    return res.status(422).json ({
      message: "Bad Request",
      
    });
    return true;
  }
};
 const emptyFieldValidator = (data, res) => {
  var errorFlag = false;
  data.forEach((element) => {
    if (element.length === 0) {
      errorFlag = true;
    }
  });
  if (errorFlag) {
    return res.status(422).json ({
      message: "Provide all the fields",
  
    });
    return true;
  }
};


   const mongooseIdValidator = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(422).json ({
      
      message: " Given Id is not valid!!",
    
    });
    return true;
  }
};


module.exports = 
{emailValidator,
   nameValidator, 
   emptyBodyValidator, 
   bodyValidator, 
   emptyQueryValidator, 
   emptyFieldValidator, 
   contactValidator,
   mongooseIdValidator,
   paramsValidator };