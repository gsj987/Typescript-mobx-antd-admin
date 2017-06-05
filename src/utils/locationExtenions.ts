interface Location {
  query: (key: string) => string
}

Location.prototype.query = function(key: string){
  let result: string = ''

  this.search.substr(1).split("&").forEach(function (pair) {
      if (pair === "") return;
      var parts = pair.split("=");
      if (parts[0] === key){
        result = parts[1] &&
          decodeURIComponent(parts[1].replace(/\+/g, " "))
      }
  })

  return result
}
