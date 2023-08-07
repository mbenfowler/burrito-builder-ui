export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then(response => {
      if(response.ok) {
        response.json()
      } else {
        throw new Error('An error occurred')
      }
    })
};

export const postOrders = (order) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(res => {
    if(res.ok) {
      return res.ok
    } else {
      throw new Error('An error occurred')
    }
  })
}
