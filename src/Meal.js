import React, { Component } from 'react'
import AddFoodItem from './AddFoodItem'

export default class Meal extends Component {
  state = {
      addMealBtn: true,
      meal: []
  };

  addFoodToMeal = (food) => {
    const { meal } = this.state
    meal.push(food)
    this.setState({meal})
  }

  saveMeal = () => {
      if(!this.state.meal[0]) return this.setState({message: "You need to add a food item first"})
      this.props.addMealtoDay(this.state.meal)
      this.setState({meal: [], addMealBtn: true, addFood: null, message: null})
  }

  addMeal = () => {
    this.setState({addFood: <AddFoodItem addFoodToMeal={this.addFoodToMeal}/>, addMealBtn: false})
    this.props.mealSavedFalse()
  }

  cancelMeal = () => {
    this.setState({addFood: null, addMealBtn: true})
    this.props.mealSavedTrue()
  }

  

  render() {
    const {addFood, meal, addMealBtn, message} = this.state
    return (
      <div> 
        { meal.map(food => <p key={food}>{food}</p>) }
        { addFood && <>{addFood}</> }
        { message && <p>{message}</p>}
        <div>
          { !addMealBtn && <button onClick={this.saveMeal}>Save Meal</button>}
          { !addMealBtn && <button onClick={this.cancelMeal}>Cancel</button>}
        </div>
        { addMealBtn && <button onClick={this.addMeal}>+ Meal</button>}
      </div>
    )
  }
}