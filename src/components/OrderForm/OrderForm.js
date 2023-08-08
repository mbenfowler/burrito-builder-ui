import { useState } from "react";
import { postOrders } from "../../apiCalls";

function OrderForm({ setNewOrder, addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    postOrders({name: name, ingredients: ingredients})
    .then(data => {
      console.log(data)
      // if(data.ok) {
        setNewOrder(data)
      // }
      clearInputs();
    })
    .catch((err) => console.error("Error fetching:", err))
  }

  function addIngredient(e) {
    e.preventDefault();
    setIngredients(prev => [...prev, e.target.name])
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={addIngredient}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => {
        if(name.length && ingredients.length) {
          handleSubmit(e)
        } else {
          alert("Please fill out required fields!")
        }

      }}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
