'use strict';

const filterByEmail= (stations,query) => {


  const select =stations.filter (function(index) {
    return (index.gsx$email.$t.toLowerCase().indexOf(query.toLowerCase())!=-1);
  })
  console.log(select);
  return select;
}
