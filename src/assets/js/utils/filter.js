'use strict';

const filterByEmail= (stations,query) => {
  console.log(stations);
  const select =stations.filter (function(index) {
    return (index.EMAIL.toLowerCase().indexOf(query.toLowerCase())!=-1);
  })
  console.log(select);
  return select;
}
