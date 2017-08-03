'use strict';

const filterByEmail= (stations,query) => {

  const select =stations.filter (function(index) {
    return (index.email.toLowerCase().indexOf(query.toLowerCase())!=-1);
  })

  return select;
}
