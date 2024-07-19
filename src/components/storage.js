const getDefaultValue = ( data, dataType, name ) => {
    console.log(name)
    console.log(data[dataType][name])
    if (data[dataType][name] !== undefined)
      return data[dataType][name]
    else
      return ""
  }

export {getDefaultValue}