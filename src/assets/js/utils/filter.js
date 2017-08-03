'use strict';

const filterByEmail= (stations,query) => {

  const select =stations.filter (function(index) {
    return (index.email.indexOf(query)!=-1);
  })
  console.log(select);
  return select;
}
