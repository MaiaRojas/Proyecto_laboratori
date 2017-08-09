'use strict';

const filterByEmail= (stations,query) => {
  const select =stations.filter (function(index) {
    return (index.Email.toLowerCase()==query.toLowerCase());
  })
  console.log(select);
  return select;
}
